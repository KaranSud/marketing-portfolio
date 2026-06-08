// Free lead discovery via Wikidata's open company graph. No API key, no paid
// provider. Returns REAL companies that have a verified official-website domain
// (P856), so every discovered lead is a real, reachable company, not a guess.

const SPARQL = "https://query.wikidata.org/sparql";
const WD_API = "https://www.wikidata.org/w/api.php";
const UA = "Mozilla/5.0 (compatible; AccountResearchBot/1.0; +portfolio demo)";

export type DiscoveredCompany = {
  name: string;
  domain: string;
  country?: string;
  qid?: string;
};

async function getJson<T>(url: string, timeout = 12000): Promise<T | null> {
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

// Resolve a free-text industry / place to a Wikidata QID so we can query by it.
export async function resolveEntity(term: string): Promise<string | null> {
  const t = term.trim();
  if (!t) return null;
  const url = `${WD_API}?action=wbsearchentities&search=${encodeURIComponent(
    t
  )}&language=en&format=json&limit=1&type=item&origin=*`;
  const data = await getJson<{ search?: { id: string }[] }>(url);
  return data?.search?.[0]?.id ?? null;
}

function domainFromUrl(u: string): string | null {
  try {
    return new URL(u).hostname.replace(/^www\./i, "").toLowerCase();
  } catch {
    return null;
  }
}

type SparqlResp = {
  results?: {
    bindings?: Record<string, { value?: string }>[];
  };
};

// Find real companies in an industry (optionally a country) that publish an
// official website. Industry/country are resolved to QIDs first.
export async function discoverCompanies(opts: {
  industry: string;
  country?: string;
  limit?: number;
}): Promise<{ companies: DiscoveredCompany[]; industryQid?: string; note?: string }> {
  const industryQid = await resolveEntity(opts.industry);
  if (!industryQid)
    return { companies: [], note: `Could not map "${opts.industry}" to a known industry.` };

  let countryClause = "";
  if (opts.country) {
    const cq = await resolveEntity(opts.country);
    if (cq) countryClause = `?item wdt:P17 wd:${cq} .`;
  }

  const limit = Math.min(Math.max(opts.limit ?? 30, 5), 50);
  // Companies whose industry (P452) is the target, that have a website (P856).
  // Order by sitelink count (a notability proxy) so established, recognizable
  // companies surface first, which makes for better leads and richer research.
  const query = `SELECT DISTINCT ?item ?itemLabel ?website ?countryLabel ?sl WHERE {
  ?item wdt:P452 wd:${industryQid} .
  ?item wdt:P856 ?website .
  ${countryClause}
  ?item wikibase:sitelinks ?sl .
  OPTIONAL { ?item wdt:P17 ?country . }
  SERVICE wikibase:label { bd:serviceParam wikibase:language "en". }
} ORDER BY DESC(?sl) LIMIT ${limit}`;

  const url = `${SPARQL}?query=${encodeURIComponent(query)}&format=json`;
  const data = await getJson<SparqlResp>(url, 16000);
  const rows = data?.results?.bindings ?? [];

  const companies: DiscoveredCompany[] = [];
  const seen = new Set<string>();
  for (const r of rows) {
    const website = r.website?.value;
    const name = r.itemLabel?.value;
    const qid = r.item?.value?.split("/").pop();
    const domain = website ? domainFromUrl(website) : null;
    if (!domain || !name || seen.has(domain)) continue;
    if (/^Q\d+$/.test(name)) continue; // skip unlabeled entities
    seen.add(domain);
    companies.push({ name, domain, country: r.countryLabel?.value, qid });
  }
  return { companies, industryQid };
}

// Run discovery across several industry terms and merge, so an ICP with a few
// industries yields a broader, de-duplicated starter list.
export async function discoverForIcp(
  industries: string[],
  country: string | undefined,
  perIndustry = 18
): Promise<DiscoveredCompany[]> {
  const lists = await Promise.all(
    industries.slice(0, 4).map((ind) =>
      discoverCompanies({ industry: ind, country, limit: perIndustry })
    )
  );
  const merged: DiscoveredCompany[] = [];
  const seen = new Set<string>();
  for (const l of lists)
    for (const c of l.companies) {
      if (seen.has(c.domain)) continue;
      seen.add(c.domain);
      merged.push(c);
    }
  return merged.slice(0, 40);
}
