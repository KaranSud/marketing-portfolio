import Image from "next/image";
import brief from "@/data/sample-brief.json";

// Both products are live (facts.md "Things he built", VP); descriptions follow each
// live page's own wording. The brief below is the engine's real output from one run,
// saved verbatim (data/sample-brief.json), so nothing on screen pretends to be clickable.
const engine = {
  name: "Account Research Engine",
  variant: "Free, built and run by me",
  fact: "Reads a company's homepage, about and pricing pages, then drafts an account brief, a first email and a LinkedIn opener. Up to 10 companies a run.",
  href: "https://account-research-five.vercel.app",
};

const slouch = {
  name: "SlouchGuard",
  variant: "A posture app for Mac",
  fact: "Uses the motion sensors in your AirPods to catch you slouching. Free to start, and Pro costs $12, paid once.",
  href: "https://slouchguard-site.vercel.app",
};

function ToolCard({ t, action, k }: { t: typeof engine; action: string; k: number }) {
  return (
    <div className="v3-tool-card" data-reveal>
      <h3 id={`tool-${k}`} className="v3-tool-name">
        {t.name}
      </h3>
      <p className="v3-tool-variant">{t.variant}</p>
      <p>{t.fact}</p>
      <a className="cta cta-dark" href={t.href} target="_blank" rel="noopener noreferrer">
        {action}
      </a>
    </div>
  );
}

export default function Tools() {
  return (
    <section id="tools" className="v3-section v3-tools" aria-labelledby="tools-title">
      <div className="v3-tools-head">
        <h2 id="tools-title" className="v3-h2" data-reveal>
          Tools
        </h2>
        <p className="v3-statement" style={{ marginTop: 18 }} data-reveal>
          I build software too. Both of these are live.
        </p>
      </div>

      <article className="v3-tool v3-tool-engine" aria-labelledby="tool-0">
        <ToolCard t={engine} action="Run it on your list" k={0} />
        <figure className="v3-brief-wrap" data-reveal style={{ ["--i" as string]: 1 }}>
          <div className="v3-brief" data-ui>
            <div className="v3-brief-head">
              <div>
                <p className="v3-brief-co">Aspen Dental</p>
                <p className="v3-brief-dom">{brief.domain}</p>
              </div>
              <p className="v3-brief-fit">
                <strong>{brief.fitScore}</strong> fit
              </p>
            </div>
            <p className="v3-brief-reason">{brief.fitReason}</p>
            <p className="v3-brief-label">Summary</p>
            <p>{brief.executiveSummary}</p>
            <p className="v3-brief-label">First email</p>
            <p className="v3-brief-subject">{brief.email.subject}</p>
            <p>{brief.email.body}</p>
            <p className="v3-brief-label">LinkedIn opener</p>
            <p>{brief.linkedin}</p>
            <p className="v3-brief-src">Sources: {brief.sources.join(", ")}</p>
          </div>
          <figcaption className="v3-caption">
            Real output from one run on 16 Oct 2026; the brief text is unedited. The offer entered was: {brief.offer}
          </figcaption>
        </figure>
      </article>

      <article className="v3-tool v3-tool-photo" aria-labelledby="tool-1">
        <div className="v3-tool-bg" style={{ ["--origin" as string]: "38% 36%", ["--zoom" as string]: 1.9 }}>
          <Image src="/tools/slouchguard-closeup.jpg" alt="SlouchGuard's posture history window" fill sizes="100vw" />
        </div>
        <ToolCard t={slouch} action="See SlouchGuard" k={1} />
      </article>
    </section>
  );
}
