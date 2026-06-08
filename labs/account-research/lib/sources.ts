// Free, cited data sources for the account report. Every function is
// best-effort and defensive: on any failure it returns empty/null so one slow
// or missing source never breaks the report. NOTHING here is model-generated;
// every value is fetched from a real source and carries its source URL.

import {
  extractSiteFacts,
  extractPeople,
  mergeFacts,
  pickDeepTargets,
  parseSitemapUrls,
  classifySitemap,
  detectAts,
  detectCareersPage,
  type SiteFacts,
  type SiteScope,
  type Hiring,
  type Person,
} from "./extract";
import { classifyBusiness, type Classification } from "./classify";

const UA =
  "Mozilla/5.0 (compatible; AccountResearchBot/1.0; +portfolio demo)";

export type SourceLink = { label: string; url: string };

export type Snapshot = {
  description?: string;
  founded?: string;
  employees?: string;
  industry?: string;
  hq?: string;
  revenue?: string;
  wikipediaUrl?: string;
};

export type NewsItem = { title: string; url: string; date?: string; source?: string };

export type HN = {
  stories: number;
  points: number;
  top?: { title: string; url: string; points: number };
  searchUrl: string;
};

export type Tech = { name: string; category: string };

export type Profiles = {
  leaders?: { name: string; role: string; linkedin?: string }[];
  linkedinCompany?: string;
  twitter?: string;
  crunchbase?: string;
};

export type GitHubData = {
  org: string;
  repos: number;
  stars: number;
  topLanguage?: string;
  url: string;
};

export type Signals = {
  snapshot?: Snapshot;
  profiles?: Profiles;
  facts?: SiteFacts;
  scope?: SiteScope;
  hiring?: Hiring;
  classification?: Classification;
  news: NewsItem[];
  hn?: HN;
  github?: GitHubData;
  tech: Tech[];
  sources: SourceLink[];
};

async function getJson<T>(url: string, timeout = 9000): Promise<T | null> {
  try {
    const res = await fetch(url, {
      headers: { "User-Agent": UA, Accept: "application/json" },
      signal: AbortSignal.timeout(timeout),
    });
    if (!res.ok) return null;
    return (await res.json()) as T;
  } catch {
    return null;
  }
}

async function getText(url: string, timeout = 9000): Promise<string | null> {
  try {
    const res = await fetch(url, {
      headers: { "User-Agent": UA },
      signal: AbortSignal.timeout(timeout),
    });
    if (!res.ok) return null;
    return await res.text();
  } catch {
    return null;
  }
}

/* ── Tech stack detection (from the company's own page) ── */

