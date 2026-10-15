import Image from "next/image";

// Facts: both products are live (facts.md "Things he built", VP). Descriptions
// follow each live page's own wording.
const tools = [
  {
    name: "Account Research Engine",
    variant: "Free, built and run by me",
    fact: "Reads a company's homepage, about and pricing pages, then drafts an account brief, a first email and a LinkedIn opener. Up to 10 companies a run.",
    href: "https://account-research-five.vercel.app",
    action: "Try it",
    img: "/tools/research-engine.jpg",
    alt: "The Account Research Engine's live homepage",
    close: "/tools/research-engine-closeup.jpg",
    closeOrigin: "6% 100%",
    closeZoom: 1.6,
    slot: 2.1,
  },
  {
    name: "SlouchGuard",
    variant: "A posture app for Mac",
    fact: "Uses the motion sensors in your AirPods to catch you slouching. Free to start, and Pro costs $12, paid once.",
    href: "https://slouchguard-site.vercel.app",
    action: "See SlouchGuard",
    img: "/tools/slouchguard.jpg",
    alt: "SlouchGuard's live homepage",
    close: "/tools/slouchguard-closeup.jpg",
    closeOrigin: "38% 36%",
    closeZoom: 1.9,
    slot: 0.15,
  },
];

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
      {tools.map((t, k) => (
        <article key={t.name} className="v3-tool" aria-labelledby={`tool-${k}`}>
          <div className="v3-tool-bg" style={{ ["--origin" as string]: t.closeOrigin, ["--zoom" as string]: t.closeZoom }}>
            <Image
              src={t.close}
              alt=""
              fill
              sizes="100vw"
            />
          </div>
          <div className="v3-tool-card" style={{ ["--slot" as string]: t.slot }} data-reveal>
            <h3 id={`tool-${k}`} className="v3-tool-name">
              {t.name}
            </h3>
            <p className="v3-tool-variant">{t.variant}</p>
            <p>{t.fact}</p>
            <div className="v3-tool-shot">
              <Image src={t.img} alt={t.alt} fill sizes="(max-width: 860px) 0px, 340px" />
            </div>
            <a className="cta cta-dark" href={t.href} target="_blank" rel="noopener noreferrer">
              {t.action}
            </a>
          </div>
        </article>
      ))}
    </section>
  );
}
