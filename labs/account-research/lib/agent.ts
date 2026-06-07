import { GoogleGenAI, Type } from "@google/genai";
import type { SiteResearch } from "./research";
import type { Signals } from "./sources";
import type { Category } from "./classify";

// What actually matters when selling INTO each kind of business. Keeps the
// brief from defaulting to SaaS framing for a restaurant, shop, or law firm.
const CATEGORY_LENS: Record<Category, string> = {
  saas_tech:
    "product adoption and activation, user or developer growth, integrations, technical credibility, and pricing or expansion revenue",
  ecommerce:
    "catalog and merchandising, conversion rate and average order value, paid acquisition and ROAS, retention and repeat purchase, and seasonal launches",
  restaurant_food:
    "footfall and covers, online ordering and delivery, reviews and reputation, new location launches, local discovery, and catering or events",
  local_service:
    "local discovery and reviews, bookings and appointments, service-area coverage, response time, seasonal demand, and word-of-mouth reputation",
  professional_services:
    "client acquisition and referrals, the specific practice areas or service lines, credibility and thought leadership, and pipeline or proposal volume",
  healthcare:
    "patient acquisition and reviews, appointment booking, the service lines they offer, local reputation, and trust or compliance-sensitive messaging",
  media_content:
    "audience growth and engagement, publishing cadence, monetization through ads, subscriptions or sponsors, and distribution channels",
  nonprofit:
    "donor and volunteer acquisition, program awareness, grants and fundraising, and community engagement. This is mission-led, not a hard sales motion",
  other:
    "who their core customers are, how they win and keep business, and where the offer plausibly fits",
};

function lensFor(signals: Signals): { label: string; lens: string } {
  const cat = (signals.classification?.category ?? "other") as Category;
  return {
    label: signals.classification?.label ?? "business",
    lens: CATEGORY_LENS[cat],
  };
}

export type Brief = {
  fitScore: number;
  fitReason: string;
  executiveSummary: string;
  strategicRead: string;
  fit: string;
  pains: string[];
  hook: string;
  email: { subject: string; body: string };
  linkedin: string;
};

const responseSchema = {
  type: Type.OBJECT,
  properties: {
    fitScore: { type: Type.NUMBER },
    fitReason: { type: Type.STRING },
    executiveSummary: { type: Type.STRING },
    strategicRead: { type: Type.STRING },
    fit: { type: Type.STRING },
    pains: { type: Type.ARRAY, items: { type: Type.STRING } },
    hook: { type: Type.STRING },
    email: {
      type: Type.OBJECT,
      properties: {
        subject: { type: Type.STRING },
        body: { type: Type.STRING },
      },
      required: ["subject", "body"],
    },
    linkedin: { type: Type.STRING },
  },
  required: [
    "fitScore",
    "fitReason",
    "executiveSummary",
    "strategicRead",
    "fit",
    "pains",
    "hook",
    "email",
    "linkedin",
  ],
};

