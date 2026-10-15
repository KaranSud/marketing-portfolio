import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import BookButton from "@/components/BookButton";
import RevealObserver from "@/components/RevealObserver";
import StickyCta from "@/components/StickyCta";
import BeforeAfterSection, { CompareSlider } from "@/components/BeforeAfterSection";
import { caseStudies, getCase } from "@/lib/caseStudies";
import { getCaseMediaMap } from "@/lib/caseMedia";
import { imageSize } from "@/lib/imageSize";

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
  const [lead, ...restShots] = c.screenshots;

  return (
    <>
      <Nav />
      <main id="main" className="v3-casepage">
        <p className="v3-casepage-meta" data-reveal>
          <Link className="tlink" href="/#work">
            Work
          </Link>{" "}
          · {c.meta}
        </p>
        <h1 data-reveal>{c.title}</h1>
        <p className="v3-statement v3-casepage-lede" data-reveal style={{ ["--i" as string]: 1 }}>
          {c.lede}
        </p>
        {c.stats.length ? (
          <ul className="v3-casepage-stats v3-proof" aria-label="Results">
            {c.stats.map((s, k) => (
              <li key={s.label} data-reveal style={{ ["--i" as string]: k + 1 }}>
                <span className="v3-proof-num">{s.val}</span>
                <span className="v3-proof-label">{s.label}</span>
              </li>
            ))}
          </ul>
        ) : null}

        {lead ? (
          <figure className="v3-casepage-hero" data-reveal>
            <Image src={lead.src} alt={lead.caption} fill priority sizes="100vw" />
          </figure>
        ) : null}
        {lead ? <p className="v3-caption">{lead.caption}</p> : null}

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
                <li key={r}>{r}</li>
              ))}
            </ul>
          </section>
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
              <BeforeAfterSection data={c.beforeAfter} />
            </section>
          ) : null}
          {restShots.length ? (
            <section>
              <h2>More proof</h2>
              <div className="v3-casepage-shots">
                {restShots.map((s) => (
                  <figure key={s.src}>
                    <Image src={s.src} alt={s.caption} {...imageSize(s.src)} sizes="(max-width: 860px) 100vw, 66vw" />
                    <figcaption className="v3-caption">{s.caption}</figcaption>
                  </figure>
                ))}
              </div>
            </section>
          ) : null}
        </div>

        <div className="v3-casepage-next">
          <div>
            <p className="v3-statement">Want this for your product?</p>
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
