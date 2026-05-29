/* eslint-disable @next/next/no-img-element */
"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import HeroVisual from "./HeroVisual";
import RevealMask from "./RevealMask";

const EASE = [0.16, 1, 0.3, 1] as const;

const trustLogos = [
  { src: "/Logos/fereai.jpg", name: "Fere AI" },
  { src: "/Logos/FanTV-AI.jpg", name: "FanTV AI" },
  { src: "/Logos/Defx.png", name: "Defx" },
  { src: "/Logos/Tony-Romas.jpg", name: "Tony Roma's" },
  { src: "/Logos/Novaswap.jpg", name: "Novaswap" },
];

function up(delay: number) {
  return {
    initial: { opacity: 0, y: 26 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7, ease: EASE, delay },
  };
}

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const glowY = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const cueOpacity = useTransform(scrollYProgress, [0, 0.12], [1, 0]);

  return (
    <section className="hero" ref={ref}>
      <motion.div className="hero-glows" style={{ y: glowY }}>
        <div className="glow glow-amber" />
        <div className="glow glow-amber-2" />
      </motion.div>

      <div className="container">
        <div className="hero-layout">
          <div className="hero-copy">
            <h1>
              <RevealMask delay={0.05}>Making brands</RevealMask>
              <RevealMask delay={0.16}>
                <em>impossible</em> to ignore
              </RevealMask>
            </h1>
            <motion.p className="hero-sub" {...up(0.16)}>
              In a world of infinite content, attention is the last real moat. I
              build the content, communities, and growth systems that turn
              overlooked products into brands people cannot scroll past.
            </motion.p>
            <motion.div className="hero-actions" {...up(0.24)}>
              <a href="#work" className="btn btn-primary">
                View case studies
              </a>
              <a href="#contact" className="btn btn-ghost">
                Get in touch
              </a>
            </motion.div>
            <motion.div className="hero-trust" {...up(0.34)}>
              <span className="hero-trust-label">Brands grown</span>
              <div className="hero-trust-logos">
                {trustLogos.map((l) => (
                  <img key={l.name} src={l.src} alt={l.name} title={l.name} />
                ))}
              </div>
            </motion.div>
          </div>

          <div className="hero-visual">
            <HeroVisual />
          </div>
        </div>
      </div>

      <motion.div className="scroll-cue" style={{ opacity: cueOpacity }}>
        Scroll
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 5v14" />
          <path d="m19 12-7 7-7-7" />
        </svg>
      </motion.div>
    </section>
  );
}
