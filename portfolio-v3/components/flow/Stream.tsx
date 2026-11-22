"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import type { Post } from "@/lib/posts";

// One client as a moving stream: their posts drift sideways forever (pause on hover
// or focus), reels preload just before they appear and play muted while visible, tap opens the post large with sound,
// next and previous. The large view grows out of the tapped tile (easyui Morphing Dialog, ported).
export default function Stream({ posts, account, reverse = false, speed = 60 }: { posts: Post[]; account: string; reverse?: boolean; speed?: number }) {
  const track = useRef<HTMLDivElement>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const [open, setOpen] = useState<number | null>(null);
  // Tile images load in the order they appear: once the row is within half a screen, the tiles on screen
  // plus the next two screen-widths in the direction the row moves, then more as it slides. Native lazy loading
  // looks thousands of pixels ahead on slow connections, so whole rows used to load at once and starve the
  // tiles actually on screen. A post's two copies in the looping track share one image.
  const [shown, setShown] = useState<Set<string>>(() => new Set());
  useEffect(() => {
    const row = track.current!.parentElement!;
    let timer: ReturnType<typeof setInterval> | undefined;
    const pick = () => {
      const b = row.getBoundingClientRect();
      const add: string[] = [];
      row.querySelectorAll<HTMLElement>("[data-key]").forEach((t) => {
        const r = t.getBoundingClientRect();
        const ahead = reverse ? b.left - r.right : r.left - b.right; // distance still to travel before entering
        const on = r.right > b.left && r.left < b.right;
        if (on || (ahead >= 0 && ahead < b.width * 2)) add.push(t.dataset.key!);
      });
      setShown((old) => (add.every((k) => old.has(k)) ? old : new Set([...old, ...add])));
    };
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !timer) { pick(); timer = setInterval(pick, 700); }
      else if (!e.isIntersecting && timer) { clearInterval(timer); timer = undefined; }
    }, { rootMargin: "50% 0px" });
    // Start once the page has finished loading, so tiles added as rows slide never hold the load spinner.
    const start = () => io.observe(row);
    if (document.readyState === "complete") start(); else addEventListener("load", start, { once: true });
    return () => { removeEventListener("load", start); io.disconnect(); if (timer) clearInterval(timer); };
  }, [reverse]);
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const row = track.current!.parentElement!;
    const vids = [...track.current!.querySelectorAll("video")];
    // Reels play while at least half of the tile is on screen, and pause when it leaves.
    const io = new IntersectionObserver((es) => es.forEach((e) => {
      const v = e.target as HTMLVideoElement;
      if (e.isIntersecting) {
        if (!v.src && v.dataset.src) v.src = v.dataset.src;
        v.play().catch(() => {});
      } else v.pause();
    }), { threshold: 0.5 });
    vids.forEach((v) => io.observe(v));

    // Preload (Karan, 22 Nov 2026): reels load just before they appear, so they play the moment they slide in.
    // While the row is within a screen of the viewport, keep a reel or two loading, nearest first: tiles on
    // screen, then the ones about to enter from the side the row moves in from. Images that are already on
    // screen load first, and weak connections load one reel at a time, so no tile is left blank for a video.
    const conn = (navigator as Navigator & { connection?: { downlink?: number; saveData?: boolean } }).connection;
    const weak = !!conn && ((conn.downlink !== undefined && conn.downlink < 3) || !!conn.saveData);
    const max = weak ? 1 : 2;
    // On a weak connection the lighter copy plays instead of a sharper one that would never start.
    if (weak) vids.forEach((v) => { if (v.dataset.lite) v.dataset.src = v.dataset.lite; });
    const asked = new Set<string>();
    let waitingSince = 0;
    const tick = () => {
      const b = row.getBoundingClientRect();
      const inView = (r: DOMRect) => r.right > b.left && r.left < b.right && r.bottom > 0 && r.top < innerHeight;
      // On-screen images get a head start of up to 2 s; on slow links some are always loading, so it is capped.
      if ([...row.querySelectorAll("img")].some((i) => !i.complete && inView(i.getBoundingClientRect()))) {
        waitingSince ||= performance.now();
        if (performance.now() - waitingSince < 2000) return;
      } else waitingSince = 0;
      let busy = vids.filter((v) => v.src && v.readyState < 3 && v.networkState === 2).length;
      const next = vids
        .filter((v) => !v.src && v.dataset.src && !asked.has(v.dataset.src))
        .map((v) => {
          const r = v.getBoundingClientRect();
          const on = r.right > b.left && r.left < b.right;
          return { v, d: on ? -1 : reverse ? b.left - r.right : r.left - b.right };
        })
        .filter((c) => c.d >= -1 && c.d < b.width * 1.5)
        .sort((x, y) => x.d - y.d);
      for (const { v } of next) {
        if (busy >= max) break;
        asked.add(v.dataset.src!); v.preload = "auto"; v.src = v.dataset.src!; busy++;
      }
    };
    let timer: ReturnType<typeof setInterval> | undefined;
    const near = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !timer) { tick(); timer = setInterval(tick, 700); }
      else if (!e.isIntersecting && timer) { clearInterval(timer); timer = undefined; }
    }, { rootMargin: "100% 0px" });
    const start = () => near.observe(row);
    if (document.readyState === "complete") start(); else addEventListener("load", start, { once: true });
    return () => { removeEventListener("load", start); io.disconnect(); near.disconnect(); if (timer) clearInterval(timer); };
  }, [reverse]);
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
        {[...posts, ...posts].map((p, k) => {
          // Ask for the tile's real width: image height (324px wide screens, 244px phones) times its clamped
          // aspect ratio, so wide posts stay sharp. Quality 85 keeps text in the creatives crisp.
          const ar = Math.min(1.9, Math.max(0.56, p.w / p.h));
          const sizes = `(max-width: 767px) ${Math.ceil(244 * ar)}px, ${Math.ceil(324 * ar)}px`;
          return (
          <button key={k} type="button" className="fl-tile" data-key={p.src || `t${k % posts.length}`} style={{ aspectRatio: `${Math.min(1.9, Math.max(0.56, p.w / p.h))}` }}
            onClick={(e) => show(k % posts.length, e.currentTarget)} tabIndex={k < posts.length ? 0 : -1} aria-hidden={k >= posts.length}
            aria-label={k < posts.length ? `Open ${account} post, ${p.caption}` : undefined}>
            {p.text && !p.src ? (
              <span className="fl-text-card"><span>{p.text}</span><small>{p.caption}</small></span>
            ) : p.video ? (
              <>
                {shown.has(p.src) ? <Image src={p.src} alt="" fill sizes={sizes} quality={85} loading="eager" /> : null}
                <video data-src={p.tile ?? p.video} data-lite={p.lite} muted loop playsInline preload="none" />
              </>
            ) : shown.has(p.src) ? <Image src={p.src} alt="" fill sizes={sizes} quality={85} loading="eager" /> : null}
          </button>
          );
        })}
      </div>
      <dialog ref={dialog} className="fl-view" aria-label="Post" onClose={() => setOpen(null)}>
        {cur ? (
          <div className="fl-view-in">
            <div className="fl-view-media" style={{ aspectRatio: `${cur.w} / ${cur.h}` }}>
              {cur.text && !cur.src ? (
                <p className="fl-view-text">{cur.text}</p>
              ) : cur.video ? <video key={cur.video} src={cur.video} poster={cur.src} controls autoPlay playsInline /> : <Image key={cur.src} src={cur.src} alt={`${account} post: ${cur.alt}`} fill sizes="90vw" quality={85} />}
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