const TECH_SIGNATURES: { name: string; category: string; test: RegExp }[] = [
  { name: "Next.js", category: "Framework", test: /\/_next\/|__NEXT_DATA__/i },
  { name: "React", category: "Framework", test: /data-reactroot|react(?:-dom)?\.production|\/react@/i },
  { name: "Vue", category: "Framework", test: /vue(?:\.runtime)?\.|data-v-[0-9a-f]{8}/i },
  { name: "Svelte", category: "Framework", test: /svelte-[0-9a-z]{6}/i },
  { name: "Angular", category: "Framework", test: /ng-version=/i },
  { name: "Gatsby", category: "Framework", test: /___gatsby/i },
  { name: "Webflow", category: "CMS / Builder", test: /webflow/i },
  { name: "Framer", category: "CMS / Builder", test: /framerusercontent|data-framer/i },
  { name: "WordPress", category: "CMS / Builder", test: /wp-content|wp-json/i },
  { name: "Shopify", category: "E-commerce", test: /cdn\.shopify|shopify\.com/i },
  { name: "Google Analytics", category: "Analytics", test: /googletagmanager\.com|google-analytics\.com|gtag\(/i },
  { name: "Segment", category: "Analytics", test: /cdn\.segment\.com|analytics\.js/i },
  { name: "Amplitude", category: "Analytics", test: /amplitude/i },
  { name: "PostHog", category: "Analytics", test: /posthog/i },
  { name: "HubSpot", category: "Marketing", test: /hs-scripts|hubspot|hsforms/i },
  { name: "Marketo", category: "Marketing", test: /marketo/i },
  { name: "Intercom", category: "Support", test: /intercom/i },
  { name: "Drift", category: "Support", test: /drift\.com|driftt/i },
  { name: "Zendesk", category: "Support", test: /zendesk|zdassets/i },
  { name: "Stripe", category: "Payments", test: /js\.stripe\.com/i },
  { name: "Cloudflare", category: "Hosting / CDN", test: /cloudflare/i },
];

export function detectTech(html: string, headers: Record<string, string>): Tech[] {
  const found: Tech[] = [];
  const hay = `${html}\n${JSON.stringify(headers)}`;
  const server = (headers["server"] || "").toLowerCase();
  const powered = (headers["x-powered-by"] || "").toLowerCase();

  for (const sig of TECH_SIGNATURES) {
    if (sig.test.test(hay)) found.push({ name: sig.name, category: sig.category });
  }
  if (headers["x-vercel-id"] || server.includes("vercel"))
    found.push({ name: "Vercel", category: "Hosting / CDN" });
  if (headers["cf-ray"] && !found.some((t) => t.name === "Cloudflare"))
    found.push({ name: "Cloudflare", category: "Hosting / CDN" });
  if (powered.includes("next")) {
    if (!found.some((t) => t.name === "Next.js"))
      found.push({ name: "Next.js", category: "Framework" });
  }
  // de-dupe by name
  const seen = new Set<string>();
  return found.filter((t) => (seen.has(t.name) ? false : seen.add(t.name)));
}

/* ── Wikipedia + Wikidata company snapshot ── */

type WikiSearch = { query?: { search?: { title: string }[] } };
type WikiExtract = {
  query?: {
    pages?: Record<
      string,
      { title?: string; extract?: string; pageprops?: { wikibase_item?: string } }
    >;
  };
};

function yearFromWikidataTime(t?: string): string | undefined {
  // format: +1998-00-00T00:00:00Z
  const m = t?.match(/^[+-](\d{4})/);
  return m ? m[1] : undefined;
}

export async function fetchSnapshot(
  name: string,
  domain: string
): Promise<{ snapshot?: Snapshot; profiles?: Profiles; source?: SourceLink }> {
  const targetHost = domain.replace(/^www\./i, "").toLowerCase();
  const search = await getJson<WikiSearch>(
    `https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(
      name
    )}&srlimit=5&format=json`
  );
  const candidates = (search?.query?.search ?? []).map((s) => s.title);
  if (!candidates.length) return {};

  // Pick the first real article, skipping disambiguation pages so we never
  // attach generic facts (e.g. "Stripe, striped, or stripes may refer to...").
  let title: string | undefined;
  let description: string | undefined;
  let qid: string | undefined;
  for (const cand of candidates.slice(0, 4)) {
    if (/\(disambiguation\)/i.test(cand)) continue;
    const ex = await getJson<WikiExtract>(
      `https://en.wikipedia.org/w/api.php?action=query&prop=extracts|pageprops&exintro&explaintext&redirects=1&titles=${encodeURIComponent(
        cand
      )}&format=json`
    );
    const page = ex?.query?.pages ? Object.values(ex.query.pages)[0] : undefined;
    const extract = page?.extract?.replace(/\s+/g, " ").trim();
    if (!extract || /\bmay refer to\b/i.test(extract)) continue;
    title = cand;
    description = extract.slice(0, 600);
    qid = page?.pageprops?.wikibase_item;
    break;
  }
  if (!title) return {};

  const wikipediaUrl = `https://en.wikipedia.org/wiki/${encodeURIComponent(
    title.replace(/ /g, "_")
  )}`;
  const snapshot: Snapshot = { description, wikipediaUrl };
  const profiles: Profiles = {};
  let verified = false;

  if (qid) {
    const entity = await getJson<{
      entities?: Record<string, { claims?: Record<string, unknown[]> }>;
    }>(`https://www.wikidata.org/wiki/Special:EntityData/${qid}.json`);
    const claims = entity?.entities?.[qid]?.claims as
      | Record<string, Array<{ mainsnak?: { datavalue?: { value?: unknown } }; qualifiers?: Record<string, unknown[]> }>>
      | undefined;

    if (claims) {
      // Verify this is the right company by matching official website (P856)
      // against the target domain. Prevents attaching the wrong entity's facts
      // (e.g. "Linear Technology" semiconductor co. to the SaaS at linear.app).
      const sites = (claims["P856"] ?? [])
        .map((c) => c?.mainsnak?.datavalue?.value)
        .filter((v): v is string => typeof v === "string");
      verified = sites.some((u) => {
        try {
          const h = new URL(u).hostname.replace(/^www\./i, "").toLowerCase();
          return (
            h === targetHost ||
            h.endsWith("." + targetHost) ||
            targetHost.endsWith("." + h)
          );
        } catch {
          return false;
        }
      });

      // founded (P571 inception)
      const inception = claims["P571"]?.[0]?.mainsnak?.datavalue?.value as
        | { time?: string }
        | undefined;
      snapshot.founded = yearFromWikidataTime(inception?.time);

      // employees (P1128) latest
      const empClaims = claims["P1128"];
      if (empClaims?.length) {
        const last = empClaims[empClaims.length - 1];
        const v = last?.mainsnak?.datavalue?.value as { amount?: string } | undefined;
        const amt = v?.amount ? Math.abs(parseFloat(v.amount)) : undefined;
        const ptq = last?.qualifiers?.["P585"]?.[0] as
          | { datavalue?: { value?: { time?: string } } }
          | undefined;
        const yr = yearFromWikidataTime(ptq?.datavalue?.value?.time);
        if (amt && !isNaN(amt))
          snapshot.employees = `${amt.toLocaleString("en-US")}${yr ? ` (${yr})` : ""}`;
      }

      // industry (P452), HQ (P159) / country (P17) -> resolve labels
      const industryQid = (
        claims["P452"]?.[0]?.mainsnak?.datavalue?.value as { id?: string } | undefined
      )?.id;
      const hqQid = (
        claims["P159"]?.[0]?.mainsnak?.datavalue?.value as { id?: string } | undefined
      )?.id;
      const countryQid = (
        claims["P17"]?.[0]?.mainsnak?.datavalue?.value as { id?: string } | undefined
      )?.id;

      // leadership: CEO (P169) + founders (P112)
      const ceoQid = (
        claims["P169"]?.[0]?.mainsnak?.datavalue?.value as { id?: string } | undefined
      )?.id;
      const founderQids = (claims["P112"] ?? [])
        .map((c) => (c?.mainsnak?.datavalue?.value as { id?: string } | undefined)?.id)
        .filter((v): v is string => typeof v === "string")
        .slice(0, 3);

      // social handles (string-valued props)
      const liId = claims["P4264"]?.[0]?.mainsnak?.datavalue?.value;
      if (typeof liId === "string")
        profiles.linkedinCompany = `https://www.linkedin.com/company/${liId}`;
      const twId = claims["P2002"]?.[0]?.mainsnak?.datavalue?.value;
      if (typeof twId === "string") profiles.twitter = `https://x.com/${twId}`;
      const cbId = claims["P2088"]?.[0]?.mainsnak?.datavalue?.value;
      if (typeof cbId === "string")
        profiles.crunchbase = `https://www.crunchbase.com/organization/${cbId}`;

      const toResolve = [
        industryQid,
        hqQid,
        countryQid,
        ceoQid,
        ...founderQids,
      ].filter(Boolean) as string[];
      if (toResolve.length) {
        const labels = await getJson<{
          entities?: Record<string, { labels?: { en?: { value?: string } } }>;
        }>(
          `https://www.wikidata.org/w/api.php?action=wbgetentities&ids=${toResolve.join(
            "|"
          )}&props=labels&languages=en&format=json`
        );
        const lab = (q?: string) =>
          q ? labels?.entities?.[q]?.labels?.en?.value : undefined;
        snapshot.industry = lab(industryQid);
        snapshot.hq = lab(hqQid) || lab(countryQid);

        const leaders: { name: string; role: string }[] = [];
        const ceoName = lab(ceoQid);
        if (ceoName) leaders.push({ name: ceoName, role: "CEO" });
        for (const fq of founderQids) {
          const n = lab(fq);
          if (n && !leaders.some((l) => l.name === n))
            leaders.push({ name: n, role: "Founder" });
        }
        if (leaders.length) profiles.leaders = leaders;
      }

      // revenue (P2139) only if USD (Q4917) to avoid currency mistakes
      const revClaim = claims["P2139"];
      if (revClaim?.length) {
        const last = revClaim[revClaim.length - 1];
        const v = last?.mainsnak?.datavalue?.value as
          | { amount?: string; unit?: string }
          | undefined;
        if (v?.unit?.endsWith("Q4917") && v.amount) {
          const n = Math.abs(parseFloat(v.amount));
          const ptq = last?.qualifiers?.["P585"]?.[0] as
            | { datavalue?: { value?: { time?: string } } }
            | undefined;
          const yr = yearFromWikidataTime(ptq?.datavalue?.value?.time);
          let pretty: string;
          if (n >= 1e9) pretty = `$${(n / 1e9).toFixed(1)}B`;
          else if (n >= 1e6) pretty = `$${(n / 1e6).toFixed(0)}M`;
          else pretty = `$${n.toLocaleString("en-US")}`;
          snapshot.revenue = `${pretty}${yr ? ` (${yr})` : ""}`;
        }
      }
    }
  }

  // Only return facts when the entity is domain-verified. Accuracy over coverage.
  if (!verified) return {};
  const hasProfiles =
    profiles.leaders?.length ||
    profiles.linkedinCompany ||
    profiles.twitter ||
    profiles.crunchbase;
  return {
    snapshot,
    profiles: hasProfiles ? profiles : undefined,
    source: { label: `Wikipedia / Wikidata: ${title}`, url: wikipediaUrl },
  };
}

/* ── Google News RSS (recent signals) ── */

export async function fetchNews(
  name: string
): Promise<{ news: NewsItem[]; source?: SourceLink }> {
  const q = `"${name}"`;
  const searchUrl = `https://news.google.com/rss/search?q=${encodeURIComponent(
    q
  )}&hl=en-US&gl=US&ceid=US:en`;
  const xml = await getText(searchUrl);
  if (!xml) return { news: [] };

  const items: NewsItem[] = [];
  const itemBlocks = xml.split("<item>").slice(1, 7);
  for (const block of itemBlocks) {
    const title = block.match(/<title>(.*?)<\/title>/s)?.[1];
    const link = block.match(/<link>(.*?)<\/link>/s)?.[1];
    const pub = block.match(/<pubDate>(.*?)<\/pubDate>/s)?.[1];
    const source = block.match(/<source[^>]*>(.*?)<\/source>/s)?.[1];
    if (title && link) {
      items.push({
        title: decodeXml(title).replace(/\s*-\s*[^-]+$/, "").trim(),
        url: link.trim(),
        date: pub ? new Date(pub).toISOString().slice(0, 10) : undefined,
        source: source ? decodeXml(source) : undefined,
      });
    }
  }
  if (!items.length) return { news: [] };
  return {
    news: items.slice(0, 5),
    source: { label: "Google News", url: searchUrl },
  };
}

function decodeXml(s: string): string {
  return s
    .replace(/<!\[CDATA\[(.*?)\]\]>/s, "$1")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/<[^>]+>/g, "")
    .trim();
}

