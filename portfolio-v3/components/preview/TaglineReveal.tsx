"use client";

import { useEffect, useRef, useState } from "react";

// Large type that lights up word by word as it crosses the middle of the screen.
// One scroll listener, throttled through requestAnimationFrame. Reduced motion: all lit.
export default function TaglineReveal({ text }: { text: string }) {
  const words = text.split(" ");
  const ref = useRef<HTMLParagraphElement>(null);
  const [lit, setLit] = useState(words.length);
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const measure = () => {
      raf = 0;
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const start = innerHeight * 0.85, end = innerHeight * 0.35;
      const t = Math.min(1, Math.max(0, (start - r.top) / (start - end + r.height * 0.5)));
      setLit(Math.round(t * words.length));
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(measure); };
    measure();
    addEventListener("scroll", onScroll, { passive: true });
    addEventListener("resize", onScroll);
    return () => {
      removeEventListener("scroll", onScroll);
      removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [words.length]);
  return (
    <section className="pv-tagline" aria-label={text}>
      <p ref={ref} aria-hidden="true">
        {words.map((w, k) => (
          <span key={k} className={k < lit ? "is-lit" : undefined}>
            {w}{" "}
          </span>
        ))}
      </p>
    </section>
  );
}
