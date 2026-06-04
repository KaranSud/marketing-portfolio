import { GoogleGenAI, Type } from "@google/genai";
import type { SiteResearch } from "./research";
import type { Signals } from "./sources";

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
