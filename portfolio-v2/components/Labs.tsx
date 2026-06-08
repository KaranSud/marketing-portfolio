import SectionHead from "./SectionHead";
import Reveal from "./Reveal";

const pipeline: { domain: string; fit: number; tier: string }[] = [
  { domain: "stripe.com", fit: 88, tier: "strong" },
  { domain: "vercel.com", fit: 85, tier: "strong" },
  { domain: "notion.so", fit: 64, tier: "moderate" },
  { domain: "wikipedia.org", fit: 15, tier: "weak" },
];

const points: string[] = [
  "Sourced briefs from Wikidata, live news, GitHub, and Hacker News",
  "A 0 to 100 fit score with a fit-ranked pipeline view",
  "Contact and leadership discovery, plus one-click CSV export",
  "No fabricated numbers, every figure traces back to a source",
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
          <a
            className="labs-card"
            href="https://account-research-five.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="labs-visual">
              <span className="labs-live">
                <span className="labs-dot" />
                Live
              </span>
              <div className="labs-mock" aria-hidden="true">
                <div className="labs-mock-head">
                  <span className="labs-mock-label">Pipeline by fit</span>
                </div>
                <div className="labs-mock-rows">
                  {pipeline.map((p) => (
                    <div className="labs-mock-row" key={p.domain}>
                      <span className="labs-mock-domain">{p.domain}</span>
                      <span className="labs-mock-track">
                        <i
                          className={`labs-mock-fill ${p.tier}`}
                          style={{ width: `${p.fit}%` }}
                        />
                      </span>
                      <span className="labs-mock-score">{p.fit}</span>
                    </div>
                  ))}
                </div>
              </div>
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
                {points.map((pt) => (
                  <li key={pt}>{pt}</li>
                ))}
              </ul>
              <span className="labs-cta">
                Open the live tool
                <span>&rarr;</span>
              </span>
            </div>
          </a>
        </Reveal>

        <Reveal delay={0.08}>
          <a className="labs-mini" href="/crm">
            <div className="labs-tag">Outbound CRM</div>
            <h3 className="labs-mini-title">Track your pipeline, end to end</h3>
            <p className="labs-mini-desc">
              Import the leads you researched, move them through stages, add
              notes, and run your outbound. Saved in your browser, no account
              needed.
            </p>
            <span className="labs-cta">
              Open the CRM<span>&rarr;</span>
            </span>
          </a>
        </Reveal>
      </div>
    </section>
  );
}
