import Image from "next/image";
import Link from "next/link";
import brief from "@/data/sample-brief.json";

// Both products are live (facts.md "Things he built", VP). The engine card describes
// exactly what the recorded run shows: data/sample-brief.json is an unedited excerpt
// of one real run (fit score, first email, sources), so card and sample agree.
const engine = {
  name: "Account Research Engine",
  variant: "Free, built and run by me",
  fact: "Reads a company's website and public sources such as Wikipedia, GitHub and Google News, scores the fit out of 100, then drafts an account brief, a first email and a LinkedIn opener. Up to 10 companies a run.",
  href: "https://account-research-five.vercel.app",
};

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
        <div className="v3-tool-card" data-reveal>
          <h3 id="tool-0" className="v3-tool-name">
            {engine.name}
          </h3>
          <p className="v3-tool-variant">{engine.variant}</p>
          <p>{engine.fact}</p>
          <a className="cta cta-dark" href={engine.href} target="_blank" rel="noopener noreferrer">
            Run it on your list
          </a>
          <Link className="v3-tool-more" href="/blog/why-i-built-my-own-outbound-tool">
            Why I built it
          </Link>
        </div>
        <figure className="v3-brief-wrap" data-reveal style={{ ["--i" as string]: 1 }}>
          <div className="v3-brief" data-ui>
            <div className="v3-brief-head">
              <div>
                <p className="v3-brief-co">{brief.company}</p>
                <p className="v3-brief-dom">{brief.domain}</p>
              </div>
              <p className="v3-brief-fit">
                <strong>{brief.fitScore}</strong> fit
              </p>
            </div>
            <p className="v3-brief-reason">{brief.fitReason}</p>
            <p className="v3-brief-label">First email</p>
            <p className="v3-brief-subject">{brief.email.subject}</p>
            <p>{brief.email.body}</p>
            <p className="v3-brief-src">Sources: {brief.sources.join(", ")}</p>
          </div>
          <figcaption className="v3-caption">
            An unedited excerpt of one real run on 16 Oct 2026: the fit score, the first email and the sources. The
            full brief also has a summary and a LinkedIn opener. The offer entered was: {brief.offer}
          </figcaption>
        </figure>
      </article>

      <article className="v3-tool-row" aria-labelledby="tool-1">
        <div className="v3-tool-row-shot">
          <Image
            src="/tools/slouchguard-closeup.jpg"
            alt="SlouchGuard's posture history window"
            fill
            sizes="(max-width: 860px) 92vw, 30vw"
          />
        </div>
        <div className="v3-tool-row-text" data-reveal>
          <h3 id="tool-1" className="v3-tool-name">
            SlouchGuard
          </h3>
          <p>
            A posture app for Mac. It uses the motion sensors in your AirPods to catch you slouching. Free to start,
            and Pro costs $12, paid once.
          </p>
          <a className="tlink" href="https://slouchguard-site.vercel.app" target="_blank" rel="noopener noreferrer">
            See SlouchGuard
          </a>
        </div>
      </article>
    </section>
  );
}
