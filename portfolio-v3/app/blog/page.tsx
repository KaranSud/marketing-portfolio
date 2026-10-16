import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import StickyCta from "@/components/StickyCta";
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

export default function BlogIndex() {
  const posts = getAllPosts();
  return (
    <>
      <Nav />
      <main id="main" className="v3-casepage v3-blog">
        <h1>Writing on AI marketing</h1>
        <p className="v3-statement v3-casepage-lede">
          Essays on how AI is changing marketing, content and growth, plus three posts on building my own outbound
          engine.
        </p>
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
      </main>
      <Footer />
      <StickyCta />
    </>
  );
}
