"use client";

import { useEffect, useState } from "react";
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

  useEffect(() => {
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
  }, []);

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

  function scrollTo(e: React.MouseEvent, id: string) {
    e.preventDefault();
    setMenuOpen(false);
    const el = id === "top" ? document.body : document.getElementById(id);
    if (!el) return;
    const lenis = getLenis();
    if (lenis) {
      lenis.scrollTo(id === "top" ? 0 : el, { offset: -64 });
    } else {
      el.scrollIntoView({ behavior: "smooth" });
    }
  }

  return (
    <>
      <nav>
        <div className="nav-inner">
          <a href="#" className="nav-logo" onClick={(e) => scrollTo(e, "top")}>
            Karan Sud
          </a>
          <div className="nav-links">
            {links.map(([id, label]) => (
              <a
                key={id}
                href={`#${id}`}
                className={active === id ? "active" : undefined}
                aria-current={active === id ? "true" : undefined}
                onClick={(e) => scrollTo(e, id)}
              >
                {label}
              </a>
            ))}
            <a
              href="#contact"
              className="btn btn-ghost nav-cta"
              onClick={(e) => scrollTo(e, "contact")}
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
              href={`#${id}`}
              className={active === id ? "active" : undefined}
              onClick={(e) => scrollTo(e, id)}
            >
              {label}
            </a>
          ))}
          <a
            href="#contact"
            className="btn btn-primary mobile-menu-cta"
            onClick={(e) => scrollTo(e, "contact")}
          >
            Get in touch
          </a>
        </div>
      </div>
    </>
  );
}
