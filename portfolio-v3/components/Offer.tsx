import BookButton from "./BookButton";

// Engagement shapes taken only from work the cases show. No prices, durations or
// availability until Karan supplies them (tasks/v3/PLAN.md section 10).
const ways = [
  {
    name: "A launch",
    what: "The brand voice, a content system, KOL seeding and launch day itself.",
    proof: "As for Fere AI and Novaswap",
  },
  {
    name: "Ongoing growth",
    what: "Weekly content, community and KOL programs, with paid growth tracked through the funnel.",
    proof: "As at FanTV AI, for 11 months",
  },
  {
    name: "A founder's voice",
    what: "Positioning, content pillars and posts written in the founder's own voice.",
    proof: "As for Prashan Agarwal and Mohaimina Haque",
  },
  {
    name: "A full-time role",
    what: "Growth or content, inside your team.",
    proof: "As at FanTV AI and Crowwd Labs",
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
                <span className="v3-offer-proof">{w.proof}</span>
              </div>
              <p className="v3-offer-what">{w.what}</p>
            </li>
          ))}
        </ul>
        <div className="v3-offer-cta" data-reveal style={{ ["--i" as string]: 2 }}>
          <BookButton />
          <p>Tell me which of these fits, or what you need instead.</p>
        </div>
      </div>
    </section>
  );
}
