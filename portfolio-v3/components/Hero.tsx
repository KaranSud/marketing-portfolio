import Image from "next/image";
import HeroField from "./HeroField";
import BookButton from "./BookButton";
import { linkify } from "@/lib/linkify";

// Every number here is in tasks/v3/research/facts.md: table (a) rows 1 and 4, and the
// Fere AI signups row in (e). The promise is users, so the tiles count people.
const proof = [
  { num: "297.7K", label: "FanTV AI's followers on X, up from 70K in 11 months, with airdrops and a 100+ KOL program" },
  { num: "12K+", label: "Signups for Fere AI, an AI trading agent, with zero paid budget" },
  { num: "#2", label: "Product of the Day on Product Hunt, for the Fere AI launch" },
];
const sources = { "Product Hunt": "https://www.producthunt.com/products/fere-ai" };

export default function Hero() {
  return (
    <section className="v3-hero" aria-label="Introduction">
      <div className="v3-hero-panel">
        <HeroField maskSelector=".v3-hero-name, .v3-hero-fieldnote" />
        <p className="v3-hero-fieldnote">
          Before marketing I was a CFD engineer. <span className="v3-on-hover">Move your pointer through the flow.</span>
          <span className="v3-on-touch">Tap the field.</span>
        </p>
      </div>

      <div className="v3-hero-copy">
        <p className="v3-hero-statement">
          <span>I make the content that grows</span> <span>brands and founders.</span>
        </p>
        <p className="v3-hero-support">
          Growth and content marketing as a project or as part-time support, for 13+ brands and founders in 7+ industries, including AI and crypto apps, restaurants, home brands, sports media and executives. I build software
          too.
        </p>
        <div className="v3-hero-actions">
          <div className="v3-hero-cta">
            <span className="v3-hero-face">
              <Image src="/karan.jpg" alt="Karan Sud" fill sizes="72px" priority />
            </span>
            <BookButton />
          </div>
          <span className="v3-hero-note">
            Pick a time on my calendar. Prefer{" "}
            <a className="tlink" href="mailto:contactkaransud@gmail.com">
              email
            </a>
            ? I reply within 24 hours.
          </span>
        </div>
        <ul className="v3-proof" aria-label="Results">
          {proof.map((p) => (
            <li key={p.num}>
              <span className="v3-proof-num">{p.num}</span>
              <span className="v3-proof-label">{linkify(p.label, sources)}</span>
            </li>
          ))}
        </ul>
      </div>

      <h1 className="v3-hero-name">karan sud</h1>
    </section>
  );
}
