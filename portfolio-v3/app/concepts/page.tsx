import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { caseStudies } from "@/lib/caseStudies";
import { creatives } from "@/lib/creatives";
import { imageSize } from "@/lib/imageSize";
import { posts } from "@/lib/posts";
import Concepts, { type Client } from "@/components/preview/Concepts";
import "./concepts.css";

// Three quick concept previews for Karan to compare (REPLAN-2026-10-23.md, v3 concept options).
// Every number comes from caseStudies.ts (facts-checked); tenures from his resume and facts.md.
export const metadata: Metadata = { title: "Karan Sud, concepts", robots: { index: false, follow: false } };
const geist = Geist({ subsets: ["latin"], weight: ["400", "500", "600"], variable: "--pv-font" });

const extra: Record<string, { logo: string; handle: string; from: string; to: string }> = {
  opaque: { logo: "Opaque-Studio.png", handle: "opaque.studio", from: "2024-03", to: "2024-05" },
  sportsrush: { logo: "sportsrush.jpg", handle: "", from: "2024-06", to: "2024-09" },
  fantv: { logo: "FanTV-AI.jpg", handle: "FanTV_official", from: "2024-10", to: "2025-08" },
  prashan: { logo: "FanTV-AI.jpg", handle: "prashan_agarwal", from: "2024-10", to: "2025-08" },
  tony: { logo: "Tony-Romas.jpg", handle: "tonyromaslegendarygrill", from: "2025-01", to: "2026-10" },
  bones: { logo: "bones-and-burgers.jpg", handle: "tonyromasbonesandburgers", from: "2025-01", to: "2026-10" },
  potters: { logo: "Potters-Hub.jpg", handle: "potters.hub", from: "2025-02", to: "2025-04" },
  fere: { logo: "Fere-AI.png", handle: "fere_ai", from: "2025-09", to: "2026-05" },
  novaswap: { logo: "Novaswap.jpg", handle: "Novaswap", from: "2025-11", to: "2026-05" },
  bima: { logo: "Bima-BTC.jpg", handle: "BimaBTC", from: "2025-09", to: "2026-05" },
  mohaimina: { logo: "Tony-Romas.jpg", handle: "attorneyminadc", from: "2025-10", to: "2026-04" },
  culturegram: { logo: "Culturegram.png", handle: "", from: "2026-06", to: "2026-10" },
};

export default function ConceptsPage() {
  const clients: Client[] = caseStudies
    .filter((c) => extra[c.key])
    .map((c) => {
      const own = posts[c.key] ?? (creatives[c.key] ?? []).map((p) => {
        const { width, height } = imageSize(p.src);
        const d = new Date(p.caption.split(", ").pop() + (/^\d/.test(p.caption.split(", ").pop() ?? "") ? "" : " 15"));
        return { src: p.src, w: width, h: height, alt: p.alt, caption: p.caption, href: p.href, date: isNaN(d.getTime()) ? "" : d.toISOString().slice(0, 10) };
      });
      return {
        key: c.key,
        name: c.title,
        meta: c.meta,
        kind: c.kind,
        stat: c.stats[0] ?? null,
        shot: c.screenshots[0]?.src ?? null,
        logo: ["prashan", "mohaimina"].includes(c.key) && own[0] ? own[0].src : `/Logos/${extra[c.key].logo}`,
        handle: extra[c.key].handle,
        from: extra[c.key].from,
        to: extra[c.key].to,
        posts: own,
      };
    })
    .sort((a, b) => b.posts.length - a.posts.length);
  return (
    <div className={`cx ${geist.variable}`}>
      <Concepts clients={clients} />
    </div>
  );
}
