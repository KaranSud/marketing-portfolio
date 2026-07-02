import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import Reveal from "@/components/Reveal";
import { PipelineMock, BoardMock } from "@/components/ToolMocks";

export const metadata: Metadata = {
  title: "Free Tools: Account Research Engine and Outbound CRM",
  description:
    "Two free tools that run a full outbound motion: an account research engine that writes sourced briefs with fit scores and contacts, and a browser-based CRM to work the pipeline. No signup, no paid data.",
  alternates: { canonical: "/tools" },
  openGraph: {
    title: "Free tools by Karan Sud",
    description:
      "An account research engine and an outbound CRM. Free, live, and built on real cited data.",
    url: "/tools",
    type: "website",
  },
};

const RESEARCH_URL = "https://account-research-five.vercel.app";

/* ── Content ─────────────────────────────────────────────── */

const workflow = [
  { title: "Research", desc: "The engine builds sourced briefs for your target companies" },
  { title: "Qualify", desc: "A 0 to 100 fit score tells you who is worth your time" },
  { title: "Export", desc: "One click gives you a CSV with contacts and drafts" },
  { title: "Run outbound", desc: "Import into the CRM and work leads to Won" },
];

type Step = { title: string; desc: string; outcome: string };

const researchSteps: Step[] = [
  {
    title: "Describe what you sell",
    desc: "Write one or two plain sentences about your offer and who it is for. That is the whole setup. There is nothing to install and nothing to sign up for.",
    outcome: "The engine now knows how to judge whether a company is a fit for you.",
  },
  {
    title: "Add target companies",
    desc: "Paste the domains you want researched, or let the built-in lead discovery suggest real companies that match your ideal customer profile by industry, region, and size. No paid database behind any of it.",
    outcome: "A queue of real companies, each with a verified domain.",
  },
  {
    title: "Let it research",
    desc: "For every domain it gathers only cited public data: the company's own schema.org markup, Wikidata, recent news, sitemap scale, hiring pages, and GitHub for software companies. A figure it cannot source never appears in the brief.",
    outcome: "A McKinsey-style account brief per company, with every fact traceable to a source.",
  },
  {
    title: "Check the fit score",
    desc: "Each account gets a 0 to 100 fit score against your offer, and the pipeline view ranks the whole batch. Weak fits sink to the bottom so you stop wasting time on them before you write a word.",
    outcome: "A ranked list of who to contact first, and who to skip.",
  },
  {
    title: "Grab contacts and the email draft",
    desc: "It surfaces leadership and likely contact emails, then drafts a cold email grounded in the brief. The draft stays specific and honest because it can only cite what the research found. Export the whole batch to CSV in one click.",
    outcome: "Ready-to-send outreach for every account, in your own inbox and voice.",
  },
];

const researchGets = [
  "A sourced account brief per company",
  "A 0 to 100 fit score and a fit-ranked pipeline",
  "Leadership contacts and likely emails",
  "A cold email draft grounded in real data",
  "One-click CSV export of everything",
  "No signup, no paid data, free to run",
];

const crmSteps: Step[] = [
  {
    title: "Import your research CSV",
    desc: "Export from the research engine and drop the file straight into the CRM. Companies, contacts, emails, and fit scores map automatically. You can also add leads by hand.",
    outcome: "Your researched accounts appear as cards, already staged as Researched.",
  },
  {
    title: "Work the board",
    desc: "Drag cards across the pipeline, from New through Researched, Contacted, and Replied, to Won or Lost. Flip to list view when you want to scan everything at once, and search across companies, contacts, and notes.",
    outcome: "One glance tells you exactly where every deal stands.",
  },
  {
    title: "Never miss a follow-up",
    desc: "Set a next-touch date on any card. Leads due today get marked, overdue ones are flagged in red and counted at the top, so the next action is always obvious.",
    outcome: "No lead silently goes cold in your pipeline.",
  },
  {
    title: "Keep notes, stay private",
    desc: "Every card holds free-form notes. Everything lives in your browser's local storage, so nothing about your pipeline ever leaves your machine. Export a CSV backup anytime.",
    outcome: "A full outbound system with zero vendors and zero cost.",
  },
];

const crmGets = [
  "Kanban board and list views of your pipeline",
  "Six stages from New to Won, drag and drop",
  "Follow-up reminders with overdue flags",
  "Notes and search on every lead",
  "Data stays in your browser, private by default",
  "CSV import and export, no account needed",
];

/* ── Small presentational pieces ─────────────────────────── */

