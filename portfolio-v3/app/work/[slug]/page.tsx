import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import FlowFooter from "@/components/flow/FlowFooter";
import BeforeAfterSection, { CompareSlider } from "@/components/BeforeAfterSection";
import FlowNav from "@/components/flow/FlowNav";
import Stream from "@/components/flow/Stream";
import RollNumber from "@/components/flow/RollNumber";
import Reveal from "@/components/flow/Reveal";
import { flowFonts } from "@/components/flow/fonts";
import { caseStudies, getCase } from "@/lib/caseStudies";
import { posts } from "@/lib/posts";
import { creatives } from "@/lib/creatives";
import { imageSize } from "@/lib/imageSize";
import { linkify } from "@/lib/linkify";
import "@/app/flow/flow.css";

// Case pages in the Flow style: the client's own posts first, then the story in short blocks,
// then the analytics proof. Every number comes from caseStudies.ts (facts-checked).

// The closing line matches the kind of client the case was for.
function closer(key: string) {
  if (["prashan", "mohaimina"].includes(key)) return "Want this for your founder?";
  if (["tony", "bones", "potters", "opaque", "sportsrush"].includes(key)) return "Want this for your brand?";
  if (key === "culturegram") return "Want this for your site?";
  return "Want this for your product?";
}

export function generateStaticParams() {
  return caseStudies.map((c) => ({ slug: c.key }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const c = getCase(slug);
  if (!c) return { title: "Not found" };
  return {
    title: `${c.title}, a case study by Karan Sud`,
    description: c.lede,
    alternates: { canonical: `/work/${c.key}` },
    openGraph: { title: `${c.title}, a case study by Karan Sud`, description: c.lede, type: "article" },
  };
}

export default async function CasePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const c = getCase(slug);
  if (!c) notFound();
  const i = caseStudies.findIndex((x) => x.key === c.key);
  const next = caseStudies[(i + 1) % caseStudies.length];
  const own = posts[c.key] ?? (creatives[c.key] ?? []).map((p) => {
    const { width, height } = imageSize(p.src);
    return { src: p.src, w: width, h: height, alt: p.alt, caption: p.caption, href: p.href, date: "" };
  });

  return (
    <div className={`fl ${flowFonts}`}>
      <FlowNav />
      <main className="fl-case">
        <header className="fl-case-head">
          <p className="fl-muted fl-reveal">{c.kind}</p>
          <h1>{c.title}</h1>
          <p className="fl-case-meta">{c.meta}</p>
          <p className="fl-case-lede">{linkify(c.lede, c.links)}</p>
          {c.stats.length ? (
            <div className="fl-stats fl-case-stats">
              {c.stats.map((s) => (
                <p key={s.label}><b><RollNumber value={s.val} /></b><span>{s.label}</span></p>
              ))}
            </div>
          ) : null}
        </header>

        {c.feature ? (
          <section className="fl-feature" aria-labelledby="fl-feature-title">
            <video className="fl-feature-video" src={c.feature.video} poster={c.feature.poster} controls playsInline preload="none" />
            <div className="fl-feature-copy">
              <h2 id="fl-feature-title">{c.feature.title}</h2>
              <p>{c.feature.body}</p>
              <div className="fl-feature-stats">
                {c.feature.stats.map((s) => (
                  <p key={s.label}><b>{s.val}</b><span>{s.label}</span></p>
                ))}
              </div>
              <p className="fl-muted fl-feature-src">{c.feature.source}</p>
              <a className="fl-link" href={c.feature.href} target="_blank" rel="noopener noreferrer">{c.feature.hrefLabel}</a>
            </div>
          </section>
        ) : null}

        {own.length ? (
          <section className="fl-case-posts" aria-label={`Posts I made for ${c.title}`}>
            <p className="fl-kicker">Posts I made for {c.title}{own.length > 3 ? `, ${own.length} of the best` : ""}. Tap one to open it.</p>
            <Stream posts={own} account={c.title} speed={Math.max(50, own.length * 4)} />
          </section>
        ) : null}

        {c.beforeAfter ? (
          <section className="fl-case-block">
            <CompareSlider {...c.beforeAfter.screenshots[0]} first />
            <BeforeAfterSection data={{ ...c.beforeAfter, screenshots: c.beforeAfter.screenshots.slice(1) }} />
          </section>
        ) : null}

        <div className="fl-case-body">
          <section className="fl-reveal">
            <h2>The situation</h2>
            <p>{linkify(c.situation, c.links)}</p>
          </section>
          <section className="fl-reveal">
            <h2>The plan</h2>
            <p>{linkify(c.strategy, c.links)}</p>
          </section>
          <section className="fl-reveal">
            <h2>What I did</h2>
            <ul>{c.execution.map((e) => <li key={e}>{linkify(e, c.links)}</li>)}</ul>
          </section>
          <section className="fl-reveal">
            <h2>What happened</h2>
            <ul>{c.results.map((r) => <li key={r}>{linkify(r, c.links)}</li>)}</ul>
          </section>
        </div>

        {c.screenshots.length ? (
          <section className="fl-case-proof" aria-labelledby="fl-proof-title">
            <h2 id="fl-proof-title" className="fl-reveal">The proof</h2>
            <div className="fl-proof-grid">
              {c.screenshots.map((s) => (
                <figure key={s.src} className="fl-reveal">
                  <Image src={s.src} alt={s.caption} {...imageSize(s.src)} sizes="(max-width: 860px) 100vw, 50vw" />
                  <figcaption className="fl-muted">{s.caption}</figcaption>
                </figure>
              ))}
            </div>
          </section>
        ) : null}

        <Link className="fl-next fl-reveal" href={`/work/${next.key}`}>
          <span className="fl-muted">Next case</span>
          <strong>{next.title}</strong>
        </Link>
      </main>

      <FlowFooter ask={closer(c.key)} />
      <Reveal selector=".fl-reveal" />
    </div>
  );
}
