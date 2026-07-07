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