function renderSignals(signals: Signals): string {
  const lines: string[] = [];
  const s = signals.snapshot;
  if (s) {
    const facts: string[] = [];
    if (s.founded) facts.push(`founded ${s.founded}`);
    if (s.employees) facts.push(`${s.employees} employees`);
    if (s.industry) facts.push(`industry: ${s.industry}`);
    if (s.hq) facts.push(`HQ: ${s.hq}`);
    if (s.revenue) facts.push(`revenue: ${s.revenue}`);
    if (facts.length) lines.push(`VERIFIED FACTS (Wikipedia/Wikidata): ${facts.join("; ")}.`);
    if (s.description) lines.push(`ENCYCLOPEDIA SUMMARY: ${s.description}`);
  }

  const cls = signals.classification;
  if (cls)
    lines.push(
      `BUSINESS TYPE: ${cls.label} (${cls.confidence} confidence; ${cls.reason}).`
    );

  const f = signals.facts;
  if (f) {
    const fl: string[] = [];
    if (f.address) fl.push(`address: ${f.address}`);
    else if (f.locality || f.region || f.country)
      fl.push(
        `location: ${[f.locality, f.region, f.country].filter(Boolean).join(", ")}`
      );
    if (f.phone) fl.push(`phone: ${f.phone}`);
    if (f.priceRange) fl.push(`price range: ${f.priceRange}`);
    if (f.servesCuisine?.length) fl.push(`cuisine: ${f.servesCuisine.join(", ")}`);
    if (f.areaServed?.length) fl.push(`area served: ${f.areaServed.join(", ")}`);
    if (f.founded && !s?.founded) fl.push(`founded ${f.founded}`);
    if (f.employees && !s?.employees) fl.push(`${f.employees} employees`);
    if (f.rating)
      fl.push(
        `customer rating ${f.rating.value}${f.rating.best ? `/${f.rating.best}` : ""}${
          f.rating.count ? ` from ${f.rating.count} reviews` : ""
        }`
      );
    if (f.openingHours?.length) fl.push("publishes opening hours");
    if (fl.length)
      lines.push(
        `BUSINESS PROFILE (from their site's structured data): ${fl.join("; ")}.`
      );
  }

  const sc = signals.scope;
  if (sc) {
    const parts: string[] = [];
    if (sc.products) parts.push(`~${sc.products} product or catalog pages`);
    if (sc.locations) parts.push(`${sc.locations} location pages`);
    if (sc.articles) parts.push(`${sc.articles} articles or blog posts`);
    if (parts.length) lines.push(`WEBSITE SCOPE (from sitemap): ${parts.join(", ")}.`);
  }

  const h = signals.hiring;
  if (h?.hiring)
    lines.push(
      `HIRING: ${
        h.openRoles != null ? `${h.openRoles} open roles` : "actively hiring"
      } (${h.source}). A growth and expansion signal.`
    );

  if (signals.profiles?.leaders?.length) {
    lines.push(
      "LEADERSHIP: " +
        signals.profiles.leaders
          .map((l) => `${l.name} (${l.role})`)
          .join(", ") +
        "."
    );
  }
  if (signals.news.length) {
    lines.push(
      "RECENT NEWS HEADLINES:\n" +
        signals.news
          .map((n) => `- ${n.date || ""} ${n.title}${n.source ? ` (${n.source})` : ""}`)
          .join("\n")
    );
  }
  if (signals.hn) {
    lines.push(
      `HACKER NEWS: ${signals.hn.stories} stories mentioning them, ${signals.hn.points} total points${
        signals.hn.top ? `; top: "${signals.hn.top.title}" (${signals.hn.top.points} pts)` : ""
      }.`
    );
  }
  if (signals.github) {
    lines.push(
      `GITHUB: org ${signals.github.org}, ${signals.github.repos} public repos, about ${signals.github.stars.toLocaleString()} stars across top repos${
        signals.github.topLanguage
          ? `, primary language ${signals.github.topLanguage}`
          : ""
      }.`
    );
  }
  if (signals.tech.length) {
    lines.push(
      `DETECTED TECH STACK (from their site): ${signals.tech
        .map((t) => t.name)
        .join(", ")}.`
    );
  }
  return lines.length ? lines.join("\n\n") : "(no external signals available)";
}

