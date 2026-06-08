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

export type SequenceStep = {
  day: number;
  channel: "email" | "linkedin" | "call";
  label: string;
  subject?: string;
  body: string;
};

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
  sequence: SequenceStep[];
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
    sequence: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          day: { type: Type.NUMBER },
          channel: { type: Type.STRING },
          label: { type: Type.STRING },
          subject: { type: Type.STRING },
          body: { type: Type.STRING },
        },
        required: ["day", "channel", "label", "body"],
      },
    },
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
    "sequence",
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

function buildPrompt(
  site: SiteResearch,
  offer: string,
  signals: Signals,
  prefs?: string
): string {
  const prefsBlock = prefs
    ? `\nUSER STYLE PREFERENCES (learned from this user's edits and feedback; follow them closely in all outreach copy):\n"""\n${prefs}\n"""\n`
    : "";
  return `You are a senior GTM strategist writing a concise, McKinsey-style account brief for a sales/marketing team. Be sharp, specific, and grounded.${prefsBlock}

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
- Never fabricate the SELLER's own results, metrics, client names, or case studies. If a specific proof point or number about the seller is not stated in the offer above, write it as a short bracketed placeholder for the user to fill in, for example "[X% lift]" or "[a similar brand we helped]". Do not invent a figure. This applies everywhere, especially any proof or social-proof line.
- "executiveSummary": 2 to 3 sentences. The "so what" for a seller: who they are, what they are clearly focused on right now, and whether they are a strong fit. Reference a real signal (a fact or a recent headline) if available.
- "strategicRead": 3 to 4 sentences on their positioning and likely current priorities, inferred from their site and signals. Concrete, not generic.
- "fitScore": an honest integer from 0 to 100 for how strong a fit this account is for the seller's offer right now. Be discerning and use the full range: 80+ only for a clear, timely fit, 40 to 70 for plausible, under 40 for weak. Judge from the real signals, not optimism.
- "fitReason": one short sentence (under 18 words) explaining the score.
- "fit": 2 to 3 sentences on where the seller's offer fits their world and the single best angle to lead with.
- "pains": 3 to 4 specific, plausible pain points the offer could address (inferred from what they do, not boilerplate).
- "hook": one specific, current observation to open outreach with (a product, claim, page, or recent news item). No flattery.
- "email": a cold email that reads like one human wrote it to another, not a template. Subject under 50 characters, specific and curiosity-driven, lowercase is fine, never clickbait. Body 50 to 90 words MAX. Open with a specific, real observation about THEM (the hook), not about yourself. Give one concrete reason it is relevant to them right now. End with a low-friction question, not a hard sell (for example "worth a quick look?", "want me to send a 2-line idea?", "open to a short chat?"). Use contractions and plain words, warm and confident. No "I hope this finds you well", no feature dumps, no fake compliments. It should feel effortless and personal.
- "linkedin": a connection note under 280 characters. Casual and human, reference one specific real thing about them, no pitch. Like something a peer would actually send.
- "sequence": a follow-up cadence of exactly 5 touches that CONTINUE after the first email and the LinkedIn note above (so never repeat the opener). Each touch must take a genuinely different angle and feel like a real human wrote it. Use these touches in this order:
  1. day 3, channel "email", label "Bump": a 2 to 3 sentence nudge on the original thread, light and friendly, one fresh detail.
  2. day 5, channel "linkedin", label "LinkedIn DM": a short direct message to send after they connect, casual, references something real, one soft question.
  3. day 7, channel "email", label "Proof": a short email that offers relevant proof framed for THEIR kind of business, then a low-friction CTA. Do not invent a statistic, client name, or case study for the seller. If the offer does not contain a real result, use a bracketed placeholder like "[a recent result you can drop in]" so the user fills it in.
  4. day 12, channel "email", label "Breakup": a friendly, no-pressure breakup email that leaves the door open.
  5. day 1, channel "call", label "Cold-call opener": a 2 to 3 sentence cold-call or voicemail script (about 15 seconds spoken), natural and confident, opening with a real reason for the call.
  For every email touch include a "subject" under 50 characters; for linkedin and call touches omit the subject. Bodies: emails 40 to 70 words, the DM and call under 45 words. Same human tone and grounding rules as above, category-aware, no pressure, no AI-slop, no em dashes.
- If a specific decision-maker is named in LEADERSHIP and is clearly the right person, you may address the email and note to them by first name. Otherwise keep it role-neutral (never "Hi team").
- Never use em dashes or en dashes. Use periods or commas.
- Ban AI-slop and filler: no "I hope this finds you well", "in today's fast-paced world", "delve", "leverage", "synergy", "game-changer", "unlock", "elevate", "seamless", "robust", "cutting-edge", "revolutionize", "in the realm of", "navigate the landscape", or the "it's not just X, it's Y" construction.
- Write like a sharp human operator, not a marketing bot.`;
}

const fix = (s: string) => (s || "").replace(/\s*[—–]\s*/g, ", ");

