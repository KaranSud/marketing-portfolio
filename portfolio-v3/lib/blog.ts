import fs from "node:fs";
import path from "node:path";
import { load } from "js-yaml";

const BLOG_DIR = path.join(process.cwd(), "content/blog");

type FrontMatter = Record<string, unknown>;

// A leading `---` YAML block, then the markdown body.
const FRONT_MATTER = /^---\r?\n([\s\S]*?)\r?\n---[ \t]*(?:\r?\n|$)/;

function matter(raw: string): { data: FrontMatter; content: string } {
  const match = FRONT_MATTER.exec(raw);
  if (!match) return { data: {}, content: raw };
  return { data: (load(match[1]) ?? {}) as FrontMatter, content: raw.slice(match[0].length) };
}

export type PostMeta = {
  slug: string;
  title: string;
  description: string;
  date: string; // ISO
  tags: string[];
  author: string;
  readingTime: string;
  accent: string; // sage | teal | violet (drives the header graphic)
};
export type Post = PostMeta & { content: string };

function readingTime(text: string): string {
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  return `${Math.max(1, Math.round(words / 200))} min read`;
}

function toMeta(slug: string, data: FrontMatter, content: string): PostMeta {
  return {
    slug,
    title: typeof data.title === "string" ? data.title : slug,
    description: typeof data.description === "string" ? data.description : "",
    date: data.date ? new Date(data.date as string | number | Date).toISOString() : new Date().toISOString(),
    tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
    author: typeof data.author === "string" ? data.author : "Karan Sud",
    readingTime: readingTime(content),
    accent: typeof data.accent === "string" && ["sage", "teal", "violet", "amber"].includes(data.accent)
      ? data.accent
      : "sage",
  };
}

export function getAllPosts(): PostMeta[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  const files = fs
    .readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith(".md") || f.endsWith(".mdx"));
  const posts = files.map((file) => {
    const slug = file.replace(/\.mdx?$/, "");
    const raw = fs.readFileSync(path.join(BLOG_DIR, file), "utf8");
    const { data, content } = matter(raw);
    return toMeta(slug, data, content);
  });
  return posts.sort((a, b) => +new Date(b.date) - +new Date(a.date));
}

export function getPost(slug: string): Post | null {
  const md = path.join(BLOG_DIR, `${slug}.md`);
  const mdx = path.join(BLOG_DIR, `${slug}.mdx`);
  const file = fs.existsSync(md) ? md : fs.existsSync(mdx) ? mdx : null;
  if (!file) return null;
  const raw = fs.readFileSync(file, "utf8");
  const { data, content } = matter(raw);
  return { ...toMeta(slug, data, content), content };
}

export function getSlugs(): string[] {
  return getAllPosts().map((p) => p.slug);
}
