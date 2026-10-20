"use client";

import { useState } from "react";
import Image from "next/image";
import { creatives, type Creative } from "@/lib/creatives";

// Four parts of the work, each shown with one real artefact and one number from
// tasks/v3/research/facts.md. None of these images appears elsewhere on the home page.
// Where the account has one, a post Karan made sits beside the analytics.
const stages: {
  name: string;
  clause: string;
  num: string;
  numLabel: string;
  caption: string;
  img: string;
  alt: string;
  frag: string;
  post?: Creative;
}[] = [
  {
    name: "Content",
    clause: "A feed worth following",
    num: "4M",
    numLabel: "views on one SportsRush reel, with no ad spend",
    caption:
      "Formats built for the platform, on a steady cadence. The SportsRush's Instagram went from 26 to 4,500 followers in three months.",
    img: "/Results/Sportsrush/Sportsrush Viral Reels.png",
    alt: "The SportsRush reels on Instagram, at 2M, 4M and 314K views",
    frag: "The SportsRush on Instagram, 2024.",
  },
  {
    name: "Reach",
    clause: "Other people's audiences",
    num: "1.1M",
    numLabel: "X impressions for Novaswap, an account opened in November 2025",
    caption: "KOLs, ambassadors and community seeding. For Novaswap I seeded targeted KOLs and built the community from nothing.",
    img: "/Results/Novaswap/Novaswap.png",
    alt: "Novaswap X analytics from 1 November 2025 to 27 April 2026",
    frag: "Novaswap on X, 1 Nov 2025 to 27 Apr 2026.",
    post: creatives.novaswap[0],
  },
  {
    name: "Trust",
    clause: "A founder people trust",
    num: "90K+",
    numLabel: "X followers for Prashan Agarwal, up from 12K",
    caption: "I wrote Prashan Agarwal's posts in his voice, alongside the FanTV AI brand account, so the two fed each other.",
    img: "/Results/Prashan/Prashan_2.png",
    alt: "Prashan Agarwal X analytics for January 2025",
    frag: "Prashan Agarwal on X, January 2025.",
    post: creatives.prashan[0],
  },
  {
    name: "Revenue",
    clause: "Attention that pays",
    num: "₹20,000",
    numLabel: "Potters' Hub's month-one revenue from ₹3,500 of Meta ads, a 471% return",
    caption: "Paid social aimed at people who already showed interest, with organic reels pulling new people in.",
    img: "/Results/Potters' Hub/crop-top-content.png",
    alt: "Potters' Hub's top Instagram posts by views, the top one at 57.9K",
    frag: "Potters' Hub's top Instagram posts by views, February to April 2025.",
  },
];

export default function Method() {
  const [i, setI] = useState(0);
  const s = stages[i];
  const last = stages.length - 1;
  return (
    <section id="method" className="v3-method" aria-labelledby="method-title">
      <div className="v3-method-head">
        <h2 id="method-title" className="v3-h2" data-reveal>
          How I work
        </h2>
      </div>
      <div className="v3-method-stage">
        <div className="v3-method-left">
          <div aria-live="polite">
            <p className="v3-method-clause">{s.clause}</p>
            <p className="v3-method-num">
              <strong>{s.num}</strong>
              <span>{s.numLabel}</span>
            </p>
            <p className="v3-method-caption">{s.caption}</p>
          </div>
          <ol className="v3-ledger" aria-label="The parts so far">
            {stages.map((st, k) => (
              <li key={st.name} className={k <= i ? "is-on" : undefined}>
                <strong>{k <= i ? st.num : "·"}</strong>
                <span>{st.name}</span>
              </li>
            ))}
          </ol>
        </div>
        <div className="v3-method-right">
          <div className="v3-method-fragwrap">
            <div className="v3-method-frag" data-ui>
              {stages.map((st, k) => (
                <div key={st.img} className={`v3-method-layer${k === i ? " is-active" : ""}`} aria-hidden={k !== i}>
                  <Image src={st.img} alt={k === i ? st.alt : ""} fill sizes="(max-width: 860px) 92vw, 46vw" />
                </div>
              ))}
            </div>
            <p className="v3-method-frag-caption">{s.frag}</p>
            {s.post ? (
              <a key={s.post.src} className="v3-method-post" href={s.post.href} target="_blank" rel="noopener noreferrer">
                <span className="v3-post">
                  <Image src={s.post.src} alt={s.post.alt} fill sizes="200px" />
                </span>
                <span className="v3-caption">
                  A post I made: {s.post.caption}
                  <span className="sr-only"> (opens the original post)</span>
                </span>
              </a>
            ) : null}
          </div>
        </div>
        <div className="v3-method-controls">
          <label htmlFor="stage-range" className="sr-only">
            Part of the work
          </label>
          <div className="v3-range-wrap" style={{ ["--fill" as string]: `${(i / last) * 100}%` }}>
            <span className="v3-range-fill" aria-hidden="true" />
            <input
              id="stage-range"
              className="v3-range"
              type="range"
              min={0}
              max={last}
              step={1}
              value={i}
              aria-valuetext={`${s.name}: ${s.clause}`}
              onChange={(e) => setI(Number(e.target.value))}
            />
          </div>
          <ul className="v3-stops">
            {stages.map((st, k) => (
              <li key={st.name} style={{ ["--at" as string]: `${(k / last) * 100}%` }}>
                <button type="button" aria-pressed={k === i} onClick={() => setI(k)}>
                  {st.name}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
