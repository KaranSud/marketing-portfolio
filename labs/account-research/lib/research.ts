// Lightweight public-site research: fetch a few key pages and extract readable
// text. No paid scraper, just fetch + HTML-to-text, with graceful fallbacks.

export type SiteResearch = {
  domain: string;
  url: string;
  title: string;
  description: string;
  text: string;
  homeHtml: string;
  headers: Record<string, string>;
};

export function normalizeDomain(input: string): string {
  return input
    .trim()
    .replace(/^https?:\/\//i, "")
    .replace(/^www\./i, "")
    .replace(/\/.*$/, "")
    .toLowerCase();
}

function decodeEntities(s: string): string {
  return s
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, " ");
}

function extractTitle(html: string): string {
  const m = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
  return m ? decodeEntities(m[1]).trim().slice(0, 200) : "";
}

function extractMetaDescription(html: string): string {
  const m =
    html.match(
      /<meta[^>]+name=["']description["'][^>]+content=["']([^"']*)["']/i
    ) ||
    html.match(
      /<meta[^>]+content=["']([^"']*)["'][^>]+name=["']description["']/i
    );
  return m ? decodeEntities(m[1]).trim().slice(0, 400) : "";
}

function htmlToText(html: string): string {
  return decodeEntities(
    html
      .replace(/<script[\s\S]*?<\/script>/gi, " ")
      .replace(/<style[\s\S]*?<\/style>/gi, " ")
      .replace(/<noscript[\s\S]*?<\/noscript>/gi, " ")
      .replace(/<!--[\s\S]*?-->/g, " ")
      .replace(/<[^>]+>/g, " ")
  )
    .replace(/\s+/g, " ")
    .trim();
}

async function fetchPage(url: string): Promise<string | null> {
  try {
    const res = await fetch(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
        Accept:
          "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        "Accept-Language": "en-US,en;q=0.9",
      },
      signal: AbortSignal.timeout(10000),
      redirect: "follow",
    });
    if (!res.ok) return null;
    const ct = res.headers.get("content-type") || "";
    if (!ct.includes("text/html")) return null;
    return await res.text();
  } catch {
    return null;
  }
}

async function fetchPageFull(
  url: string
): Promise<{ html: string; headers: Record<string, string> } | null> {
  try {
    const res = await fetch(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
        Accept:
          "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        "Accept-Language": "en-US,en;q=0.9",
      },
      signal: AbortSignal.timeout(10000),
      redirect: "follow",
    });
    if (!res.ok) return null;
    const ct = res.headers.get("content-type") || "";
    if (!ct.includes("text/html")) return null;
    const html = await res.text();
    const headers: Record<string, string> = {};
    res.headers.forEach((v, k) => {
      headers[k.toLowerCase()] = v;
    });
    return { html, headers };
  } catch {
    return null;
  }
}

const CANDIDATE_PATHS = ["", "/about", "/about-us", "/product", "/pricing"];
const MAX_TEXT = 7000;

export async function researchSite(rawDomain: string): Promise<SiteResearch> {
  const domain = normalizeDomain(rawDomain);
  if (!domain || !domain.includes(".")) {
    throw new Error(`"${rawDomain}" is not a valid domain.`);
  }
  const base = `https://${domain}`;

  let full = await fetchPageFull(base);
  let workingBase = base;
  if (full === null) {
    // Some sites only serve on the www host; try that before giving up.
    full = await fetchPageFull(`https://www.${domain}`);
    workingBase = `https://www.${domain}`;
  }
  if (full === null) {
    throw new Error(
      `Could not reach ${domain}. It may be down or blocking automated access.`
    );
  }
  const home = full.html;

  const title = extractTitle(home);
  const description = extractMetaDescription(home);
  let combined = htmlToText(home);

  // Pull a couple of extra pages for depth (best-effort, parallel).
  const extras = await Promise.all(
    CANDIDATE_PATHS.slice(1).map((p) => fetchPage(workingBase + p))
  );
  for (const html of extras) {
    if (html && combined.length < MAX_TEXT) {
      combined += " " + htmlToText(html);
    }
  }

  return {
    domain,
    url: workingBase,
    title,
    description,
    text: combined.slice(0, MAX_TEXT),
    homeHtml: home,
    headers: full.headers,
  };
}
