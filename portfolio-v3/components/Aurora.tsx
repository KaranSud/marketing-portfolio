"use client";

import { useEffect, useRef } from "react";

type Blob = {
  color: string; // "r,g,b"
  r: number; // radius as fraction of max(viewport)
  cx: number; // base center x (0-1)
  cy: number; // base center y (0-1)
  ax: number; // x drift amplitude (0-1)
  ay: number; // y drift amplitude (0-1)
  sx: number; // x speed
  sy: number; // y speed
  px: number; // phase x
  py: number; // phase y
  a: number; // peak alpha
};

const BLOBS: Blob[] = [
  { color: "108,160,136", r: 0.55, cx: 0.18, cy: 0.12, ax: 0.13, ay: 0.1, sx: 0.00007, sy: 0.00009, px: 0, py: 1, a: 0.16 },
  { color: "74,128,140", r: 0.5, cx: 0.82, cy: 0.18, ax: 0.16, ay: 0.12, sx: 0.00006, sy: 0.00008, px: 2.1, py: 3.4, a: 0.14 },
  { color: "120,150,128", r: 0.45, cx: 0.62, cy: 0.82, ax: 0.18, ay: 0.11, sx: 0.00009, sy: 0.00006, px: 4.2, py: 1.1, a: 0.12 },
  { color: "86,124,158", r: 0.52, cx: 0.32, cy: 0.72, ax: 0.14, ay: 0.15, sx: 0.00005, sy: 0.00007, px: 1.3, py: 5.0, a: 0.13 },
];

export default function Aurora() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const cv = ref.current;
    if (!cv) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = cv.getContext("2d");
    if (!ctx) return;
    const canvas: HTMLCanvasElement = cv;
    const c: CanvasRenderingContext2D = ctx;

    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    let w = 0;
    let h = 0;
    let raf = 0;

    function resize() {
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      c.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function draw(t: number) {
      c.clearRect(0, 0, w, h);
      c.globalCompositeOperation = "lighter";
      const maxd = Math.max(w, h);
      for (const b of BLOBS) {
        const x = (b.cx + Math.sin(t * b.sx + b.px) * b.ax) * w;
        const y = (b.cy + Math.cos(t * b.sy + b.py) * b.ay) * h;
        const radius = b.r * maxd;
        const g = c.createRadialGradient(x, y, 0, x, y, radius);
        g.addColorStop(0, `rgba(${b.color},${b.a})`);
        g.addColorStop(1, `rgba(${b.color},0)`);
        c.fillStyle = g;
        c.beginPath();
        c.arc(x, y, radius, 0, Math.PI * 2);
        c.fill();
      }
      c.globalCompositeOperation = "source-over";
      raf = requestAnimationFrame(draw);
    }

    resize();
    window.addEventListener("resize", resize);
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={ref} className="aurora-canvas" aria-hidden="true" />;
}
