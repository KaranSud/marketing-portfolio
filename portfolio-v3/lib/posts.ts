// Real posts per client for the work-first layout. Data files are built by
// tasks/v3/workflows/post-media.py from posts Karan made during each tenure (sources in
// tasks/v3/research/creatives-log.md).
import fantv from "@/data/posts/fantv.json";
import { creatives } from "./creatives";
import { imageSize } from "./imageSize";

export type Post = {
  src: string;
  w: number;
  h: number;
  video?: string;
  alt: string;
  caption: string;
  date: string;
  href: string;
};

export const posts: Record<string, Post[]> = { fantv };

/** Every image post on the site, for the hero wall. Server only (reads image sizes). */
export function wallPosts(): Post[] {
  const older = Object.entries(creatives)
    .filter(([key]) => !posts[key])
    .flatMap(([, list]) =>
      list.map((c) => ({ ...imageSize(c.src), src: c.src, alt: c.alt, caption: c.caption, href: c.href, date: "" }))
    )
    .map(({ width, height, ...rest }) => ({ ...rest, w: width, h: height }));
  const fresh = Object.values(posts).flat().filter((p) => !p.video);
  // Interleave so neighbouring tiles come from different clients.
  const out: Post[] = [];
  for (let i = 0; i < Math.max(older.length, fresh.length); i++) {
    if (fresh[i]) out.push(fresh[i]);
    if (older[i]) out.push(older[i]);
  }
  return out;
}
