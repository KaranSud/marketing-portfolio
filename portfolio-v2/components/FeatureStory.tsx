/* eslint-disable @next/next/no-img-element */
"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import type { CaseStudy } from "@/lib/caseStudies";
import CountUp from "./CountUp";

type Chapter = {
  kicker: string;
  title: string;
  body: string;
};

const CHAPTERS: Chapter[] = [
  {
    kicker: "Chapter 1 · The situation",
    title: "A great product nobody knew",
    body: "Fere AI had a powerful trading agent and almost no one using it. The product worked, but the brand did not exist yet, so traders had no reason to discover it or to trust it over the tools they already had.",
  },
  {
    kicker: "Chapter 2 · The system",
    title: "Proof over hype",
    body: "Show the agent actually trading. Benchmark it against competitors. Put that evidence on every channel, then wire a content and acquisition engine behind it: X formats, a Product Hunt launch, paid, referrals, KOLs, and email.",
  },
  {
    kicker: "Chapter 3 · The results",
    title: "Attention became traders",
    body: "The engine compounded. Fere went from unknown to #1 Fintech Product of the Day on Product Hunt, and the email program converted the platform's first paying users.",
  },
];

function useChapterOpacity(
  progress: MotionValue<number>,
  i: number,
  n: number
) {
  const start = i / n;
  const end = (i + 1) / n;
  // Crossfades are centered on each chapter boundary so the outgoing and
  // incoming layers overlap (their opacities sum to ~1) instead of both
  // hitting zero at the boundary. Scroll-linked values compile to WAAPI
  // keyframes, so the input range must be monotonic and span exactly [0, 1].
  const f = 0.06;
  const points =
    i === 0
      ? [0, end - f, end + f, 1]
      : i === n - 1
        ? [0, start - f, start + f, 1]
        : [0, start - f, start + f, end - f, end + f, 1];
  const values =
    i === 0
      ? [1, 1, 0, 0]
      : i === n - 1
        ? [0, 0, 1, 1]
        : [0, 0, 1, 1, 0, 0];
  return useTransform(progress, points, values);
}

function ChapterText({
  progress,
  i,
  n,
  ch,
}: {
  progress: MotionValue<number>;
  i: number;
  n: number;
  ch: Chapter;
}) {
  const opacity = useChapterOpacity(progress, i, n);
  const y = useTransform(opacity, [0, 1], [26, 0]);
  return (
    <motion.div className="fs-chapter" style={{ opacity, y }}>
      <div className="labs-tag">{ch.kicker}</div>
      <h3 className="fs-title">{ch.title}</h3>
      <p className="fs-body">{ch.body}</p>
    </motion.div>
  );
}

function VisualLayer({
  progress,
  i,
  n,
  children,
}: {
  progress: MotionValue<number>;
  i: number;
  n: number;
  children: React.ReactNode;
}) {
  const opacity = useChapterOpacity(progress, i, n);
  const scale = useTransform(opacity, [0, 1], [0.96, 1]);
  return (
    <motion.div className="fs-layer" style={{ opacity, scale }}>
      {children}
    </motion.div>
  );
}

export default function FeatureStory({
  data,
  onOpen,
}: {
  data: CaseStudy;
  onOpen: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  const barScale = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const n = CHAPTERS.length;

  return (
    <div className="feature-story" ref={ref}>
      <div className="fs-sticky">
        <div className="fs-head">
          <span className="feature-badge">Featured case study</span>
          <span className="fs-brand">{data.title}</span>
          <span className="fs-tag">{data.tag}</span>
        </div>

        <div className="fs-grid">
          <div className="fs-text">
            {CHAPTERS.map((ch, i) => (
              <ChapterText
                key={ch.kicker}
                progress={scrollYProgress}
                i={i}
                n={n}
                ch={ch}
              />
            ))}
          </div>

          <div className="fs-visual">
            <VisualLayer progress={scrollYProgress} i={0} n={n}>
              <div className="fs-brand-card" style={{ background: data.thumb.bg }}>
                {data.thumb.logo && (
                  <img src={data.thumb.logo} alt={data.title} />
                )}
                <span>Where it started: a working agent, no audience</span>
              </div>
            </VisualLayer>

            <VisualLayer progress={scrollYProgress} i={1} n={n}>
              {data.screenshots[0] ? (
                <img
                  className="fs-shot"
                  src={data.screenshots[0]}
                  alt={`${data.title} results`}
                  loading="lazy"
                />
              ) : (
                <div className="fs-brand-card" style={{ background: data.thumb.bg }} />
              )}
            </VisualLayer>

            <VisualLayer progress={scrollYProgress} i={2} n={n}>
              <div className="fs-metrics">
                {data.cardMetrics.map((m) => (
                  <div className="fs-metric" key={m.label}>
                    <CountUp className="fs-metric-val" value={m.val} />
                    <span className="fs-metric-label">{m.label}</span>
                  </div>
                ))}
                <div className="fs-metric wide">
                  <span className="fs-metric-val">#1</span>
                  <span className="fs-metric-label">
                    Fintech Product of the Day, Product Hunt
                  </span>
                </div>
              </div>
            </VisualLayer>
          </div>
        </div>

        <div className="fs-foot">
          <button className="btn btn-ghost" onClick={onOpen}>
            Read the full case study
          </button>
          <div className="fs-progress">
            <motion.span style={{ scaleX: barScale }} />
          </div>
        </div>
      </div>
    </div>
  );
}
