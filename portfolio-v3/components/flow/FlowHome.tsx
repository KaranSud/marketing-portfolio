import Image from "next/image";
import Link from "next/link";
import BookButton from "@/components/BookButton";
import FlowFooter from "./FlowFooter";
import FlowField from "./FlowField";
import Turn from "./Turn";
import Stream from "./Stream";
import Reveal from "@/components/flow/Reveal";
import { posts, wallPosts } from "@/lib/posts";
import { caseStudies } from "@/lib/caseStudies";
import FlowNav from "./FlowNav";
import "@/app/flow/flow.css";
import { flowFonts } from "./fonts";
import Milestones from "./Milestones";
import Timeline from "./Timeline";
import RollNumber from "./RollNumber";
import { homeFaqs } from "@/lib/faqs";
import { getAllPosts } from "@/lib/blog";

// The home page: plan v4 "Flow" (tasks/v3/PLAN-v4-2026-10-25.md). Engineer turned marketer, a live CFD flow
// field on paper, posts riding the flow, v2's logo marquee unchanged, a stream of real posts per client.
// Exactly the logos and order portfolio-v2 shows (CLAUDE.md: never change logos).
const row1 = [
  ["FanTV AI", "/Logos/FanTV-AI.jpg"], ["Novaswap", "/Logos/Novaswap.jpg"], ["Fere AI", "/Logos/fereai.jpg"],
  ["Defx", "/Logos/defx-logomark.png"], ["BimaBTC", "/Logos/Bima-BTC.jpg"],
];
const row2 = [
  ["Tony Roma's", "/Logos/Tony-Romas.jpg"], ["Bones & Burgers", "/Logos/bones-and-burgers.jpg"],
  ["Potters' Hub", "/Logos/Potters-Hub.jpg"], ["Opaque Studio", "/Logos/Opaque-Studio.png"], ["The SportsRush", "/Logos/sportsrush.jpg"],
];

// Clients with a stream of their own posts, in this order; the rest get a card.
const ORDER = ["fantv", "prashan", "fere", "novaswap", "bima", "tony", "mohaimina", "bones", "opaque", "potters"];
const ALSO = ["sportsrush", "defx", "culturegram"];

// What a client gets, each line backed by a case (facts.md).
const SERVICES = [
  { title: "Content and social", body: "A content system with formats, cadence and the posts themselves, on X, Instagram and LinkedIn.", proof: "FanTV AI, Fere AI, Tony Roma's, Bones & Burgers" },
  { title: "Founder and CEO brands", body: "Writing in a founder's own voice, so the person and the company lift each other.", proof: "Prashan Agarwal, 12K to over 90K on X. Mohaimina Haque, 1.2M+ organic impressions" },
  { title: "Community, KOLs and launches", body: "KOL and ambassador programs, Discord and Telegram, Product Hunt and launch campaigns.", proof: "FanTV AI, 150K+ community members. Fere AI, #2 Product of the Day" },
  { title: "Ads that pay back", body: "Meta and Google ads aimed at people who already showed interest, with organic reels pulling new people in.", proof: "Potters' Hub, ₹20,000 in month-one revenue from ₹3,500 of Meta ads" },
];
const GROUPS = [
  { name: "AI and crypto apps", keys: ["fantv", "fere", "novaswap", "bima"] },
  { name: "Founders and CEOs", keys: ["prashan", "mohaimina"] },
  { name: "Restaurants", keys: ["tony", "bones"] },
  { name: "Home and craft brands", keys: ["opaque", "potters"] },
];
const NAMES: Record<string, string> = { fantv: "FanTV AI", fere: "Fere AI", novaswap: "Novaswap", bima: "BimaBTC", prashan: "Prashan Agarwal", mohaimina: "Mohaimina Haque", tony: "Tony Roma's", bones: "Bones & Burgers", opaque: "Opaque Studio", potters: "Potters' Hub" };

// Deterministic stars for the night footer.
const stars = Array.from({ length: 70 }, (_, i) => ({ x: (i * 37.7) % 100, y: (i * 61.3) % 100, d: (i % 7) * 0.6 }));

