/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { motion, type Variants } from "framer-motion";
import type { BeforeAfter, BeforeAfterPair } from "@/lib/caseStudies";

// Mirrors CaseModal.tsx's `item` variant so this section's reveal stays in
// sync with the modal's stagger. Duplicated (not imported) to avoid a
// circular import between the two files.
const item: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  },
};

type Which = "before" | "after";

// Safari (desktop + iOS) predates the standard Fullscreen API on arbitrary
// elements; iOS in particular only supports native fullscreen on <video>
// itself via webkitEnterFullscreen, which also gets the OS's own
// auto-rotate-to-landscape handling for free.
type FullscreenVideo = HTMLVideoElement & {
  webkitEnterFullscreen?: () => void;
  webkitRequestFullscreen?: () => void;
};

// Drag-to-reveal comparison: the "after" image sits underneath at full
// size, the "before" image is clipped over it, and a native range input
// (invisible, full-frame) drives the clip so the whole thing gets mouse
// drag, touch, and keyboard support for free.
function CompareSlider({ before, after, label }: BeforeAfterPair) {
  const [pos, setPos] = useState(50);
  return (
    <div className="ba-compare">
      {label ? <div className="ba-shot-caption">{label}</div> : null}
      <div className="ba-compare-frame">
        <img src={after} alt={`${label ?? "After"}: after`} className="ba-compare-img" loading="lazy" />
        <div className="ba-compare-clip" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
          <img src={before} alt={`${label ?? "Before"}: before`} className="ba-compare-img" loading="lazy" />
        </div>
        <div className="ba-compare-line" style={{ left: `${pos}%` }}>
          <span className="ba-compare-grip" aria-hidden>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M8 7l-5 5 5 5M16 7l5 5-5 5" />
            </svg>
          </span>
        </div>
        <span className="ba-tag ba-compare-tag-before">Before</span>
        <span className="ba-tag ba-compare-tag-after">After</span>
        <input
          type="range"
          min={0}
          max={100}
          value={pos}
          onChange={(e) => setPos(Number(e.target.value))}
          className="ba-compare-range"
          aria-label={`Comparison slider${label ? " for " + label : ""}. Drag to reveal before and after.`}
        />
      </div>
    </div>
  );
}

export default function BeforeAfterSection({ data }: { data: BeforeAfter }) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [active, setActive] = useState<Which>("before");
  const videoRef = useRef<HTMLVideoElement>(null);

  // Capture phase + stopPropagation so this doesn't also trigger Work.tsx's
  // own (bubble-phase) Escape handler, which would close the whole case
  // modal on the same keypress.
  useEffect(() => {
    if (!lightboxOpen) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        e.stopPropagation();
        setLightboxOpen(false);
      }
    }
    document.addEventListener("keydown", onKey, true);
    return () => document.removeEventListener("keydown", onKey, true);
  }, [lightboxOpen]);

  function open(which: Which) {
    setActive(which);
    setLightboxOpen(true);
  }

  function onOverlayClick(e: React.MouseEvent<HTMLDivElement>) {
    if (e.target === e.currentTarget) setLightboxOpen(false);
  }

  function goFullscreen() {
    const v = videoRef.current as FullscreenVideo | null;
    if (!v) return;
    if (v.requestFullscreen) v.requestFullscreen();
    else if (v.webkitEnterFullscreen) v.webkitEnterFullscreen();
    else if (v.webkitRequestFullscreen) v.webkitRequestFullscreen();
  }

  const src = active === "before" ? data.video.before : data.video.after;
  const poster = active === "before" ? data.video.beforePoster : data.video.afterPoster;

  return (
    <>
      <motion.div className="modal-section" variants={item}>
        <h3>Before / After</h3>
        <div className="ba-videos">
          <button
            type="button"
            className="ba-video"
            onClick={() => open("before")}
            aria-label="Watch the before walkthrough, full size"
          >
            <img src={data.video.beforePoster} alt="Before: video preview" />
            <span className="ba-tag">Before</span>
            <span className="ba-play" aria-hidden>
              ▶
            </span>
          </button>
          <button
            type="button"
            className="ba-video"
            onClick={() => open("after")}
            aria-label="Watch the after walkthrough, full size"
          >
            <img src={data.video.afterPoster} alt="After: video preview" />
            <span className="ba-tag">After</span>
            <span className="ba-play" aria-hidden>
              ▶
            </span>
          </button>
        </div>

        <div className="ba-shots">
          {data.screenshots.map((pair, i) => (
            <CompareSlider key={i} {...pair} />
          ))}
        </div>
      </motion.div>

      {lightboxOpen
        ? createPortal(
            <div className="ba-lightbox" onClick={onOverlayClick}>
              <button
                className="ba-lightbox-close"
                onClick={() => setLightboxOpen(false)}
                aria-label="Close"
              >
                ×
              </button>
              <div className="ba-lightbox-inner" onClick={(e) => e.stopPropagation()}>
                <div className="ba-lightbox-bar">
                  <div className="ba-toggle">
                    <button
                      type="button"
                      className={active === "before" ? "active" : ""}
                      onClick={() => setActive("before")}
                    >
                      Before
                    </button>
                    <button
                      type="button"
                      className={active === "after" ? "active" : ""}
                      onClick={() => setActive("after")}
                    >
                      After
                    </button>
                  </div>
                  <button
                    type="button"
                    className="ba-fullscreen-btn"
                    onClick={goFullscreen}
                    aria-label="Open fullscreen"
                  >
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M8 3H5a2 2 0 0 0-2 2v3M16 3h3a2 2 0 0 1 2 2v3M21 16v3a2 2 0 0 1-2 2h-3M8 21H5a2 2 0 0 1-2-2v-3" />
                    </svg>
                    Fullscreen
                  </button>
                </div>
                <video
                  key={active}
                  ref={videoRef}
                  className="ba-lightbox-video"
                  src={src}
                  poster={poster}
                  controls
                  muted
                  playsInline
                />
              </div>
            </div>,
            document.body
          )
        : null}
    </>
  );
}
