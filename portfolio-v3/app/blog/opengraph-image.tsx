import { getAllPosts } from "@/lib/blog";
import { articleHeader, HEADER_SIZE } from "@/lib/articleHeader";

// Share image for the blog index: how many essays there are, in the article-header card.
export const size = HEADER_SIZE;
export const contentType = "image/png";
export const alt = "Writing on AI marketing, by Karan Sud";

export default function Image() {
  return articleHeader({
    slug: "",
    topic: "Writing",
    hook: { stat: `${getAllPosts().length} essays`, line: "on how AI is changing marketing, content and growth" },
  });
}
