"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Reveal from "@/components/Reveal";

type SequenceStep = {
  day: number;
  channel: "email" | "linkedin" | "call";
  label: string;
  subject?: string;
  body: string;
};
type Brief = {
  fitScore: number;
  fitReason: string;
  executiveSummary: string;
  strategicRead: string;
  fit: string;
  pains: string[];
  hook: string;
  email: { subject: string; body: string };
  linkedin: string;
  sequence?: SequenceStep[];
};

function fitTier(score: number): { label: string; cls: string } {
  if (score >= 70) return { label: "Strong", cls: "strong" };
  if (score >= 40) return { label: "Moderate", cls: "moderate" };
  return { label: "Weak", cls: "weak" };
}

function channelLabel(c: SequenceStep["channel"]): string {
  return c === "email" ? "Email" : c === "linkedin" ? "LinkedIn" : "Call";
}

type Snapshot = {
  description?: string;
  founded?: string;
  employees?: string;
  industry?: string;
  hq?: string;
  revenue?: string;
  wikipediaUrl?: string;
};
type NewsItem = { title: string; url: string; date?: string; source?: string };
type HN = {
  stories: number;
  points: number;
  top?: { title: string; url: string; points: number };
  searchUrl: string;
};
type Tech = { name: string; category: string };
type SourceLink = { label: string; url: string };
type Contacts = {
  emails: string[];
  linkedin?: string;
  twitter?: string;
  telegram?: string;
  teamLinkedins?: string[];
  contactUrl?: string;
  linkedinPeopleSearch: string;
  emailPattern?: string;
  likelyEmails?: { name: string; email: string }[];
};
type Profiles = {
  leaders?: { name: string; role: string; linkedin?: string }[];
  linkedinCompany?: string;
  twitter?: string;
  crunchbase?: string;
};
type GitHubData = {
  org: string;
  repos: number;
  stars: number;
  topLanguage?: string;
  url: string;
};
type Classification = {
  category: string;
  label: string;
  confidence: "high" | "medium" | "low";
  reason: string;
};
type SiteFacts = {
  schemaTypes: string[];
  name?: string;
  description?: string;
  slogan?: string;
  founded?: string;
  employees?: string;
  address?: string;
  locality?: string;
  region?: string;
  country?: string;
  phone?: string;
  email?: string;
  openingHours?: string[];
  priceRange?: string;
  servesCuisine?: string[];
  areaServed?: string[];
  rating?: { value: number; count?: number; best?: number };
  sameAs: string[];
  cmsHints: string[];
};
type SiteScope = {
  urls: number;
  products: number;
  locations: number;
  articles: number;
};
type Hiring = { hiring: boolean; openRoles?: number; source: string };
type Icp = {
  summary: string;
  industries: string[];
  companyProfile: string;
  regions: string[];
  buyerTitles: string[];
  triggers: string[];
  searchStrings: string[];
  sourcingPlaybook: { channel: string; how: string }[];
};
type DiscoveredCompany = {
  name: string;
  domain: string;
  country?: string;
  qid?: string;
};

const FEEDBACK_CHIPS: { label: string; rule: string }[] = [
  { label: "Shorter", rule: "Keep emails noticeably shorter and tighter." },
  { label: "More casual", rule: "Use a more casual, conversational tone." },
  { label: "More formal", rule: "Use a more professional, formal tone." },
  { label: "Less salesy", rule: "Sound less salesy, more like a peer reaching out." },
  { label: "More specific", rule: "Be more specific and concrete, fewer generic lines." },
  { label: "Punchier", rule: "Make the opening line punchier and more direct." },
];

type Result = {
  domain: string;
  status: "pending" | "done" | "error";
  title?: string;
  name?: string;
  siteReachable?: boolean;
  snapshot?: Snapshot | null;
  profiles?: Profiles | null;
  facts?: SiteFacts | null;
  scope?: SiteScope | null;
  hiring?: Hiring | null;
  classification?: Classification | null;
  news?: NewsItem[];
  hn?: HN | null;
  github?: GitHubData | null;
  tech?: Tech[];
  contacts?: Contacts;
  sources?: SourceLink[];
  brief?: Brief;
  error?: string;
};

const PORTFOLIO = "https://karan-sud-portfolio.vercel.app";
const EASE = [0.16, 1, 0.3, 1] as const;

// Each example pairs an offer with companies that are a genuine ICP fit for it,
// so the demo always shows relevant, coherent outreach. Cycles on each click.
const EXAMPLES: { offer: string; domains: string }[] = [
  {
    offer:
      "A done-for-you content and community growth engine for B2B SaaS and AI companies: brand voice, daily content, founder personal branding, and growth reporting.",
    domains: "notion.so\nvercel.com\nlinear.app",
  },
  {
    offer:
      "Local marketing and reputation management for restaurants and hospitality: reviews, local SEO, social, and online-ordering growth.",
    domains: "sweetgreen.com\nshakeshack.com\neataly.com",
  },
  {
    offer:
      "Retention, email, and paid growth for e-commerce and D2C brands: higher AOV, repeat purchase, and profitable acquisition.",
    domains: "allbirds.com\nwarbyparker.com\nglossier.com",
  },
  {
    offer:
      "Client acquisition and thought-leadership marketing for professional-services firms: law, accounting, and consulting.",
    domains: "deloitte.com\nperkinscoie.com\nmckinsey.com",
  },
  {
    offer:
      "Patient acquisition and reputation marketing for healthcare and dental groups: local search, reviews, and online booking.",
    domains: "aspendental.com\nonemedical.com\nteladoc.com",
  },
  {
    offer:
      "Membership growth and retention for gyms and fitness studios: paid social, referrals, and win-back campaigns.",
    domains: "planetfitness.com\norangetheory.com\nequinox.com",
  },
  {
    offer:
      "Developer marketing and technical content for devtools and infrastructure companies: docs-led growth and community.",
    domains: "gitlab.com\ndatadog.com\nmongodb.com",
  },
  {
    offer:
      "Performance and lifecycle marketing for fintech and payments companies: paid acquisition, onboarding, and activation.",
    domains: "stripe.com\nbrex.com\nramp.com",
  },
];

