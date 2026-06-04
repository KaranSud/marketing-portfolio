"use client";

import { motion } from "framer-motion";
import CountUp from "./CountUp";

const EASE = [0.16, 1, 0.3, 1] as const;

const tiles = [
  { val: "7K+", label: "Daily active traders" },
  { val: "12K+", label: "AI signups driven" },
  { val: "300K+", label: "Followers grown" },
  { val: "471%", label: "Peak campaign ROI" },
];

const linePath =
  "M0,118 C40,108 70,96 112,84 C158,71 196,60 236,42 C268,28 298,16 320,8";
const areaPath = `${linePath} L320,140 L0,140 Z`;

export default function HeroVisual() {
  return (
    <motion.div
      className="hero-visual-card"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: EASE, delay: 0.35 }}
    >
      <div className="hvc-head">
        <span className="hvc-dot" />
        Results that compound
        <span className="hvc-period">across 15+ brands</span>
      </div>

      <div className="hvc-chart">
        <svg viewBox="0 0 320 140" preserveAspectRatio="none" aria-hidden="true">
          <defs>
            <linearGradient id="hvcFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#6CA088" stopOpacity="0.28" />
              <stop offset="100%" stopColor="#6CA088" stopOpacity="0" />
            </linearGradient>
          </defs>
          <motion.path
            d={areaPath}
            fill="url(#hvcFill)"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.1 }}
          />
          <motion.path
            d={linePath}
            fill="none"
            stroke="#6CA088"
            strokeWidth="2"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.5, ease: EASE, delay: 0.6 }}
          />
        </svg>
        <span className="hvc-chart-cap">Audience &amp; revenue growth</span>
      </div>

      <div className="hvc-grid">
        {tiles.map((t) => (
          <div className="hvc-tile" key={t.label}>
            <CountUp className="hvc-val" value={t.val} />
            <div className="hvc-tlabel">{t.label}</div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
