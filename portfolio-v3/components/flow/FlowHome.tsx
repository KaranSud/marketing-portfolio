import Image from "next/image";
import Link from "next/link";
import BookButton from "@/components/BookButton";
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

// Deterministic stars for the night footer.
const stars = Array.from({ length: 70 }, (_, i) => ({ x: (i * 37.7) % 100, y: (i * 61.3) % 100, d: (i % 7) * 0.6 }));

export default function FlowHome() {
  const wall = wallPosts();
  return (
    <div className={`fl ${flowFonts}`}>
      <FlowNav />

      <main>
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
              <p className="fl-card-title">Glad you&apos;re here</p>
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

        <section id="work" className="fl-work" aria-label="Work">
          {ORDER.filter((k) => posts[k]?.length).map((k, i) => {
            const c = caseStudies.find((x) => x.key === k)!;
            return (
              <article key={k} className="fl-client">
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

      <footer className="fl-night">
        <div className="fl-shooting" aria-hidden="true"><i /><i /><i /></div>
        <div className="fl-stars" aria-hidden="true">
          {stars.map((s, i) => <i key={i} style={{ left: `${s.x}%`, top: `${s.y}%`, animationDelay: `${s.d}s` }} />)}
        </div>
        <p className="fl-night-kicker">The call is free. Pricing comes after it, once we agree the scope.</p>
        <a className="fl-email" href="mailto:contactkaransud@gmail.com">contactkaransud@gmail.com</a>
        <BookButton className="fl-btn fl-btn-light fl-call" />
      </footer>
      <Reveal selector=".fl-reveal" />
    </div>
  );
}