function ToolSection({
  id,
  tag,
  title,
  lede,
  visual,
  cta,
  facts,
  steps,
  gets,
  getsTitle,
}: {
  id: string;
  tag: string;
  title: React.ReactNode;
  lede: string;
  visual: React.ReactNode;
  cta: { href: string; label: string; external?: boolean };
  facts: { label: string; value: string }[];
  steps: Step[];
  gets: string[];
  getsTitle: string;
}) {
  return (
    <section id={id} className="tp-tool">
      <Reveal>
        <div className="tp-tool-hero">
          <div className="tp-tool-intro">
            <div className="labs-tag">{tag}</div>
            <h2 className="tp-tool-title">{title}</h2>
            <p className="tp-tool-lede">{lede}</p>
            <div className="tp-facts">
              {facts.map((f) => (
                <div className="tp-fact" key={f.label}>
                  <span className="tp-fact-label">{f.label}</span>
                  <span className="tp-fact-value">{f.value}</span>
                </div>
              ))}
            </div>
            <div className="hero-actions">
              {cta.external ? (
                <a className="btn btn-primary" href={cta.href} target="_blank" rel="noopener noreferrer">
                  {cta.label}
                </a>
              ) : (
                <Link className="btn btn-primary" href={cta.href}>
                  {cta.label}
                </Link>
              )}
              <a className="btn btn-ghost" href={`#${id}-steps`}>
                How to use it
              </a>
            </div>
          </div>
          <div className="tp-tool-visual">
            <span className="labs-live">
              <span className="labs-dot" />
              Live
            </span>
            {visual}
          </div>
        </div>
      </Reveal>

      <div className="tp-steps" id={`${id}-steps`}>
        <Reveal>
          <h3 className="tp-steps-title">How to use it, step by step</h3>
        </Reveal>
        {steps.map((s, i) => (
          <Reveal key={s.title} delay={Math.min(i * 0.05, 0.2)}>
            <div className="tp-step">
              <div className="tp-step-num">{i + 1}</div>
              <div className="tp-step-body">
                <h4>{s.title}</h4>
                <p>{s.desc}</p>
                <p className="tp-step-outcome">
                  <span>Result</span> {s.outcome}
                </p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal>
        <div className="tp-gets">
          <h3>{getsTitle}</h3>
          <ul>
            {gets.map((g) => (
              <li key={g}>{g}</li>
            ))}
          </ul>
        </div>
      </Reveal>
    </section>
  );
}

/* ── Page ────────────────────────────────────────────────── */

export default function ToolsPage() {
  return (
    <>
      <Nav />
      <main className="page-wrap tools-page">
        <header className="page-head">
          <div className="eyebrow">Free tools</div>
          <h1 className="page-h1">
            A complete outbound stack, <em>free to use</em>
          </h1>
          <p className="page-sub">
            I built these to run my own go-to-market, then put them online for
            anyone. Together they take you from &ldquo;who should I even talk
            to?&rdquo; to a working pipeline, without paid data, a signup, or a
            single fabricated number.
          </p>
        </header>

        <Reveal>
          <div className="tp-flow" role="list" aria-label="How the tools work together">
            {workflow.map((w, i) => (
              <div className="tp-flow-item" role="listitem" key={w.title}>
                <span className="tp-flow-num">{String(i + 1).padStart(2, "0")}</span>
                <b>{w.title}</b>
                <small>{w.desc}</small>
              </div>
            ))}
          </div>
        </Reveal>

        <ToolSection
          id="research"
          tag="AI GTM Tool · Free"
          title={
            <>
              Account Research &amp; <em>Outreach Engine</em>
            </>
          }
          lede="Tell it what you sell and which companies you care about. It researches every account from cited public data, writes the brief, scores the fit, finds the contacts, and drafts the cold email. An analyst's day of work, done in minutes for the entire list."
          visual={<PipelineMock />}
          cta={{ href: RESEARCH_URL, label: "Open the live tool", external: true }}
          facts={[
            { label: "Built for", value: "Founders, marketers, and SDRs doing outbound" },
            { label: "Replaces", value: "Paid enrichment tools and hours of manual research" },
            { label: "Costs", value: "Free. No account, no card" },
          ]}
          steps={researchSteps}
          gets={researchGets}
          getsTitle="What you walk away with"
        />

        <ToolSection
          id="crm"
          tag="Outbound CRM · Free"
          title={
            <>
              Outbound CRM, <em>in your browser</em>
            </>
          }
          lede="A pipeline tracker built to receive the research engine's output. Import the CSV, drag leads through stages, set follow-up reminders, and close deals. Everything is saved privately in your browser and nothing is sent to a server."
          visual={<BoardMock />}
          cta={{ href: "/crm", label: "Open the CRM" }}
          facts={[
            { label: "Built for", value: "Running the leads you researched to Won" },
            { label: "Replaces", value: "A spreadsheet, or a CRM subscription you don't need yet" },
            { label: "Costs", value: "Free, and your data never leaves your browser" },
          ]}
          steps={crmSteps}
          gets={crmGets}
          getsTitle="What's inside"
        />

        <Reveal>
          <div className="tp-cta">
            <h2>
              Try the full loop, <em>end to end</em>
            </h2>
            <p>
              Research five real target accounts, export the CSV, import it into
              the CRM, and send your first grounded cold email today.
            </p>
            <div className="contact-ctas">
              <a className="btn btn-primary" href={RESEARCH_URL} target="_blank" rel="noopener noreferrer">
                Start with the research engine
              </a>
              <Link className="btn btn-ghost" href="/crm">
                Open the CRM
              </Link>
            </div>
          </div>
        </Reveal>
      </main>
      <footer>
        <div className="footer-inner">
          <span className="footer-name">Karan Sud</span>
          <span className="footer-tag">
            &copy; {new Date().getFullYear()} Making brands impossible to ignore
          </span>
        </div>
      </footer>
    </>
  );
}
