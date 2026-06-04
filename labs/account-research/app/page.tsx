"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Reveal from "@/components/Reveal";

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
};

function fitTier(score: number): { label: string; cls: string } {
  if (score >= 70) return { label: "Strong", cls: "strong" };
  if (score >= 40) return { label: "Moderate", cls: "moderate" };
  return { label: "Weak", cls: "weak" };
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
};
type Profiles = {
  leaders?: { name: string; role: string }[];
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

type Result = {
  domain: string;
  status: "pending" | "done" | "error";
  title?: string;
  name?: string;
  siteReachable?: boolean;
  snapshot?: Snapshot | null;
  profiles?: Profiles | null;
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
    domains: "notion.so\nfigma.com\nvercel.com",
  },
  {
    offer:
      "Developer marketing and technical content for devtools and infrastructure companies.",
    domains: "gitlab.com\ndatadog.com\nmongodb.com",
  },
  {
    offer:
      "Lifecycle, email, and retention marketing as a service for SaaS and D2C brands.",
    domains: "shopify.com\nhubspot.com\ndropbox.com",
  },
  {
    offer:
      "Performance and paid growth for fintech and infrastructure companies: Meta, Google, and lifecycle.",
    domains: "stripe.com\ntwilio.com\ncloudflare.com",
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
  "Skimming the about page…",
  "Pulling recent news…",
  "Checking Hacker News…",
  "Detecting their tech stack…",
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

  const domains = domainsText
    .split(/[\n,]/)
    .map((d) => d.trim())
    .filter(Boolean);

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
          body: JSON.stringify({ domain, offer }),
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

  function loadExample() {
    const next = (exIdx + 1) % EXAMPLES.length;
    setExIdx(next);
    setOffer(EXAMPLES[next].offer);
    setDomainsText(EXAMPLES[next].domains);
  }

  function exportCsv() {
    const rows = results.filter((r) => r.status === "done" && r.brief);
    if (!rows.length) return;
    const esc = (s: unknown) => `"${String(s ?? "").replace(/"/g, '""')}"`;
    const header = [
      "Domain",
      "Name",
      "Fit Score",
      "Fit Reason",
      "Founded",
      "Employees",
      "Company LinkedIn",
      "Emails",
      "Email Subject",
      "Email Body",
      "LinkedIn Opener",
    ];
    const lines = rows.map((r) => {
      const b = r.brief!;
      return [
        r.domain,
        r.name || "",
        b.fitScore,
        b.fitReason,
        r.snapshot?.founded || "",
        r.snapshot?.employees || "",
        r.profiles?.linkedinCompany || r.contacts?.linkedin || "",
        (r.contacts?.emails || []).join("; "),
        b.email.subject,
        b.email.body,
        b.linkedin,
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
          Drop in any company&apos;s domain. An AI agent reads their public
          site, builds an account brief, and writes outreach tailored to your
          offer. No CRM, no enrichment bills, no manual digging.
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
            <div className="controls-title">Run a batch</div>
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
                {domains.length} {domains.length === 1 ? "company" : "companies"}
                {domains.length > 10 ? " (first 10)" : ""}
              </span>
              <button className="linkbtn" onClick={loadExample} type="button">
                Load example
              </button>
            </div>
            <p className="notice">
              Outreach is AI-drafted from public site content, so always review
              before sending.
            </p>
          </div>

          <div className="results">
            {results.length === 0 ? (
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
                          <span
                            className={`fit-badge ${fitTier(r.brief.fitScore).cls}`}
                            title={r.brief.fitReason}
                          >
                            <span className="fit-num">{r.brief.fitScore}</span>
                            <span className="fit-label">
                              {fitTier(r.brief.fitScore).label} fit
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
                                        href={`https://www.linkedin.com/search/results/people/?keywords=${encodeURIComponent(
                                          `${l.name} ${r.name || ""}`
                                        )}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                      >
                                        <span className="leader-name">
                                          {l.name}
                                        </span>
                                        <span className="leader-role">
                                          {l.role} · find on LinkedIn ↗
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
