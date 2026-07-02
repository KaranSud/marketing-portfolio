"use client";

import { motion } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1] as const;

type Word = { t: string; accent?: boolean };

const LINES: Word[][] = [
  [{ t: "Brands" }, { t: "don’t" }, { t: "go" }, { t: "viral." }],
  [{ t: "Systems", accent: true }, { t: "do." }],
];

/**
 * Character-cascade headline. Each word is a clip mask; characters rise out of
 * it with a global stagger, then the accent word draws a hand-set underline.
 */
export default function KineticHeadline() {
  let charIndex = 0;
  return (
    <h1 className="kh" aria-label="Brands don't go viral. Systems do.">
      {LINES.map((words, li) => (
        <span className="kh-line" key={li}>
          {words.map((w) => {
            const chars = Array.from(w.t);
            return (
              <span
                className={`kh-word${w.accent ? " kh-accent" : ""}`}
                key={w.t}
                aria-hidden
              >
                {chars.map((c, ci) => {
                  const d = 0.12 + 0.028 * charIndex++;
                  return (
                    <motion.span
                      className="kh-char"
                      key={ci}
                      initial={{ y: "115%", rotate: 8 }}
                      animate={{ y: 0, rotate: 0 }}
                      transition={{ duration: 0.65, ease: EASE, delay: d }}
                    >
                      {c}
                    </motion.span>
                  );
                })}
                {w.accent && (
                  <motion.svg
                    className="kh-underline"
                    viewBox="0 0 220 14"
                    fill="none"
                    preserveAspectRatio="none"
                    aria-hidden
                  >
                    <motion.path
                      d="M3 10 C 60 3, 150 3, 217 8"
                      stroke="currentColor"
                      strokeWidth="5"
                      strokeLinecap="round"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 0.55, ease: "easeOut", delay: 1.05 }}
                    />
                  </motion.svg>
                )}
              </span>
            );
          })}
        </span>
      ))}
    </h1>
  );
}