const STATS = [
  { val: "10", label: "Companies per run" },
  { val: "3", label: "Assets each: brief, email, opener" },
  { val: "$0", label: "No CRM, no enrichment fees" },
];

const STEPS = [
  {
    n: "01",
    t: "Add targets and your offer",
    d: "Paste a few prospect domains and a line on what you sell.",
  },
  {
    n: "02",
    t: "The agent reads their site",
    d: "It pulls their homepage, about, and pricing to understand them.",
  },
  {
    n: "03",
    t: "Get briefs and outreach",
    d: "An account brief plus a tailored email and LinkedIn opener, ready to send.",
  },
];

function up(delay: number) {
  return {
    initial: { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7, ease: EASE, delay },
  };
}

function Copy({ text }: { text: string }) {
  const [done, setDone] = useState(false);
  return (
    <button
      className="copy"
      onClick={async () => {
        await navigator.clipboard.writeText(text);
        setDone(true);
        setTimeout(() => setDone(false), 1500);
      }}
    >
      {done ? "copied" : "copy"}
    </button>
  );
}

const LOADING_MSGS = [
  "Reading their homepage…",
  "Parsing their structured data…",
  "Working out what kind of business this is…",
  "Pulling recent news…",
  "Sizing up the locations and catalog…",
  "Checking for hiring signals…",
  "Sizing up the fit…",
  "Writing a human opener…",
];

function Skeleton({ domain }: { domain: string }) {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(
      () => setI((v) => (v + 1) % LOADING_MSGS.length),
      1500
    );
    return () => clearInterval(t);
  }, []);
  return (
    <div className="result">
      <div className="sk-head">
        <span className="result-domain">{domain}</span>
      </div>
      <div className="sk-body">
        <span className="sk-status">
          <span className="spinner" /> {LOADING_MSGS[i]}
        </span>
        <div className="sk" style={{ width: "90%" }} />
        <div className="sk" style={{ width: "78%" }} />
        <div className="sk" style={{ width: "84%" }} />
      </div>
    </div>
  );
}

