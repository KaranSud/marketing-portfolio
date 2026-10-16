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
  height: string;
  /** Crop: zoom factor, transform origin and object-position. */
  zoom: number;
  origin: string;
  pos: string;
  /** A second, different artefact, or none. */
  thumb?: { src: string; alt: string; zoom: number; origin: string; pos: string };
  big: string;
  bigLabel: string;
  desc: string;
};

// Copy from tasks/v3/copy-deck.md; numbers from facts.md table (a). Each crop keeps
// the claimed number as the largest figure in frame, or shows no figure at all.
const flagships: Flagship[] = [
  {
    key: "fantv",
    visual: "/Results/FanTV/FanTV_Web1.png",
    visualAlt: "FanTV AI X analytics for January 2025: daily reposts and replies, and follows over time",
    visualCaption: "FanTV AI on X, 1 to 31 January 2025. Inset: the account at 297.7K followers.",
    height: "80svh",
    zoom: 1,
    origin: "100% 50%",
    pos: "100% 50%",
    thumb: {
      src: "/Results/FanTV/FanTV X Mobile SS.png",
      alt: "FanTV AI's X account showing 297.7K followers",
      zoom: 2.1,
      origin: "0% 0%",
      pos: "0% 0%",
    },
    big: "297.7K",
    bigLabel: "X followers, up from 70K in 11 months, with airdrops and a 100+ KOL program",
    desc: "A SocialFi app for creators with a quiet feed. I built the content system for the brand and its founder, grew the KOL program from about 10 to 100+, and ran airdrops. Discord and Telegram passed 150K members.",
  },
  {
    key: "defx",
    visual: "/Results/Defx/Defx.png",
    visualAlt: "Defx perp volume chart on DefiLlama",
    visualCaption: "Defx on DefiLlama: perp volume over time, $1.529b cumulative.",
    height: "70svh",
    zoom: 1.55,
    origin: "100% 26%",
    pos: "100% 26%",
    big: "50 to 350",
    bigLabel: "Active traders, from about 50 to about 350. Defx has since passed $1.5B in cumulative volume.",
    desc: "A perpetuals DEX with 40 to 50 active traders when I joined. I designed two trading contests, one with Voltrade, built KOL relationships, and made the content around them.",
  },
  {
    key: "fere",
    visual: "/Results/Fere AI/Fere AI.png",
    visualAlt: "Fere AI X analytics from 1 September 2025 to 27 April 2026, with 6.8M impressions",
    visualCaption: "Fere AI on X, 1 Sep 2025 to 27 Apr 2026.",
    height: "64svh",
    zoom: 1,
    origin: "100% 0%",
    pos: "100% 0%",
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
              style={{
                ["--h" as string]: f.height,
                ["--zoom" as string]: f.zoom,
                ["--origin" as string]: f.origin,
                ["--pos" as string]: f.pos,
              }}
              data-reveal
            >
              <Image src={f.visual} alt={f.visualAlt} fill sizes="(max-width: 860px) 100vw, 60vw" />
            </figure>
            <div className="v3-case-cluster">
              {f.thumb ? (
                <figure
                  className="v3-case-thumb"
                  data-reveal
                  style={{ ["--zoom" as string]: f.thumb.zoom, ["--origin" as string]: f.thumb.origin, ["--pos" as string]: f.thumb.pos }}
                >
                  <Image src={f.thumb.src} alt={f.thumb.alt} fill sizes="(max-width: 860px) 70vw, 30vw" />
                </figure>
              ) : null}
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
        <p>Or keep reading. Ten more projects below.</p>
      </div>

      <h2 className="v3-h2 v3-more-title" data-reveal>
        More work
      </h2>
      <WorkIndex
        items={rest.map((c) => ({
          key: c.key,
          title: c.title,
          kind: c.kind,
          image: c.preview?.poster ?? c.screenshots[0]?.src ?? c.logo ?? null,
          video: c.preview?.video ?? null,
          isLogo: !c.preview && !c.screenshots[0],
        }))}
      />
    </section>
  );
}
