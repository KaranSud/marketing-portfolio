// Content showcase: a gallery of work samples across formats. Each item is
// shown one of three ways:
//   1. image        -> opens in a lightbox to view on the site
//   2. embed (video) -> opens in a lightbox to watch on the site
//   3. href only    -> the card links out to the original (redirect)
// An item can have both an `image`/`accent` thumbnail AND an `href`, in which
// case the thumbnail is the preview and the card opens the original.

export type ShowcaseCategory =
  | "email"
  | "landing"
  | "seo"
  | "writing"
  | "design"
  | "post";

export type Embed = {
  // "youtube" -> src is the video id or full url; "video" -> src is an mp4 url;
  // "iframe" -> src is any embeddable url.
  type: "youtube" | "video" | "iframe";
  src: string;
};

export type ShowcaseItem = {
  id: string;
  category: ShowcaseCategory;
  title: string;
  description?: string;
  client?: string;
  date?: string; // ISO, optional, newest first within a category
  tags?: string[];
  /** Screenshot/preview under /public (e.g. /samples/email-acme.png). */
  image?: string;
  /** If no image, a gradient + mesh thumbnail in this accent is drawn instead. */
  accent?: "sage" | "teal" | "violet" | "amber";
  /** External link to the original. Set this for landing pages, articles, posts. */
  href?: string;
  /** Inline video/embed to watch on the site. */
  embed?: Embed;
};

export const CATEGORIES: {
  id: ShowcaseCategory;
  label: string;
  blurb: string;
}[] = [
  { id: "email", label: "Emails", blurb: "Lifecycle and campaign emails I built and wrote." },
  { id: "landing", label: "Landing pages", blurb: "Pages I designed, wrote, and shipped." },
  { id: "seo", label: "SEO articles", blurb: "Long-form search content I wrote." },
  { id: "writing", label: "Blog posts", blurb: "Blogs and bylines I wrote." },
  { id: "design", label: "Designs", blurb: "Brand, social, and visual work." },
  { id: "post", label: "Social posts", blurb: "Posts and reels, watch here or on the platform." },
];

// ── Items ──────────────────────────────────────────────────────────────────
// Add new work here. Examples of each kind:
//
//   Landing page / article / external blog (a real public URL):
//     { id, category: "landing", title, client, href: "https://...", image: "/samples/x.png" }
//     (give me the URL and I will capture the screenshot for image)
//
//   Email or design (a file, no public URL):
//     { id, category: "email", title, image: "/samples/email-x.png" }
//
//   Video or reel to watch on the site:
//     { id, category: "post", title, embed: { type: "youtube", src: "VIDEO_ID" } }
//
//   Social post to redirect to:
//     { id, category: "post", title, image: "/samples/post-x.png", href: "https://..." }

export const showcase: ShowcaseItem[] = [
  {
    id: "blog-how-built",
    category: "writing",
    title: "How I built a free account research and outbound engine",
    description: "A technical walkthrough of the tool's infrastructure and data layer.",
    href: "/blog/how-i-built-the-account-research-engine",
    accent: "sage",
    date: "2026-06-16",
    tags: ["Building", "AI"],
  },
  {
    id: "blog-why-built",
    category: "writing",
    title: "Why I built my own outbound tool instead of buying one",
    description: "The reasoning behind building from scratch on free, cited data.",
    href: "/blog/why-i-built-my-own-outbound-tool",
    accent: "teal",
    date: "2026-06-15",
    tags: ["GTM", "Decisions"],
  },
  {
    id: "blog-leads-free",
    category: "writing",
    title: "Finding real leads with no paid data",
    description: "How the discovery engine builds a target list from open data.",
    href: "/blog/finding-real-leads-with-no-paid-data",
    accent: "violet",
    date: "2026-06-14",
    tags: ["Lead generation", "Data"],
  },
];

export function categoriesWithItems(): typeof CATEGORIES {
  const present = new Set(showcase.map((i) => i.category));
  return CATEGORIES.filter((c) => present.has(c.id));
}
