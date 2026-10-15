"use client";

import { useEffect, useState } from "react";
import { BlogThumb } from "@/components/BlogHeader";
import {
  showcase,
  categoriesWithItems,
  CATEGORIES,
  type ShowcaseItem,
  type ShowcaseCategory,
} from "@/lib/showcase";

const label = (c: ShowcaseCategory) =>
  CATEGORIES.find((x) => x.id === c)?.label ?? c;

function youtubeEmbed(src: string): string {
  const m = src.match(
    /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/))([\w-]{6,})/
  );
  const id = m ? m[1] : src;
  return `https://www.youtube.com/embed/${id}`;
}

function Thumb({ item }: { item: ShowcaseItem }) {
  if (item.image)
    // eslint-disable-next-line @next/next/no-img-element
    return <img className="sample-img" src={item.image} alt={item.title} />;
  return <BlogThumb accent={item.accent ?? "sage"} />;
}

export default function Samples() {
  const cats = categoriesWithItems();
  const [active, setActive] = useState<ShowcaseCategory | "all">("all");
  const [open, setOpen] = useState<ShowcaseItem | null>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(null);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  // Render X/Twitter embeds client-side via the widget script (works in the
  // browser even though server-side oEmbed is blocked).
  useEffect(() => {
    if (open?.embed?.type !== "tweet") return;
    const w = window as unknown as {
      twttr?: { widgets?: { load: (el?: HTMLElement) => void } };
    };
    const run = () => w.twttr?.widgets?.load?.();
    if (w.twttr?.widgets) {
      run();
      return;
    }
    const existing = document.getElementById("twitter-wjs");
    if (existing) {
      existing.addEventListener("load", run);
      return;
    }
    const s = document.createElement("script");
    s.id = "twitter-wjs";
    s.src = "https://platform.twitter.com/widgets.js";
    s.async = true;
    s.onload = run;
    document.body.appendChild(s);
  }, [open]);

  const items =
    active === "all" ? showcase : showcase.filter((i) => i.category === active);

  function CardInner({ item }: { item: ShowcaseItem }) {
    const isVideo =
      item.embed?.type === "youtube" || item.embed?.type === "video";
    const isTweet = item.embed?.type === "tweet";
    const viewable = !item.embed && !item.href && !!item.image;
    const action = isVideo
      ? "Watch"
      : isTweet
      ? "View post"
      : viewable
      ? "View"
      : item.href
      ? item.href.startsWith("/")
        ? "Read"
        : "Open"
      : "";
    return (
      <>
        <div className="sample-media">
          <Thumb item={item} />
          {isVideo && (
            <span className="sample-play" aria-hidden>
              ▶
            </span>
          )}
        </div>
        <div className="sample-body">
          <span className="sample-cat">{label(item.category)}</span>
          <div className="sample-title">{item.title}</div>
          {item.description && <p className="sample-desc">{item.description}</p>}
          <span className="sample-action">{action}</span>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="sample-tabs">
        <button
          className={active === "all" ? "active" : ""}
          onClick={() => setActive("all")}
        >
          All
        </button>
        {cats.map((c) => (
          <button
            key={c.id}
            className={active === c.id ? "active" : ""}
            onClick={() => setActive(c.id)}
          >
            {c.label}
          </button>
        ))}
      </div>

      {items.length === 0 ? (
        <p className="page-sub">More samples coming soon.</p>
      ) : (
        <div className="sample-grid">
          {items.map((item) => {
            // Redirect cards (external or internal links) are anchors.
            if (item.href && !item.embed) {
              const ext = !item.href.startsWith("/");
              return (
                <a
                  className="sample-card"
                  key={item.id}
                  href={item.href}
                  target={ext ? "_blank" : undefined}
                  rel={ext ? "noopener noreferrer" : undefined}
                >
                  <CardInner item={item} />
                </a>
              );
            }
            // Otherwise open in the lightbox to view/watch on the site.
            return (
              <button
                className="sample-card"
                key={item.id}
                onClick={() => setOpen(item)}
                type="button"
              >
                <CardInner item={item} />
              </button>
            );
          })}
        </div>
      )}

      {open && (
        <div className="lightbox" onClick={() => setOpen(null)}>
          <button
            className="lightbox-close"
            onClick={() => setOpen(null)}
            aria-label="Close"
          >
            ×
          </button>
          <div className="lightbox-inner" onClick={(e) => e.stopPropagation()}>
            {open.embed?.type === "youtube" && (
              <iframe
                className="lightbox-embed"
                src={youtubeEmbed(open.embed.src)}
                title={open.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            )}
            {open.embed?.type === "video" && (
              <video className="lightbox-embed" src={open.embed.src} controls autoPlay />
            )}
            {open.embed?.type === "iframe" && (
              <iframe
                className="lightbox-embed"
                src={open.embed.src}
                title={open.title}
              />
            )}
            {open.embed?.type === "tweet" && (
              <div className="lightbox-tweet" key={open.id}>
                <blockquote
                  className="twitter-tweet"
                  data-theme="dark"
                  data-dnt="true"
                >
                  <a href={open.embed.src}>{open.title}</a>
                </blockquote>
              </div>
            )}
            {!open.embed && open.image && (
              // eslint-disable-next-line @next/next/no-img-element
              <img className="lightbox-img" src={open.image} alt={open.title} />
            )}
            <div className="lightbox-cap">
              <span>{label(open.category)}</span>
              <strong>{open.title}</strong>
              {open.href && !open.href.startsWith("/") && (
                <a
                  href={open.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="lightbox-link"
                >
                  View original
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
