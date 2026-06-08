import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { marked } from "marked";
import Nav from "@/components/Nav";
import { getPost, getSlugs } from "@/lib/blog";

const SITE = "https://karan-sud-portfolio.vercel.app";

export function generateStaticParams() {
  return getSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return { title: "Not found" };
  const url = `${SITE}/blog/${slug}`;
  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: `/blog/${slug}` },
    openGraph: {
      title: post.title,
      description: post.description,
      url,
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
      tags: post.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
    },
  };
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  // Render markdown to HTML at build time so the content ships in the static
  // HTML (good for SEO). Content is trusted (our own repo files).
  const html = await marked.parse(post.content, { gfm: true });

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.date,
    author: { "@type": "Person", name: post.author, url: SITE },
    keywords: post.tags.join(", "),
    mainEntityOfPage: `${SITE}/blog/${slug}`,
  };

  return (
    <>
      <Nav />
      <main className="page-wrap article">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Link className="back-link" href="/blog">
          ← All writing
        </Link>
        <article>
          <header className="article-head">
            <div className="post-meta">
              <time dateTime={post.date}>{formatDate(post.date)}</time>
              <span aria-hidden>·</span>
              <span>{post.readingTime}</span>
            </div>
            <h1 className="article-title">{post.title}</h1>
            <p className="article-desc">{post.description}</p>
            <div className="post-tags">
              {post.tags.map((t) => (
                <span key={t}>{t}</span>
              ))}
            </div>
          </header>
          <div
            className="prose"
            dangerouslySetInnerHTML={{ __html: html }}
          />
          <footer className="article-foot">
            <span>Written by {post.author}</span>
            <Link href="/blog">More writing →</Link>
          </footer>
        </article>
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
