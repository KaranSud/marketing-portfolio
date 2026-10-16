import Link from "next/link";
import BookButton from "./BookButton";

// Engagement shapes taken only from work the cases show. No prices, durations or
// availability until Karan supplies them (tasks/v3/PLAN.md section 10).
const ways = [
  {
    name: "A launch",
    what: "The brand voice, a content system, KOL seeding and launch day itself.",
    proof: [["Fere AI", "fere"], ["Novaswap", "novaswap"]],
    lead: "As for",
  },
  {
    name: "Ongoing growth",
    what: "Weekly content, community and KOL programs, with paid growth tracked through the funnel.",
    proof: [["FanTV AI", "fantv"]],
    lead: "As at",
    tail: ", for 11 months",
  },
  {
    name: "A founder's voice",
    what: "Positioning, content pillars and posts written in the founder's own voice.",
    proof: [["Prashan Agarwal", "prashan"], ["Mohaimina Haque", "mohaimina"]],
    lead: "As for",
  },
  {
    name: "Part-time support",
    what: "Ongoing content and growth work alongside your team.",
    proof: [["Bones & Burgers", "bones"], ["The Culturegram", "culturegram"]],
    lead: "As for my current clients",
  },
];

export default function Offer() {
  return (
    <section id="ways" className="v3-section v3-offer" aria-labelledby="ways-title">
      <h2 id="ways-title" className="v3-h2" data-reveal>
        Ways to work together
      </h2>
      <div className="v3-offer-body">
        <ul className="v3-offer-list">
          {ways.map((w, k) => (
            <li key={w.name} className="v3-offer-row" data-reveal style={{ ["--i" as string]: k }}>
              <div className="v3-offer-top">
                <h3 className="v3-offer-name">{w.name}</h3>
                <span className="v3-offer-proof">
                  {w.lead}{" "}
                  {w.proof.map(([label, key], n) => (
                    <span key={key + label}>
                      {n > 0 ? " and " : ""}
                      <Link className="tlink" href={`/work/${key}`}>
                        {label}
                      </Link>
                    </span>
                  ))}
                  {w.tail ?? ""}
                </span>
              </div>
              <p className="v3-offer-what">{w.what}</p>
            </li>
          ))}
        </ul>
        <div className="v3-offer-cta" data-reveal style={{ ["--i" as string]: 2 }}>
          <BookButton />
          <p>Tell me which of these fits, or what you need instead. Pricing depends on scope; we agree it after the call.</p>
        </div>
      </div>
    </section>
  );
}
