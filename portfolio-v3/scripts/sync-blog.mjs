#!/usr/bin/env node
// Publishes routine output into the site.
//
// The blog routine writes finished posts to blog-posts/YYYY-MM-DD/. The site
// reads content/blog/*.md. This script bridges the two: it converts each dated
// post folder into a site post, copies its images and charts into public/, and
// swaps the [HERO IMAGE HERE] style markers for real embeds.
//
// Safe to re-run. Existing site posts that did not come from a dated folder
// (the three portfolio pieces) are left alone.
//
//   node scripts/sync-blog.mjs          write the posts
//   node scripts/sync-blog.mjs --dry    report what would change

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const SITE_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const REPO_ROOT = path.resolve(SITE_ROOT, "..");
const POSTS_SRC = path.join(REPO_ROOT, "blog-posts");
const CONTENT_DIR = path.join(SITE_ROOT, "content", "blog");
const ASSET_DIR = path.join(SITE_ROOT, "public", "blog");

const DRY = process.argv.includes("--dry");
const ACCENTS = ["sage", "teal", "violet", "amber"];
const DATED = /^\d{4}-\d{2}-\d{2}$/;

function slugify(title) {
  const full = title
    .toLowerCase()
    .replace(/['’]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
  if (full.length <= 70) return full;
  // Trim back to the last whole word so URLs never end mid-word.
  const cut = full.slice(0, 70);
  const lastDash = cut.lastIndexOf("-");
  return (lastDash > 40 ? cut.slice(0, lastDash) : cut).replace(/-+$/g, "");
}

// hero-image.txt is free text written by the routine. Pull the alt line out of
// it when we can, otherwise fall back to the post title.
function heroAlt(dir, title) {
  const file = path.join(dir, "hero-image.txt");
  if (!fs.existsSync(file)) return title;
  const match = fs
    .readFileSync(file, "utf8")
    .match(/^\s*(?:alt(?:\s*text)?)\s*[:\-]\s*(.+)$/im);
  return match ? match[1].trim().replace(/^["']|["']$/g, "") : title;
}

function yamlList(items) {
  return `[${items.map((t) => JSON.stringify(String(t))).join(", ")}]`;
}

function copyAsset(src, destDir, name) {
  if (!fs.existsSync(src)) return false;
  if (!DRY) {
    fs.mkdirSync(destDir, { recursive: true });
    fs.copyFileSync(src, path.join(destDir, name));
  }
  return true;
}

function chartEmbed(base, file, label) {
  // Charts ship as standalone Chart.js pages. An iframe keeps them interactive
  // without pulling Chart.js into the site bundle.
  return [
    `<figure class="chart-embed">`,
    `  <iframe src="${base}/${file}" title="${label}" loading="lazy" scrolling="no"></iframe>`,
    `</figure>`,
  ].join("\n");
}

const dirs = fs.existsSync(POSTS_SRC)
  ? fs.readdirSync(POSTS_SRC).filter((d) => DATED.test(d)).sort()
  : [];

if (!dirs.length) {
  console.log("No dated post folders found under blog-posts/.");
  process.exit(0);
}

let written = 0;
let skipped = 0;

dirs.forEach((day, i) => {
  const dir = path.join(POSTS_SRC, day);
  const metaFile = path.join(dir, "meta.json");
  const articleFile = path.join(dir, "article.md");

  if (!fs.existsSync(metaFile) || !fs.existsSync(articleFile)) {
    console.warn(`  skip ${day}: missing meta.json or article.md`);
    skipped++;
    return;
  }

  let meta;
  try {
    meta = JSON.parse(fs.readFileSync(metaFile, "utf8"));
  } catch {
    console.warn(`  skip ${day}: meta.json is not valid JSON`);
    skipped++;
    return;
  }

  const title = meta.title || day;
  const slug = slugify(title);
  const assetDir = path.join(ASSET_DIR, slug);
  const assetBase = `/blog/${slug}`;

  const hasHero = copyAsset(path.join(dir, "hero.jpg"), assetDir, "hero.jpg");
  const hasC1 = copyAsset(path.join(dir, "chart1.html"), assetDir, "chart1.html");
  const hasC2 = copyAsset(path.join(dir, "chart2.html"), assetDir, "chart2.html");
  const hasInfo = copyAsset(path.join(dir, "infographic.svg"), assetDir, "infographic.svg");

  let body = fs.readFileSync(articleFile, "utf8");

  // article.md has no frontmatter, but strip one if a future run adds it.
  body = body.replace(/^---\n[\s\S]*?\n---\n/, "");

  // The site renders the title in its own header component, so drop the H1.
  body = body.replace(/^\s*#\s+.+\n/, "");

  const alt = heroAlt(dir, title);
  body = body.replace(
    /\[HERO IMAGE HERE\]/g,
    hasHero ? `![${alt}](${assetBase}/hero.jpg)` : ""
  );
  body = body.replace(
    /\[CHART 1 HERE\]/g,
    hasC1 ? chartEmbed(assetBase, "chart1.html", `${title} chart 1`) : ""
  );
  body = body.replace(
    /\[CHART 2 HERE\]/g,
    hasC2 ? chartEmbed(assetBase, "chart2.html", `${title} chart 2`) : ""
  );
  body = body.replace(
    /\[INFOGRAPHIC HERE\]/g,
    hasInfo ? `![${title}](${assetBase}/infographic.svg)` : ""
  );

  // Any marker the routine invented that we do not handle should not reach the
  // page as literal text.
  body = body.replace(/^\s*\[[A-Z0-9 ]+HERE\]\s*$/gm, "");
  body = body.replace(/\n{3,}/g, "\n\n").trim();

  const frontmatter = [
    "---",
    `title: ${JSON.stringify(title)}`,
    `description: ${JSON.stringify(meta.meta_description || meta.subtitle || "")}`,
    `date: ${JSON.stringify(meta.published_date || day)}`,
    `tags: ${yamlList(meta.tags || [])}`,
    `author: ${JSON.stringify(meta.author || "Karan Sud")}`,
    `accent: ${JSON.stringify(ACCENTS[i % ACCENTS.length])}`,
    `source: ${JSON.stringify(`blog-posts/${day}`)}`,
    "---",
    "",
  ].join("\n");

  const outFile = path.join(CONTENT_DIR, `${slug}.md`);
  const next = frontmatter + body + "\n";
  const prev = fs.existsSync(outFile) ? fs.readFileSync(outFile, "utf8") : null;

  if (prev === next) {
    skipped++;
    return;
  }

  if (!DRY) {
    fs.mkdirSync(CONTENT_DIR, { recursive: true });
    fs.writeFileSync(outFile, next);
  }
  console.log(`  ${prev ? "update" : "  new "}  ${slug}`);
  written++;
});

console.log(
  `\n${DRY ? "[dry run] " : ""}${written} post${written === 1 ? "" : "s"} written, ${skipped} unchanged.`
);
