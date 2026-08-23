import { getAllPosts, getPost } from "@/lib/blog";

const SITE = "https://karan-sud-portfolio.vercel.app";

export const dynamic = "force-static";

function esc(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

// Full-text RSS. Medium's "import a story" flow and most syndication tools read
// content:encoded, so the whole post ships in the feed rather than a teaser.
export async function GET() {
  const posts = getAllPosts();
  const updated = posts[0]?.date ?? new Date().toISOString();

  const items = posts
    .map((meta) => {
      const post = getPost(meta.slug);
      const url = `${SITE}/blog/${meta.slug}`;
      const body = post?.content ?? "";
      return [
        "    <item>",
        `      <title>${esc(meta.title)}</title>`,
        `      <link>${url}</link>`,
        `      <guid isPermaLink="true">${url}</guid>`,
        `      <pubDate>${new Date(meta.date).toUTCString()}</pubDate>`,
        `      <description>${esc(meta.description)}</description>`,
        `      <dc:creator>${esc(meta.author)}</dc:creator>`,
        ...meta.tags.map((t) => `      <category>${esc(t)}</category>`),
        `      <content:encoded><![CDATA[${body.replace(/]]>/g, "]]&gt;")}]]></content:encoded>`,
        "    </item>",
      ].join("\n");
    })
    .join("\n");

  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<rss version="2.0"',
    '     xmlns:content="http://purl.org/rss/1.0/modules/content/"',
    '     xmlns:dc="http://purl.org/dc/elements/1.1/"',
    '     xmlns:atom="http://www.w3.org/2005/Atom">',
    "  <channel>",
    "    <title>Karan Sud</title>",
    `    <link>${SITE}</link>`,
    "    <description>Marketing tech, AI, and SaaS growth.</description>",
    "    <language>en</language>",
    `    <lastBuildDate>${new Date(updated).toUTCString()}</lastBuildDate>`,
    `    <atom:link href="${SITE}/feed.xml" rel="self" type="application/rss+xml" />`,
    items,
    "  </channel>",
    "</rss>",
  ].join("\n");

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=0, s-maxage=3600",
    },
  });
}
