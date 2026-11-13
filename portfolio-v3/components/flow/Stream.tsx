"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import type { Post } from "@/lib/posts";

// One client as a moving stream: their posts drift sideways forever (pause on hover
// or focus), reels play muted while visible, tap opens the post large with sound,
// next and previous. The large view grows out of the tapped tile (easyui Morphing Dialog, ported).
export default function Stream({ posts, account, reverse = false, speed = 60 }: { posts: Post[]; account: string; reverse?: boolean; speed?: number }) {
  const track = useRef<HTMLDivElement>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const [open, setOpen] = useState<number | null>(null);
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const vids = track.current?.querySelectorAll("video") ?? [];
    // Reels fetch nothing until their tile is on screen: the src is attached on first view.
    const io = new IntersectionObserver((es) => es.forEach((e) => {
      const v = e.target as HTMLVideoElement;
      if (e.isIntersecting) {
        if (!v.src && v.dataset.src) v.src = v.dataset.src;
        v.play().catch(() => {});
      } else v.pause();
    }), { threshold: 0.5 });
    vids.forEach((v) => io.observe(v));
    return () => io.disconnect();
  }, []);
  const from = useRef<DOMRect | null>(null);
  const show = (i: number, tile?: HTMLElement) => {
    setOpen((i + posts.length) % posts.length);
    if (tile) from.current = tile.getBoundingClientRect();
    if (!dialog.current?.open) dialog.current?.showModal();
  };
  useEffect(() => {
    const d = dialog.current, r = from.current;
    if (open === null || !d || !r || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const box = d.querySelector(".fl-view-media") as HTMLElement | null;
    if (!box) return;
    const t = box.getBoundingClientRect();
    from.current = null;
    box.animate(
      [{ transform: `translate(${r.left - t.left}px, ${r.top - t.top}px) scale(${r.width / t.width}, ${r.height / t.height})`, borderRadius: "16px" }, { transform: "none" }],
      { duration: 520, easing: "cubic-bezier(0.32, 0.72, 0, 1)" }
    );
  }, [open]);
  const cur = open === null ? null : posts[open];
  return (
    <div className="fl-stream">
      <div ref={track} className={`fl-stream-track${reverse ? " is-rev" : ""}`} style={{ ["--dur" as string]: `${speed}s` }}>
        {[...posts, ...posts].map((p, k) => (
          <button key={k} type="button" className="fl-tile" style={{ aspectRatio: `${Math.min(1.9, Math.max(0.56, p.w / p.h))}` }}
            onClick={(e) => show(k % posts.length, e.currentTarget)} tabIndex={k < posts.length ? 0 : -1} aria-hidden={k >= posts.length}
            aria-label={k < posts.length ? `Open ${account} post, ${p.caption}` : undefined}>
            {p.text && !p.src ? (
              <span className="fl-text-card"><span>{p.text}</span><small>{p.caption}</small></span>
            ) : p.video ? (
              <>
                <Image src={p.src} alt="" fill sizes="200px" />
                <video data-src={p.video} muted loop playsInline preload="none" />
              </>
            ) : <Image src={p.src} alt="" fill sizes="200px" />}
          </button>
        ))}
      </div>
      <dialog ref={dialog} className="fl-view" aria-label="Post" onClose={() => setOpen(null)}>
        {cur ? (
          <div className="fl-view-in">
            <div className="fl-view-media" style={{ aspectRatio: `${cur.w} / ${cur.h}` }}>
              {cur.text && !cur.src ? (
                <p className="fl-view-text">{cur.text}</p>
              ) : cur.video ? <video key={cur.video} src={cur.video} poster={cur.src} controls autoPlay playsInline /> : <Image key={cur.src} src={cur.src} alt={`${account} post: ${cur.alt}`} fill sizes="90vw" />}
            </div>
            <div className="fl-view-bar">
              <p>{cur.caption}. <a href={cur.href} target="_blank" rel="noopener noreferrer">Open the original</a></p>
              <div>
                <button type="button" onClick={() => show((open ?? 0) - 1)} aria-label="Previous post">←</button>
                <button type="button" onClick={() => show((open ?? 0) + 1)} aria-label="Next post">→</button>
                <button type="button" onClick={() => dialog.current?.close()} aria-label="Close">✕</button>
              </div>
            </div>
          </div>
        ) : null}
      </dialog>
    </div>
  );
}
