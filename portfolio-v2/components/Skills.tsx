import Reveal from "./Reveal";
import RevealMask from "./RevealMask";

type SkillGroup = { title: string; tags: string[] };

const groups: SkillGroup[] = [
  {
    title: "Strategy",
    tags: [
      "Content Strategy",
      "Brand Storytelling",
      "Campaign Planning",
      "Go-to-Market",
      "Competitor Research",
      "Audience Targeting",
      "Brand Roadmapping",
      "ATL / BTL Planning",
      "Funnel Architecture",
    ],
  },
  {
    title: "Execution",
    tags: [
      "Social Media Management",
      "Community Management",
      "KOL Partnerships",
      "Email Marketing",
      "Meta Ads",
      "Google Ads",
      "SEO & SEM",
      "Copywriting",
      "Video Direction",
    ],
  },
  {
    title: "Platforms",
    tags: [
      "X Analytics",
      "Meta Business Suite",
      "Shopify",
      "Discord",
      "Telegram",
      "DefiLlama",
      "Notion",
      "Canva",
      "Figma",
    ],
  },
  {
    title: "AI Tools",
    tags: [
      "Claude",
      "ChatGPT",
      "Perplexity",
      "Gemini",
      "Manus AI",
      "Gumloop",
      "Notion AI",
      "Midjourney",
      "ElevenLabs",
      "Runway",
      "Suno",
    ],
  },
];

export default function Skills() {
  return (
    <section id="skills" className="section">
      <div className="container">
        <div className="toolkit">
          <div className="toolkit-intro">
            <h2 className="section-title">
              <RevealMask delay={0.05}>
                The <em>toolkit</em>
              </RevealMask>
            </h2>
            <Reveal delay={0.18}>
              <p>
                5+ years across strategy, paid, organic, community, and email. I
                can own the full marketing function without needing to be
                managed through it.
              </p>
            </Reveal>
          </div>
          <div className="toolkit-groups">
            {groups.map((g, i) => (
              <Reveal className="tk-group" key={g.title} delay={i * 0.06}>
                <div className="tk-group-label">{g.title}</div>
                <div className="tk-tags">
                  {g.tags.map((t) => (
                    <span className="tk-tag" key={t}>
                      {t}
                    </span>
                  ))}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
