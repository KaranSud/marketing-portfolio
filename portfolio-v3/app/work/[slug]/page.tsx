import type { Metadata } from "next";
import type { CSSProperties } from "react";
import { notFound } from "next/navigation";
import Image, { getImageProps } from "next/image";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import BookButton from "@/components/BookButton";
import RevealObserver from "@/components/RevealObserver";
import StickyCta from "@/components/StickyCta";
import BeforeAfterSection, { CompareSlider } from "@/components/BeforeAfterSection";
import Posts from "@/components/Posts";
import { creatives } from "@/lib/creatives";
import { caseStudies, getCase, type Shot } from "@/lib/caseStudies";
import { getCaseMediaMap } from "@/lib/caseMedia";
import { imageSize } from "@/lib/imageSize";
import { linkify } from "@/lib/linkify";

// The closing line matches the kind of client the case was for.
function closer(key: string) {
  if (["prashan", "mohaimina"].includes(key)) return "Want this for your founder?";
  if (["tony", "bones", "potters", "opaque", "sportsrush"].includes(key)) return "Want this for your brand?";
  if (key === "culturegram") return "Want this for your site?";
  return "Want this for your product?";
}

// The lead screenshot: the analytics panel without the app's sidebar, linked to the
// full screenshot. Under 860px a tighter crop of the stat cards keeps the claimed
// numbers legible.
function Lead({ shot }: { shot: Shot }) {
  const desk = shot.crop ?? shot.src;
  const d = imageSize(desk);
  const vars = { ["--ar" as string]: `${d.width} / ${d.height}` } as CSSProperties;
  if (!shot.mobile) {
    return (
      <figure className="v3-casepage-hero" style={vars}>
        <Image src={desk} alt={shot.caption} fill priority sizes="100vw" />
      </figure>
    );
  }
  const m = imageSize(shot.mobile);
  const common = { alt: shot.caption, sizes: "100vw", fetchPriority: "high" as const, loading: "eager" as const };
  const { props: mobile } = getImageProps({ ...common, src: shot.mobile, width: m.width, height: m.height });
  const { props: desktop } = getImageProps({ ...common, src: desk, width: d.width, height: d.height });
  return (
    <figure className="v3-casepage-hero" style={{ ...vars, ["--ar-m" as string]: `${m.width} / ${m.height}` }}>
      <picture>
        <source media="(max-width: 860px)" srcSet={mobile.srcSet} sizes={mobile.sizes} />
        {/* eslint-disable-next-line jsx-a11y/alt-text -- alt comes from getImageProps */}
        <img {...desktop} />
      </picture>
    </figure>
  );
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
  const pairs = getCaseMediaMap()[c.key]?.beforeAfter ?? [];
  const posts = creatives[c.key] ?? [];
  const [lead, ...restShots] = c.screenshots;

  return (
    <>
      <Nav />
      <main id="main" className="v3-casepage">
        {/* Title, lede and meta paint from server HTML (no entrance), so they can be the LCP. */}
        <h1>{c.title}</h1>
        <p className="v3-statement v3-casepage-lede">{linkify(c.lede, c.links)}</p>
        <p className="v3-casepage-meta">{c.meta}</p>
        {c.stats.length ? (
          <ul className="v3-casepage-stats v3-proof" aria-label="Results">
            {c.stats.map((s, k) => (
              <li key={s.label} data-reveal style={{ ["--i" as string]: k + 1 }}>
                <span className="v3-proof-num">{s.val}</span>
                <span className="v3-proof-label">{linkify(s.label, c.links)}</span>
              </li>
            ))}
          </ul>
        ) : null}

        {lead ? <Lead shot={lead} /> : null}
        {lead ? (
          <p className="v3-caption">
            {linkify(lead.caption, c.links)}
            {lead.crop ? (
              <>
                {" "}
                <a className="tlink" href={lead.src} target="_blank" rel="noopener noreferrer">
                  See the full screenshot
                </a>
              </>
            ) : null}
          </p>
        ) : null}
        {!lead && c.beforeAfter ? (
          <div className="v3-casepage-compare">
            <CompareSlider {...c.beforeAfter.screenshots[0]} first />
          </div>
        ) : null}

        <div className="v3-casepage-body">
          <section data-reveal>
            <h2>The situation</h2>
            <p>{c.situation}</p>
          </section>
          <section data-reveal>
            <h2>The plan</h2>
            <p>{c.strategy}</p>
          </section>
          <section data-reveal>
            <h2>What I did</h2>
            <ul>
              {c.execution.map((e) => (
                <li key={e}>{e}</li>
              ))}
            </ul>
          </section>
          <section data-reveal>
            <h2>What happened</h2>
            <ul>
              {c.results.map((r) => (
                <li key={r}>{linkify(r, c.links)}</li>
              ))}
            </ul>
          </section>
          {posts.length ? (
            <section>
              <h2>Posts I made</h2>
              <Posts items={posts} label={`Posts on ${c.title}'s account`} />
            </section>
          ) : null}
          {pairs.length ? (
            <section>
              <h2>Before and after</h2>
              {pairs.map((p) => (
                <CompareSlider key={p.before} before={p.before} after={p.after} />
              ))}
            </section>
          ) : null}
          {c.beforeAfter ? (
            <section>
              <BeforeAfterSection data={{ ...c.beforeAfter, screenshots: c.beforeAfter.screenshots.slice(1) }} />
            </section>
          ) : null}
          {restShots.length ? (
            <section>
              <h2>More proof</h2>
              <div className="v3-casepage-shots">
                {restShots.map((s) => {
                  const size = imageSize(s.src);
                  return (
                    <figure key={s.src}>
                      {/* Never upscaled: a small crop shows at its own width. */}
                      <Image src={s.src} alt={s.caption} {...size} style={{ maxWidth: size.width }} sizes="(max-width: 860px) 100vw, 66vw" />
                      <figcaption className="v3-caption">{linkify(s.caption, c.links)}</figcaption>
                    </figure>
                  );
                })}
              </div>
            </section>
          ) : null}
        </div>

        <div className="v3-casepage-next">
          <div>
            <p className="v3-statement">{closer(c.key)}</p>
            <div style={{ marginTop: 24 }}>
              <BookButton />
            </div>
          </div>
          <Link className="v3-next" href={`/work/${next.key}`}>
            <small>Next case</small>
            <span>{next.title}</span>
          </Link>
        </div>
      </main>
      <Footer />
      <StickyCta />
      <RevealObserver />
    </>
  );
}
