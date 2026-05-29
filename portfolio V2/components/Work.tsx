/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { caseStudies, type CaseStudy } from "@/lib/caseStudies";
import CaseModal from "./CaseModal";
import SectionHead from "./SectionHead";
import { getLenis } from "@/lib/lenis";

function Thumb({ c }: { c: CaseStudy }) {
  if (c.thumb.logo) {
    return <img src={c.thumb.logo} alt={c.title} style={c.thumb.cardImgStyle} />;
  }
  return (
    <div>
      <div className="wcard-thumb-name">{c.thumb.initials}</div>
      {c.thumb.subtitle ? (
        <div className="wcard-thumb-sub">{c.thumb.subtitle}</div>
      ) : null}
    </div>
  );
}

function onSpotlight(e: React.MouseEvent<HTMLElement>) {
  const el = e.currentTarget;
  const r = el.getBoundingClientRect();
  el.style.setProperty("--mx", `${e.clientX - r.left}px`);
  el.style.setProperty("--my", `${e.clientY - r.top}px`);
}

export default function Work() {
  const [current, setCurrent] = useState<CaseStudy | null>(null);
  const [open, setOpen] = useState(false);

  const featured =
    caseStudies.find((c) => c.key === "fere") ?? caseStudies[0];
  const rest = caseStudies.filter((c) => c.key !== featured.key);

  function openCase(c: CaseStudy) {
    setCurrent(c);
    setOpen(true);
  }
  const closeCase = () => setOpen(false);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") closeCase();
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    const lenis = getLenis();
    if (open) {
      lenis?.stop();
      document.body.style.overflow = "hidden";
    } else {
      lenis?.start();
      document.body.style.overflow = "";
    }
    return () => {
      lenis?.start();
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <section id="work" className="section">
      <div className="container">
        <SectionHead
          title={
            <>
              Brands I took <em>from quiet to known</em>
            </>
          }
          sub="Twelve engagements across Web3, AI, F&B, and e-commerce. What each looked like before, and where it ended up."
        />

        {/* Featured */}
        <motion.div
          className="feature"
          onClick={() => openCase(featured)}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div
            className="feature-visual"
            style={{ background: featured.thumb.bg }}
          >
            <span className="feature-badge">Featured</span>
            <Thumb c={featured} />
          </div>
          <div className="feature-body">
            <div className="feature-tag">{featured.tag}</div>
            <div className="feature-title">{featured.title}</div>
            <p className="feature-desc">{featured.desc}</p>
            <div className="feature-metrics">
              {featured.cardMetrics.map((m, i) => (
                <div key={i}>
                  <div className="metric-val" style={{ fontSize: 26 }}>
                    {m.val}
                  </div>
                  <div className="metric-label">{m.label}</div>
                </div>
              ))}
            </div>
            <div className="feature-link">
              View case study <span>&rarr;</span>
            </div>
          </div>
        </motion.div>

        {/* Grid */}
        <div className="work-grid">
          {rest.map((c, i) => (
            <motion.div
              className="wcard"
              key={c.key}
              onClick={() => openCase(c)}
              onMouseMove={onSpotlight}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{
                duration: 0.5,
                ease: "easeOut",
                delay: (i % 3) * 0.07,
              }}
            >
              <div className="wcard-thumb" style={{ background: c.thumb.bg }}>
                <Thumb c={c} />
              </div>
              <div className="wcard-body">
                <span className="wtag">{c.tag}</span>
                <div className="wtitle">{c.title}</div>
                <p className="wdesc">{c.desc}</p>
                <div className="wmetrics">
                  {c.cardMetrics.map((m, mi) => (
                    <div className="wm" key={mi}>
                      <div className="metric-val" style={{ fontSize: 17 }}>
                        {m.val}
                      </div>
                      <div className="metric-label">{m.label}</div>
                    </div>
                  ))}
                </div>
                <div className="wcard-link">
                  View case study <span>&rarr;</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <CaseModal data={current} open={open} onClose={closeCase} />
    </section>
  );
}
