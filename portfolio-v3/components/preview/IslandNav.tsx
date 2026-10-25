"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import BookButton from "../BookButton";

const links = [
  { href: "#work", label: "Work" },
  { href: "#how", label: "How I work" },
  { href: "/blog", label: "Writing" },
];

// Floating glass pill. On phones the hamburger morphs into an X and opens a full
// screen blurred menu whose links rise in one after another. Escape closes it.
export default function IslandNav() {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);
  return (
    <>
      <header className="pv-nav">
        <Link href="/preview" className="pv-nav-name">
          karan sud
        </Link>
        <nav className="pv-nav-links" aria-label="Main">
          {links.map((l) => (
            <a key={l.href} href={l.href}>
              {l.label}
            </a>
          ))}
        </nav>
        <BookButton className="pv-btn pv-btn-sm" />
        <button
          type="button"
          className="pv-burger"
          aria-expanded={open}
          aria-controls="pv-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((o) => !o)}
        >
          <span />
          <span />
        </button>
      </header>
      <div id="pv-menu" className={`pv-menu${open ? " is-open" : ""}`} inert={!open} aria-hidden={!open}>
        <nav aria-label="Menu">
          {links.map((l, k) => (
            <a key={l.href} href={l.href} style={{ ["--k" as string]: k }} onClick={() => setOpen(false)}>
              {l.label}
            </a>
          ))}
        </nav>
        <div style={{ ["--k" as string]: links.length }} className="pv-menu-cta">
          <BookButton className="pv-btn" />
        </div>
      </div>
    </>
  );
}
