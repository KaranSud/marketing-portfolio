"use client";

import { useEffect, useRef } from "react";

// easyui "Interactive Timeline", ported: the line draws itself as you scroll and each stop
// lights up as the line reaches it. Dates from Karan's resume and his own words (facts.md).
const stops = [
  { when: "Degree", title: "Mechanical engineering", body: "B.Tech, APJ Abdul Kalam Technical University." },
  { when: "2022 to 2023", title: "Worked in CFD", body: "Simulating how air flows. Systems, models and a lot of iteration." },
  { when: "June 2023", title: "Moved into marketing", body: "Same instinct, new fluid: attention." },
  { when: "2023 to 2024", title: "Mach1 Digital and The SportsRush", body: "Agency accounts including Tony Roma's and Opaque Studio, then US sports on Instagram." },
  { when: "2024 to 2025", title: "FanTV AI", body: "Social Media Marketing Manager, and the founder's own brand on X." },
  { when: "2025 to 2026", title: "Crowwd Labs", body: "Senior Content Manager for Fere AI, Novaswap, BimaBTC and Defx." },
  { when: "Now", title: "Brands and founders", body: "Projects and part-time work, from Noida, India." },
];

export default function Timeline() {
  const ref = useRef<HTMLOListElement>(null);
  useEffect(() => {
    const el = ref.current!;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) { el.style.setProperty("--p", "1"); el.querySelectorAll("li").forEach((li) => li.classList.add("is-on")); return; }
    let raf = 0;
    const set = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      const p = Math.min(1, Math.max(0, (innerHeight * 0.7 - r.top) / r.height));
      el.style.setProperty("--p", p.toFixed(4));
      el.querySelectorAll("li").forEach((li) => {
        const lr = li.getBoundingClientRect();
        li.classList.toggle("is-on", lr.top < innerHeight * 0.7);
      });
    };
    const on = () => { if (!raf) raf = requestAnimationFrame(set); };
    set();
    addEventListener("scroll", on, { passive: true });
    return () => { removeEventListener("scroll", on); cancelAnimationFrame(raf); };
  }, []);
  return (
    <ol ref={ref} className="fl-time">
      {stops.map((s) => (
        <li key={s.title}>
          <span className="fl-time-when">{s.when}</span>
          <strong>{s.title}</strong>
          <span className="fl-time-body">{s.body}</span>
        </li>
      ))}
    </ol>
  );
}
