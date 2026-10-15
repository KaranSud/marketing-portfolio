"use client";

import { useEffect, useRef } from "react";

// The hero's lit object. Short marks drift as turbulent noise; near the
// pointer they settle into laminar streamlines bending around it (potential
// flow past a cylinder, the first plot every CFD course draws), and the
// nearest turn sage. Canvas2D, no dependencies.
//
// Budget: one stroke per alpha bin per frame, no layout reads in the loop,
// 60fps for a second after the pointer moves and 24fps when idle, paused
// off-screen and in hidden tabs. Touch gets a drifting phantom pointer and a
// ripple on tap. Reduced motion and Save-Data get one still frame.

const INK = "242,241,236";
const SAGE = "108,160,136";
const GRAY_BINS = [0.07, 0.13, 0.21, 0.32, 0.46, 0.62];
const SAGE_BINS = [0.5, 0.85];
const FLOW = -0.32; // free-stream direction, radians (slightly up and to the right)
const CYL = 34; // cylinder radius in px

type Rect = { x: number; y: number; w: number; h: number };

export default function HeroField({ maskSelector }: { maskSelector?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    const panel = canvas?.parentElement;
    if (!canvas || !ctx || !panel) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const saveData = Boolean(
      (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData
    );
    const still = reduce || saveData;
    const touch = window.matchMedia("(hover: none)").matches;

    let W = 0, H = 0, R = 230;
    let xs = new Float32Array(0), ys = new Float32Array(0), jit = new Float32Array(0), base = new Float32Array(0);
    let n = 0;
    let masks: Rect[] = [];
    const bins: Int32Array[] = [];
    const counts = new Int32Array(GRAY_BINS.length + SAGE_BINS.length);

    // pointer state, in panel coordinates
    let tx = -9999, ty = -9999, px = -9999, py = -9999;
    let target = 0, active = 0, lastMove = -9999;
    let rippleT = -9999, rippleX = 0, rippleY = 0;
    const t0 = performance.now();

    function build() {
      const r = panel!.getBoundingClientRect();
      W = r.width;
      H = r.height;
      R = W < 520 ? 170 : 230;
      const dpr = Math.min(window.devicePixelRatio || 1, touch ? 1.5 : 2);
      canvas!.width = Math.round(W * dpr);
      canvas!.height = Math.round(H * dpr);
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);

      const s = W < 520 ? 26 : 22;
      const cols = Math.ceil(W / s) + 1, rows = Math.ceil(H / s) + 1;
      const max = cols * rows;
      xs = new Float32Array(max); ys = new Float32Array(max);
      jit = new Float32Array(max); base = new Float32Array(max);
      let seed = 7;
      const rnd = () => ((seed = (seed * 16807) % 2147483647) / 2147483647);
      n = 0;
      for (let j = 0; j < rows; j++) {
        for (let i = 0; i < cols; i++) {
          xs[n] = i * s + (rnd() - 0.5) * s * 0.7;
          ys[n] = j * s + (rnd() - 0.5) * s * 0.7;
          jit[n] = (rnd() - 0.5) * 1.4;
          base[n] = 0.1 + rnd() * 0.16;
          n++;
        }
      }
      for (let b = 0; b < counts.length; b++) bins[b] = new Int32Array(n);

      masks = [];
      if (maskSelector) {
        document.querySelectorAll(maskSelector).forEach((el) => {
          const m = el.getBoundingClientRect();
          masks.push({ x: m.left - r.left - 6, y: m.top - r.top - 6, w: m.width + 12, h: m.height + 12 });
        });
      }
    }

    function draw(now: number) {
      const t = now - t0;
      // ease the light toward the pointer so it trails a little
      px += (tx - px) * 0.2;
      py += (ty - py) * 0.2;
      active += (target - active) * 0.08;

      const rippleAge = now - rippleT;
      const rippleR = rippleAge * 0.42;
      const rippleOn = rippleAge < 1300;

      counts.fill(0);
      const cf = Math.cos(FLOW), sf = Math.sin(FLOW);
      for (let k = 0; k < n; k++) {
        const x = xs[k], y = ys[k];
        let a = Math.sin(x * 0.009 + t * 0.00011) * 1.6 +
          Math.cos(y * 0.011 - t * 0.00009) * 1.3 +
          Math.sin((x - y) * 0.006 + t * 0.00013) * 0.9 + jit[k];
        let w = 0;
        const dx = x - px, dy = y - py;
        const d = Math.hypot(dx, dy);
        if (active > 0.01 && d < R) {
          const q = 1 - d / R;
          w = q * q * (3 - 2 * q) * active;
          // rotate into the free-stream frame, apply cylinder flow, rotate back
          const fx = dx * cf + dy * sf, fy = -dx * sf + dy * cf;
          const rr = Math.max(d, CYL * 0.6), th = Math.atan2(fy, fx);
          const k2 = (CYL * CYL) / (rr * rr);
          const vr = (1 - k2) * Math.cos(th), vt = -(1 + k2) * Math.sin(th);
          const ux = vr * Math.cos(th) - vt * Math.sin(th);
          const uy = vr * Math.sin(th) + vt * Math.cos(th);
          const flow = Math.atan2(ux * sf + uy * cf, ux * cf - uy * sf);
          const bx = (1 - w) * Math.cos(a) + w * Math.cos(flow);
          const by = (1 - w) * Math.sin(a) + w * Math.sin(flow);
          a = Math.atan2(by, bx);
          if (d < CYL) w *= d / CYL; // the cylinder itself stays dark
        }
        if (rippleOn) {
          const band = 1 - Math.abs(Math.hypot(x - rippleX, y - rippleY) - rippleR) / 60;
          if (band > 0) w = Math.max(w, band * (1 - rippleAge / 1300));
        }
        let alpha = base[k] + w * 0.66;
        for (let m = 0; m < masks.length; m++) {
          const r = masks[m];
          if (x > r.x && x < r.x + r.w && y > r.y && y < r.y + r.h) { alpha *= 0.15; w *= 0.15; break; }
        }
        let b: number;
        if (w > 0.55) b = GRAY_BINS.length + (w > 0.78 ? 1 : 0);
        else {
          b = 0;
          while (b < GRAY_BINS.length - 1 && alpha > (GRAY_BINS[b] + GRAY_BINS[b + 1]) / 2) b++;
        }
        bins[b][counts[b]++] = k;
        // pack angle and length for the stroke pass
        angle[k] = a;
        len[k] = 3.2 + w * 10;
      }

      ctx!.clearRect(0, 0, W, H);
      ctx!.lineCap = "round";
      ctx!.lineWidth = 1.15;
      for (let b = 0; b < counts.length; b++) {
        const c = counts[b];
        if (!c) continue;
        const sage = b >= GRAY_BINS.length;
        const al = sage ? SAGE_BINS[b - GRAY_BINS.length] : GRAY_BINS[b];
        ctx!.strokeStyle = `rgba(${sage ? SAGE : INK},${al})`;
        ctx!.beginPath();
        const list = bins[b];
        for (let i = 0; i < c; i++) {
          const k = list[i];
          const hx = Math.cos(angle[k]) * len[k] * 0.5, hy = Math.sin(angle[k]) * len[k] * 0.5;
          ctx!.moveTo(xs[k] - hx, ys[k] - hy);
          ctx!.lineTo(xs[k] + hx, ys[k] + hy);
        }
        ctx!.stroke();
      }
    }

    let angle = new Float32Array(0), len = new Float32Array(0);
    function sizeScratch() {
      angle = new Float32Array(n);
      len = new Float32Array(n);
    }

    let raf = 0, running = false, visible = true, last = 0;
    const loop = (now: number) => {
      raf = requestAnimationFrame(loop);
      const t = now - t0;
      // opening sweep: a phantom pointer crosses the panel once
      if (!touch && t < 1600 && lastMove < 0) {
        const p = t / 1600;
        tx = -0.1 * W + p * 1.2 * W;
        ty = H * (0.38 + 0.08 * Math.sin(p * Math.PI));
        if (px < -999) { px = tx; py = ty; }
        target = Math.sin(p * Math.PI);
      } else if (touch || now - lastMove > 2500) {
        // no pointer to follow: a phantom drifts slowly so the field still shows its order
        tx = W * (0.5 + 0.3 * Math.sin(t * 0.00021));
        ty = H * (0.45 + 0.26 * Math.sin(t * 0.00033 + 1));
        if (px < -999) { px = tx; py = ty; }
        target = touch ? 0.85 : 0.65;
      }
      const busy = now - lastMove < 1000 || t < 1600 || now - rippleT < 1300;
      if (!busy && now - last < 41) return;
      last = now;
      draw(now);
    };
    const start = () => {
      if (running || still) return;
      running = true;
      raf = requestAnimationFrame(loop);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };

    const onMove = (e: PointerEvent) => {
      if (e.pointerType === "touch") return;
      const r = panel!.getBoundingClientRect();
      const x = e.clientX - r.left, y = e.clientY - r.top;
      const inside = x > -120 && y > -120 && x < W + 120 && y < H + 120;
      tx = x; ty = y;
      if (px < -999) { px = x; py = y; }
      target = inside ? 1 : 0;
      lastMove = performance.now();
    };
    const onLeave = () => { target = 0; };
    const onTap = (e: PointerEvent) => {
      const r = panel!.getBoundingClientRect();
      rippleX = e.clientX - r.left;
      rippleY = e.clientY - r.top;
      rippleT = performance.now();
    };

    build();
    sizeScratch();

    if (still) {
      // one composed frame: a calm aligned region left of centre
      tx = px = W * 0.38;
      ty = py = H * 0.42;
      target = active = 1;
      draw(performance.now() + 4000);
      const ro = new ResizeObserver(() => { build(); sizeScratch(); draw(performance.now() + 4000); });
      ro.observe(panel);
      return () => ro.disconnect();
    }

    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      if (visible && !document.hidden) start(); else stop();
    });
    const onVis = () => (document.hidden || !visible ? stop() : start());
    const ro = new ResizeObserver(() => { build(); sizeScratch(); });

    const w = window as Window & { requestIdleCallback?: (f: () => void, o?: { timeout: number }) => number };
    const idle = (cb: () => void) =>
      w.requestIdleCallback ? w.requestIdleCallback(cb, { timeout: 900 }) : setTimeout(cb, 200);
    idle(() => {
      io.observe(panel);
      ro.observe(panel);
      document.addEventListener("visibilitychange", onVis);
      window.addEventListener("pointermove", onMove, { passive: true });
      document.documentElement.addEventListener("pointerleave", onLeave);
      panel.addEventListener("pointerdown", onTap, { passive: true });
    });

    return () => {
      stop();
      io.disconnect();
      ro.disconnect();
      document.removeEventListener("visibilitychange", onVis);
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      panel.removeEventListener("pointerdown", onTap);
    };
  }, [maskSelector]);

  return <canvas ref={ref} aria-hidden="true" />;
}
