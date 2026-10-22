import type { ReactNode } from "react";

// Wraps the first mention of each source name in a link to the public page that
// verifies it ("DefiLlama", "Product Hunt"), so a claim and its proof sit together.
export function linkify(text: string, links?: Record<string, string>): ReactNode {
  if (!links) return text;
  const names = Object.keys(links).filter((n) => text.includes(n));
  if (!names.length) return text;
  const out: ReactNode[] = [];
  let rest = text;
  for (const name of names.sort((a, b) => text.indexOf(a) - text.indexOf(b))) {
    const at = rest.indexOf(name);
    if (at < 0) continue;
    out.push(rest.slice(0, at));
    out.push(
      <a key={name} className="tlink" href={links[name]} target="_blank" rel="noopener noreferrer">
        {name}
      </a>
    );
    rest = rest.slice(at + name.length);
  }
  out.push(rest);
  return out;
}
