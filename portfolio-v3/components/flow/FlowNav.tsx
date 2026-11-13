"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import BookButton from "../BookButton";

const links = [
  { href: "#work", label: "Work" },
  { href: "#built", label: "Built" },
  { href: "/blog", label: "Writing" },
];

// Glass bar on paper. On phones the two lines of the menu button fold into an X and a
// full-screen paper menu opens with its links rising in one after another (Escape closes).
export default function FlowNav() {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", onKey); document.body.style.overflow = ""; };
  }, [open]);
  return (
    <>
      <header className="fl-nav">
        <Link href="/" className="fl-name">Karan Sud</Link>
        <nav aria-label="Main">
          {links.map((l) => <a key={l.href} href={l.href}>{l.label}</a>)}
        </nav>
        <BookButton className="fl-btn fl-btn-sm fl-call" />
        <button type="button" className="fl-burger" aria-expanded={open} aria-controls="fl-menu" aria-label={open ? "Close menu" : "Open menu"} onClick={() => setOpen((o) => !o)}>
          <span /><span />
        </button>
      </header>
      <div id="fl-menu" className={`fl-menu${open ? " is-open" : ""}`} inert={!open} aria-hidden={!open}>
        <nav aria-label="Menu">
          {links.map((l, k) => (
            <a key={l.href} href={l.href} style={{ ["--k" as string]: k }} onClick={() => setOpen(false)}>{l.label}</a>
          ))}
        </nav>
        <div className="fl-menu-cta" style={{ ["--k" as string]: links.length }}><BookButton className="fl-btn fl-call" /></div>
      </div>
    </>
  );
}
