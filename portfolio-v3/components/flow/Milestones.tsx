"use client";

import { useEffect, useRef, useState } from "react";

// easyui "Notification Stack", ported: real milestones arrive one by one like phone
// notifications when the section enters. Every line is from facts.md.
const items = [
  { app: "FanTV AI", when: "on X", text: "X followers reached 297.7K, up from 70K, with airdrops and a 100+ KOL program." },
  { app: "Product Hunt", when: "17 May 2026", text: "Fere AI finished #2 Product of the Day." },
  { app: "Prashan Agarwal", when: "on X", text: "Over 90K followers on X, up from 12K." },
  { app: "The SportsRush", when: "Instagram, 2024", text: "Reels at 4M and 2M views. Followers went from 26 to 4,500 in three months, with no ad spend." },
  { app: "Potters' Hub", when: "Meta ads, month one", text: "₹20,000 in month-one revenue from ₹3,500 of Meta ads." },
  { app: "DefiLlama", when: "public data", text: "Defx: $1.5B in cumulative perp volume, which I helped it reach." },
];

export default function Milestones() {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(0);
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) { setShown(items.length); return; }
    let t: ReturnType<typeof setInterval> | undefined;
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      t = setInterval(() => setShown((n) => { if (n + 1 >= items.length && t) clearInterval(t); return Math.min(items.length, n + 1); }), 420);
    }, { threshold: 0.35 });
    io.observe(ref.current!);
    return () => { io.disconnect(); if (t) clearInterval(t); };
  }, []);
  return (
    <div ref={ref} className="fl-notes" role="list">
      {items.map((m, i) => (
        <div key={m.app + i} role="listitem" className={`fl-note${i < shown ? " is-in" : ""}`}>
          <span className="fl-note-dot" aria-hidden="true" />
          <div>
            <p className="fl-note-top"><strong>{m.app}</strong><span>{m.when}</span></p>
            <p>{m.text}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
