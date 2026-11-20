// Real posts per client for the work-first layouts. Data files in data/posts/<key>.json are built by
// tasks/v3/workflows/post-media.py (X) and ig-media.py (Instagram) from posts Karan made during each
// tenure (sources in tasks/v3/research/creatives-log.md). Server only: reads the folder at build time.
import fs from "node:fs";
import path from "node:path";
import { creatives } from "./creatives";
import { imageSize } from "./imageSize";

export type Post = {
  src: string; // "" for a text-only post
  w: number;
  h: number;
  video?: string;
  tile?: string; // small silent copy of the reel for the autoplaying tile (tasks/v3/workflows/reel-tiles.sh)
  text?: string;
  alt: string;
  caption: string;
  date: string;
  href: string;
};

const dir = path.join(process.cwd(), "data", "posts");
export const posts: Record<string, Post[]> = Object.fromEntries(
  (fs.existsSync(dir) ? fs.readdirSync(dir) : [])
    .filter((f) => f.endsWith(".json"))
    .map((f) => [f.replace(/\.json$/, ""), withTiles(JSON.parse(fs.readFileSync(path.join(dir, f), "utf8")) as Post[])])
);

function withTiles(list: Post[]): Post[] {
  return list.map((p) => {
    const tile = p.video?.replace(/\.mp4$/, ".tile.mp4");
    return tile && fs.existsSync(path.join(process.cwd(), "public", tile)) ? { ...p, tile } : p;
  });
}

/** Every image post on the site, for walls. Interleaved so neighbours come from different clients. */
export function wallPosts(): Post[] {
  const older = Object.entries(creatives)
    .filter(([key]) => !posts[key])
    .flatMap(([, list]) =>
      list.map((c) => {
        const { width, height } = imageSize(c.src);
        return { src: c.src, w: width, h: height, alt: c.alt, caption: c.caption, href: c.href, date: "" };
      })
    );
  const lists = [...Object.values(posts).map((l) => l.filter((p) => p.src && !p.video)), older];
  const out: Post[] = [];
  for (let i = 0; lists.some((l) => l[i]); i++) for (const l of lists) if (l[i]) out.push(l[i]);
  return out;
}
