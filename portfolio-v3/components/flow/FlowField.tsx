"use client";

import { useEffect, useRef } from "react";

// Live CFD flow on paper: tracer particles in a uniform stream with a cylinder at
// the pointer (potential flow past a cylinder, the textbook first plot), plus a
// slow wake wobble. Trails fade into the paper. Near the pointer, tracers turn sage.
// Pauses off screen and in hidden tabs; reduced motion draws one still frame.
const PAPER = "244,241,234";
const INK = "26,26,23";
const SAGE = "108,160,136";

export default function FlowField({ density = 1 }: { density?: number }) {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = ref.current!;
    const ctx = canvas.getContext("2d")!;
    const still = matchMedia("(prefers-reduced-motion: reduce)").matches;
    let w = 0, h = 0, dpr = 1, raf = 0, visible = true, t = 0;
    const pointer = { x: -9999, y: -9999, tx: -9999, ty: -9999, active: false };
    let ps: { x: number; y: number; age: number }[] = [];

    const resize = () => {
      dpr = Math.min(2, devicePixelRatio || 1);
      w = canvas.clientWidth; h = canvas.clientHeight;
      canvas.width = w * dpr; canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const n = Math.round(((w * h) / 900) * density);
      ps = Array.from({ length: Math.min(1400, n) }, () => ({ x: Math.random() * w, y: Math.random() * h, age: Math.random() * 400 }));
      ctx.fillStyle = `rgb(${PAPER})`; ctx.fillRect(0, 0, w, h);
      if (!pointer.active) { pointer.tx = w * 0.72; pointer.ty = h * 0.55; }
    };

    const U = 1.4, R = Math.max(44, Math.min(90, innerWidth * 0.06));
    const vel = (x: number, y: number) => {
      const dx = x - pointer.x, dy = y - pointer.y;
      const r2 = dx * dx + dy * dy;
      let u = U, v = Math.sin(x * 0.006 + t * 0.002) * 0.25 + Math.sin(y * 0.011 - t * 0.003) * 0.12;
      if (r2 > R * R * 0.6) {
        const r4 = r2 * r2, k = R * R;
        u = U * (1 - (k * (dx * dx - dy * dy)) / r4);
        v += -U * ((2 * k * dx * dy) / r4);
      } else { u = 0; v = 0; }
      return [u, v, r2] as const;
    };

    const step = () => {
      t++;
      pointer.x += (pointer.tx - pointer.x) * 0.08;
      pointer.y += (pointer.ty - pointer.y) * 0.08;
      ctx.fillStyle = `rgba(${PAPER},0.07)`;
      ctx.fillRect(0, 0, w, h);
      ctx.lineWidth = 1;
      const near: number[] = [], far: number[] = [];
      for (let i = 0; i < ps.length; i++) {
        const p = ps[i];
        const [u, v, r2] = vel(p.x, p.y);
        const nx = p.x + u, ny = p.y + v;
        (r2 < (R * 3.2) ** 2 ? near : far).push(p.x, p.y, nx, ny);
        p.x = nx; p.y = ny; p.age++;
        if (p.x > w + 4 || p.y < -4 || p.y > h + 4 || p.age > 600 || (u === 0 && v === 0)) {
          p.x = -Math.random() * 40; p.y = Math.random() * h; p.age = 0;
        }
      }
      const stroke = (arr: number[], c: string) => {
        ctx.strokeStyle = c; ctx.beginPath();
        for (let i = 0; i < arr.length; i += 4) { ctx.moveTo(arr[i], arr[i + 1]); ctx.lineTo(arr[i + 2], arr[i + 3]); }
        ctx.stroke();
      };
      stroke(far, `rgba(${INK},0.32)`);
      stroke(near, `rgba(${SAGE},0.9)`);
    };

    const loop = () => { if (visible && !document.hidden) step(); raf = requestAnimationFrame(loop); };
    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      pointer.tx = e.clientX - r.left; pointer.ty = e.clientY - r.top; pointer.active = true;
    };
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; });
    resize();
    pointer.x = pointer.tx; pointer.y = pointer.ty;
    io.observe(canvas);
    addEventListener("resize", resize);
    addEventListener("pointermove", onMove, { passive: true });
    if (still) { for (let i = 0; i < 90; i++) step(); } else loop();
    return () => {
      cancelAnimationFrame(raf); io.disconnect();
      removeEventListener("resize", resize); removeEventListener("pointermove", onMove);
    };
  }, [density]);
  return <canvas ref={ref} className="fl-field" aria-hidden="true" />;
}
