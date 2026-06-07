import { NextResponse } from "next/server";
import { researchSite, normalizeDomain } from "@/lib/research";
import { gatherSignals, detectContacts, fetchExtraHtml } from "@/lib/sources";
import { generateReport } from "@/lib/agent";

export const runtime = "nodejs";
export const maxDuration = 60;

// The domain label is a far more reliable company name than the site <title>
// (which is usually a tagline). e.g. notion.so -> "Notion", ramp.com -> "Ramp".
function deriveName(domain: string): string {
  const label = domain.split(".")[0].replace(/[-_]+/g, " ").trim();
  if (!label) return domain;
  return label
    .split(" ")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

export async function POST(req: Request) {
  let body: { domain?: string; offer?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const domain = (body.domain || "").trim();
  const offer = (body.offer || "").trim();

  if (!domain) {
    return NextResponse.json({ error: "Missing target domain." }, { status: 400 });
  }
  if (!offer) {
    return NextResponse.json(
      { error: "Describe your offer so the brief can be personalized." },
      { status: 400 }
    );
  }

  const normalized = normalizeDomain(domain);
  if (!normalized || !normalized.includes(".")) {
    return NextResponse.json(
      { error: `"${domain}" is not a valid domain.` },
      { status: 400 }
    );
  }

  try {
    // If the site blocks automated access (e.g. Cloudflare challenge), don't
    // hard-fail. Degrade gracefully and still build the report from the other
    // public sources (Wikipedia, news, Hacker News).
    let site: Awaited<ReturnType<typeof researchSite>>;
    let siteReachable = true;
    try {
      site = await researchSite(domain);
    } catch {
      siteReachable = false;
      site = {
        domain: normalized,
        url: `https://${normalized}`,
        title: "",
        description: "",
        text: "",
        homeHtml: "",
        headers: {},
      };
    }

    const name = deriveName(normalized);
    const extraHtml = siteReachable ? await fetchExtraHtml(normalized) : "";
    const signals = await gatherSignals(
      name,
      normalized,
      site.homeHtml,
      site.headers,
      extraHtml
    );
    const contacts = detectContacts(
      `${site.homeHtml}\n${extraHtml}`,
      normalized,
      name
    );

    if (
      !siteReachable &&
      !signals.snapshot &&
      signals.news.length === 0 &&
      !signals.hn
    ) {
      return NextResponse.json(
        {
          error: `Could not reach ${normalized}, and found no public data to build a report from.`,
          domain: normalized,
        },
        { status: 502 }
      );
    }

    const brief = await generateReport(site, offer, signals);

    return NextResponse.json({
      domain: normalized,
      title: site.title,
      name,
      siteReachable,
      snapshot: signals.snapshot ?? null,
      profiles: signals.profiles ?? null,
      facts: signals.facts ?? null,
      scope: signals.scope ?? null,
      hiring: signals.hiring ?? null,
      classification: signals.classification ?? null,
      news: signals.news,
      hn: signals.hn ?? null,
      github: signals.github ?? null,
      tech: signals.tech,
      contacts,
      sources: signals.sources,
      brief,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Something went wrong.";
    return NextResponse.json({ error: message, domain: normalized }, {
      status: 502,
    });
  }
}
