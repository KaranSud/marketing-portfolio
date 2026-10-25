import type { Metadata } from "next";
import { Fraunces, Geist } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import BookButton from "@/components/BookButton";
import FlowField from "@/components/flow/FlowField";
import Turn from "@/components/flow/Turn";
import Stream, { CountUp } from "@/components/flow/Stream";
import Reveal from "@/components/preview/Reveal";
import { posts, wallPosts } from "@/lib/posts";
import "./flow.css";

// Preview of plan v4 "Flow" (tasks/v3/PLAN-v4-2026-10-25.md): engineer turned marketer,
// a live CFD flow field on paper, posts riding the flow, v2's logo marquee unchanged.
export const metadata: Metadata = { title: "Karan Sud, Flow preview", robots: { index: false, follow: false } };

const serif = Fraunces({ subsets: ["latin"], weight: ["400", "500"], variable: "--fl-serif" });
const sans = Geist({ subsets: ["latin"], weight: ["400", "500", "600"], variable: "--fl-sans" });

// Exactly the logos and order portfolio-v2 shows (CLAUDE.md: never change logos).
const row1 = [
  ["FanTV AI", "/Logos/FanTV-AI.jpg"], ["Novaswap", "/Logos/Novaswap.jpg"], ["Fere AI", "/Logos/fereai.jpg"],
  ["Defx", "/Logos/defx-logomark.png"], ["BimaBTC", "/Logos/Bima-BTC.jpg"],
];
const row2 = [
  ["Tony Roma's", "/Logos/Tony-Romas.jpg"], ["Bones & Burgers", "/Logos/bones-and-burgers.jpg"],
  ["Potters' Hub", "/Logos/Potters-Hub.jpg"], ["Opaque Studio", "/Logos/Opaque-Studio.png"], ["The SportsRush", "/Logos/sportsrush.jpg"],
];

// Deterministic stars for the night footer.
const stars = Array.from({ length: 70 }, (_, i) => ({ x: (i * 37.7) % 100, y: (i * 61.3) % 100, d: (i % 7) * 0.6 }));

export default function FlowPreview() {
  const wall = wallPosts();
  const others = wall.filter((p) => !p.src.includes("/FanTV/"));
  return (
    <div className={`fl ${serif.variable} ${sans.variable}`}>
      <header className="fl-nav">
        <Link href="/flow" className="fl-name">Karan Sud</Link>
        <nav aria-label="Main">
          <a href="#work">Work</a>
          <a href="#built">Built</a>
          <Link href="/blog">Writing</Link>
        </nav>
        <BookButton className="fl-btn fl-btn-sm" />
      </header>

      <main>
        <section className="fl-hero" aria-labelledby="fl-title">
          <FlowField />
          <div className="fl-hero-in">
            <p className="fl-hello">Hi, I&apos;m Karan</p>
            <h1 id="fl-title">Engineer turned marketer.</h1>
            <p className="fl-lede">
              I studied mechanical engineering and worked in CFD, simulating how air flows. In November 2023 I moved
              into marketing. Now I make attention flow for brands and founders.
            </p>
            <div className="fl-facts">
              <div><span>Works with</span>Brands and founders, as a project or part-time</div>
              <div><span>Previously</span>FanTV AI, Crowwd Labs, Mach1 Digital</div>
              <div><span>Based in</span>Noida, India</div>
            </div>
            <div className="fl-cta">
              <BookButton className="fl-btn" />
              <span className="fl-hint">Move your cursor through the flow</span>
            </div>
          </div>
          <div className="fl-photo">
            <Image src="/karan.jpg" alt="Karan Sud" fill sizes="120px" priority />
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
          <article className="fl-client">
            <div className="fl-client-head fl-reveal">
              <h2>FanTV AI</h2>
              <p className="fl-muted">Social Media Marketing Manager · Oct 2024 to Aug 2025</p>
              <div className="fl-stats">
                <p><b><CountUp value="297.7K" /></b><span>X followers, up from 70K in 11 months, with airdrops and a 100+ KOL program</span></p>
                <p><b><CountUp value="150K+" /></b><span>members across Discord and Telegram</span></p>
              </div>
              <Link href="/work/fantv" className="fl-link">Read the FanTV AI case</Link>
            </div>
            <Stream posts={posts.fantv} account="FanTV AI" speed={90} />
          </article>
          <article className="fl-client">
            <div className="fl-client-head fl-reveal">
              <h2>More streams</h2>
              <p className="fl-muted">Tony Roma&apos;s, Bones &amp; Burgers, Mohaimina Haque, Fere AI, Novaswap, BimaBTC, Opaque Studio. Each gets its own stream of 20 to 25 posts in the full build.</p>
            </div>
            <Stream posts={others} account="Client" reverse speed={110} />
          </article>
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
      </main>

      <footer className="fl-night">
        <div className="fl-stars" aria-hidden="true">
          {stars.map((s, i) => <i key={i} style={{ left: `${s.x}%`, top: `${s.y}%`, animationDelay: `${s.d}s` }} />)}
        </div>
        <p className="fl-night-kicker">The call is free. Pricing comes after it, once we agree the scope.</p>
        <a className="fl-email" href="mailto:contactkaransud@gmail.com">contactkaransud@gmail.com</a>
        <BookButton className="fl-btn fl-btn-light" />
      </footer>
      <Reveal selector=".fl-reveal" />
    </div>
  );
}