function buildPrompt(site: SiteResearch, offer: string, signals: Signals): string {
  return `You are a senior GTM strategist writing a concise, McKinsey-style account brief for a sales/marketing team. Be sharp, specific, and grounded.

THE SELLER'S OFFER (what we are pitching):
"""
${offer}
"""

TARGET COMPANY: ${site.domain}
Site title: ${site.title || "(none)"}
Site meta: ${site.description || "(none)"}

SITE CONTENT (their own words):
"""
${site.text || "(little content retrievable)"}
"""

EXTERNAL SIGNALS (already verified and sourced; treat as ground truth):
"""
${renderSignals(signals)}
"""

BUSINESS CONTEXT:
This account is a ${lensFor(signals).label}. Judge fit, pains, hook, and outreach through the lens of what actually matters to this kind of business: ${lensFor(signals).lens}. Do NOT assume they are a tech or SaaS company, or default to software language, unless the signals clearly say so. Speak about their real world (for a restaurant talk covers, delivery, and reviews; for a shop talk catalog, conversion, and repeat buyers; for a firm talk clients and referrals).

Write the brief. Hard rules:
- Ground everything in the material above. Do NOT invent statistics, funding, headcounts, customers, or dates. If a number is not in the signals, do not state one. You may reference the verified facts and recent news in your analysis.
- "executiveSummary": 2 to 3 sentences. The "so what" for a seller: who they are, what they are clearly focused on right now, and whether they are a strong fit. Reference a real signal (a fact or a recent headline) if available.
- "strategicRead": 3 to 4 sentences on their positioning and likely current priorities, inferred from their site and signals. Concrete, not generic.
- "fitScore": an honest integer from 0 to 100 for how strong a fit this account is for the seller's offer right now. Be discerning and use the full range: 80+ only for a clear, timely fit, 40 to 70 for plausible, under 40 for weak. Judge from the real signals, not optimism.
- "fitReason": one short sentence (under 18 words) explaining the score.
- "fit": 2 to 3 sentences on where the seller's offer fits their world and the single best angle to lead with.
- "pains": 3 to 4 specific, plausible pain points the offer could address (inferred from what they do, not boilerplate).
- "hook": one specific, current observation to open outreach with (a product, claim, page, or recent news item). No flattery.
- "email": a cold email that reads like one human wrote it to another, not a template. Subject under 50 characters, specific and curiosity-driven, lowercase is fine, never clickbait. Body 50 to 90 words MAX. Open with a specific, real observation about THEM (the hook), not about yourself. Give one concrete reason it is relevant to them right now. End with a low-friction question, not a hard sell (for example "worth a quick look?", "want me to send a 2-line idea?", "open to a short chat?"). Use contractions and plain words, warm and confident. No "I hope this finds you well", no feature dumps, no fake compliments. It should feel effortless and personal.
- "linkedin": a connection note under 280 characters. Casual and human, reference one specific real thing about them, no pitch. Like something a peer would actually send.
- If a specific decision-maker is named in LEADERSHIP and is clearly the right person, you may address the email and note to them by first name. Otherwise keep it role-neutral (never "Hi team").
- Never use em dashes or en dashes. Use periods or commas.
- Ban AI-slop and filler: no "I hope this finds you well", "in today's fast-paced world", "delve", "leverage", "synergy", "game-changer", "unlock", "elevate", "seamless", "robust", "cutting-edge", "revolutionize", "in the realm of", "navigate the landscape", or the "it's not just X, it's Y" construction.
- Write like a sharp human operator, not a marketing bot.`;
}

export async function generateReport(
  site: SiteResearch,
  offer: string,
  signals: Signals
): Promise<Brief> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error(
      "GEMINI_API_KEY is not set. Add it to .env.local (free key at aistudio.google.com/apikey)."
    );
  }
  const ai = new GoogleGenAI({ apiKey });
  const prompt = buildPrompt(site, offer, signals);
  const config = {
    responseMimeType: "application/json",
    responseSchema,
    temperature: 0.6,
  };
  // Primary model, then a lighter fallback if the primary is overloaded.
  const models = [process.env.GEMINI_MODEL || "gemini-2.5-flash", "gemini-2.5-flash-lite"];
  const fix = (s: string) => s.replace(/\s*[—–]\s*/g, ", ");

  let lastErr: unknown;
  for (const model of models) {
    for (let attempt = 0; attempt < 2; attempt++) {
      try {
        const response = await ai.models.generateContent({ model, contents: prompt, config });
        const text = response.text;
        if (!text) throw new Error("empty response");
        const brief = JSON.parse(text) as Brief;
        return {
          fitScore: Math.max(0, Math.min(100, Math.round(Number(brief.fitScore) || 0))),
          fitReason: fix(brief.fitReason),
          executiveSummary: fix(brief.executiveSummary),
          strategicRead: fix(brief.strategicRead),
          fit: fix(brief.fit),
          pains: brief.pains.map(fix),
          hook: fix(brief.hook),
          email: { subject: fix(brief.email.subject), body: fix(brief.email.body) },
          linkedin: fix(brief.linkedin),
        };
      } catch (e) {
        lastErr = e;
        const msg = String((e as Error)?.message || e);
        const transient =
          /503|UNAVAILABLE|overloaded|high demand|429|RESOURCE_EXHAUSTED|fetch failed|ECONN|ETIMEDOUT/i.test(
            msg
          );
        if (!transient) throw e;
        await new Promise((r) => setTimeout(r, 1200 * (attempt + 1)));
      }
    }
  }
  console.error("generateReport failed:", lastErr);
  throw new Error(
    "The AI model is busy right now. Please try again in a few seconds."
  );
}
