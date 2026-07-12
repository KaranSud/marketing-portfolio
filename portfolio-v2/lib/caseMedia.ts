import fs from "fs";
import path from "path";
import { caseStudies } from "./caseStudies";

export type MediaItem = { src: string; type: "image" | "video" };
export type BeforeAfterPair = { before: string; after: string };
export type CaseMedia = { creatives: MediaItem[]; beforeAfter: BeforeAfterPair[] };
export type MediaMap = Record<string, CaseMedia>;

const IMAGE_EXT = new Set([".png", ".jpg", ".jpeg", ".webp", ".gif", ".avif"]);
const VIDEO_EXT = new Set([".mp4", ".webm", ".mov"]);

const RESULTS_DIR = path.join(process.cwd(), "public", "Results");

function mediaType(file: string): "image" | "video" | null {
  const ext = path.extname(file).toLowerCase();
  if (IMAGE_EXT.has(ext)) return "image";
  if (VIDEO_EXT.has(ext)) return "video";
  return null;
}

/** Natural sort so 2 comes before 10. */
function naturalCompare(a: string, b: string) {
  return a.localeCompare(b, undefined, { numeric: true, sensitivity: "base" });
}

function listFiles(dir: string): string[] {
  try {
    return fs
      .readdirSync(dir, { withFileTypes: true })
      .filter((d) => d.isFile() && !d.name.startsWith("."))
      .map((d) => d.name)
      .sort(naturalCompare);
  } catch {
    return [];
  }
}

function scanCreatives(brandDir: string, urlBase: string): MediaItem[] {
  const items: MediaItem[] = [];
  for (const name of listFiles(path.join(brandDir, "creatives"))) {
    const type = mediaType(name);
    if (type) items.push({ src: `${urlBase}/creatives/${name}`, type });
  }
  return items;
}

/**
 * Pairs files named `<n>-before.<ext>` / `<n>-after.<ext>` inside
 * `before-after/`. Only complete pairs are returned, ordered by n.
 */
function scanBeforeAfter(brandDir: string, urlBase: string): BeforeAfterPair[] {
  const befores = new Map<string, string>();
  const afters = new Map<string, string>();
  for (const name of listFiles(path.join(brandDir, "before-after"))) {
    if (!mediaType(name)) continue;
    const m = name.match(/^(.+?)[-_ ]?(before|after)\.[^.]+$/i);
    if (!m) continue;
    const key = m[1].toLowerCase();
    const url = `${urlBase}/before-after/${name}`;
    if (m[2].toLowerCase() === "before") befores.set(key, url);
    else afters.set(key, url);
  }
  const pairs: BeforeAfterPair[] = [];
  for (const key of [...befores.keys()].sort(naturalCompare)) {
    const after = afters.get(key);
    if (after) pairs.push({ before: befores.get(key)!, after });
  }
  return pairs;
}

/**
 * Server-only. Scans public/Results/<mediaDir>/ for each case study and
 * returns a map keyed by case key. Folders that don't exist yet simply
 * yield empty media, so cases render unchanged until assets are dropped in.
 */
export function getCaseMediaMap(): MediaMap {
  const map: MediaMap = {};
  for (const c of caseStudies) {
    if (!c.mediaDir) continue;
    const brandDir = path.join(RESULTS_DIR, c.mediaDir);
    const urlBase = `/Results/${c.mediaDir}`;
    const media: CaseMedia = {
      creatives: scanCreatives(brandDir, urlBase),
      beforeAfter: scanBeforeAfter(brandDir, urlBase),
    };
    if (media.creatives.length || media.beforeAfter.length) map[c.key] = media;
  }
  return map;
}
