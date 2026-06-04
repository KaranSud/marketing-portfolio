"use client";

import { useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

/**
 * Cursor-reactive background: soft sage-green orbs that drift with the pointer
 * at different depths (parallax), the way instaagent.com reacts to the cursor.
 * Layers behind content (pointer-events: none). Respects reduced-motion.
 */

type Orb = {
  left: string;
  top: string;
  size: number;
  depth: number;
  color: string;
  blur: number;
};

const ORBS: Orb[] = [
  { left: "12%", top: "18%", size: 460, depth: 46, color: "rgba(108,160,136,0.14)", blur: 70 },
  { left: "72%", top: "12%", size: 380, depth: -64, color: "rgba(74,128,140,0.12)", blur: 80 },
  { left: "60%", top: "68%", size: 420, depth: 80, color: "rgba(108,160,136,0.10)", blur: 90 },
  { left: "26%", top: "74%", size: 320, depth: -40, color: "rgba(131,183,160,0.10)", blur: 70 },
];

function OrbLayer({
  orb,
  mx,
  my,
}: {
  orb: Orb;
  mx: ReturnType<typeof useSpring>;
  my: ReturnType<typeof useSpring>;
}) {
  const x = useTransform(mx, [-1, 1], [-orb.depth, orb.depth]);
  const y = useTransform(my, [-1, 1], [-orb.depth, orb.depth]);
  return (
    <motion.div
      style={{
        position: "absolute",
        left: orb.left,
        top: orb.top,
        width: orb.size,
        height: orb.size,
        marginLeft: -orb.size / 2,
        marginTop: -orb.size / 2,
        borderRadius: "50%",
        background: `radial-gradient(circle, ${orb.color}, transparent 70%)`,
        filter: `blur(${orb.blur}px)`,
        x,
        y,
        willChange: "transform",
      }}
    />
  );
}

export default function CursorField() {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 45, damping: 22, mass: 0.6 });
  const sy = useSpring(my, { stiffness: 45, damping: 22, mass: 0.6 });

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    function onMove(e: PointerEvent) {
      mx.set((e.clientX / window.innerWidth) * 2 - 1);
      my.set((e.clientY / window.innerHeight) * 2 - 1);
    }
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [mx, my]);

  return (
    <div
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: -1,
        pointerEvents: "none",
        overflow: "hidden",
      }}
    >
      {ORBS.map((orb, i) => (
        <OrbLayer key={i} orb={orb} mx={sx} my={sy} />
      ))}
    </div>
  );
}