export default function FlowHome() {
  const wall = wallPosts();
  const all = getAllPosts();
  const writing = ["why-i-built-my-own-outbound-tool", ...all.filter((p) => p.slug !== "why-i-built-my-own-outbound-tool").slice(0, 2).map((p) => p.slug)].map((s) => all.find((p) => p.slug === s)!).filter(Boolean);
  return (
    <div className={`fl ${flowFonts}`}>
      <FlowNav />

      <main id="main">
        <section className="fl-hero" aria-labelledby="fl-title">
          <FlowField />
          <div className="fl-hero-in">
            <div className="fl-hero-main">
              <h1 id="fl-title">
                <span>Hi, I&apos;m Karan Sud.</span>
                <span className="fl-h1-sub">Engineer turned marketer.</span>
              </h1>
              <div className="fl-facts">
                <div><span>Works with</span>Brands and founders, as a project or part-time</div>
                <div><span>Previously</span>FanTV AI, Crowwd Labs, Mach1 Digital</div>
                <div><span>Based in</span>Noida, India</div>
              </div>
              <div className="fl-cta">
                <BookButton className="fl-btn fl-call" />
                <span className="fl-hint">Move your cursor through the flow</span>
              </div>
            </div>
            <aside className="fl-card-me" aria-label="About Karan">
              <div className="fl-photo">
                <Image src="/karan.jpg" alt="Karan Sud" fill sizes="96px" priority />
              </div>
              <p className="fl-card-title">From CFD to content</p>
              <p className="fl-lede">
                I studied mechanical engineering and worked in CFD, simulating how air flows. In June 2023 I moved into
                marketing. Now I make attention flow for brands and founders.
              </p>
            </aside>
          </div>
        </section>

        <Turn posts={wall} />

        <section className="fl-logos" aria-label="Brands and founders I have worked with">
          <p className="fl-kicker fl-reveal">13+ brands and founders, 7+ industries</p>
          <div className="marquee">
            {[row1, row2].map((row, r) => (
              <div key={r} className={`marquee-row ${r ? "right" : "left"}`}>
                {[...row, ...row, ...row, ...row].map(([name, src], k) => (
                  <div key={k} className="bchip" aria-hidden={k >= row.length}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={src} alt={name} loading="lazy" decoding="async" />
                    {name}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </section>

        <section className="fl-services" aria-labelledby="fl-services-title">
          <h2 id="fl-services-title" className="fl-reveal">What you can hire me for</h2>
          <div className="fl-services-grid">
            {SERVICES.map((s) => (
              <div key={s.title} className="fl-service fl-reveal">
                <strong>{s.title}</strong>
                <p>{s.body}</p>
                <span className="fl-muted">{s.proof}</span>
              </div>
            ))}
          </div>
        </section>

        <nav className="fl-jump fl-reveal" aria-label="Jump to work by industry">
          <span className="fl-muted">Jump to the work closest to yours</span>
          {GROUPS.map((g) => (
            <div key={g.name} className="fl-jump-group">
              <span>{g.name}</span>
              {g.keys.map((k) => <a key={k} href={`#c-${k}`}>{NAMES[k]}</a>)}
            </div>
          ))}
        </nav>

        <section id="work" className="fl-work" aria-label="Work">
          {ORDER.filter((k) => posts[k]?.length).map((k, i) => {
            const c = caseStudies.find((x) => x.key === k)!;
            return (
              <article key={k} id={`c-${k}`} className="fl-client">
                <div className="fl-client-head fl-reveal">
                  <h2>{c.title}</h2>
                  <p className="fl-muted">{c.meta}</p>
                  <div className="fl-stats">
                    {c.stats.slice(0, 2).map((s) => (
                      <p key={s.label}><b><RollNumber value={s.val} /></b><span>{s.label}</span></p>
                    ))}
                  </div>
                  <Link href={`/work/${k}`} className="fl-link">Read the {c.title} case</Link>
                </div>
                <Stream posts={posts[k]} account={c.title} reverse={i % 2 === 1} speed={70 + (i % 3) * 18} />
              </article>
            );
          })}
          <div className="fl-also fl-reveal">
            {ALSO.map((k) => {
              const c = caseStudies.find((x) => x.key === k)!;
              return (
                <Link key={k} href={`/work/${k}`} className="fl-also-card">
                  <span className="fl-muted">{c.kind}</span>
                  <strong>{c.title}</strong>
                  {c.stats[0] ? <span><b>{c.stats[0].val}</b> {c.stats[0].label}</span> : null}
                </Link>
              );
            })}
          </div>
        </section>

        <section className="fl-story" aria-labelledby="fl-story-title">
          <h2 id="fl-story-title" className="fl-reveal">From airflow to attention</h2>
          <Timeline />
        </section>

        <section className="fl-notes-wrap" aria-labelledby="fl-notes-title">
          <h2 id="fl-notes-title" className="fl-reveal">A few notifications from the work</h2>
          <Milestones />
        </section>

        <section id="built" className="fl-built" aria-labelledby="fl-built-title">
          <h2 id="fl-built-title" className="fl-reveal">The engineer still builds things</h2>
          <div className="fl-built-grid">
            <a className="fl-card fl-reveal" href="https://account-research-five.vercel.app" target="_blank" rel="noopener noreferrer">
              <span className="fl-muted">Free tool</span>
              <strong>Account research engine</strong>
              <span>Reads a company&apos;s site and drafts the first email and LinkedIn opener.</span>
            </a>
            <a className="fl-card fl-reveal" href="https://slouchguard-site.vercel.app" target="_blank" rel="noopener noreferrer">
              <span className="fl-muted">Mac app</span>
              <strong>SlouchGuard</strong>
              <span>A posture app for Mac that uses the motion sensors in your AirPods.</span>
            </a>
          </div>
        </section>

      <section id="writing" className="fl-writing" aria-labelledby="fl-writing-title">
        <div className="fl-writing-head fl-reveal">
          <h2 id="fl-writing-title">I write about what the numbers say</h2>
          <p className="fl-muted">{all.length} essays on AI in marketing, growth and measurement, most built on one recent study, plus notes on the tools I build.</p>
        </div>
        <div className="fl-writing-grid">
          {writing.map((p) => (
            <Link key={p.slug} href={`/blog/${p.slug}`} className="fl-writing-card fl-reveal">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={`/blog/${p.slug}/opengraph-image`} alt="" width={600} height={315} loading="lazy" />
              <strong>{p.title}</strong>
              <span className="fl-muted">{p.readingTime}</span>
            </Link>
          ))}
        </div>
        <Link href="/blog" className="fl-link">Read all {all.length} essays</Link>
      </section>

      <section className="fl-faq" aria-labelledby="fl-faq-title">
        <h2 id="fl-faq-title" className="fl-reveal">Questions people ask</h2>
        <div className="fl-faq-list">
          {homeFaqs.map((f) => (
            <details key={f.q} className="fl-faq-item">
              <summary>{f.q}</summary>
              <p>{f.a}</p>
            </details>
          ))}
        </div>
      </section>
      </main>

      <FlowFooter />
      <Reveal selector=".fl-reveal" />
    </div>
  );
}
