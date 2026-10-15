"use client";

import { useEffect } from "react";

// One observer for every [data-reveal] element on the page: each part of a
// section rises in once, staggered by its --i. Content is only hidden when
// html.js is set, and a fallback timer shows everything if observing fails.
export default function RevealObserver() {
  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    const showAll = () => els.forEach((el) => el.classList.add("is-in"));
    if (!("IntersectionObserver" in window)) return showAll();
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("is-in");
            io.unobserve(e.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
  return null;
}
