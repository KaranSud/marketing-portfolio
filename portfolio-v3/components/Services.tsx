import SectionHead from "./SectionHead";
import Reveal from "./Reveal";

const services: { title: string; desc: string }[] = [
  {
    title: "Social Media Management",
    desc: "Full-service across X, Instagram, LinkedIn, TikTok, Facebook, Telegram, and Discord. From brief to post.",
  },
  {
    title: "Content Strategy",
    desc: "A complete playbook: tone, pillars, formats, competitor benchmarks, and a 90-day roadmap.",
  },
  {
    title: "KOL & Influencer Partnerships",
    desc: "Identification, outreach, briefing, execution, and tracking. Built KOL networks across Web3, AI, and F&B.",
  },
  {
    title: "Community Building",
    desc: "Discord and Telegram grown to 150K+ members. Tier systems, ambassador programs, AMAs, and reward mechanics.",
  },
  {
    title: "Paid Ads (Meta & Google)",
    desc: "Campaign setup, creative direction, A/B testing, and optimisation. 4x ROAS on monthly budgets, 471% e-commerce ROI.",
  },
  {
    title: "Web3 & DeFi Marketing",
    desc: "TGE planning, points programs, trading contests, ambassador networks, and protocol community growth.",
  },
  {
    title: "Marketing Funnel Design",
    desc: "Campaign strategy from awareness to conversion, with the tracking that connects spend to results.",
  },
  {
    title: "Email Marketing",
    desc: "Drip campaigns, TGE announcements, product launches, welcome sequences, and list building.",
  },
  {
    title: "Executive Personal Branding",
    desc: "Thought leadership for founders and CEOs on X, LinkedIn, and Instagram.",
  },
  {
    title: "Restaurant & F&B Marketing",
    desc: "Social strategy and Meta ads for restaurant chains, F&B brands, and location launches.",
  },
  {
    title: "SaaS & Tech Marketing",
    desc: "Product-led content, go-to-market strategy, and community building for SaaS products.",
  },
  {
    title: "Brand Strategy & Roadmap",
    desc: "Positioning, messaging, platform strategy, and a 6 to 12 month growth roadmap.",
  },
];

export default function Services() {
  return (
    <section id="services" className="section">
      <div className="container">
        <SectionHead
          title={
            <>
              Marketing run <em>end to end</em>
            </>
          }
          sub="Strategy through execution, across every channel that matters."
        />

        <div className="cap-grid">
          {services.map((s, i) => (
            <Reveal className="cap-item" key={s.title} delay={(i % 2) * 0.06}>
              <div className="cap-index">{String(i + 1).padStart(2, "0")}</div>
              <div>
                <div className="cap-title">{s.title}</div>
                <p className="cap-desc">{s.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
