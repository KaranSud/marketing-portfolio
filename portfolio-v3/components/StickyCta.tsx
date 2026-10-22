"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import BookButton from "./BookButton";

// Phones only (CSS). One Book button is always on screen: this one shows whenever no
// other Book button is (mostly) in view, and hides while a text field has focus.
// When hidden it is inert, so keyboard focus can never land on it.
export default function StickyCta() {
  const [on, setOn] = useState(false);
  const pathname = usePathname();
  useEffect(() => {
    const inView = new Set<Element>();
    let typing = false;
    // Big type and controls it must never sit on: hidden while one reaches the bottom band it occupies.
    const quiet = new Set<Element>();
    const update = () => setOn(inView.size === 0 && quiet.size === 0 && !typing);
    const zio = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) quiet.add(e.target);
          else quiet.delete(e.target);
        }
        update();
      },
      { rootMargin: "-78% 0px 0px 0px" }
    );
    document.querySelectorAll(".v3-index-list, .v3-offer-list, .v3-method-controls").forEach((z) => zio.observe(z));
    const others = [...document.querySelectorAll('a[href*="calendly.com"]')].filter((a) => !a.closest(".v3-sticky"));
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.intersectionRatio >= 0.6) inView.add(e.target);
          else inView.delete(e.target);
        }
        update();
      },
      { threshold: [0, 0.6, 1] }
    );
    others.forEach((a) => io.observe(a));
    // The observer reports every target once on start; without targets, decide now.
    if (!others.length) update();
    const onFocus = (e: FocusEvent) => {
      typing = e.type === "focusin" && (e.target as HTMLElement).matches("input:not([type=range]), textarea");
      update();
    };
    document.addEventListener("focusin", onFocus);
    document.addEventListener("focusout", onFocus);
    return () => {
      io.disconnect();
      zio.disconnect();
      document.removeEventListener("focusin", onFocus);
      document.removeEventListener("focusout", onFocus);
    };
  }, [pathname]);
  return (
    <div className={`v3-sticky${on ? " is-on" : ""}`} aria-hidden={!on} inert={!on}>
      <BookButton />
    </div>
  );
}
