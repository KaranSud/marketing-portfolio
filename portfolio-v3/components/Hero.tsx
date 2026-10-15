import HeroField from "./HeroField";
import BookButton from "./BookButton";

// Every number here is in tasks/v3/research/facts.md table (a): rows 1, 2, 4.
const proof = [
  { num: "297.7K", label: "FanTV AI's followers on X, up from 70K in 11 months" },
  { num: "$1.5B", label: "Cumulative perp volume on Defx, public on DefiLlama. I helped it get there." },
  { num: "#2", label: "Product of the Day on Product Hunt, for the Fere AI launch" },
];

export default function Hero() {
  return (
    <section className="v3-hero" aria-label="Introduction">
      <div className="v3-hero-panel">
        <HeroField maskSelector=".v3-hero-name" />
      </div>

      <div className="v3-hero-copy">
        <p className="v3-hero-statement">
          <span>You built the AI product.</span> <span>I find the people who use it.</span>
        </p>
        <p className="v3-hero-support">
          Growth and content marketing for AI and crypto products. I take on select projects.
        </p>
        <div className="v3-hero-actions">
          <BookButton />
          <span className="v3-hero-note">
            Pick a time on my calendar. Prefer email? I reply within 24 hours.
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
