import type { Metadata } from "next";
import { Geist } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import BookButton from "@/components/BookButton";
import IslandNav from "@/components/preview/IslandNav";
import TaglineReveal from "@/components/preview/TaglineReveal";
import PostReel from "@/components/preview/PostReel";
import Reveal from "@/components/preview/Reveal";
import { posts, wallPosts } from "@/lib/posts";
import "./preview.css";

// Prototype of the work-first layout (tasks/v3/REPLAN-2026-10-23.md, build step 1).
// Lives beside the current site for comparison and stays out of search.
export const metadata: Metadata = {
  title: "Karan Sud, preview",
  robots: { index: false, follow: false },
};

const geist = Geist({ subsets: ["latin"], weight: ["400", "500", "600"], variable: "--pv-font" });

const logos = [
  ["FanTV-AI.jpg", "FanTV AI"],
  ["Fere-AI.png", "Fere AI"],
  ["Novaswap.jpg", "Novaswap"],
  ["Bima-BTC.jpg", "BimaBTC"],
  ["Tony-Romas.jpg", "Tony Roma's"],
  ["bones-and-burgers.jpg", "Bones & Burgers"],
  ["Opaque-Studio.png", "Opaque Studio"],
  ["Potters-Hub.jpg", "Potters' Hub"],
  ["sportsrush.jpg", "The SportsRush"],
  ["Culturegram.png", "The Culturegram"],
];

export default function Preview() {
  const wall = wallPosts();
  const cols = [0, 1, 2, 3, 4].map((c) => wall.filter((_, i) => i % 5 === c));
  return (
    <div className={`pv ${geist.variable}`}>
      <a href="#pv-main" className="pv-skip">
        Skip to content
      </a>
      <IslandNav />
      <main id="pv-main">
        <section className="pv-hero" aria-labelledby="pv-hero-title">
          <div className="pv-wall" aria-hidden="true">
            {cols.map((col, c) => (
              <div key={c} className="pv-wall-col" style={{ ["--d" as string]: `${70 + c * 14}s` }}>
                {[...col, ...col].map((p, k) => (
                  <div key={k} className="pv-wall-tile" style={{ aspectRatio: `${p.w} / ${p.h}` }}>
                    <Image src={p.src} alt="" fill sizes="20vw" loading={k < 3 ? "eager" : "lazy"} />
                  </div>
                ))}
              </div>
            ))}
          </div>
          <div className="pv-hero-copy">
            <h1 id="pv-hero-title">
              <span>You built the AI product.</span> <span>I find the people who use it.</span>
            </h1>
            <p className="pv-sub">
              Growth and content marketing for AI products, as a project or part-time support. Every post on this page
              comes from an account I worked on.
            </p>
            <BookButton className="pv-btn" />
          </div>
          <ul className="pv-logos" aria-label="Brands and founders I have worked with">
            {logos.map(([f, name]) => (
              <li key={f}>
                <Image src={`/Logos/${f}`} alt={name} width={40} height={40} />
              </li>
            ))}
          </ul>
        </section>

        <TaglineReveal text="13+ brands and founders, 7+ industries. Scroll the posts first, then read the numbers." />

        <section id="work" className="pv-chapter" aria-labelledby="pv-fantv">
          <div className="pv-chapter-head pv-reveal">
            <Image src="/Logos/FanTV-AI.jpg" alt="" width={48} height={48} className="pv-chapter-logo" />
            <div>
              <h2 id="pv-fantv">FanTV AI</h2>
              <p className="pv-muted">Social Media Marketing Manager · Oct 2024 to Aug 2025</p>
            </div>
            <p className="pv-stat">
              <strong>297.7K</strong>
              <span>X followers, up from 70K in 11 months, with airdrops and a 100+ KOL program</span>
            </p>
            <Link href="/work/fantv" className="pv-link">
              Read the FanTV AI case
            </Link>
          </div>
          <div className="pv-reveal">
            <PostReel items={posts.fantv} account="FanTV AI" />
          </div>
        </section>

        <section id="how" className="pv-how" aria-labelledby="pv-how-title">
          <h2 id="pv-how-title" className="pv-reveal">
            How it works
          </h2>
          <ol>
            <li className="pv-reveal">
              <strong>A 30 minute call.</strong> You show me the product and who it is for.
            </li>
            <li className="pv-reveal">
              <strong>A map of your buyers.</strong> Where they already spend time and what they respond to.
            </li>
            <li className="pv-reveal">
              <strong>The content, made and run.</strong> With a report on what it brings in.
            </li>
          </ol>
        </section>

        <section className="pv-final" aria-label="Book a call">
          <p className="pv-final-line pv-reveal">Want this for your product?</p>
          <p className="pv-muted pv-reveal">The call is free. Pricing comes after it, once we agree the scope.</p>
          <div className="pv-reveal">
            <BookButton className="pv-btn" />
          </div>
        </section>
      </main>
      <footer className="pv-foot">
        <p>Prototype of the new layout: hero, tagline and the FanTV chapter. Other clients follow the same pattern.</p>
        <Link href="/" className="pv-link">
          Back to the current site
        </Link>
      </footer>
      <Reveal />
    </div>
  );
}
