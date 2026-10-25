"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import type { Post } from "@/lib/posts";

// One client as a moving stream: their posts drift sideways forever (pause on hover
// or focus), reels play muted while visible, tap opens the post large with sound,
// next and previous. Numbers count up once when they enter.
export function CountUp({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const m = value.match(/^([^\d]*)([\d.,]+)(.*)$/);
  const [shown, setShown] = useState(value);
  useEffect(() => {
    if (!m || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const target = parseFloat(m[2].replace(/,/g, ""));
    const decimals = (m[2].split(".")[1] ?? "").length;
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      const t0 = performance.now();
      const tick = (now: number) => {
        const k = Math.min(1, (now - t0) / 1400);
        const eased = 1 - Math.pow(1 - k, 4);
        setShown(`${m[1]}${(target * eased).toFixed(decimals)}${m[3]}`);
        if (k < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }, { threshold: 0.6 });
    io.observe(ref.current!);
    return () => io.disconnect();
  }, [value]); // eslint-disable-line react-hooks/exhaustive-deps
  return <span ref={ref} aria-label={value}>{shown}</span>;
}

export default function Stream({ posts, account, reverse = false, speed = 60 }: { posts: Post[]; account: string; reverse?: boolean; speed?: number }) {
  const track = useRef<HTMLDivElement>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const [open, setOpen] = useState<number | null>(null);
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const vids = track.current?.querySelectorAll("video") ?? [];
    const io = new IntersectionObserver((es) => es.forEach((e) => {
      const v = e.target as HTMLVideoElement;
      if (e.isIntersecting) v.play().catch(() => {}); else v.pause();
    }), { threshold: 0.5 });
    vids.forEach((v) => io.observe(v));
    return () => io.disconnect();
  }, []);
  const show = (i: number) => { setOpen((i + posts.length) % posts.length); if (!dialog.current?.open) dialog.current?.showModal(); };
  const cur = open === null ? null : posts[open];
  return (
    <div className="fl-stream">
      <div ref={track} className={`fl-stream-track${reverse ? " is-rev" : ""}`} style={{ ["--dur" as string]: `${speed}s` }}>
        {[...posts, ...posts].map((p, k) => (
          <button key={k} type="button" className="fl-tile" style={{ aspectRatio: `${Math.min(1.9, Math.max(0.56, p.w / p.h))}` }}
            onClick={() => show(k % posts.length)} tabIndex={k < posts.length ? 0 : -1} aria-hidden={k >= posts.length}
            aria-label={k < posts.length ? `Open ${account} post, ${p.caption}` : undefined}>
            {p.video ? <video src={p.video} poster={p.src} muted loop playsInline preload="none" /> : <Image src={p.src} alt="" fill sizes="260px" />}
          </button>
        ))}
      </div>
      <dialog ref={dialog} className="fl-view" aria-label="Post" onClose={() => setOpen(null)}>
        {cur ? (
          <div className="fl-view-in">
            <div className="fl-view-media" style={{ aspectRatio: `${cur.w} / ${cur.h}` }}>
              {cur.video ? <video key={cur.video} src={cur.video} poster={cur.src} controls autoPlay playsInline /> : <Image key={cur.src} src={cur.src} alt={`${account} post: ${cur.alt}`} fill sizes="90vw" />}
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
