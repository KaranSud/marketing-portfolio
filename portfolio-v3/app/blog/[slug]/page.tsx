import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { marked } from "marked";
import FlowNav from "@/components/flow/FlowNav";
import { flowFonts } from "@/components/flow/fonts";
import "@/app/flow/flow.css";
import FlowFooter from "@/components/flow/FlowFooter";
import ChartFrames from "@/components/flow/ChartFrames";
import { getPost, getSlugs } from "@/lib/blog";
import { hooks } from "@/lib/hooks";

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
          <figure className="fl-post-cover">
            <Image src={`/blog/${slug}/opengraph-image`} alt={hooks[slug] ? `${hooks[slug].stat} ${hooks[slug].line}` : ""} width={1200} height={630} sizes="(max-width: 1148px) 100vw, 1100px" priority />
          </figure>
          <header className="fl-case-head">
            <h1>{post.title}</h1>
            <p className="fl-case-lede">{post.description}</p>
            <p className="fl-case-meta">{formatDate(post.date)} · {post.readingTime} · {post.author}</p>
          </header>
          <div className="prose fl-prose" dangerouslySetInnerHTML={{ __html: html }} />
          <ChartFrames />
        </article>
        <Link className="fl-next" href="/blog">
          <span className="fl-muted">More writing</span>
          <strong>All posts</strong>
        </Link>
      </main>
      <FlowFooter />
    </div>
  );
}
