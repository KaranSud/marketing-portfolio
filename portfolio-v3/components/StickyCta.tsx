"use client";

import { useEffect, useState } from "react";
import BookButton from "./BookButton";

// Phones only (CSS). Shows once the hero has scrolled away, hides at the
// contact section and while a text field has focus.
export default function StickyCta() {
  const [on, setOn] = useState(false);
  useEffect(() => {
    // Pages without the home hero (case pages) show it from the start.
    let pastHero = !document.querySelector(".v3-hero");
    let atContact = false;
    let typing = false;
    const update = () => setOn(pastHero && !atContact && !typing);
    const hero = document.querySelector(".v3-hero");
    const contact = document.getElementById("contact");
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (e.target === hero) pastHero = !e.isIntersecting;
        if (e.target === contact) atContact = e.isIntersecting;
      }
      update();
    });
    if (hero) io.observe(hero);
    if (contact) io.observe(contact);
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
    <div className={`v3-sticky${on ? " is-on" : ""}`} aria-hidden={!on}>
      <BookButton />
    </div>
  );
}
