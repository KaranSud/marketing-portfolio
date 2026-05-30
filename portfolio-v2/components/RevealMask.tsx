"use client";

import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

const EASE = [0.16, 1, 0.3, 1] as const;

// The OUTER span is the one observed (never transformed, so it reliably
// triggers in view). It propagates the variant to the INNER span, which is the
// one that actually rises up from behind the clip.
const inner: Variants = {
  hidden: { y: "110%" },
  show: (d: number) => ({
    y: 0,
    transition: { duration: 0.8, ease: EASE, delay: d },
  }),
};

export default function RevealMask({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.span
      className={className}
      style={{
        display: "block",
        overflow: "hidden",
        paddingBottom: "0.14em",
        marginBottom: "-0.14em",
      }}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
    >
      <motion.span style={{ display: "block" }} variants={inner} custom={delay}>
        {children}
      </motion.span>
    </motion.span>
  );
}
