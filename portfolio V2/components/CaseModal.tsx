/* eslint-disable @next/next/no-img-element */
"use client";

import { motion, type Variants } from "framer-motion";
import type { CaseStudy } from "@/lib/caseStudies";
import CountUp from "./CountUp";

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06, delayChildren: 0.05 } },
};
const item: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  },
};

export default function CaseModal({
  data,
  open,
  onClose,
}: {
  data: CaseStudy | null;
  open: boolean;
  onClose: () => void;
}) {
  function onOverlayClick(e: React.MouseEvent<HTMLDivElement>) {
    if (e.target === e.currentTarget) onClose();
  }

  const thumb = data?.thumb;
  const screenshots = data?.screenshots ?? [];

  return (
    <div
      className={`modal-overlay${open ? " open" : ""}`}
      onClick={onOverlayClick}
      data-lenis-prevent
    >
      <div className="modal">
        <div
          className="modal-hero"
          style={{ display: "block", background: thumb?.bg ?? "#111" }}
        >
          {thumb?.logo ? (
            <img
              src={thumb.logo}
              alt={data?.title ?? ""}
              style={{
                objectFit: "contain",
                objectPosition: "center",
                padding: "40px 80px",
                ...thumb.modalImgStyle,
              }}
            />
          ) : null}
          {thumb?.initials ? (
            <div
              style={{
                position: "absolute",
                inset: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-display), sans-serif",
                  fontSize: 38,
                  fontWeight: 700,
                  color: thumb.initColor || "rgba(255,255,255,0.9)",
                  letterSpacing: "-0.5px",
                  opacity: 0.85,
                  textAlign: "center",
                  padding: "0 32px",
                }}
              >
                {thumb.initials}
              </span>
            </div>
          ) : null}
          <div className="modal-hero-overlay" />
          <button className="modal-close" onClick={onClose} aria-label="Close">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
          <div className="modal-hero-content">
            <div className="modal-brand">{data?.title}</div>
          </div>
        </div>

        {data ? (
          <motion.div
            className="modal-body"
            key={`${data.key}-${open}`}
            variants={container}
            initial="hidden"
            animate={open ? "show" : "hidden"}
          >
            <motion.div className="modal-chips" variants={item}>
              <span className="modal-chip">{data.role}</span>
              {data.timeline ? (
                <span className="modal-chip">{data.timeline}</span>
              ) : null}
              {data.channels.map((c) => (
                <span className="modal-chip" key={c}>
                  {c}
                </span>
              ))}
            </motion.div>

            <motion.p className="modal-lead" variants={item}>
              {data.desc}
            </motion.p>

            <motion.div className="modal-stats-row" variants={item}>
              {data.stats.map((s, i) => (
                <div className="ms" key={i}>
                  <CountUp className="ms-val" value={s.val} />
                  <div className="ms-label">{s.label}</div>
                </div>
              ))}
            </motion.div>

            <motion.div className="modal-section" variants={item}>
              <h3>The situation</h3>
              <p>{data.situation}</p>
            </motion.div>

            <motion.div className="modal-section" variants={item}>
              <h3>Strategy</h3>
              <p>{data.strategy}</p>
            </motion.div>

            <motion.div className="modal-section" variants={item}>
              <h3>Execution</h3>
              <ul className="modal-list">
                {data.execution.map((e, i) => (
                  <li key={i}>{e}</li>
                ))}
              </ul>
            </motion.div>

            <motion.div className="modal-section" variants={item}>
              <h3>Results</h3>
              <ul className="modal-list results">
                {data.results.map((r, i) => (
                  <li key={i}>{r}</li>
                ))}
              </ul>
            </motion.div>

            {screenshots.length > 0 ? (
              <motion.div className="modal-section" variants={item}>
                <h3>Proof</h3>
                <div
                  className={`modal-screenshots${
                    screenshots.length === 1 ? " single" : ""
                  }`}
                >
                  {screenshots.map((src, i) => (
                    <img key={i} src={src} alt="Analytics screenshot" loading="lazy" />
                  ))}
                </div>
              </motion.div>
            ) : null}
          </motion.div>
        ) : null}
      </div>
    </div>
  );
}
