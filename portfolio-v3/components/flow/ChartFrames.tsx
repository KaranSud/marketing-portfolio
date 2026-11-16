"use client";

import { useEffect } from "react";

// The blog routine's charts are standalone pages shown in iframes with one fixed height, so most
// were cut off at the bottom. They are same-origin, so once a chart loads this reads its real
// height and fits the frame to it. Charts that size themselves from the frame get a few passes
// to settle, with a cap. Also asks each chart for its light theme, to match the paper page.
export default function ChartFrames() {
  useEffect(() => {
    const frames = [...document.querySelectorAll<HTMLIFrameElement>(".chart-embed iframe")];
    const fit = (f: HTMLIFrameElement) => {
      const d = f.contentDocument;
      if (!d?.body || d.readyState !== "complete" || d.URL === "about:blank") return;
      d.documentElement.dataset.theme = "light";
      d.body.style.minHeight = "0"; // a full-height body plus padding would grow on every pass
      for (let i = 0; i < 4; i++) {
        const h = Math.min(1200, Math.max(d.documentElement.scrollHeight, d.body.scrollHeight));
        if (h <= f.clientHeight + 1) break;
        f.style.height = `${h}px`;
      }
    };
    const offs = frames.map((f) => {
      const onLoad = () => { fit(f); setTimeout(() => fit(f), 600); };
      f.addEventListener("load", onLoad);
      onLoad();
      return () => f.removeEventListener("load", onLoad);
    });
    let width = innerWidth;
    const onResize = () => {
      if (innerWidth === width) return;
      width = innerWidth;
      frames.forEach((f) => { f.style.height = ""; fit(f); });
    };
    addEventListener("resize", onResize);
    return () => { offs.forEach((off) => off()); removeEventListener("resize", onResize); };
  }, []);
  return null;
}
