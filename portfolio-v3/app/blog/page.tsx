import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import StickyCta from "@/components/StickyCta";
import BookButton from "@/components/BookButton";
import { getAllPosts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Writing on AI marketing",
  description:
    "Essays by Karan Sud on how AI is changing marketing, content and growth, plus three posts on building his own outbound engine.",
  alternates: { canonical: "/blog" },
  openGraph: {
    title: "Writing on AI marketing, by Karan Sud",
    description: "Essays on how AI is changing marketing, content and growth.",
    url: "/blog",
    type: "website",
  },
};

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-GB", { year: "numeric", month: "short", day: "numeric" });
}

// The three posts about building the outbound engine are the builder proof, so they lead.
const BUILDER = ["why-i-built-my-own-outbound-tool", "how-i-built-the-account-research-engine", "finding-real-leads-with-no-paid-data"];

type PostMeta = ReturnType<typeof getAllPosts>[number];

function PostList({ posts }: { posts: PostMeta[] }) {
  return (
    <ol className="v3-blog-list">
      {posts.map((p) => (
        <li key={p.slug}>
          <Link className="v3-blog-row" href={`/blog/${p.slug}`}>
            <span className="v3-blog-title">{p.title}</span>
            <span className="v3-blog-desc">{p.description}</span>
            <span className="v3-blog-meta">
              <time dateTime={p.date}>{formatDate(p.date)}</time> · {p.readingTime}
            </span>
          </Link>
        </li>
      ))}
    </ol>
  );
}

export default function BlogIndex() {
  const all = getAllPosts();
  const builder = BUILDER.map((s) => all.find((p) => p.slug === s)).filter((p): p is PostMeta => Boolean(p));
  const essays = all.filter((p) => !BUILDER.includes(p.slug));
  return (
    <>
      <Nav />
      <main id="main" className="v3-casepage v3-blog">
        <h1>Writing on AI marketing</h1>
        <p className="v3-statement v3-casepage-lede">
          Essays on how AI is changing marketing, content and growth, plus three posts on building my own outbound
          engine.
        </p>
        <h2 className="v3-h2 v3-blog-group">Building my own outbound engine</h2>
        <PostList posts={builder} />
        <h2 className="v3-h2 v3-blog-group">Essays on AI marketing</h2>
        <PostList posts={essays} />
        <div className="v3-casepage-next">
          <div>
            <p className="v3-statement">I run growth and content for brands and founders. If yours needs an audience, let&apos;s talk.</p>
            <div style={{ marginTop: 24 }}>
              <BookButton />
            </div>
          </div>
          <Link className="v3-next" href="/#work">
            <small>See the work</small>
            <span>Case studies</span>
          </Link>
        </div>
      </main>
      <Footer />
      <StickyCta />
    </>
  );
}