export default function Home() {
  const [offer, setOffer] = useState("");
  const [domainsText, setDomainsText] = useState("");
  const [results, setResults] = useState<Result[]>([]);
  const [running, setRunning] = useState(false);
  const [exIdx, setExIdx] = useState(-1);

  // Cold-start discovery
  const [mode, setMode] = useState<"research" | "discover">("research");
  const [brand, setBrand] = useState("");
  const [country, setCountry] = useState("");
  const [icp, setIcp] = useState<Icp | null>(null);
  const [discovered, setDiscovered] = useState<DiscoveredCompany[]>([]);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [discovering, setDiscovering] = useState(false);
  const [discoverError, setDiscoverError] = useState("");

  // Self-improving: writing preferences learned from feedback, persisted locally
  const [prefs, setPrefs] = useState("");
  const [prefsOpen, setPrefsOpen] = useState(false);
  useEffect(() => {
    try {
      setPrefs(localStorage.getItem("ar_prefs") || "");
    } catch {}
  }, []);
  function savePrefs(v: string) {
    setPrefs(v);
    try {
      localStorage.setItem("ar_prefs", v);
    } catch {}
  }
  function addFeedback(rule: string) {
    const lines = prefs
      .split("\n")
      .map((s) => s.trim())
      .filter(Boolean);
    if (lines.includes(rule)) return;
    savePrefs([...lines, rule].join("\n"));
  }

  const domains = domainsText
    .split(/[\n,]/)
    .map((d) => d.trim())
    .filter(Boolean);

  async function runDiscover() {
    if (!offer.trim() || discovering) return;
    setDiscovering(true);
    setDiscoverError("");
    setIcp(null);
    setDiscovered([]);
    setSelected(new Set());
    try {
      const res = await fetch("/api/discover", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ brand, offer, country }),
      });
      const data = await res.json();
      if (!res.ok) {
        setDiscoverError(data.error || "Discovery failed.");
      } else {
        setIcp(data.icp);
        setDiscovered(data.companies || []);
        setSelected(
          new Set(
            (data.companies || [])
              .slice(0, 10)
              .map((c: DiscoveredCompany) => c.domain)
          )
        );
      }
    } catch {
      setDiscoverError("Network error.");
    }
    setDiscovering(false);
  }
  function toggleSelect(domain: string) {
    setSelected((prev) => {
      const n = new Set(prev);
      if (n.has(domain)) n.delete(domain);
      else n.add(domain);
      return n;
    });
  }
  function addSelectedToResearch() {
    const picks = discovered
      .filter((c) => selected.has(c.domain))
      .map((c) => c.domain);
    if (!picks.length) return;
    setDomainsText(picks.join("\n"));
    setMode("research");
  }

  const doneCount = results.filter((r) => r.status === "done").length;
  const rankRows = results
    .filter((r) => r.status === "done" && r.brief)
    .sort((a, b) => (b.brief!.fitScore || 0) - (a.brief!.fitScore || 0));

  async function run() {
    if (!offer.trim() || domains.length === 0 || running) return;
    setRunning(true);
    const unique = Array.from(new Set(domains)).slice(0, 10);
    setResults(unique.map((d) => ({ domain: d, status: "pending" })));

    for (let i = 0; i < unique.length; i++) {
      const domain = unique[i];
      try {
        const res = await fetch("/api/research", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ domain, offer, prefs }),
        });
        const data = await res.json();
        setResults((prev) =>
          prev.map((r, idx) =>
            idx === i
              ? res.ok
                ? {
                    domain,
                    status: "done",
                    title: data.title,
                    name: data.name,
                    siteReachable: data.siteReachable,
                    snapshot: data.snapshot,
                    profiles: data.profiles,
                    facts: data.facts,
                    scope: data.scope,
                    hiring: data.hiring,
                    classification: data.classification,
                    news: data.news,
                    hn: data.hn,
                    github: data.github,
                    tech: data.tech,
                    contacts: data.contacts,
                    sources: data.sources,
                    brief: data.brief,
                  }
                : { domain, status: "error", error: data.error }
              : r
          )
        );
      } catch {
        setResults((prev) =>
          prev.map((r, idx) =>
            idx === i ? { domain, status: "error", error: "Network error." } : r
          )
        );
      }
    }
    setRunning(false);
  }

  function applyExample(n: number) {
    setExIdx(n);
    setOffer(EXAMPLES[n].offer);
    setDomainsText(EXAMPLES[n].domains);
  }

  function loadExample() {
    // A fresh random example each click, never the same one twice in a row.
    let n = Math.floor(Math.random() * EXAMPLES.length);
    if (EXAMPLES.length > 1 && n === exIdx) n = (n + 1) % EXAMPLES.length;
    applyExample(n);
  }

  // Prefill a random example on every visit so the landing page always shows
  // a different, relevant scenario.
  useEffect(() => {
    applyExample(Math.floor(Math.random() * EXAMPLES.length));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function exportCsv() {
    const rows = results.filter((r) => r.status === "done" && r.brief);
    if (!rows.length) return;
    const esc = (s: unknown) => `"${String(s ?? "").replace(/"/g, '""')}"`;
    const header = [
      "Domain",
      "Name",
      "Business Type",
      "Fit Score",
      "Fit Reason",
      "Founded",
      "Employees",
      "Location",
      "Rating",
      "Company LinkedIn",
      "Emails",
      "Decision Makers",
      "Likely Emails",
      "Email Subject",
      "Email Body",
      "LinkedIn Opener",
      "Follow-up Sequence",
    ];
    const lines = rows.map((r) => {
      const b = r.brief!;
      const loc =
        r.facts?.address ||
        [r.facts?.locality, r.facts?.region, r.facts?.country]
          .filter(Boolean)
          .join(", ") ||
        r.snapshot?.hq ||
        "";
      const rating = r.facts?.rating
        ? `${r.facts.rating.value}${r.facts.rating.best ? `/${r.facts.rating.best}` : ""}${
            r.facts.rating.count ? ` (${r.facts.rating.count})` : ""
          }`
        : "";
      return [
        r.domain,
        r.name || "",
        r.classification?.label || "",
        b.fitScore,
        b.fitReason,
        r.snapshot?.founded || r.facts?.founded || "",
        r.snapshot?.employees || r.facts?.employees || "",
        loc,
        rating,
        r.profiles?.linkedinCompany || r.contacts?.linkedin || "",
        (r.contacts?.emails || []).join("; "),
        (r.profiles?.leaders || [])
          .map((l) => `${l.name} (${l.role})`)
          .join("; "),
        (r.contacts?.likelyEmails || [])
          .map((le) => `${le.name} <${le.email}>`)
          .join("; "),
        b.email.subject,
        b.email.body,
        b.linkedin,
        (b.sequence || [])
          .slice()
          .sort((x, y) => x.day - y.day)
          .map(
            (s) =>
              `Day ${s.day} [${channelLabel(s.channel)} / ${s.label}]: ${
                s.subject ? s.subject + " — " : ""
              }${s.body}`
          )
          .join("\n\n"),
      ]
        .map(esc)
        .join(",");
    });
    const csv = [header.map(esc).join(","), ...lines].join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "account-research.csv";
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <>
      <header className="site-header">
        <div className="site-header-inner">
          <a className="brand" href={PORTFOLIO}>
            Karan Sud <span className="labs">/ Labs</span>
          </a>
          <div className="header-actions">
            <a className="back-link" href={PORTFOLIO}>
              Back to portfolio ↗
            </a>
            <a
              className="btn btn-ghost"
              href="#workspace"
              style={{ padding: "9px 18px", fontSize: 13.5 }}
            >
              Try it
            </a>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="wrap hero">
        <motion.span className="eyebrow" {...up(0)}>
          GTM Engineering Lab
        </motion.span>
        <motion.h1 {...up(0.08)}>
          Account research and <em>outreach</em>, on autopilot
        </motion.h1>
        <motion.p className="lede" {...up(0.16)}>
          Drop in any company&apos;s domain, a SaaS startup, a restaurant, a
          Shopify brand, or a law firm. An AI agent reads their public site,
          works out what kind of business they are, builds a sourced account
          brief, and writes outreach tailored to your offer. No CRM, no
          enrichment bills, no manual digging.
        </motion.p>
        <motion.div className="hero-cta" {...up(0.24)}>
          <a className="btn btn-primary" href="#workspace">
            Start researching
          </a>
          <a className="btn btn-ghost" href={PORTFOLIO}>
            See who built it
          </a>
        </motion.div>
        <motion.div className="stats" {...up(0.34)}>
          {STATS.map((s) => (
            <div className="stat" key={s.label}>
              <div className="stat-val">{s.val}</div>
              <div className="stat-label">{s.label}</div>
            </div>
          ))}
        </motion.div>
      </section>

      {/* How it works */}
      <section className="wrap sec">
        <div className="sec-head">
          <Reveal>
            <div className="sec-eyebrow">How it works</div>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="sec-title">
              From a domain to drafted outreach in one pass
            </h2>
          </Reveal>
        </div>
        <div className="steps">
          {STEPS.map((s, i) => (
            <Reveal className="step" key={s.n} delay={i * 0.08}>
              <div className="step-num">{s.n}</div>
              <div className="step-title">{s.t}</div>
              <div className="step-desc">{s.d}</div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Workspace */}
      <section className="wrap sec workspace" id="workspace">
        <div className="sec-head">
          <Reveal>
            <div className="sec-eyebrow">Try it live</div>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="sec-title">See it on real prospects</h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="sec-sub">
              Free, on the Gemini tier. Add your offer and up to ten domains,
              then generate.
            </p>
          </Reveal>
        </div>

        <div className="workspace-grid">
          <div className="controls">
            <div className="mode-tabs">
              <button
                className={mode === "research" ? "active" : ""}
                onClick={() => setMode("research")}
                type="button"
              >
                Research a list
              </button>
              <button
                className={mode === "discover" ? "active" : ""}
                onClick={() => setMode("discover")}
                type="button"
              >
                Find leads (no list)
              </button>
            </div>

            <div className="field">
              <label>
                Your offer
                <span className="hint">what you sell</span>
              </label>
              <textarea
                rows={4}
                value={offer}
                placeholder="A done-for-you content and community growth engine for B2B SaaS and AI startups."
                onChange={(e) => setOffer(e.target.value)}
              />
            </div>

            {mode === "research" ? (
              <>
                <div className="field">
                  <label>
                    Target companies
                    <span className="hint">one domain per line</span>
                  </label>
                  <textarea
                    rows={5}
                    value={domainsText}
                    placeholder={"linear.app\nvercel.com\nclay.com"}
                    onChange={(e) => setDomainsText(e.target.value)}
                  />
                </div>
                <button
                  className="btn btn-primary"
                  onClick={run}
                  disabled={running || !offer.trim() || domains.length === 0}
                >
                  {running
                    ? "Researching…"
                    : `Generate ${domains.length || ""} brief${
                        domains.length === 1 ? "" : "s"
                      }`.trim()}
                </button>
                <div className="controls-foot">
                  <span>
                    {domains.length}{" "}
                    {domains.length === 1 ? "company" : "companies"}
                    {domains.length > 10 ? " (first 10)" : ""}
                  </span>
                  <button
                    className="linkbtn"
                    onClick={loadExample}
                    type="button"
                  >
                    Load example
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="field">
                  <label>
                    Your brand
                    <span className="hint">optional, sharpens the ICP</span>
                  </label>
                  <input
                    className="text-input"
                    value={brand}
                    placeholder="Helio AI, an AI support agent for SaaS"
                    onChange={(e) => setBrand(e.target.value)}
                  />
                </div>
                <div className="field">
                  <label>
                    Focus region
                    <span className="hint">optional</span>
                  </label>
                  <input
                    className="text-input"
                    value={country}
                    placeholder="United States"
                    onChange={(e) => setCountry(e.target.value)}
                  />
                </div>
                <button
                  className="btn btn-primary"
                  onClick={runDiscover}
                  disabled={discovering || !offer.trim()}
                >
                  {discovering
                    ? "Finding companies…"
                    : "Build ICP and find companies"}
                </button>
                <p className="notice">
                  Builds your ICP and finds real companies from open data.
                  Coverage is best for established companies.
                </p>
              </>
            )}

            <div className="prefs">
              <button
                className="prefs-toggle"
                onClick={() => setPrefsOpen((o) => !o)}
                type="button"
              >
                <span>
                  Writing style memory
                  {prefs.split("\n").filter(Boolean).length > 0
                    ? ` (${prefs.split("\n").filter(Boolean).length})`
                    : ""}
                </span>
                <span>{prefsOpen ? "▾" : "▸"}</span>
              </button>
              {prefsOpen && (
                <div className="prefs-body">
                  <p className="prefs-note">
                    The writer learns from your feedback below the drafts. Edit
                    or clear it anytime.
                  </p>
                  <textarea
                    rows={3}
                    value={prefs}
                    placeholder="e.g. Keep emails short. No questions in the first line."
                    onChange={(e) => savePrefs(e.target.value)}
                  />
                  {prefs && (
                    <button
                      className="linkbtn"
                      onClick={() => savePrefs("")}
                      type="button"
                    >
                      Clear memory
                    </button>
                  )}
                </div>
              )}
            </div>

            <p className="notice">
              Outreach is AI-drafted from public data, so always review before
              sending.
            </p>
          </div>

          <div className="results">
            {mode === "discover" ? (
              <div className="discover-view">
                {discovering ? (
                  <div className="empty">
                    <div className="empty-icon">
                      <span className="spinner" />
                    </div>
                    <h3>Building your ICP and finding companies…</h3>
                    <p>
                      Defining the target profile, then pulling real companies
                      from open data.
                    </p>
                  </div>
                ) : discoverError ? (
                  <div className="result error">
                    <div className="err-msg">{discoverError}</div>
                  </div>
                ) : icp ? (
                  <>
                    <div className="block">
                      <div className="block-label">Ideal customer profile</div>
                      <p className="report-lead">{icp.summary}</p>
                      <div className="profile-meta">
                        <div className="profile-row">
                          <span>Profile</span> {icp.companyProfile}
                        </div>
                        {icp.regions.length > 0 && (
                          <div className="profile-row">
                            <span>Regions</span> {icp.regions.join(", ")}
                          </div>
                        )}
                        <div className="profile-row">
                          <span>Industries</span> {icp.industries.join(", ")}
                        </div>
                      </div>
                      <div className="icp-cols">
                        <div>
                          <div className="icp-h">Who to reach</div>
                          <ul className="icp-list">
                            {icp.buyerTitles.map((t) => (
                              <li key={t}>{t}</li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <div className="icp-h">Buying triggers</div>
                          <ul className="icp-list">
                            {icp.triggers.map((t) => (
                              <li key={t}>{t}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="block">
                      <div className="block-label">Where to source leads</div>
                      <div className="playbook">
                        {icp.sourcingPlaybook.map((p, i) => (
                          <div className="play" key={i}>
                            <div className="play-channel">{p.channel}</div>
                            <div className="play-how">{p.how}</div>
                          </div>
                        ))}
                      </div>
                      {icp.searchStrings.length > 0 && (
                        <div className="searchstrings">
                          <div className="icp-h">Ready-to-paste searches</div>
                          {icp.searchStrings.map((s, i) => (
                            <div className="searchstring" key={i}>
                              <code>{s}</code>
                              <Copy text={s} />
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    <div className="block">
                      <div className="block-label">
                        Companies found{" "}
                        <span className="muted">({discovered.length})</span>
                      </div>
                      {discovered.length === 0 ? (
                        <p className="prefs-note">
                          No companies matched in open data for this ICP. Use the
                          sourcing playbook above, or switch to Research a list
                          and paste domains.
                        </p>
                      ) : (
                        <>
                          <div className="disc-list">
                            {discovered.map((c) => (
                              <label className="disc-item" key={c.domain}>
                                <input
                                  type="checkbox"
                                  checked={selected.has(c.domain)}
                                  onChange={() => toggleSelect(c.domain)}
                                />
                                <span className="disc-name">{c.name}</span>
                                <span className="disc-domain">{c.domain}</span>
                                {c.country && (
                                  <span className="disc-country">{c.country}</span>
                                )}
                              </label>
                            ))}
                          </div>
                          <button
                            className="btn btn-primary"
                            onClick={addSelectedToResearch}
                            disabled={selected.size === 0}
                          >
                            Add {selected.size} to research
                          </button>
                        </>
                      )}
                    </div>
                  </>
                ) : (
                  <div className="empty">
                    <div className="empty-icon">
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="11" cy="11" r="7" />
                        <path d="m21 21-4.3-4.3" />
                      </svg>
                    </div>
                    <h3>No list? Start here.</h3>
                    <p>
                      Describe your offer and brand, and the engine builds your
                      ICP, finds real companies, and gives you a plan to source
                      the rest.
                    </p>
                  </div>
                )}
              </div>
            ) : results.length === 0 ? (
              <div className="empty">
                <div className="empty-icon">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="11" cy="11" r="7" />
                    <path d="m21 21-4.3-4.3" />
                  </svg>
                </div>
                <h3>Your briefs will appear here</h3>
                <p>
                  Add your offer and a few target domains, then generate. Or load
                  an example to see it work end to end.
                </p>
                <button className="btn btn-ghost" onClick={loadExample} type="button">
                  Load example
                </button>
              </div>
            ) : (
              <>
                <div className="results-bar">
                  <span>Results</span>
                  <span className="results-bar-right">
                    <span>
                      {doneCount} / {results.length} done
                    </span>
                    {doneCount > 0 && (
                      <button
                        className="csv-btn"
                        onClick={exportCsv}
                        type="button"
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                          <path d="M7 10l5 5 5-5" />
                          <path d="M12 15V3" />
                        </svg>
                        Export CSV
                      </button>
                    )}
                  </span>
                </div>

                {rankRows.length >= 2 && (
                  <div className="ranking">
                    <div className="ranking-head">
                      <span className="ranking-title">Pipeline by fit</span>
                      <span className="ranking-sub">
                        Ranked by how well each account matches your offer
                      </span>
                    </div>
                    <div className="ranking-rows">
                      {rankRows.map((r) => {
                        const t = fitTier(r.brief!.fitScore);
                        return (
                          <div className="rank-row" key={r.domain}>
                            <span className="rank-domain">{r.domain}</span>
                            <div className="rank-track">
                              <div
                                className={`rank-fill ${t.cls}`}
                                style={{ width: `${Math.max(3, r.brief!.fitScore)}%` }}
                              />
                            </div>
                            <span className="rank-score">{r.brief!.fitScore}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
                {results.map((r) =>
                  r.status === "pending" ? (
                    <Skeleton key={r.domain} domain={r.domain} />
                  ) : (
                    <div
                      key={r.domain}
                      className={`result${r.status === "error" ? " error" : ""}`}
                    >
                      <div className="result-head">
                        <span className="result-domain">{r.domain}</span>
                        {r.status === "done" && r.brief ? (
                          <span className="result-head-right">
                            {r.classification && (
                              <span
                                className="cat-chip"
                                title={`${r.classification.confidence} confidence: ${r.classification.reason}`}
                              >
                                {r.classification.label}
                              </span>
                            )}
                            <span
                              className={`fit-badge ${fitTier(r.brief.fitScore).cls}`}
                              title={r.brief.fitReason}
                            >
                              <span className="fit-num">{r.brief.fitScore}</span>
                              <span className="fit-label">
                                {fitTier(r.brief.fitScore).label} fit
                              </span>
                            </span>
                          </span>
                        ) : r.title ? (
                          <span className="result-title">{r.title}</span>
                        ) : null}
                      </div>

                      {r.status === "error" && (
                        <div className="err-msg">{r.error}</div>
                      )}

                      {r.status === "done" && r.brief && (
                        <div className="result-body">
                          <div className="block">
                            <div className="block-label">Executive summary</div>
                            <p className="report-lead">
                              {r.brief.executiveSummary}
                            </p>
                            {r.siteReachable === false && (
                              <p className="site-note">
                                Their site blocked direct access, so this report
                                is built from public sources.
                              </p>
                            )}
                          </div>

                          {r.snapshot &&
                            (r.snapshot.founded ||
                              r.snapshot.employees ||
                              r.snapshot.industry ||
                              r.snapshot.hq ||
                              r.snapshot.revenue) && (
                              <div className="block">
                                <div className="block-label">
                                  Company snapshot
                                </div>
                                <div className="snap-grid">
                                  {r.snapshot.founded && (
                                    <div className="snap">
                                      <div className="snap-val">
                                        {r.snapshot.founded}
                                      </div>
                                      <div className="snap-label">Founded</div>
                                    </div>
                                  )}
                                  {r.snapshot.employees && (
                                    <div className="snap">
                                      <div className="snap-val">
                                        {r.snapshot.employees}
                                      </div>
                                      <div className="snap-label">Employees</div>
                                    </div>
                                  )}
                                  {r.snapshot.revenue && (
                                    <div className="snap">
                                      <div className="snap-val">
                                        {r.snapshot.revenue}
                                      </div>
                                      <div className="snap-label">Revenue</div>
                                    </div>
                                  )}
                                  {r.snapshot.hq && (
                                    <div className="snap">
                                      <div className="snap-val snap-text">
                                        {r.snapshot.hq}
                                      </div>
                                      <div className="snap-label">HQ</div>
                                    </div>
                                  )}
                                  {r.snapshot.industry && (
                                    <div className="snap">
                                      <div className="snap-val snap-text">
                                        {r.snapshot.industry}
                                      </div>
                                      <div className="snap-label">Industry</div>
                                    </div>
                                  )}
                                </div>
                                <div className="snap-note">
                                  Verified via{" "}
                                  <a
                                    href={r.snapshot.wikipediaUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                  >
                                    Wikipedia / Wikidata
                                  </a>
                                </div>
                              </div>
                            )}

                          {(() => {
                            const f = r.facts;
                            const sc = r.scope;
                            const h = r.hiring;
                            const hasProfile =
                              !!(
                                f &&
                                (f.address ||
                                  f.rating ||
                                  f.priceRange ||
                                  f.servesCuisine?.length ||
                                  f.openingHours?.length)
                              ) ||
                              !!(sc && (sc.products || sc.locations)) ||
                              !!h?.hiring;
                            if (!hasProfile) return null;
                            return (
                              <div className="block">
                                <div className="block-label">Business profile</div>
                                <div className="snap-grid">
                                  {f?.rating && (
                                    <div className="snap">
                                      <div className="snap-val">
                                        {f.rating.value}
                                        {f.rating.best ? `/${f.rating.best}` : ""} ★
                                      </div>
                                      <div className="snap-label">
                                        {f.rating.count
                                          ? `${f.rating.count.toLocaleString()} reviews`
                                          : "Rating"}
                                      </div>
                                    </div>
                                  )}
                                  {f?.priceRange && (
                                    <div className="snap">
                                      <div className="snap-val">{f.priceRange}</div>
                                      <div className="snap-label">Price range</div>
                                    </div>
                                  )}
                                  {!!sc?.locations && (
                                    <div className="snap">
                                      <div className="snap-val">
                                        {sc.locations.toLocaleString()}
                                      </div>
                                      <div className="snap-label">Location pages</div>
                                    </div>
                                  )}
                                  {!!sc?.products && (
                                    <div className="snap">
                                      <div className="snap-val">
                                        {sc.products.toLocaleString()}
                                      </div>
                                      <div className="snap-label">Catalog pages</div>
                                    </div>
                                  )}
                                  {h?.hiring && (
                                    <div className="snap">
                                      <div className="snap-val">
                                        {h.openRoles != null ? h.openRoles : "Yes"}
                                      </div>
                                      <div className="snap-label">
                                        {h.openRoles != null ? "Open roles" : "Hiring"}
                                      </div>
                                    </div>
                                  )}
                                </div>
                                {(f?.address ||
                                  f?.servesCuisine?.length ||
                                  f?.openingHours?.length) && (
                                  <div className="profile-meta">
                                    {f?.address && (
                                      <div className="profile-row">
                                        <span>Address</span> {f.address}
                                      </div>
                                    )}
                                    {f?.servesCuisine?.length ? (
                                      <div className="profile-row">
                                        <span>Cuisine</span>{" "}
                                        {f.servesCuisine.join(", ")}
                                      </div>
                                    ) : null}
                                    {f?.openingHours?.length ? (
                                      <div className="profile-row">
                                        <span>Hours</span>{" "}
                                        {f.openingHours.slice(0, 3).join("  ·  ")}
                                      </div>
                                    ) : null}
                                  </div>
                                )}
                                <div className="snap-note">
                                  From their own website
                                  {h?.source && h.source !== "Careers page"
                                    ? ` and ${h.source}`
                                    : ""}
                                </div>
                              </div>
                            );
                          })()}

                          <div className="block">
                            <div className="block-label">Strategic read</div>
                            <p>{r.brief.strategicRead}</p>
                          </div>

                          {(r.hn || r.github || (r.news && r.news.length > 0)) && (
                            <div className="block">
                              <div className="block-label">
                                Signals and momentum
                              </div>
                              <div className="snap-grid">
                                {r.hn && (
                                  <div className="snap">
                                    <div className="snap-val">
                                      {r.hn.stories.toLocaleString()}
                                    </div>
                                    <div className="snap-label">HN mentions</div>
                                  </div>
                                )}
                                {r.hn && (
                                  <div className="snap">
                                    <div className="snap-val">
                                      {r.hn.points.toLocaleString()}
                                    </div>
                                    <div className="snap-label">HN points</div>
                                  </div>
                                )}
                                {r.news && (
                                  <div className="snap">
                                    <div className="snap-val">
                                      {r.news.length}
                                    </div>
                                    <div className="snap-label">
                                      Recent headlines
                                    </div>
                                  </div>
                                )}
                                {r.github && (
                                  <div className="snap">
                                    <div className="snap-val">
                                      {r.github.stars.toLocaleString()}
                                    </div>
                                    <div className="snap-label">
                                      GitHub stars (top)
                                    </div>
                                  </div>
                                )}
                                {r.github && (
                                  <div className="snap">
                                    <div className="snap-val">
                                      {r.github.repos.toLocaleString()}
                                    </div>
                                    <div className="snap-label">
                                      Public repos
                                    </div>
                                  </div>
                                )}
                              </div>
                              {r.news && r.news.length > 0 && (
                                <ul className="news-list">
                                  {r.news.map((n, i) => (
                                    <li className="news-item" key={i}>
                                      <a
                                        href={n.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                      >
                                        {n.title}
                                      </a>
                                      <span className="news-meta">
                                        {[n.source, n.date]
                                          .filter(Boolean)
                                          .join(" · ")}
                                      </span>
                                    </li>
                                  ))}
                                </ul>
                              )}
                            </div>
                          )}

                          {r.tech && r.tech.length > 0 && (
                            <div className="block">
                              <div className="block-label">
                                Tech stack (detected on site)
                              </div>
                              <div className="tag-row">
                                {r.tech.map((t) => (
                                  <span className="tag" key={t.name}>
                                    {t.name}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}

                          <div className="block">
                            <div className="block-label">Likely pains</div>
                            <ul className="pains">
                              {r.brief.pains.map((p, i) => (
                                <li key={i}>{p}</li>
                              ))}
                            </ul>
                          </div>

                          <div className="block">
                            <div className="block-label">Where you fit</div>
                            <p>{r.brief.fit}</p>
                          </div>

                          <div className="block">
                            <div className="block-label">Opening hook</div>
                            <p>{r.brief.hook}</p>
                          </div>

                          {(r.contacts || r.profiles) && (
                            <div className="block">
                              <div className="block-label">
                                Leadership &amp; contacts
                              </div>
                              {r.profiles?.leaders &&
                                r.profiles.leaders.length > 0 && (
                                  <div className="leaders">
                                    {r.profiles.leaders.map((l) => (
                                      <a
                                        className="leader"
                                        key={l.name}
                                        href={
                                          l.linkedin ||
                                          `https://www.linkedin.com/search/results/people/?keywords=${encodeURIComponent(
                                            `${l.name} ${r.name || ""}`
                                          )}`
                                        }
                                        target="_blank"
                                        rel="noopener noreferrer"
                                      >
                                        <span className="leader-name">
                                          {l.name}
                                        </span>
                                        <span className="leader-role">
                                          {l.role} ·{" "}
                                          {l.linkedin
                                            ? "LinkedIn profile ↗"
                                            : "find on LinkedIn ↗"}
                                        </span>
                                      </a>
                                    ))}
                                  </div>
                                )}
                              <div className="contacts">
                                {r.contacts?.emails.map((e) => (
                                  <a
                                    className="contact-chip"
                                    href={`mailto:${e}`}
                                    key={e}
                                  >
                                    {e}
                                  </a>
                                ))}
                                {r.contacts?.teamLinkedins?.map((u) => {
                                  const slug =
                                    u.split("/in/")[1]?.replace(/\/$/, "") || "";
                                  const label = slug
                                    .replace(/[-_]+/g, " ")
                                    .replace(/\b\w/g, (c) => c.toUpperCase());
                                  return (
                                    <a
                                      className="contact-chip"
                                      href={u}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      key={u}
                                    >
                                      in/ {label || "profile"} ↗
                                    </a>
                                  );
                                })}
                                {(r.profiles?.linkedinCompany ||
                                  r.contacts?.linkedin) && (
                                  <a
                                    className="contact-chip"
                                    href={
                                      (r.profiles?.linkedinCompany ||
                                        r.contacts?.linkedin)!
                                    }
                                    target="_blank"
                                    rel="noopener noreferrer"
                                  >
                                    LinkedIn (company) ↗
                                  </a>
                                )}
                                {(r.profiles?.twitter ||
                                  r.contacts?.twitter) && (
                                  <a
                                    className="contact-chip"
                                    href={
                                      (r.profiles?.twitter ||
                                        r.contacts?.twitter)!
                                    }
                                    target="_blank"
                                    rel="noopener noreferrer"
                                  >
                                    X ↗
                                  </a>
                                )}
                                {r.contacts?.telegram && (
                                  <a
                                    className="contact-chip"
                                    href={r.contacts.telegram}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                  >
                                    Telegram ↗
                                  </a>
                                )}
                                {r.profiles?.crunchbase && (
                                  <a
                                    className="contact-chip"
                                    href={r.profiles.crunchbase}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                  >
                                    Crunchbase ↗
                                  </a>
                                )}
                                {r.contacts?.contactUrl && (
                                  <a
                                    className="contact-chip"
                                    href={r.contacts.contactUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                  >
                                    Contact page ↗
                                  </a>
                                )}
                                {r.contacts && (
                                  <a
                                    className="contact-chip ghost"
                                    href={r.contacts.linkedinPeopleSearch}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                  >
                                    Find people on LinkedIn ↗
                                  </a>
                                )}
                              </div>
                              {r.contacts?.likelyEmails &&
                                r.contacts.likelyEmails.length > 0 && (
                                  <div className="likely">
                                    <div className="likely-head">
                                      Likely emails
                                      <span className="likely-tag">
                                        inferred from {r.contacts.emailPattern},
                                        verify before sending
                                      </span>
                                    </div>
                                    <div className="contacts">
                                      {r.contacts.likelyEmails.map((le) => (
                                        <a
                                          className="contact-chip likely-chip"
                                          href={`mailto:${le.email}`}
                                          key={le.email}
                                          title={`${le.name}, pattern-inferred, unverified`}
                                        >
                                          {le.name}: {le.email}
                                        </a>
                                      ))}
                                    </div>
                                  </div>
                                )}
                            </div>
                          )}

                          <div className="drafts">
                            <div className="draft">
                              <div className="draft-head">
                                <span className="draft-kind">Cold email</span>
                                <Copy
                                  text={`Subject: ${r.brief.email.subject}\n\n${r.brief.email.body}`}
                                />
                              </div>
                              <div className="subject">
                                {r.brief.email.subject}
                              </div>
                              <pre>{r.brief.email.body}</pre>
                            </div>
                            <div className="draft">
                              <div className="draft-head">
                                <span className="draft-kind">
                                  LinkedIn opener
                                </span>
                                <Copy text={r.brief.linkedin} />
                              </div>
                              <pre>{r.brief.linkedin}</pre>
                            </div>
                          </div>

                          <div className="feedback">
                            <span className="feedback-label">
                              Teach the writer
                            </span>
                            {FEEDBACK_CHIPS.map((c) => (
                              <button
                                key={c.label}
                                className="feedback-chip"
                                type="button"
                                onClick={() => addFeedback(c.rule)}
                                title={`Adds "${c.rule}" to the writer's memory for your next runs`}
                              >
                                {c.label}
                              </button>
                            ))}
                          </div>

                          {r.brief.sequence &&
                            r.brief.sequence.length > 0 && (
                              <div className="block">
                                <div className="block-label">
                                  Follow-up cadence
                                </div>
                                <p className="cadence-sub">
                                  A ready-to-run multi-touch sequence that picks
                                  up after the first email and the connection
                                  request.
                                </p>
                                <div className="cadence">
                                  {[...r.brief.sequence]
                                    .sort((a, b) => a.day - b.day)
                                    .map((s, i) => (
                                      <div className="touch" key={i}>
                                        <div className="touch-head">
                                          <span
                                            className={`touch-channel ${s.channel}`}
                                          >
                                            {channelLabel(s.channel)}
                                          </span>
                                          <span className="touch-meta">
                                            Day {s.day} · {s.label}
                                          </span>
                                          <Copy
                                            text={
                                              s.subject
                                                ? `Subject: ${s.subject}\n\n${s.body}`
                                                : s.body
                                            }
                                          />
                                        </div>
                                        {s.subject && (
                                          <div className="subject">
                                            {s.subject}
                                          </div>
                                        )}
                                        <pre>{s.body}</pre>
                                      </div>
                                    ))}
                                </div>
                              </div>
                            )}

                          {r.sources && r.sources.length > 0 && (
                            <div className="sources">
                              <div className="block-label">Sources</div>
                              <ul>
                                {r.sources.map((s, i) => (
                                  <li key={i}>
                                    <a
                                      href={s.url}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                    >
                                      {s.label}
                                    </a>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  )
                )}
              </>
            )}
          </div>
        </div>
      </section>

      <footer className="site-footer">
        <div className="site-footer-inner">
          <span>Built by Karan Sud. Free, AI-powered GTM tooling.</span>
          <a href={PORTFOLIO}>View portfolio ↗</a>
        </div>
      </footer>
    </>
  );
}