/* ── Hacker News mindshare (Algolia API) ── */

type HNResp = {
  nbHits?: number;
  hits?: { title?: string; url?: string; objectID?: string; points?: number }[];
};

export async function fetchHN(
  name: string
): Promise<{ hn?: HN; source?: SourceLink }> {
  const searchUrl = `https://hn.algolia.com/api/v1/search?query=${encodeURIComponent(
    name
  )}&tags=story&hitsPerPage=20`;
  const data = await getJson<HNResp>(searchUrl);
  if (!data || !data.hits?.length) return {};
  const points = data.hits.reduce((a, h) => a + (h.points || 0), 0);
  const top = [...data.hits].sort((a, b) => (b.points || 0) - (a.points || 0))[0];
  const human = `https://hn.algolia.com/?query=${encodeURIComponent(name)}&type=story`;
  return {
    hn: {
      stories: data.nbHits || data.hits.length,
      points,
      top: top?.title
        ? {
            title: top.title,
            url:
              top.url ||
              `https://news.ycombinator.com/item?id=${top.objectID}`,
            points: top.points || 0,
          }
        : undefined,
      searchUrl: human,
    },
    source: { label: "Hacker News (Algolia)", url: human },
  };
}

/* ── GitHub (org repos, stars, language) ── */

type GhUser = { login: string; type: string };
type GhOrg = {
  login: string;
  blog?: string;
  public_repos?: number;
  html_url?: string;
};
type GhRepo = { stargazers_count?: number; language?: string };

