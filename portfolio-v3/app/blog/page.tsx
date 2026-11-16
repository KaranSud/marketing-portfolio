import type { Metadata } from "next";
import Link from "next/link";
import FlowNav from "@/components/flow/FlowNav";
import { flowFonts } from "@/components/flow/fonts";
import "@/app/flow/flow.css";
import FlowFooter from "@/components/flow/FlowFooter";
import { getAllPosts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Writing on AI marketing, by Karan Sud",
  description:
    "Essays by Karan Sud on how AI is changing marketing, content and growth, plus three posts on building his own outbound engine.",
  alternates: { canonical: "/blog" },
  openGraph: {
    title: "Writing on AI marketing, by Karan Sud",
    description: "Essays on how AI is changing marketing, content and growth.",
    url: "/blog",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Writing on AI marketing, by Karan Sud",
    description: "Essays on how AI is changing marketing, content and growth.",
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
    <ol className="fl-blog-list">
      {posts.map((p) => (
        <li key={p.slug}>
          <Link className="fl-blog-row" href={`/blog/${p.slug}`}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="fl-blog-thumb" src={`/blog/${p.slug}/opengraph-image`} alt="" width={240} height={126} loading="lazy" />
            <span className="fl-blog-title">{p.title}</span>
            <span className="fl-blog-desc">{p.description}</span>
            <span className="fl-blog-meta">
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
    <div className={`fl ${flowFonts}`}>
      <FlowNav />
      <main id="main" className="fl-case fl-blog">
        <header className="fl-case-head">
          <h1>Writing on AI marketing</h1>
          <p className="fl-case-lede">
            Each essay starts from one number in a recent study and works out what a marketing team should do about
            it. Plus three posts on building my own outbound engine.
          </p>
        </header>
        <section className="fl-blog-group">
          <h2>Building my own outbound engine</h2>
          <PostList posts={builder} />
        </section>
        <section className="fl-blog-group">
          <h2>Essays on AI marketing</h2>
          <PostList posts={essays} />
        </section>
      </main>
      <FlowFooter />
    </div>
  );
}
