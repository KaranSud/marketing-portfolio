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
  // "tweet" -> src is the X/Twitter post url; "iframe" -> any embeddable url.
  type: "youtube" | "video" | "tweet" | "iframe";
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
  // ── Landing pages ──
  {
    id: "lp-fereai",
    category: "landing",
    title: "Fere AI",
    client: "Fere AI",
    description: "Marketing site for the AI trading agent.",
    image: "/samples/landing-fereai.png",
    href: "https://www.fereai.xyz/",
  },
  {
    id: "lp-novaswap",
    category: "landing",
    title: "Novaswap",
    client: "Novaswap",
    description: "Landing page for the cross-chain stablecoin DEX.",
    image: "/samples/landing-novaswap.png",
    href: "https://www.novaswap.io/",
  },
  // ── Blog posts (external + on-site) ──
  {
    id: "blog-fereai",
    category: "writing",
    title: "Fere AI Blog",
    client: "Fere AI",
    description: "Long-form posts I wrote and ran for Fere AI.",
    image: "/samples/blog-fereai.png",
    href: "https://blog.fereai.xyz/",
  },
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
  // ── Social posts (embedded; click a card to view the post on the site) ──
  { id: "x-2046250966232776719", category: "post", client: "Novaswap", title: "Novaswap on X", description: "Posted Apr 20, 2026", date: "2026-04-20", accent: "teal", embed: { type: "tweet", src: "https://x.com/Novaswap/status/2046250966232776719" }, href: "https://x.com/Novaswap/status/2046250966232776719" },
  { id: "x-2045469594979312048", category: "post", client: "Novaswap", title: "Novaswap on X", description: "Posted Apr 18, 2026", date: "2026-04-18", accent: "teal", embed: { type: "tweet", src: "https://x.com/Novaswap/status/2045469594979312048" }, href: "https://x.com/Novaswap/status/2045469594979312048" },
  { id: "x-2043691923588936108", category: "post", client: "Novaswap", title: "Novaswap on X", description: "Posted Apr 13, 2026", date: "2026-04-13", accent: "teal", embed: { type: "tweet", src: "https://x.com/Novaswap/status/2043691923588936108" }, href: "https://x.com/Novaswap/status/2043691923588936108" },
  { id: "x-2041173474572640727", category: "post", client: "Novaswap", title: "Novaswap on X", description: "Posted Apr 6, 2026", date: "2026-04-06", accent: "teal", embed: { type: "tweet", src: "https://x.com/Novaswap/status/2041173474572640727" }, href: "https://x.com/Novaswap/status/2041173474572640727" },
  { id: "x-2040484413835038860", category: "post", client: "Novaswap", title: "Novaswap on X", description: "Posted Apr 4, 2026", date: "2026-04-04", accent: "teal", embed: { type: "tweet", src: "https://x.com/Novaswap/status/2040484413835038860" }, href: "https://x.com/Novaswap/status/2040484413835038860" },
  { id: "x-2034985775004319773", category: "post", client: "Novaswap", title: "Novaswap on X", description: "Posted Mar 20, 2026", date: "2026-03-20", accent: "teal", embed: { type: "tweet", src: "https://x.com/Novaswap/status/2034985775004319773" }, href: "https://x.com/Novaswap/status/2034985775004319773" },
  { id: "x-2034313721175232921", category: "post", client: "Fere AI", title: "Fere AI on X", description: "Posted Mar 18, 2026", date: "2026-03-18", accent: "sage", embed: { type: "tweet", src: "https://x.com/fere_ai/status/2034313721175232921" }, href: "https://x.com/fere_ai/status/2034313721175232921" },
  { id: "x-2032087217028677869", category: "post", client: "Novaswap", title: "Novaswap on X", description: "Posted Mar 12, 2026", date: "2026-03-12", accent: "teal", embed: { type: "tweet", src: "https://x.com/Novaswap/status/2032087217028677869" }, href: "https://x.com/Novaswap/status/2032087217028677869" },
  { id: "x-2028477554466988226", category: "post", client: "Fere AI", title: "Fere AI on X", description: "Posted Mar 2, 2026", date: "2026-03-02", accent: "sage", embed: { type: "tweet", src: "https://x.com/fere_ai/status/2028477554466988226" }, href: "https://x.com/fere_ai/status/2028477554466988226" },
  { id: "x-2026999094502359452", category: "post", client: "Fere AI", title: "Fere AI on X", description: "Posted Feb 26, 2026", date: "2026-02-26", accent: "sage", embed: { type: "tweet", src: "https://x.com/fere_ai/status/2026999094502359452" }, href: "https://x.com/fere_ai/status/2026999094502359452" },
  { id: "x-2008534109770182673", category: "post", client: "Fere AI", title: "Fere AI on X", description: "Posted Jan 6, 2026", date: "2026-01-06", accent: "sage", embed: { type: "tweet", src: "https://x.com/fere_ai/status/2008534109770182673" }, href: "https://x.com/fere_ai/status/2008534109770182673" },
  { id: "x-1998407325535838465", category: "post", client: "Fere AI", title: "Fere AI on X", description: "Posted Dec 9, 2025", date: "2025-12-09", accent: "sage", embed: { type: "tweet", src: "https://x.com/fere_ai/status/1998407325535838465" }, href: "https://x.com/fere_ai/status/1998407325535838465" },
  { id: "x-1977773856468181475", category: "post", client: "Fere AI", title: "Fere AI on X", description: "Posted Oct 13, 2025", date: "2025-10-13", accent: "sage", embed: { type: "tweet", src: "https://x.com/fere_ai/status/1977773856468181475" }, href: "https://x.com/fere_ai/status/1977773856468181475" },
  { id: "x-1946583737040613669", category: "post", client: "FanTV", title: "FanTV on X", description: "Posted Jul 19, 2025", date: "2025-07-19", accent: "violet", embed: { type: "tweet", src: "https://x.com/FanTV_official/status/1946583737040613669" }, href: "https://x.com/FanTV_official/status/1946583737040613669" },
  { id: "x-1923014684761858414", category: "post", client: "FanTV", title: "FanTV on X", description: "Posted May 15, 2025", date: "2025-05-15", accent: "violet", embed: { type: "tweet", src: "https://x.com/FanTV_official/status/1923014684761858414" }, href: "https://x.com/FanTV_official/status/1923014684761858414" },
  { id: "x-1908155413578567980", category: "post", client: "FanTV", title: "FanTV on X", description: "Posted Apr 4, 2025", date: "2025-04-04", accent: "violet", embed: { type: "tweet", src: "https://x.com/FanTV_official/status/1908155413578567980" }, href: "https://x.com/FanTV_official/status/1908155413578567980" },
  { id: "x-1895474817693847849", category: "post", client: "FanTV", title: "FanTV on X", description: "Posted Feb 28, 2025", date: "2025-02-28", accent: "violet", embed: { type: "tweet", src: "https://x.com/FanTV_official/status/1895474817693847849" }, href: "https://x.com/FanTV_official/status/1895474817693847849" },
  { id: "x-1895080873084457038", category: "post", client: "FanTV", title: "FanTV on X", description: "Posted Feb 27, 2025", date: "2025-02-27", accent: "violet", embed: { type: "tweet", src: "https://x.com/FanTV_official/status/1895080873084457038" }, href: "https://x.com/FanTV_official/status/1895080873084457038" },
];

export function categoriesWithItems(): typeof CATEGORIES {
  const present = new Set(showcase.map((i) => i.category));
  return CATEGORIES.filter((c) => present.has(c.id));
}
