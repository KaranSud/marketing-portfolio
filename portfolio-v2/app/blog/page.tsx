import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import { BlogThumb } from "@/components/BlogHeader";
import { getAllPosts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "How I built a free account research and outbound engine, why I built it, and how it works, by Karan Sud.",
  alternates: { canonical: "/blog" },
  openGraph: {
    title: "Blog by Karan Sud",
    description:
      "How I built a free account research and outbound engine, why, and how it works.",
    url: "/blog",
    type: "website",
  },
};

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function BlogIndex() {
  const posts = getAllPosts();
  return (
    <>
      <Nav />
      <main className="page-wrap">
        <header className="page-head">
          <div className="eyebrow">Blog</div>
          <h1 className="page-h1">
            Building the <em>outbound engine</em>
          </h1>
          <p className="page-sub">
            How I built a free account research and outreach tool, why it made
            sense to build it myself, and how it works under the hood.
          </p>
        </header>

        <div className="post-list">
          {posts.length === 0 ? (
            <p className="page-sub">Posts are on the way.</p>
          ) : (
            posts.map((p) => (
              <Link className="post-card" href={`/blog/${p.slug}`} key={p.slug}>
                <BlogThumb accent={p.accent} />
                <div className="post-card-body">
                  <div className="post-meta">
                    <time dateTime={p.date}>{formatDate(p.date)}</time>
                    <span aria-hidden>·</span>
                    <span>{p.readingTime}</span>
                  </div>
                  <h2 className="post-title">{p.title}</h2>
                  <p className="post-desc">{p.description}</p>
                  <div className="post-tags">
                    {p.tags.map((t) => (
                      <span key={t}>{t}</span>
                    ))}
                  </div>
                </div>
              </Link>
            ))
          )}
        </div>
      </main>
      <footer>
        <div className="footer-inner">
          <span className="footer-name">Karan Sud</span>
          <span className="footer-tag">
            &copy; {new Date().getFullYear()} Making brands impossible to ignore
          </span>
        </div>
      </footer>
    </>
  );
}
