"use client";

import { useEffect, useRef, useState } from "react";

// easyui "Animated Number Morph", ported: each digit is a column of 0 to 9 that rolls into
// place once the number enters the screen; other characters stay put. Reduced motion: no roll.
export default function RollNumber({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [on, setOn] = useState(false);
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) { setOn(true); return; }
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setOn(true); io.disconnect(); } }, { threshold: 0.6 });
    io.observe(ref.current!);
    return () => io.disconnect();
  }, []);
  return (
    <span ref={ref} className="fl-roll-wrap">
    <span className="sr-only">{value}</span>
    <span className={`fl-roll${on ? " is-on" : ""}`} aria-hidden="true">
      {[...value].map((ch, i) =>
        /\d/.test(ch) ? (
          <span key={i} className="fl-roll-col" aria-hidden="true" style={{ ["--d" as string]: ch, ["--i" as string]: i }}>{ch}</span>
        ) : (
          <span key={i} aria-hidden="true">{ch}</span>
        )
      )}
    </span>
    </span>
  );
}
