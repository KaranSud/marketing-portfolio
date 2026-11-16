import { caseStudies, getCase } from "@/lib/caseStudies";
import { articleHeader, HEADER_SIZE } from "@/lib/articleHeader";

// Share image for a case page: the case's first number (from caseStudies.ts) in the article-header card.
// A case with no numbers shows the client name and the kind of work.
export const size = HEADER_SIZE;
export const contentType = "image/png";
export const alt = "The headline number from the case study, with Karan Sud";

export function generateStaticParams() {
  return caseStudies.map((c) => ({ slug: c.key }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const c = getCase(slug)!;
  const s = c.stats[0];
  return articleHeader({
    slug,
    topic: s ? `${c.title}, case study` : "Case study",
    hook: s ? { stat: s.val, line: s.label } : { stat: c.title, line: c.kind },
  });
}
