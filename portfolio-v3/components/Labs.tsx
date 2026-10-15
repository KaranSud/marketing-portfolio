import Link from "next/link";
import SectionHead from "./SectionHead";
import Reveal from "./Reveal";
import { PipelineMock, BoardMock } from "./ToolMocks";

const researchPoints: string[] = [
  "Sourced briefs from Wikidata, live news, GitHub, and Hacker News",
  "A 0 to 100 fit score with a fit-ranked pipeline view",
  "Contact and leadership discovery, plus one-click CSV export",
  "No fabricated numbers, every figure traces back to a source",
];

const crmPoints: string[] = [
  "Kanban board and list views, drag leads between six stages",
  "Follow-up reminders with overdue flags, notes on every card",
  "Imports the research engine's CSV, contacts and fit scores included",
  "Saved in your browser, private by default, no account needed",
];

export default function Labs() {
  return (
    <section id="labs" className="section">
      <div className="container">
        <SectionHead
          title={
            <>
              Tools I build, <em>free to use</em>
            </>
          }
          sub="I build small AI tools to solve my own go-to-market problems, then put them online for anyone. Live, free, and grounded only in real, cited data."
        />

        <Reveal>
          <div className="labs-card">
            <div className="labs-visual">
              <span className="labs-live">
                <span className="labs-dot" />
                Live
              </span>
              <PipelineMock />
            </div>

            <div className="labs-body">
              <div className="labs-tag">AI GTM Tool</div>
              <h3 className="labs-title">Account Research &amp; Outreach Engine</h3>
              <p className="labs-desc">
                Drop in your offer and a list of target domains. It pulls only
                cited public data, then writes a McKinsey-style account brief,
                scores the fit, finds the contacts, and drafts a cold email that
                actually sounds human, for every account at once.
              </p>
              <ul className="labs-points">
                {researchPoints.map((pt) => (
                  <li key={pt}>{pt}</li>
                ))}
              </ul>
              <div className="labs-ctas">
                <a
                  className="labs-cta"
                  href="https://account-research-five.vercel.app"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Open the live tool
                  <span>&rarr;</span>
                </a>
                <Link className="labs-cta ghost" href="/tools#research">
                  How to use it, step by step
                  <span>&rarr;</span>
                </Link>
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="labs-card labs-card-alt">
            <div className="labs-visual">
              <span className="labs-live">
                <span className="labs-dot" />
                Live
              </span>
              <BoardMock />
            </div>

            <div className="labs-body">
              <div className="labs-tag">Outbound CRM</div>
              <h3 className="labs-title">Track your pipeline, end to end</h3>
              <p className="labs-desc">
                Import the leads you researched, move them through stages, add
                notes, and run your outbound. Built to receive the research
                engine&apos;s CSV, so the two tools work as one system.
              </p>
              <ul className="labs-points">
                {crmPoints.map((pt) => (
                  <li key={pt}>{pt}</li>
                ))}
              </ul>
              <div className="labs-ctas">
                <Link className="labs-cta" href="/crm">
                  Open the CRM<span>&rarr;</span>
                </Link>
                <Link className="labs-cta ghost" href="/tools#crm">
                  How to use it, step by step
                  <span>&rarr;</span>
                </Link>
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.12}>
          <Link className="labs-all" href="/tools">
            See both tools explained, with step-by-step guides
            <span>&rarr;</span>
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
