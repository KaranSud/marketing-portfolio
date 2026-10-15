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
  origin: string;
  pos: string;
  thumb: string;
  thumbAlt: string;
  thumbZoom: { scale: number; origin: string };
  big: string;
  bigLabel: string;
  desc: string;
};

// Copy from tasks/v3/copy-deck.md; numbers from facts.md table (a).
const flagships: Flagship[] = [
  {
    key: "fantv",
    visual: "/Results/FanTV/FanTV X Mobile SS.png",
    visualAlt: "FanTV AI's X analytics on mobile, showing 297.7K followers",
    visualCaption: "FanTV AI on X, from Karan's analytics.",
    height: "80svh",
    origin: "0% 0%",
    pos: "0% 0%",
    thumb: "/Results/FanTV/FanTV_Web1.png",
    thumbAlt: "FanTV AI X analytics for January 2025",
    thumbZoom: { scale: 1.35, origin: "70% 30%" },
    big: "297.7K",
    bigLabel: "X followers, up from 70K in 11 months",
    desc: "A SocialFi app for creators, with a strong product and a quiet feed. I built the content system for the brand and its founder, grew the KOL program from about 10 to 100+, and ran airdrops. Discord and Telegram passed 150K members.",
  },
  {
    key: "defx",
    visual: "/Results/Defx/Defx.png",
    visualAlt: "Defx on DefiLlama, showing $1.529b cumulative perp volume and the volume chart",
    visualCaption: "Defx on DefiLlama.",
    height: "60svh",
    origin: "62% 30%",
    pos: "50% 30%",
    thumb: "/Results/Defx/Defx.png",
    thumbAlt: "Defx key metrics on DefiLlama",
    thumbZoom: { scale: 2.2, origin: "16% 34%" },
    big: "50 to 350",
    bigLabel: "Active traders, about. Defx has since passed $1.5B cumulative volume.",
    desc: "A perpetuals DEX with a working product and few traders. I designed two trading contests, one with Voltrade, built KOL relationships, and made the content around them.",
  },
  {
    key: "fere",
    visual: "/Results/Fere AI/Fere AI.png",
    visualAlt: "Fere AI X analytics from 1 September 2025 to 27 April 2026",
    visualCaption: "Fere AI on X, 1 Sep 2025 to 27 Apr 2026.",
    height: "90svh",
    origin: "62% 40%",
    pos: "62% 40%",
    thumb: "/Results/Fere AI/Fere AI.png",
    thumbAlt: "Fere AI X metrics: 6.8M impressions and 192.4K engagements",
    thumbZoom: { scale: 2.1, origin: "68% 88%" },
    big: "6.8M",
    bigLabel: "X impressions in eight months, after a #2 Product of the Day launch",
    desc: "An AI trading agent that worked and that few people used. I built its X content pipeline of trading threads, data drops, market takes and demos, ran referral and points campaigns, and launched it on Product Hunt.",
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
            <figure className="v3-case-visual" style={{ ["--h" as string]: f.height, ["--origin" as string]: f.origin, ["--pos" as string]: f.pos }} data-reveal>
              <Image src={f.visual} alt={f.visualAlt} fill sizes="(max-width: 860px) 100vw, 60vw" />
            </figure>
            <div className="v3-case-cluster">
              <figure className="v3-case-thumb" data-reveal style={{ ["--zoom" as string]: f.thumbZoom.scale, ["--origin" as string]: f.thumbZoom.origin }}>
                <Image
                  src={f.thumb}
                  alt={f.thumbAlt}
                  fill
                  sizes="(max-width: 860px) 70vw, 30vw"
                />
              </figure>
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

      <h2 className="v3-h2" style={{ marginTop: 140 }} data-reveal>
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