// One Gemini call with the primary model and a lighter fallback, retrying on
// transient overload. Shared by every generator so behavior stays consistent.
async function callGemini<T>(
  prompt: string,
  schema: object,
  temperature = 0.6
): Promise<T> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error(
      "GEMINI_API_KEY is not set. Add it to .env.local (free key at aistudio.google.com/apikey)."
    );
  }
  const ai = new GoogleGenAI({ apiKey });
  const config = {
    responseMimeType: "application/json",
    responseSchema: schema,
    temperature,
  };
  const models = [
    process.env.GEMINI_MODEL || "gemini-2.5-flash",
    "gemini-2.5-flash-lite",
  ];
  let lastErr: unknown;
  for (const model of models) {
    for (let attempt = 0; attempt < 2; attempt++) {
      try {
        const response = await ai.models.generateContent({
          model,
          contents: prompt,
          config,
        });
        const text = response.text;
        if (!text) throw new Error("empty response");
        return JSON.parse(text) as T;
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
  console.error("Gemini call failed:", lastErr);
  throw new Error(
    "The AI model is busy right now. Please try again in a few seconds."
  );
}

export async function generateReport(
  site: SiteResearch,
  offer: string,
  signals: Signals,
  prefs?: string
): Promise<Brief> {
  const prompt = buildPrompt(site, offer, signals, prefs);
  const brief = await callGemini<Brief>(prompt, responseSchema, 0.6);
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
    sequence: Array.isArray(brief.sequence)
      ? brief.sequence.map((s) => ({
          day: Math.max(0, Math.round(Number(s.day) || 0)),
          channel: (["email", "linkedin", "call"].includes(s.channel)
            ? s.channel
            : "email") as SequenceStep["channel"],
          label: fix(s.label || ""),
          subject: s.subject ? fix(s.subject) : undefined,
          body: fix(s.body || ""),
        }))
      : [],
  };
}

/* ── ICP builder: from a brand/offer with no list, produce a target profile,
   the industries to search, and a practical plan to source leads. ── */

export type Icp = {
  summary: string;
  industries: string[];
  companyProfile: string;
  regions: string[];
  buyerTitles: string[];
  triggers: string[];
  searchStrings: string[];
  sourcingPlaybook: { channel: string; how: string }[];
};

const icpSchema = {
  type: Type.OBJECT,
  properties: {
    summary: { type: Type.STRING },
    industries: { type: Type.ARRAY, items: { type: Type.STRING } },
    companyProfile: { type: Type.STRING },
    regions: { type: Type.ARRAY, items: { type: Type.STRING } },
    buyerTitles: { type: Type.ARRAY, items: { type: Type.STRING } },
    triggers: { type: Type.ARRAY, items: { type: Type.STRING } },
    searchStrings: { type: Type.ARRAY, items: { type: Type.STRING } },
    sourcingPlaybook: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          channel: { type: Type.STRING },
          how: { type: Type.STRING },
        },
        required: ["channel", "how"],
      },
    },
  },
  required: [
    "summary",
    "industries",
    "companyProfile",
    "regions",
    "buyerTitles",
    "triggers",
    "searchStrings",
    "sourcingPlaybook",
  ],
};

function buildIcpPrompt(brand: string, offer: string): string {
  return `You are a senior GTM strategist helping a seller who has NO prospect list yet. From the brand and offer below, define a sharp Ideal Customer Profile and a practical plan to build a target list from scratch.

THE BRAND (who is selling): ${brand || "(not specified, infer from the offer)"}
THE OFFER (what they sell):
"""
${offer}
"""

Return JSON. Rules:
- "summary": 2 sentences naming exactly who should buy this and why now.
- "industries": 3 to 5 CONCRETE industry terms that map to well-known categories (for example "artificial intelligence", "financial technology", "e-commerce", "restaurants", "legal services", "software"). These will be used to look up real companies, so use standard industry names, not clever labels.
- "companyProfile": one line on the size, stage, and shape of the right accounts (for example "Seed to Series B B2B SaaS, 20 to 200 staff, US or EU").
- "regions": the geographies to focus on.
- "buyerTitles": 3 to 6 real job titles of the person who would buy or champion this.
- "triggers": 3 to 5 concrete buying signals to watch for (hiring a role, a funding round, a product launch, a new market, a tech change). Real and observable.
- "searchStrings": 4 to 6 ready-to-paste search queries to find these accounts and people (for example Google dorks and LinkedIn search URLs). Make them copy-paste usable.
- "sourcingPlaybook": 4 to 6 channels to source leads beyond automation, each a {channel, how}: where these buyers gather and how to extract a list (directories like Crunchbase, G2, Product Hunt, industry association lists; communities like specific subreddits, Slack or Discord groups; events and conferences; job boards as intent signals; partners and integrations). Be specific and actionable, name real places.
- Be concrete and grounded in the offer. Do not invent specific company names. No em dashes. No AI-slop words (delve, leverage, synergy, unlock, elevate, seamless, robust, game-changer, cutting-edge, revolutionize).`;
}

export async function buildIcp(brand: string, offer: string): Promise<Icp> {
  const icp = await callGemini<Icp>(buildIcpPrompt(brand, offer), icpSchema, 0.7);
  return {
    summary: fix(icp.summary),
    industries: (icp.industries || []).map((s) => fix(s)).slice(0, 5),
    companyProfile: fix(icp.companyProfile),
    regions: (icp.regions || []).map((s) => fix(s)).slice(0, 5),
    buyerTitles: (icp.buyerTitles || []).map((s) => fix(s)).slice(0, 6),
    triggers: (icp.triggers || []).map((s) => fix(s)).slice(0, 5),
    searchStrings: (icp.searchStrings || []).map((s) => fix(s)).slice(0, 6),
    sourcingPlaybook: (icp.sourcingPlaybook || [])
      .map((p) => ({ channel: fix(p.channel), how: fix(p.how) }))
      .slice(0, 6),
  };
}
