"use client";

import { useEffect, useState } from "react";
import BookButton from "./BookButton";

// Phones only (CSS). Shows once the hero has scrolled away; hides at the contact
// section, over cards that carry their own button, and while a text field has focus.
// When hidden it is inert, so keyboard focus can never land on it.
export default function StickyCta() {
  const [on, setOn] = useState(false);
  useEffect(() => {
    // Pages without the home hero (case pages, blog) show it from the start.
    let pastHero = !document.querySelector(".v3-hero");
    const covering = new Set<Element>();
    let typing = false;
    const update = () => setOn(pastHero && covering.size === 0 && !typing);
    const hero = document.querySelector(".v3-hero");
    const blockers = document.querySelectorAll("#contact, .v3-tool-card, .v3-offer-cta, .v3-casepage-next");
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (e.target === hero) pastHero = !e.isIntersecting;
        else if (e.isIntersecting) covering.add(e.target);
        else covering.delete(e.target);
      }
      update();
    });
    if (hero) io.observe(hero);
    blockers.forEach((b) => io.observe(b));
    update();
    const onFocus = (e: FocusEvent) => {
      typing = e.type === "focusin" && (e.target as HTMLElement).matches("input:not([type=range]), textarea");
      update();
    };
    document.addEventListener("focusin", onFocus);
    document.addEventListener("focusout", onFocus);
    return () => {
      io.disconnect();
      document.removeEventListener("focusin", onFocus);
      document.removeEventListener("focusout", onFocus);
    };
  }, []);
  return (
    <div className={`v3-sticky${on ? " is-on" : ""}`} aria-hidden={!on} inert={!on}>
      <BookButton />
    </div>
  );
}
