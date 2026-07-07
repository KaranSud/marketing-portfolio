/* eslint-disable @next/next/no-img-element */
"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import HeroVisual from "./HeroVisual";
import KineticHeadline from "./KineticHeadline";
import Magnetic from "./Magnetic";
import Tilt from "./Tilt";
import { EASE } from "@/lib/motion";

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
            <KineticHeadline />
            <motion.p className="hero-sub" {...up(0.16)}>
              That is how a quiet SocialFi app went from 70K to 300K followers,
              a community of under 1,000 became 150K, and one campaign returned
              471% in its first month. I build those systems: content,
              community, and paid growth that compound.
            </motion.p>
            <motion.div className="hero-actions" {...up(0.24)}>
              <Magnetic>
                <a href="#work" className="btn btn-primary">
                  View case studies
                </a>
              </Magnetic>
              <Magnetic>
                <a href="#contact" className="btn btn-ghost">
                  Get in touch
                </a>
              </Magnetic>
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
            <Tilt>
              <HeroVisual />
            </Tilt>
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
