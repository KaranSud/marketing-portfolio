"use client";

import { useState } from "react";
import Image from "next/image";

// Copy from tasks/v3/copy-deck.md. Each stage shows a real analytics screenshot
// from the case where that part of the work happened.
const stages = [
  {
    name: "Content",
    clause: "A feed worth following",
    caption:
      "Recurring formats on a weekly cadence. For Fere AI: trading threads, data drops, market takes and demos.",
    img: "/Results/Fere AI/Fere AI.png",
    alt: "Fere AI X analytics showing 6.8M impressions",
    frag: "Fere AI on X, 1 Sep 2025 to 27 Apr 2026: 6.8M impressions.",
    zoom: { scale: 1.3, origin: "72% 46%" },
  },
  {
    name: "Reach",
    clause: "Other people's audiences",
    caption: "KOLs, ambassadors, AMAs and airdrops. At FanTV AI the KOL program grew from about 10 to 100+.",
    img: "/Results/FanTV/FanTV_Web1.png",
    alt: "FanTV AI X analytics for January 2025",
    frag: "FanTV AI on X, January 2025.",
    zoom: { scale: 1.3, origin: "76% 34%" },
  },
  {
    name: "Trust",
    clause: "A founder people trust",
    caption:
      "I wrote Prashan Agarwal's posts in his voice, alongside the FanTV AI account. His X went from 12K to over 90K followers.",
    img: "/Results/Prashan/Prashan_1.png",
    alt: "Prashan Agarwal X analytics from October 2024 to August 2025",
    frag: "Prashan Agarwal on X, 1 Oct 2024 to 29 Aug 2025.",
    zoom: { scale: 1.3, origin: "74% 34%" },
  },
  {
    name: "Use",
    clause: "A reason to act today",
    caption:
      "Contests, referrals and points. Defx ran two trading contests, and active traders went from about 50 to about 350.",
    img: "/Results/Defx/Defx.png",
    alt: "Defx on DefiLlama showing $1.529b cumulative perp volume",
    frag: "Defx on DefiLlama: $1.529b cumulative perp volume.",
    zoom: { scale: 1.35, origin: "58% 30%" },
  },
];

export default function Method() {
  const [i, setI] = useState(0);
  const s = stages[i];
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
            <p className="v3-method-clause" key={`c${i}`}>
              {s.clause}
            </p>
            <p className="v3-method-caption" key={`p${i}`}>
              {s.caption}
            </p>
          </div>
        </div>
        <div className="v3-method-right">
          <div>
            <div className="v3-method-frag" data-ui>
              {stages.map((st, k) => (
                <div
                  key={st.img}
                  className={`v3-method-layer${k === i ? " is-active" : ""}`}
                  style={{ ["--zoom" as string]: st.zoom.scale, ["--origin" as string]: st.zoom.origin }}
                  aria-hidden={k !== i}
                >
                  <Image src={st.img} alt={k === i ? st.alt : ""} fill sizes="(max-width: 860px) 92vw, 560px" />
                </div>
              ))}
            </div>
            <p className="v3-method-frag-caption">{s.frag}</p>
          </div>
        </div>
        <div className="v3-method-controls">
          <label htmlFor="stage-range" className="sr-only">
            Stage of the work
          </label>
          <div className="v3-range-wrap" style={{ ["--fill" as string]: `${(i / (stages.length - 1)) * 100}%` }}>
            <span className="v3-range-fill" aria-hidden="true" />
            <input
              id="stage-range"
              className="v3-range"
              type="range"
              min={0}
              max={stages.length - 1}
              step={1}
              value={i}
              aria-valuetext={`${s.name}: ${s.clause}`}
              onChange={(e) => setI(Number(e.target.value))}
            />
          </div>
          <ul className="v3-stops">
            {stages.map((st, k) => (
              <li key={st.name}>
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