export async function fetchGitHub(
  name: string,
  domain: string
): Promise<{ github?: GitHubData; source?: SourceLink }> {
  const targetHost = domain.replace(/^www\./i, "").toLowerCase();
  const search = await getJson<{ items?: GhUser[] }>(
    `https://api.github.com/search/users?q=${encodeURIComponent(
      name
    )}+type:org&per_page=5`
  );
  const orgs = (search?.items ?? [])
    .filter((o) => o.type === "Organization")
    .slice(0, 5);

  for (const o of orgs) {
    const org = await getJson<GhOrg>(`https://api.github.com/orgs/${o.login}`);
    if (!org?.blog) continue;
    // verify by the org's website matching the target domain
    let ok = false;
    try {
      const h = new URL(
        org.blog.startsWith("http") ? org.blog : `https://${org.blog}`
      ).hostname
        .replace(/^www\./i, "")
        .toLowerCase();
      ok =
        h === targetHost ||
        h.endsWith("." + targetHost) ||
        targetHost.endsWith("." + h);
    } catch {
      ok = false;
    }
    if (!ok) continue;

    const repos = await getJson<{ items?: GhRepo[] }>(
      `https://api.github.com/search/repositories?q=org:${o.login}&sort=stars&order=desc&per_page=5`
    );
    const items = repos?.items ?? [];
    const stars = items.reduce((a, r) => a + (r.stargazers_count || 0), 0);
    const langCount: Record<string, number> = {};
    for (const r of items)
      if (r.language) langCount[r.language] = (langCount[r.language] || 0) + 1;
    const topLanguage = Object.entries(langCount).sort(
      (a, b) => b[1] - a[1]
    )[0]?.[0];
    const url = org.html_url || `https://github.com/${o.login}`;
    return {
      github: {
        org: o.login,
        repos: org.public_repos ?? items.length,
        stars,
        topLanguage,
        url,
      },
      source: { label: `GitHub: ${o.login}`, url },
    };
  }
  return {};
}

