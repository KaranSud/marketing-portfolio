"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

type Item = {
  key: string;
  title: string;
  kind: string;
  image: string | null;
  video: string | null;
  isLogo: boolean;
};

function Media({ it, sizes }: { it: Item; sizes: string }) {
  if (it.video) {
    // Plays only for visitors who have not asked for reduced motion.
    return (
      <video
        src={it.video}
        poster={it.image ?? undefined}
        muted
        loop
        playsInline
        preload="metadata"
        ref={(v) => {
          if (v && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) v.play().catch(() => {});
        }}
      />
    );
  }
  return it.image ? <Image src={it.image} alt="" fill sizes={sizes} loading="lazy" /> : null;
}

// Signature move: the names are the index. Pointing at (or focusing) a row
// lights it and swaps the fixed preview; on touch each row carries its own image.
export default function WorkIndex({ items }: { items: Item[] }) {
  const [active, setActive] = useState(items[0]?.key);
  return (
    <div className="v3-index">
      <ul className="v3-index-list">
        {items.map((it, i) => (
          <li key={it.key} data-reveal style={{ ["--i" as string]: Math.min(i, 6) }}>
            <Link
              href={`/work/${it.key}`}
              className={`v3-index-row${active === it.key ? " is-active" : ""}`}
              onPointerEnter={() => setActive(it.key)}
              onFocus={() => setActive(it.key)}
            >
              {it.image ? (
                <span className={`v3-index-inline${it.isLogo ? " is-logo" : ""}`} aria-hidden="true">
                  <Media it={it} sizes="100vw" />
                </span>
              ) : null}
              <span className="v3-index-name">{it.title}</span>
              <span className="v3-index-kind">{it.kind}</span>
            </Link>
          </li>
        ))}
      </ul>
      <div className="v3-index-frame" aria-hidden="true">
        {items.map((it) =>
          it.image ? (
            <figure key={it.key} className={`${active === it.key ? "is-active" : ""}${it.isLogo ? " is-logo" : ""}`}>
              <Media it={it} sizes="30vw" />
            </figure>
          ) : null
        )}
      </div>
    </div>
  );
}
