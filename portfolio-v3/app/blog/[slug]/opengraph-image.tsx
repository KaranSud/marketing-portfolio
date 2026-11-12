import { getPost, getSlugs } from "@/lib/blog";
import { articleHeader, HEADER_SIZE } from "@/lib/articleHeader";

export const size = HEADER_SIZE;
export const contentType = "image/png";
export const alt = "The key number from the article, with Karan Sud";

export function generateStaticParams() {
  return getSlugs().map((slug) => ({ slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = getPost(slug)!;
  // Sentence case: keep acronyms and mixed-case words (AI, B2B, SaaS), lower plain capitalised words.
  const words = (p.tags[0] ?? "writing").split(" ").map((w) => (/^[A-Z][a-z]+$/.test(w) ? w.toLowerCase() : w));
  const topic = words.join(" ").replace(/^./, (c) => c.toUpperCase());
  return articleHeader({ slug, topic });
}
