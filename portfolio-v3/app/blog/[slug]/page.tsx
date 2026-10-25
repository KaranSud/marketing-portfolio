import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { marked } from "marked";
import FlowNav from "@/components/flow/FlowNav";
import { flowFonts } from "@/components/flow/fonts";
import "@/app/flow/flow.css";
import BookButton from "@/components/BookButton";
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
    <div className={`fl ${flowFonts}`}>
      <FlowNav />
      <main id="main" className="fl-case fl-post">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <article>
          <header className="fl-case-head">
            <h1>{post.title}</h1>
            <p className="fl-case-lede">{post.description}</p>
            <p className="fl-case-meta">{formatDate(post.date)} · {post.readingTime} · {post.author}</p>
          </header>
          <div className="prose fl-prose" dangerouslySetInnerHTML={{ __html: html }} />
        </article>
        <Link className="fl-next" href="/blog">
          <span className="fl-muted">More writing</span>
          <strong>All posts</strong>
        </Link>
      </main>
      <footer className="fl-night">
        <div className="fl-shooting" aria-hidden="true"><i /><i /><i /></div>
        <p className="fl-night-kicker">I run growth and content for brands and founders. If yours needs an audience, let&apos;s talk. The call is free.</p>
        <a className="fl-email" href="mailto:contactkaransud@gmail.com">contactkaransud@gmail.com</a>
        <BookButton className="fl-btn fl-btn-light fl-call" />
      </footer>
    </div>
  );
}
