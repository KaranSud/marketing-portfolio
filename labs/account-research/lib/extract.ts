// Pure, network-free extractors for UNIVERSAL business signals. These work for
// any kind of business (restaurants, retail, local services, agencies, SaaS),
// not just tech. Everything is parsed from a page the company itself published,
// so every fact is real and citeable. Nothing here is model-generated.

export type SourceLink = { label: string; url: string };

export type Rating = { value: number; count?: number; best?: number };

export type SiteFacts = {
  schemaTypes: string[]; // schema.org @types found, e.g. ["Restaurant","Organization"]
  name?: string;
  legalName?: string;
  description?: string;
  slogan?: string;
  founded?: string; // year
  employees?: string;
  address?: string; // formatted single line
  locality?: string;
  region?: string;
  country?: string;
  phone?: string;
  email?: string;
  openingHours?: string[]; // compact human-readable lines
  priceRange?: string;
  servesCuisine?: string[];
  areaServed?: string[];
  rating?: Rating;
  sameAs: string[]; // social / profile links the business publishes about itself
  ogType?: string;
  ogSiteName?: string;
  cmsHints: string[]; // shopify, wix, squarespace, wordpress, webflow, etc.
};

/* ── JSON-LD ── */

type JsonObj = Record<string, unknown>;

function asArray<T = unknown>(v: unknown): T[] {
  if (v == null) return [];
  return (Array.isArray(v) ? v : [v]) as T[];
}

function str(v: unknown): string | undefined {
  if (typeof v === "string") return v.trim() || undefined;
  if (typeof v === "number") return String(v);
  return undefined;
}