/* ── Sitemap: catalog / locations / content cadence (universal size proxy) ── */

export async function fetchSitemap(
  domain: string
): Promise<{ scope?: SiteScope; deepTargets?: string[]; source?: SourceLink }> {
  const root = domain.replace(/^www\./i, "");
  const url = `https://${root}/sitemap.xml`;
  const xml = await getText(url, 8000);
  if (!xml) return {};
  let urls = parseSitemapUrls(xml);
  // Sitemap index: pull a few child sitemaps to get real page URLs.
  if (/<sitemapindex/i.test(xml)) {
    const children = urls.filter((u) => /\.xml/i.test(u)).slice(0, 3);
    const childXmls = await Promise.all(children.map((c) => getText(c, 7000)));
    urls = childXmls
      .filter(Boolean)
      .flatMap((x) => parseSitemapUrls(x as string));
  }
  if (!urls.length) return {};
  return {
    scope: classifySitemap(urls),
    deepTargets: pickDeepTargets(urls),
    source: { label: "Sitemap", url },
  };
}

/* ── Hiring signal (universal growth proxy; real counts via free ATS APIs) ── */

export async function fetchHiring(
  domain: string,
  html: string
): Promise<{ hiring?: Hiring; source?: SourceLink }> {
  const ats = detectAts(html);
  if (ats?.provider === "greenhouse") {
    const data = await getJson<{ jobs?: unknown[]; meta?: { total?: number } }>(
      `https://boards-api.greenhouse.io/v1/boards/${ats.token}/jobs`
    );
    const n = data?.meta?.total ?? data?.jobs?.length;
    if (typeof n === "number")
      return {
        hiring: { hiring: n > 0, openRoles: n, source: "Greenhouse" },
        source: {
          label: "Greenhouse jobs",
          url: `https://boards.greenhouse.io/${ats.token}`,
        },
      };
  } else if (ats?.provider === "lever") {
    const data = await getJson<unknown[]>(
      `https://api.lever.co/v0/postings/${ats.token}?mode=json`
    );
    if (Array.isArray(data))
      return {
        hiring: { hiring: data.length > 0, openRoles: data.length, source: "Lever" },
        source: { label: "Lever jobs", url: `https://jobs.lever.co/${ats.token}` },
      };
  }
  if (detectCareersPage(html))
    return { hiring: { hiring: true, source: "Careers page" } };
  return {};
}

/* ── Orchestrator ── */

function mergePeople(a: Person[], b: Person[]): Person[] {
  const out = [...a];
  const seen = new Set(a.map((p) => p.name.toLowerCase()));
  for (const p of b) {
    const k = p.name.toLowerCase();
    if (seen.has(k)) continue;
    seen.add(k);
    out.push(p);
  }
  return out;
}

