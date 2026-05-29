"use client";

import { useEffect, useRef, useState } from "react";

function parseStatVal(str: string) {
  str = str.trim();
  const prefix = str.match(/^[^0-9]*/)?.[0] ?? "";
  const suffix = str.match(/[^0-9.]+$/)?.[0] ?? "";
  const num = parseFloat(str.replace(prefix, "").replace(suffix, ""));
  return { prefix, suffix, num };
}

function easeOut(t: number) {
  return 1 - Math.pow(1 - t, 3);
}

/**
 * Count-up animation that fires once when the element scrolls into view,
 * then settles back to the exact original string (preserving K/M/+/$ etc.).
 */
export default function CountUp({
  value,
  className,
}: {
  value: string;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const { prefix, suffix, num } = parseStatVal(value);
    if (isNaN(num)) {
      setDisplay(value);
      return;
    }

    let raf = 0;
    let started = false;
    const isDecimal = num % 1 !== 0;
    const duration = 1600;

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !started) {
            started = true;
            const start = performance.now();
            const tick = (now: number) => {
              const t = Math.min((now - start) / duration, 1);
              const val = easeOut(t) * num;
              setDisplay(
                prefix + (isDecimal ? val.toFixed(1) : Math.floor(val)) + suffix
              );
              if (t < 1) raf = requestAnimationFrame(tick);
              else setDisplay(value);
            };
            raf = requestAnimationFrame(tick);
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );

    obs.observe(el);
    return () => {
      cancelAnimationFrame(raf);
      obs.disconnect();
    };
  }, [value]);

  return (
    <div ref={ref} className={className}>
      {display}
    </div>
  );
}
