"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

// Soft crossfade on every route change. Opacity only: a transform here would
// become the containing block for the fixed-position nav and break it.
export default function Template({ children }: { children: ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}
