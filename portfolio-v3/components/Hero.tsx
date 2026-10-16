import Image from "next/image";
import HeroField from "./HeroField";
import BookButton from "./BookButton";

// Every number here is in tasks/v3/research/facts.md table (a): rows 1, 2, 4.
const proof = [
  { num: "297.7K", label: "FanTV AI's followers on X, up from 70K in 11 months, with airdrops and a 100+ KOL program" },
  { num: "$1.5B", label: "Cumulative perp volume I helped Defx reach, public on DefiLlama" },
  { num: "#2", label: "Product of the Day on Product Hunt, for the Fere AI launch" },
];

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
          <span>You built the AI product.</span> <span>I find the people who use it.</span>
        </p>
        <p className="v3-hero-support">
          Growth and content marketing for AI and crypto products, as a project or as part of your team. I build
          software too.
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
              <span className="v3-proof-label">{p.label}</span>
            </li>
          ))}
        </ul>
      </div>

      <h1 className="v3-hero-name">karan sud</h1>
    </section>
  );
}