// Combine Wikidata leadership with named people from the site, attaching a
// LinkedIn profile to a Wikidata leader when the site reveals one.
function mergeLeaders(
  wiki: { name: string; role: string }[] | undefined,
  people: Person[]
): { name: string; role: string; linkedin?: string }[] {
  const out: { name: string; role: string; linkedin?: string }[] = [];
  const seen = new Set<string>();
  for (const l of wiki || []) {
    const m = people.find((p) => p.name.toLowerCase() === l.name.toLowerCase());
    out.push({ name: l.name, role: l.role, linkedin: m?.linkedin });
    seen.add(l.name.toLowerCase());
  }
  for (const p of people) {
    if (seen.has(p.name.toLowerCase())) continue;
    seen.add(p.name.toLowerCase());
    out.push({ name: p.name, role: p.role || "Team", linkedin: p.linkedin });
  }
  return out.slice(0, 6);
}

export async function gatherSignals(
  companyName: string,
  domain: string,
  html: string,
  headers: Record<string, string>,
  extraHtml = ""
): Promise<Signals> {
  const combined = extraHtml ? `${html}\n${extraHtml}` : html;
  const [snap, news, hn, gh, sm, hire] = await Promise.all([
    fetchSnapshot(companyName, domain),
    fetchNews(companyName),
    fetchHN(companyName),
    fetchGitHub(companyName, domain),
    fetchSitemap(domain),
    fetchHiring(domain, combined),
  ]);
  const tech = detectTech(combined, headers);
  let facts = extractSiteFacts(combined);
  let people = extractPeople(combined);

  // Deep pass: a representative location or product page usually carries the
  // LocalBusiness / Product schema (address, hours, rating, price) that a
  // JS-only homepage hides. Recovers facts for big chains and shops, for free.
  if (sm.deepTargets?.length) {
    const deepHtmls = await Promise.all(
      sm.deepTargets.map((u) => getText(u, 7000))
    );
    for (const dh of deepHtmls) {
      if (!dh) continue;
      facts = mergeFacts(facts, extractSiteFacts(dh));
      people = mergePeople(people, extractPeople(dh));
    }
  }

  const mergedLeaders = mergeLeaders(snap.profiles?.leaders, people);
  const profiles: Profiles | undefined =
    snap.profiles || mergedLeaders.length
      ? { ...(snap.profiles || {}), leaders: mergedLeaders.length ? mergedLeaders : snap.profiles?.leaders }
      : undefined;

  // Treat HN as a real tech signal only when there is genuine mindshare, so a
  // single incidental mention never mislabels a restaurant as a tech company.
  const hnTech = !!hn.hn && (hn.hn.stories > 1 || hn.hn.points > 30);
  const title = combined.match(/<title[^>]*>([^<]*)<\/title>/i)?.[1] || "";
  // Strip the page to readable text so keyword classification sees real copy
  // (a law firm's site says "attorneys" everywhere; a SaaS never does).
  const bodyText = combined
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .slice(0, 6000);
  const classifyText = [facts.name, facts.description, facts.slogan, title, bodyText]
    .filter(Boolean)
    .join(" ");
  const classification = classifyBusiness({
    facts,
    hasGithub: !!gh.github,
    hasHN: hnTech,
    techNames: tech.map((t) => t.name),
    scope: sm.scope,
    wikidataIndustry: snap.snapshot?.industry,
    text: classifyText,
  });

  const root = domain.replace(/^www\./i, "");
  const hasFacts = !!(
    facts.name ||
    facts.address ||
    facts.rating ||
    facts.priceRange ||
    facts.sameAs.length
  );

  const sources: SourceLink[] = [];
  if (snap.source) sources.push(snap.source);
  if (hasFacts)
    sources.push({
      label: "Company website (structured data)",
      url: `https://${root}`,
    });
  if (sm.source) sources.push(sm.source);
  if (hire.source) sources.push(hire.source);
  if (gh.source) sources.push(gh.source);
  if (news.source) sources.push(news.source);
  if (hn.source) sources.push(hn.source);

  return {
    snapshot: snap.snapshot,
    profiles,
    facts,
    scope: sm.scope,
    hiring: hire.hiring,
    classification,
    news: news.news,
    hn: hn.hn,
    github: gh.github,
    tech,
    sources,
  };
}

/* ── Contact discovery (from the company's own published pages) ── */

