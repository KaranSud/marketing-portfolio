import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import { getAllPosts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Writing",
  description:
    "Essays on outbound, go to market, AI tooling, and building, by Karan Sud.",
  alternates: { canonical: "/blog" },
  openGraph: {
    title: "Writing by Karan Sud",
    description:
      "Essays on outbound, go to market, AI tooling, and building.",
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
          <div className="eyebrow">Writing</div>
          <h1 className="page-h1">
            Notes on outbound, GTM, <em>and building</em>
          </h1>
          <p className="page-sub">
            Essays on running pipeline, AI tooling, and the craft of marketing
            that ships.
          </p>
        </header>

        <div className="post-list">
          {posts.length === 0 ? (
            <p className="page-sub">Posts are on the way.</p>
          ) : (
            posts.map((p) => (
              <Link className="post-card" href={`/blog/${p.slug}`} key={p.slug}>
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
