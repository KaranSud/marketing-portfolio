import Image from "next/image";
import type { CSSProperties } from "react";
import type { Creative } from "@/lib/creatives";
import { imageSize } from "@/lib/imageSize";

// Real posts from the account, each shown whole at its own shape and linked to the
// original. On wide screens one row shares a height (each post's width follows its
// ratio); on phones wide covers take the full row. The caption carries the account,
// platform and date.
export default function Posts({
  items,
  label,
  title,
  className,
}: {
  items: Creative[];
  label: string;
  /** A visible label above the posts, for places without their own heading. */
  title?: string;
  className?: string;
}) {
  const list = (
    <ul className={`v3-posts${title ? "" : className ? ` ${className}` : ""}`} aria-label={label}>
      {items.map((p) => {
        const { width, height } = imageSize(p.src);
        const r = width / height;
        return (
          <li key={p.src} className={r >= 1.6 ? "is-wide" : undefined} style={{ ["--r" as string]: r.toFixed(3) } as CSSProperties}>
            <a href={p.href} target="_blank" rel="noopener noreferrer" className="v3-post-tile">
              <Image src={p.src} alt={p.alt} fill sizes="(max-width: 860px) 92vw, 30vw" />
              <span className="sr-only"> (opens the original post)</span>
            </a>
            <p className="v3-caption">{p.caption}</p>
          </li>
        );
      })}
    </ul>
  );
  if (!title) return list;
  return (
    <div className={className}>
      <p className="v3-posts-title">{title}</p>
      {list}
    </div>
  );
}
