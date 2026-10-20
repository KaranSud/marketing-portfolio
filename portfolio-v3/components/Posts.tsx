import Image from "next/image";
import type { Creative } from "@/lib/creatives";

// Real posts from the account, each shown whole on a square field and linked to
// the original. The caption carries the account, platform and date.
export default function Posts({ items, label, className }: { items: Creative[]; label: string; className?: string }) {
  return (
    <ul className={`v3-posts${className ? ` ${className}` : ""}`} aria-label={label}>
      {items.map((p) => (
        <li key={p.src}>
          <a href={p.href} target="_blank" rel="noopener noreferrer" className="v3-post">
            <Image src={p.src} alt={p.alt} fill sizes="(max-width: 860px) 46vw, 20vw" />
            <span className="sr-only"> (opens the original post)</span>
          </a>
          <p className="v3-caption">{p.caption}</p>
        </li>
      ))}
    </ul>
  );
}
