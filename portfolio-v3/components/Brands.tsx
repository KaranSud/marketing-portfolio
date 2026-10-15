/* eslint-disable @next/next/no-img-element */
"use client";

import { useState } from "react";
import SectionHead from "./SectionHead";

type Brand = { name: string; src: string; fallback: string };

const row1: Brand[] = [
  { name: "FanTV AI", src: "/Logos/FanTV-AI.jpg", fallback: "F" },
  { name: "Novaswap", src: "/Logos/Novaswap.jpg", fallback: "N" },
  { name: "Fere AI", src: "/Logos/fereai.jpg", fallback: "F" },
  { name: "Defx", src: "/Logos/defx-logomark.png", fallback: "D" },
  { name: "BimaBTC", src: "/Logos/Bima-BTC.jpg", fallback: "B" },
];

const row2: Brand[] = [
  { name: "Tony Roma's", src: "/Logos/Tony-Romas.jpg", fallback: "T" },
  { name: "Bones & Burgers", src: "/Logos/bones-and-burgers.jpg", fallback: "B" },
  { name: "Potters' Hub", src: "/Logos/Potters-Hub.jpg", fallback: "P" },
  { name: "Opaque Studio", src: "/Logos/Opaque-Studio.png", fallback: "O" },
  { name: "The Sportrush", src: "/Logos/sportsrush.jpg", fallback: "S" },
];

function Chip({ brand }: { brand: Brand }) {
  const [errored, setErrored] = useState(false);
  return (
    <div className="bchip">
      {errored ? (
        <div className="bicon">{brand.fallback}</div>
      ) : (
        <img
          src={brand.src}
          alt={brand.name}
          loading="lazy"
          decoding="async"
          onError={() => setErrored(true)}
        />
      )}
      {brand.name}
    </div>
  );
}

function Row({ brands, dir }: { brands: Brand[]; dir: "left" | "right" }) {
  // Duplicate the set so the -50% translate loops seamlessly.
  const doubled = [...brands, ...brands];
  return (
    <div className={`marquee-row ${dir}`}>
      {doubled.map((b, i) => (
        <Chip brand={b} key={`${b.name}-${i}`} />
      ))}
    </div>
  );
}

export default function Brands() {
  return (
    <section id="brands" className="section">
      <div className="container">
        <SectionHead
          title={
            <>
              Across <em>eight industries</em>
            </>
          }
          sub="From Web3 protocols and AI products to global restaurant chains and D2C brands."
        />
      </div>

      <div className="marquee">
        <Row brands={row1} dir="left" />
        <Row brands={row2} dir="right" />
      </div>
    </section>
  );
}