// Collect every JSON-LD object on the page, flattening @graph and arrays.
export function parseJsonLd(html: string): JsonObj[] {
  const out: JsonObj[] = [];
  const re =
    /<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi;
  let m: RegExpExecArray | null;
  while ((m = re.exec(html))) {
    let raw = m[1].trim();
    if (!raw) continue;
    // Strip HTML comments / CDATA some CMSs wrap around the JSON.
    raw = raw.replace(/<!--[\s\S]*?-->/g, "").replace(/\/\*[\s\S]*?\*\//g, "");
    let data: unknown;
    try {
      data = JSON.parse(raw);
    } catch {
      continue;
    }
    const stack = asArray<unknown>(data);
    while (stack.length) {
      const node = stack.shift();
      if (!node || typeof node !== "object") continue;
      const obj = node as JsonObj;
      if (Array.isArray(obj["@graph"])) {
        for (const g of obj["@graph"] as unknown[]) stack.push(g);
      }
      if (obj["@type"]) out.push(obj);
    }
  }
  return out;
}

function typeList(obj: JsonObj): string[] {
  return asArray<string>(obj["@type"]).filter((t) => typeof t === "string");
}

// schema.org types that represent an actual business/organization (any vertical).
const ORG_TYPE_RE =
  /(Organization|Corporation|LocalBusiness|Store|Shop|Restaurant|FoodEstablishment|Cafe|Bakery|Bar|Hotel|Lodging|ProfessionalService|LegalService|MedicalBusiness|MedicalOrganization|Dentist|Physician|HealthClub|Hospital|FinancialService|InsuranceAgency|RealEstateAgent|AutomotiveBusiness|HomeAndConstructionBusiness|Plumber|Electrician|Locksmith|EntertainmentBusiness|SportsActivityLocation|BeautySalon|HairSalon|DaySpa|TravelAgency|GovernmentOrganization|NGO|EducationalOrganization|NewsMediaOrganization|Brewery|Winery|Library|Museum|Church|Dealer)/;

function isOrgType(obj: JsonObj): boolean {
  return typeList(obj).some((t) => ORG_TYPE_RE.test(t));
}

function pickAddress(addr: unknown): {
  formatted?: string;
  locality?: string;
  region?: string;
  country?: string;
} {
  const a = asArray<JsonObj>(addr)[0];
  if (!a || typeof a !== "object") {
    const s = str(addr);
    return s ? { formatted: s } : {};
  }
  const street = str(a["streetAddress"]);
  const locality = str(a["addressLocality"]);
  const region = str(a["addressRegion"]);
  const postal = str(a["postalCode"]);
  let country = str(a["addressCountry"]);
  if (!country) {
    const c = asArray<JsonObj>(a["addressCountry"])[0];
    country = c ? str(c["name"]) : undefined;
  }
  const parts: string[] = [];
  for (const seg of [street, locality, region, postal, country]) {
    if (!seg) continue;
    // Drop a segment that just repeats the previous one (e.g. locality === region).
    if (parts.length && parts[parts.length - 1].toLowerCase() === seg.toLowerCase())
      continue;
    parts.push(seg);
  }
  const formatted = parts.join(", ");
  return { formatted: formatted || undefined, locality, region, country };
}

function pickRating(node: unknown): Rating | undefined {
  const r = asArray<JsonObj>(node)[0];
  if (!r || typeof r !== "object") return undefined;
  const value = parseFloat(str(r["ratingValue"]) || "");
  if (isNaN(value)) return undefined;
  const count = parseInt(
    str(r["reviewCount"]) || str(r["ratingCount"]) || "",
    10
  );
  const best = parseFloat(str(r["bestRating"]) || "");
  return {
    value,
    count: isNaN(count) ? undefined : count,
    best: isNaN(best) ? undefined : best,
  };
}

const DAY_ABBR: Record<string, string> = {
  Monday: "Mon",
  Tuesday: "Tue",
  Wednesday: "Wed",
  Thursday: "Thu",
  Friday: "Fri",
  Saturday: "Sat",
  Sunday: "Sun",
};

function pickHours(node: unknown): string[] | undefined {
  // openingHours can be a string/array of strings, or openingHoursSpecification objects.
  const specs = asArray<unknown>(node);
  const lines: string[] = [];
  for (const s of specs) {
    if (typeof s === "string") {
      lines.push(s.trim());
      continue;
    }
    if (s && typeof s === "object") {
      const o = s as JsonObj;
      const days = asArray<unknown>(o["dayOfWeek"])
        .map((d) => {
          const name = (str(d) || "").split("/").pop() || "";
          return DAY_ABBR[name] || name;
        })
        .filter(Boolean);
      const opens = str(o["opens"]);
      const closes = str(o["closes"]);
      if (days.length && opens && closes)
        lines.push(`${days.join(", ")} ${opens}-${closes}`);
    }
  }
  const cleaned = Array.from(new Set(lines.filter(Boolean))).slice(0, 7);
  return cleaned.length ? cleaned : undefined;
}

function employeesStr(node: unknown): string | undefined {
  const n = asArray<unknown>(node)[0];
  if (typeof n === "number") return n.toLocaleString("en-US");
  if (typeof n === "string") return n.trim() || undefined;
  if (n && typeof n === "object") {
    const o = n as JsonObj;
    const v = str(o["value"]) || str(o["minValue"]);
    const max = str(o["maxValue"]);
    if (v && max) return `${v}-${max}`;
    return v;
  }
  return undefined;
}

/* ── OG / meta ── */

function metaContent(html: string, key: string): string | undefined {
  // matches <meta property="og:x" content="..."> in either attribute order
  const patterns = [
    new RegExp(
      `<meta[^>]+(?:property|name)=["']${key}["'][^>]+content=["']([^"']+)["']`,
      "i"
    ),
    new RegExp(
      `<meta[^>]+content=["']([^"']+)["'][^>]+(?:property|name)=["']${key}["']`,
      "i"
    ),
  ];
  for (const re of patterns) {
    const m = html.match(re);
    if (m) return decodeEntities(m[1].trim());
  }
  return undefined;
}

function decodeEntities(s: string): string {
  return s
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#0?39;|&apos;|&#x27;/g, "'")
    .replace(/&nbsp;/g, " ")
    .trim();
}

const CMS_SIGNS: { name: string; test: RegExp }[] = [
  { name: "Shopify", test: /cdn\.shopify|shopify\.com|x-shopify|Shopify\.theme/i },
  { name: "WooCommerce", test: /woocommerce|wp-content\/plugins\/woocommerce/i },
  { name: "Wix", test: /wix\.com|wixstatic|X-Wix/i },
  { name: "Squarespace", test: /squarespace\.com|static1\.squarespace/i },
  { name: "WordPress", test: /wp-content|wp-json/i },
  { name: "Webflow", test: /webflow\.com|wf-/i },
  { name: "BigCommerce", test: /bigcommerce/i },
  { name: "Framer", test: /framerusercontent|framer\.com/i },
  { name: "GoDaddy", test: /godaddy|secureserver/i },
];

/* ── Main extractor ── */

export function extractSiteFacts(html: string): SiteFacts {
  const facts: SiteFacts = { schemaTypes: [], sameAs: [], cmsHints: [] };
  if (!html) return facts;

  const nodes = parseJsonLd(html);
  const orgs = nodes.filter(isOrgType);
  // Prefer the most specific business node (one carrying address/rating/phone).
  const primary =
    orgs.sort((a, b) => richness(b) - richness(a))[0] || undefined;

  const allTypes = new Set<string>();
  for (const o of orgs) for (const t of typeList(o)) allTypes.add(t);
  facts.schemaTypes = Array.from(allTypes);

  if (primary) {
    facts.name = str(primary["name"]) || str(primary["legalName"]);
    facts.legalName = str(primary["legalName"]);
    facts.description = str(primary["description"])?.slice(0, 600);
    facts.slogan = str(primary["slogan"]);
    const founded = str(primary["foundingDate"]);
    if (founded) facts.founded = (founded.match(/\d{4}/) || [])[0];
    facts.employees = employeesStr(primary["numberOfEmployees"]);

    const addr = pickAddress(primary["address"]);
    facts.address = addr.formatted;
    facts.locality = addr.locality;
    facts.region = addr.region;
    facts.country = addr.country;

    facts.phone = str(primary["telephone"]);
    facts.email = str(primary["email"])?.replace(/^mailto:/i, "");
    facts.openingHours =
      pickHours(primary["openingHoursSpecification"]) ||
      pickHours(primary["openingHours"]);
    facts.priceRange = str(primary["priceRange"]);
    const cuisine = asArray<string>(primary["servesCuisine"])
      .map((c) => str(c))
      .filter(Boolean) as string[];
    if (cuisine.length) facts.servesCuisine = cuisine.slice(0, 6);
    const area = asArray<unknown>(primary["areaServed"])
      .map((a) => str(a) || (a && typeof a === "object" ? str((a as JsonObj)["name"]) : undefined))
      .filter(Boolean) as string[];
    if (area.length) facts.areaServed = area.slice(0, 6);
    facts.rating = pickRating(primary["aggregateRating"]);

    // sameAs (social profiles the business links to itself)
    facts.sameAs = asArray<string>(primary["sameAs"])
      .map((u) => str(u))
      .filter((u): u is string => !!u && /^https?:\/\//i.test(u))
      .slice(0, 12);
  }

  // OG / meta fallback fills gaps for sites without rich JSON-LD.
  facts.ogType = metaContent(html, "og:type");
  facts.ogSiteName = metaContent(html, "og:site_name");
  if (!facts.name) facts.name = facts.ogSiteName;
  if (!facts.description)
    facts.description =
      metaContent(html, "og:description") ||
      metaContent(html, "description");

  // CMS / platform hints (helps classify ecommerce vs brochure vs SaaS).
  for (const c of CMS_SIGNS) if (c.test.test(html)) facts.cmsHints.push(c.name);
  facts.cmsHints = Array.from(new Set(facts.cmsHints));

  return facts;
}

function richness(o: JsonObj): number {
  let n = 0;
  for (const k of [
    "address",
    "telephone",
    "aggregateRating",
    "openingHours",
    "openingHoursSpecification",
    "priceRange",
    "sameAs",
    "foundingDate",
    "numberOfEmployees",
  ])
    if (o[k] != null) n++;
  // A more specific LocalBusiness subtype outranks a bare Organization.
  if (typeList(o).some((t) => /LocalBusiness|Restaurant|Store|Service/.test(t)))
    n += 1;
  return n;
}

/* ── Sitemap → catalog / locations / content cadence ── */

export type SiteScope = {
  urls: number;
  products: number;
  locations: number;
  articles: number;
};

export function parseSitemapUrls(xml: string): string[] {
  const locs = [...xml.matchAll(/<loc>\s*([^<\s]+)\s*<\/loc>/gi)].map((m) =>
    m[1].trim()
  );
  return locs;
}

export function classifySitemap(urls: string[]): SiteScope {
  let products = 0;
  let locations = 0;
  let articles = 0;
  for (const u of urls) {
    const p = u.toLowerCase();
    if (/\/(products?|collections?|shop|item|p)\//.test(p)) products++;
    else if (/\/(locations?|stores?|find-?(a-)?store|branches?)\//.test(p))
      locations++;
    else if (/\/(blog|news|articles?|post|insights?|resources?)\//.test(p))
      articles++;
  }
  return { urls: urls.length, products, locations, articles };
}

/* ── Careers / hiring signal ── */

export type Hiring = {
  hiring: boolean;
  openRoles?: number;
  source: string; // ATS or page label
};

// Detect an applicant tracking system token in the HTML so we can read the
// public, free jobs JSON (greenhouse / lever) for a real open-role count.
export function detectAts(
  html: string
): { provider: "greenhouse" | "lever"; token: string } | null {
  const gh =
    html.match(/boards\.greenhouse\.io\/(?:embed\/job_board\?for=)?([a-z0-9_-]+)/i) ||
    html.match(/greenhouse\.io\/([a-z0-9_-]+)\/jobs/i);
  if (gh) return { provider: "greenhouse", token: gh[1] };
  const lv = html.match(/jobs\.lever\.co\/([a-z0-9_-]+)/i);
  if (lv) return { provider: "lever", token: lv[1] };
  return null;
}

export function detectCareersPage(html: string): boolean {
  return /href=["'][^"']*\/(careers?|jobs|join-?us|work-?with-?us|we-?re-?hiring)[^"']*["']/i.test(
    html
  );
}
