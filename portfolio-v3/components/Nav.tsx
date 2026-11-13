"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import BookButton from "./BookButton";

const links: [string, string][] = [
  ["/#work", "Work"],
  ["/#method", "How I work"],
  ["/#tools", "Tools"],
  ["/blog", "Writing"],
];

export default function Nav() {
  const pathname = usePathname();
  const onHome = pathname === "/";
  const [solid, setSolid] = useState(false);
  const [atHero, setAtHero] = useState(onHome);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setSolid(window.scrollY > 10);
      // On the home page the hero already sets the name very large.
      setAtHero(onHome && window.scrollY < window.innerHeight * 0.6);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [onHome]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  const current = (href: string) =>
    href === "/blog" && pathname?.startsWith("/blog") ? "page" : undefined;

  return (
    <>
      <header className={`v3-nav${solid || open ? " is-solid" : ""}${atHero && !open ? " at-hero" : ""}`}>
        <Link href="/" className="v3-nav-mark" aria-label="Karan Sud, home">
          karan sud
        </Link>
        <nav className="v3-nav-links" aria-label="Main">
          {links.map(([href, label]) => (
            <Link key={href} href={href} aria-current={current(href)}>
              {label}
            </Link>
          ))}
          <BookButton className="cta cta-sm" />
          <button
            className="v3-nav-menu"
            aria-expanded={open}
            aria-controls="v3-menu"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? "Close" : "Menu"}
          </button>
        </nav>
      </header>
      {open ? (
        <div className="v3-menu" id="v3-menu">
          {links.map(([href, label]) => (
            <Link key={href} href={href} onClick={() => setOpen(false)}>
              {label}
            </Link>
          ))}
          <BookButton />
        </div>
      ) : null}
    </>
  );
}
