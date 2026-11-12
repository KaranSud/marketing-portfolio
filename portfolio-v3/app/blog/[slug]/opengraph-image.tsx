import { getPost, getSlugs } from "@/lib/blog";
import { articleHeader, HEADER_SIZE } from "@/lib/articleHeader";

export const size = HEADER_SIZE;
export const contentType = "image/png";
export const alt = "Article header";

export function generateStaticParams() {
  return getSlugs().map((slug) => ({ slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = getPost(slug)!;
  const topic = p.tags[0] ? p.tags[0].charAt(0).toUpperCase() + p.tags[0].slice(1) : "Writing";
  return articleHeader({ slug, title: p.title, topic, readingTime: p.readingTime });
}
