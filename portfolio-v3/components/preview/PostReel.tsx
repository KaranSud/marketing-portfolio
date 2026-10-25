"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import type { Post } from "@/lib/posts";

// A swipeable row of real posts at their own shape. Videos play muted only while
// mostly on screen; tapping any post opens it large (native <dialog>: focus stays
// inside, Escape closes) with next and previous, sound on for videos.
export default function PostReel({ items, account }: { items: Post[]; account: string }) {
  const track = useRef<HTMLUListElement>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const [at, setAt] = useState(1);
  const [open, setOpen] = useState<number | null>(null);

  // Counter: the first tile whose left edge is inside the track.
  useEffect(() => {
    const el = track.current;
    if (!el) return;
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const left = el.getBoundingClientRect().left;
        const tiles = [...el.children] as HTMLElement[];
        const i = tiles.findIndex((t) => t.getBoundingClientRect().right > left + 24);
        setAt(Math.max(1, i + 1));
      });
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  // Muted autoplay only while 60% visible, never with reduced motion.
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const vids = track.current?.querySelectorAll("video") ?? [];
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => {
        const v = e.target as HTMLVideoElement;
        if (e.intersectionRatio >= 0.6) v.play().catch(() => {});
        else v.pause();
      }),
      { threshold: [0, 0.6] }
    );
    vids.forEach((v) => io.observe(v));
    return () => io.disconnect();
  }, []);

  const step = (dir: number) => {
    const el = track.current;
    if (el) el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: "smooth" });
  };

  const show = useCallback((i: number) => {
    setOpen((i + items.length) % items.length);
    if (!dialog.current?.open) dialog.current?.showModal();
  }, [items.length]);

  useEffect(() => {
    const d = dialog.current;
    if (!d) return;
    const onKey = (e: KeyboardEvent) => {
      if (open === null) return;
      if (e.key === "ArrowRight") show(open + 1);
      if (e.key === "ArrowLeft") show(open - 1);
    };
    const onClose = () => setOpen(null);
    d.addEventListener("keydown", onKey);
    d.addEventListener("close", onClose);
    return () => {
      d.removeEventListener("keydown", onKey);
      d.removeEventListener("close", onClose);
    };
  }, [open, show]);

  const cur = open === null ? null : items[open];
  return (
    <div className="pv-reel">
      <ul ref={track} className="pv-reel-track" aria-label={`Posts I made for ${account}`}>
        {items.map((p, i) => (
          <li key={p.src} style={{ ["--r" as string]: Math.min(1.9, Math.max(0.56, p.w / p.h)).toFixed(3) }}>
            <button type="button" className="pv-tile" onClick={() => show(i)} aria-label={`Open: ${p.alt.slice(0, 80)}, ${p.caption}`}>
              {p.video ? (
                <video src={p.video} poster={p.src} muted loop playsInline preload="none" aria-hidden="true" />
              ) : (
                <Image src={p.src} alt="" fill sizes="(max-width: 860px) 70vw, 30vw" />
              )}
              {p.video ? <span className="pv-tile-play" aria-hidden="true" /> : null}
            </button>
            <p className="pv-tile-cap">{p.caption.replace(/^.* on /, "")}</p>
          </li>
        ))}
      </ul>
      <div className="pv-reel-bar">
        <span className="pv-count" aria-live="polite">
          {at} / {items.length}
        </span>
        <button type="button" className="pv-arrow" onClick={() => step(-1)} aria-label="Previous posts">
          <span aria-hidden="true">←</span>
        </button>
        <button type="button" className="pv-arrow" onClick={() => step(1)} aria-label="Next posts">
          <span aria-hidden="true">→</span>
        </button>
      </div>

      <dialog ref={dialog} className="pv-view" aria-label="Post">
        {cur ? (
          <div className="pv-view-inner">
            <div className="pv-view-media" style={{ aspectRatio: `${cur.w} / ${cur.h}` }}>
              {cur.video ? (
                <video key={cur.video} src={cur.video} poster={cur.src} controls autoPlay playsInline />
              ) : (
                <Image key={cur.src} src={cur.src} alt={`${account} post: ${cur.alt}`} fill sizes="90vw" />
              )}
            </div>
            <div className="pv-view-bar">
              <p>
                {cur.caption}.{" "}
                <a href={cur.href} target="_blank" rel="noopener noreferrer" className="pv-link">
                  Open the original
                </a>
              </p>
              <div>
                <button type="button" className="pv-arrow" onClick={() => show((open ?? 0) - 1)} aria-label="Previous post">
                  <span aria-hidden="true">←</span>
                </button>
                <button type="button" className="pv-arrow" onClick={() => show((open ?? 0) + 1)} aria-label="Next post">
                  <span aria-hidden="true">→</span>
                </button>
                <button type="button" className="pv-arrow" onClick={() => dialog.current?.close()} aria-label="Close">
                  <span aria-hidden="true">✕</span>
                </button>
              </div>
            </div>
          </div>
        ) : null}
      </dialog>
    </div>
  );
}
