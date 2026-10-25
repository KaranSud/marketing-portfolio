"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import type { Post } from "@/lib/posts";

// The pivot: a pinned stretch where real posts ride horizontal lanes in, each lane
// at its own speed, like tracers in a wind tunnel. Scroll drives it (one rAF-throttled
// listener writing a CSS variable); nothing is hijacked. Reduced motion: lanes sit still.
export default function Turn({ posts }: { posts: Post[] }) {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = ref.current!;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) { el.style.setProperty("--p", "0.5"); return; }
    let raf = 0;
    const set = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      const p = Math.min(1, Math.max(0, -r.top / (r.height - innerHeight)));
      el.style.setProperty("--p", p.toFixed(4));
    };
    const on = () => { if (!raf) raf = requestAnimationFrame(set); };
    set();
    addEventListener("scroll", on, { passive: true });
    addEventListener("resize", on);
    return () => { removeEventListener("scroll", on); removeEventListener("resize", on); cancelAnimationFrame(raf); };
  }, []);
  const lanes = [0, 1, 2, 3].map((l) => posts.filter((_, i) => i % 4 === l));
  return (
    <section ref={ref} className="fl-turn" aria-label="From engineering to marketing">
      <div className="fl-turn-pin">
        <p className="fl-turn-line">
          <span>Same instinct for flow.</span> <span>A different fluid: attention.</span>
        </p>
        <div className="fl-lanes" aria-hidden="true">
          {lanes.map((lane, l) => (
            <div key={l} className="fl-lane" style={{ ["--s" as string]: [1.1, 0.75, 1.35, 0.9][l], ["--o" as string]: l % 2 }}>
              {[...lane, ...lane].map((p, k) => (
                <div key={k} className="fl-lane-tile" style={{ aspectRatio: `${p.w} / ${p.h}` }}>
                  <Image src={p.src} alt="" fill sizes="220px" />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
