import Image from "next/image";
import Link from "next/link";
import BookButton from "./BookButton";
import WorkIndex from "./WorkIndex";
import { caseStudies, flagshipKeys } from "@/lib/caseStudies";

type Flagship = {
  key: (typeof flagshipKeys)[number];
  visual: string;
  visualAlt: string;
  visualCaption: string;
  /** Width over height of the cropped screenshot: shown whole, never sliced. */
  ratio: number;
  big: string;
  bigLabel: string;
  desc: string;
};

// Copy from tasks/v3/copy-deck.md; numbers from facts.md table (a). Each crop keeps
// the claimed number as the largest figure in frame, or shows no figure at all.
const flagships: Flagship[] = [
  {
    key: "fantv",
    visual: "/Results/FanTV/crop-analytics.png",
    visualAlt: "FanTV AI X analytics for January 2025: daily reposts and replies, and follows over time",
    visualCaption: "FanTV AI on X, 1 to 31 January 2025.",
    ratio: 1305 / 952,
    big: "297.7K",
    bigLabel: "X followers, up from 70K in 11 months, with airdrops and a 100+ KOL program",
    desc: "A SocialFi app for creators with about 70K followers on X and under 1,000 community members. I built the content system for the brand and its founder, grew the KOL program from about 10 to 100+, and ran airdrops. Discord and Telegram passed 150K members.",
  },
  {
    key: "defx",
    visual: "/Results/Defx/crop-chart.png",
    visualAlt: "Defx TVL and perp volume chart on DefiLlama, 2025 to 2026",
    visualCaption: "Defx on DefiLlama: TVL and daily perp volume. Cumulative perp volume there reads $1.529b.",
    ratio: 1915 / 895,
    big: "50 to 350",
    bigLabel: "Active traders, from about 50 to about 350. I helped Defx reach $1.5B in cumulative perp volume.",
    desc: "A perpetuals DEX with 40 to 50 active traders when I joined. I designed two trading contests, one with Voltrade, built KOL relationships, and made the content around them.",
  },
  {
    key: "fere",
    visual: "/Results/Fere AI/crop-analytics.png",
    visualAlt: "Fere AI X analytics from 1 September 2025 to 27 April 2026, with 6.8M impressions",
    visualCaption: "Fere AI on X, 1 Sep 2025 to 27 Apr 2026.",
    ratio: 1946 / 1968,
    big: "6.8M",
    bigLabel: "X impressions, 1 Sep 2025 to 27 Apr 2026",
    desc: "An AI trading agent whose brand did not exist yet. I built its X content pipeline of trading threads, data drops, market takes and demos, and ran referral and points campaigns. In May 2026 I launched it on Product Hunt, where it finished #2 Product of the Day.",
  },
];

export default function Work() {
  const rest = caseStudies.filter((c) => !flagshipKeys.includes(c.key as (typeof flagshipKeys)[number]));
  return (
    <section id="work" className="v3-section" aria-labelledby="work-title">
      <h2 id="work-title" className="v3-h2" data-reveal>
        Work
      </h2>

      {flagships.map((f) => {
        const c = caseStudies.find((x) => x.key === f.key)!;
        return (
          <article key={f.key} className="v3-case" aria-labelledby={`case-${f.key}`}>
            <figure
              className="v3-case-visual"
              style={{ aspectRatio: String(f.ratio) }}
              data-reveal
            >
              <Image src={f.visual} alt={f.visualAlt} fill sizes="(max-width: 860px) 100vw, 60vw" />
            </figure>
            <div className="v3-case-cluster">
              <h3 id={`case-${f.key}`} className="v3-case-title" data-reveal style={{ ["--i" as string]: 1 }}>
                {c.title}
              </h3>
              <p className="v3-case-big" data-reveal style={{ ["--i" as string]: 2 }}>
                <strong>{f.big}</strong>
                <span>{f.bigLabel}</span>
              </p>
              <p className="v3-case-desc" data-reveal style={{ ["--i" as string]: 3 }}>
                {f.desc}
              </p>
              <p className="v3-case-meta" data-reveal style={{ ["--i" as string]: 3 }}>
                {c.meta}
              </p>
              <Link className="tlink v3-case-link" href={`/work/${f.key}`} data-reveal style={{ ["--i" as string]: 4 }}>
                Read the {c.title} case
              </Link>
              <p className="v3-caption">{f.visualCaption}</p>
            </div>
          </article>
        );
      })}

      <div className="v3-work-close" data-reveal>
        <BookButton />
        <p>
          Not ready to talk? Read{" "}
          <Link className="tlink" href="/blog/why-i-built-my-own-outbound-tool">
            why I built my own outbound engine
          </Link>
          , or keep reading: ten more projects below.
        </p>
      </div>

      <h2 className="v3-h2 v3-more-title" data-reveal>
        More work
      </h2>
      <WorkIndex
        items={rest.map((c) => ({
          key: c.key,
          title: c.title,
          kind: c.kind,
          image: c.indexImage ?? c.preview?.poster ?? c.screenshots[0]?.src ?? c.logo ?? null,
          video: c.preview?.video ?? null,
          isLogo: Boolean(c.indexImage) || (!c.preview && !c.screenshots[0]),
        }))}
      />
    </section>
  );
}
