"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { getLenis } from "@/lib/lenis";

const links: [string, string][] = [
  ["work", "Work"],
  ["services", "Services"],
  ["brands", "Brands"],
  ["skills", "Toolkit"],
  ["labs", "Labs"],
];

export default function Nav() {
  const [active, setActive] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const onHome = pathname === "/";

  useEffect(() => {
    if (!onHome) return;
    const ids = ["work", "services", "brands", "skills", "labs", "contact"];
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, [onHome]);

  useEffect(() => {
    const lenis = getLenis();
    if (menuOpen) {
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
  }, [menuOpen]);

  // On the home page, hash links smooth-scroll. On sub-pages they navigate back
  // to the section, so we let the browser follow the /#id href.
  function handleSection(e: React.MouseEvent, id: string) {
    setMenuOpen(false);
    if (!onHome) return;
    e.preventDefault();
    const el = id === "top" ? document.body : document.getElementById(id);
    if (!el) return;
    const lenis = getLenis();
    if (lenis) lenis.scrollTo(id === "top" ? 0 : el, { offset: -64 });
    else el.scrollIntoView({ behavior: "smooth" });
  }

  const sectionHref = (id: string) => (onHome ? `#${id}` : `/#${id}`);

  return (
    <>
      <nav>
        <div className="nav-inner">
          <a
            href={onHome ? "#" : "/"}
            className="nav-logo"
            onClick={(e) => handleSection(e, "top")}
          >
            Karan Sud
          </a>
          <div className="nav-links">
            {links.map(([id, label]) => (
              <a
                key={id}
                href={sectionHref(id)}
                className={onHome && active === id ? "active" : undefined}
                aria-current={onHome && active === id ? "true" : undefined}
                onClick={(e) => handleSection(e, id)}
              >
                {label}
              </a>
            ))}
            <a
              href="/blog"
              className={pathname?.startsWith("/blog") ? "active" : undefined}
              onClick={() => setMenuOpen(false)}
            >
              Blog
            </a>
            <a
              href="/samples"
              className={pathname?.startsWith("/samples") ? "active" : undefined}
              onClick={() => setMenuOpen(false)}
            >
              Samples
            </a>
            <a
              href={sectionHref("contact")}
              className="btn btn-ghost nav-cta"
              onClick={(e) => handleSection(e, "contact")}
            >
              Get in touch
            </a>
          </div>
          <button
            className="nav-toggle"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
          >
            <span className={`nav-toggle-bar${menuOpen ? " a" : ""}`} />
            <span className={`nav-toggle-bar${menuOpen ? " b" : ""}`} />
          </button>
        </div>
      </nav>

      <div className={`mobile-menu${menuOpen ? " open" : ""}`}>
        <div className="mobile-menu-inner">
          {links.map(([id, label]) => (
            <a
              key={id}
              href={sectionHref(id)}
              className={onHome && active === id ? "active" : undefined}
              onClick={(e) => handleSection(e, id)}
            >
              {label}
            </a>
          ))}
          <a href="/blog" onClick={() => setMenuOpen(false)}>
            Blog
          </a>
          <a href="/samples" onClick={() => setMenuOpen(false)}>
            Samples
          </a>
          <a
            href={sectionHref("contact")}
            className="btn btn-primary mobile-menu-cta"
            onClick={(e) => handleSection(e, "contact")}
          >
            Get in touch
          </a>
        </div>
      </div>
    </>
  );
}
