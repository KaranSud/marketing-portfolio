import Image from "next/image";
import type { Post } from "@/lib/posts";

// The pivot: real posts ride horizontal lanes, each lane at its own speed, like tracers in a
// wind tunnel. A normal section that scrolls like the rest of the page (no pin, no scroll
// listener); the lanes drift on their own in CSS. Three lanes of ten posts keep it light.
// Reduced motion: lanes sit still (flow.css).
export default function Turn({ posts }: { posts: Post[] }) {
  const lanes = [0, 1, 2].map((l) => posts.filter((_, i) => i % 3 === l).slice(0, 10));
  return (
    <section className="fl-turn" aria-label="From engineering to marketing">
      <p className="fl-turn-line">
        <span>Same instinct for flow.</span> <span>A different fluid: attention.</span>
      </p>
      <div className="fl-lanes" aria-hidden="true">
        {lanes.map((lane, l) => (
          <div key={l} className={`fl-lane${l % 2 ? " is-rev" : ""}`} style={{ ["--dur" as string]: `${[70, 90, 60][l]}s` }}>
            {[...lane, ...lane].map((p, k) => (
              <div key={k} className="fl-lane-tile" style={{ aspectRatio: `${p.w} / ${p.h}` }}>
                <Image src={p.src} alt="" fill sizes="180px" loading="lazy" />
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
