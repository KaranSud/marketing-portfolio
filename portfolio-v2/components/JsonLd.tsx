import { caseStudies } from "@/lib/caseStudies";
import { faqs } from "@/lib/faqs";

const siteUrl = "https://karan-sud-portfolio.vercel.app";

export default function JsonLd() {
  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": `${siteUrl}/#person`,
        name: "Karan Sud",
        url: siteUrl,
        jobTitle: "Content & Growth Strategist",
        description:
          "Senior content and growth strategist building brands across Web3, AI, F&B, and e-commerce.",
        email: "mailto:contactkaransud@gmail.com",
        knowsAbout: [
          "Content Marketing",
          "Growth Marketing",
          "Social Media Marketing",
          "Community Building",
          "Web3 Marketing",
          "Performance Marketing",
          "Personal Branding",
          "Email Marketing",
        ],
        sameAs: [
          "https://linkedin.com/in/karansud7",
          "https://twitter.com/KaranSudSocial",
        ],
      },
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        url: siteUrl,
        name: "Karan Sud",
        publisher: { "@id": `${siteUrl}/#person` },
      },
      {
        "@type": "ProfilePage",
        "@id": `${siteUrl}/#profilepage`,
        url: siteUrl,
        name: "Karan Sud — Content & Growth Strategist",
        about: { "@id": `${siteUrl}/#person` },
        isPartOf: { "@id": `${siteUrl}/#website` },
      },
      {
        "@type": "ItemList",
        name: "Selected Work",
        itemListElement: caseStudies.map((c, i) => ({
          "@type": "ListItem",
          position: i + 1,
          item: {
            "@type": "CreativeWork",
            name: `${c.title} — ${c.tag}`,
            description: c.desc,
          },
        })),
      },
      {
        "@type": "FAQPage",
        mainEntity: faqs.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
    />
  );
}