export type Contacts = {
  emails: string[];
  linkedin?: string;
  twitter?: string;
  telegram?: string;
  teamLinkedins: string[];
  contactUrl?: string;
  linkedinPeopleSearch: string;
  emailPattern?: string;
  likelyEmails?: { name: string; email: string }[];
};

const BROWSER_UA =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36";

async function getHtml(url: string, timeout = 8000): Promise<string | null> {
  try {
    const res = await fetch(url, {
      headers: { "User-Agent": BROWSER_UA, Accept: "text/html" },
      signal: AbortSignal.timeout(timeout),
      redirect: "follow",
    });
    if (!res.ok) return null;
    if (!(res.headers.get("content-type") || "").includes("text/html"))
      return null;
    return await res.text();
  } catch {
    return null;
  }
}

// Fetch likely team/about pages so we can pull real published LinkedIn profiles.
export async function fetchExtraHtml(domain: string): Promise<string> {
  const root = domain.replace(/^www\./i, "");
  const paths = ["/about", "/about-us", "/team", "/leadership", "/company", "/people"];
  const results = await Promise.all(
    paths.map((p) => getHtml(`https://${root}${p}`))
  );
  return results.filter(Boolean).join("\n");
}

function isUsableEmail(e: string): boolean {
  if (!/^[^@\s]+@[^@\s]+\.[a-z]{2,}$/i.test(e)) return false;
  if (/\.(png|jpe?g|gif|svg|webp|css|js)$/i.test(e)) return false;
  if (/(sentry|wixpress|example\.com|yourdomain|@2x|@sentry|domain\.com)/i.test(e))
    return false;
  return true;
}

export function detectContacts(
  html: string,
  domain: string,
  companyName: string
): Contacts {
  const root = domain.replace(/^www\./i, "");
  const emails = new Set<string>();

  for (const m of html.matchAll(/mailto:([^"'?\s>]+)/gi)) {
    let e = m[1];
    try {
      e = decodeURIComponent(e);
    } catch {
      // keep raw
    }
    e = e.toLowerCase().trim();
    if (isUsableEmail(e)) emails.add(e);
  }
  const onDomain = new RegExp(
    `[A-Za-z0-9._%+-]+@(?:[A-Za-z0-9-]+\\.)*${root.replace(/[.]/g, "\\.")}`,
    "gi"
  );
  for (const m of html.matchAll(onDomain)) {
    const e = m[0].toLowerCase();
    if (isUsableEmail(e)) emails.add(e);
  }

  const linkedin = html.match(
    /https?:\/\/(?:[a-z]{2,3}\.)?linkedin\.com\/company\/[A-Za-z0-9_%.-]+/i
  )?.[0];

  let twitter = html.match(
    /https?:\/\/(?:www\.)?(?:twitter|x)\.com\/[A-Za-z0-9_]{2,30}/i
  )?.[0];
  if (twitter && /\/(intent|share|home|search|hashtag|i\/)/i.test(twitter))
    twitter = undefined;

  let contactUrl: string | undefined;
  const cm = html.match(
    /href=["'](https?:\/\/[^"']*\/(?:contact|contact-us|get-in-touch)[^"']*|\/(?:contact|contact-us|get-in-touch)[^"']*)["']/i
  );
  if (cm) contactUrl = cm[1].startsWith("http") ? cm[1] : `https://${root}${cm[1]}`;

  let telegram = html.match(
    /https?:\/\/(?:t\.me|telegram\.me)\/[A-Za-z0-9_]{3,32}/i
  )?.[0];
  if (telegram && /\/(share|joinchat|s|share\/url)\b/i.test(telegram))
    telegram = undefined;

  // Real personal LinkedIn profiles published on their site (team/about pages).
  const teamLinkedins = Array.from(
    new Set(
      [
        ...html.matchAll(
          /https?:\/\/(?:[a-z]{2,3}\.)?linkedin\.com\/in\/[A-Za-z0-9_%-]+/gi
        ),
      ].map((m) => m[0].split("?")[0].replace(/\/$/, ""))
    )
  ).slice(0, 8);

  const linkedinPeopleSearch = `https://www.linkedin.com/search/results/people/?keywords=${encodeURIComponent(
    companyName
  )}`;

  return {
    emails: Array.from(emails).slice(0, 4),
    linkedin,
    twitter,
    telegram,
    teamLinkedins,
    contactUrl,
    linkedinPeopleSearch,
  };
}

export { inferEmails } from "./extract";
