"use client";

import { useEffect } from "react";

// Adds .is-in to every .pv-reveal as it enters the viewport (one IntersectionObserver).
// The hidden start state only applies when scripting is on, so nothing hides without JS.
export default function Reveal() {
  useEffect(() => {
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("is-in");
          io.unobserve(e.target);
        }
      }),
      { rootMargin: "0px 0px -10% 0px" }
    );
    document.querySelectorAll(".pv-reveal").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
  return null;
}
