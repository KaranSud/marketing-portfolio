import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { marked } from "marked";
import Nav from "@/components/Nav";
import BookButton from "@/components/BookButton";
import StickyCta from "@/components/StickyCta";
import { getPost, getSlugs } from "@/lib/blog";
import Footer from "@/components/Footer";

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
      <main id="main" className="v3-casepage v3-post">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <article>
          <h1>{post.title}</h1>
          <p className="v3-statement v3-casepage-lede">{post.description}</p>
          <p className="v3-casepage-meta">
            {formatDate(post.date)} · {post.readingTime} · {post.author}
          </p>
          <div
            className="prose"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        </article>
        <div className="v3-casepage-next">
          <div>
            <p className="v3-statement">
              I run growth and content for brands and founders. If yours needs an audience, let&apos;s talk.
            </p>
            <div style={{ marginTop: 24 }}>
              <BookButton />
            </div>
          </div>
          <Link className="v3-next" href="/blog">
            <small>More writing</small>
            <span>All posts</span>
          </Link>
        </div>
      </main>
      <Footer />
      <StickyCta />
    </>
  );
}
