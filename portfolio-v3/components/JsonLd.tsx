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
        image: `${siteUrl}/karan.jpg`,
        jobTitle: "Growth and content marketer",
        description: "Growth and content marketing for AI products.",
        email: "mailto:contactkaransud@gmail.com",
        address: { "@type": "PostalAddress", addressLocality: "Noida", addressCountry: "IN" },
        knowsAbout: [
          "Growth Marketing",
          "Content Marketing",
          "Community Building",
          "KOL Marketing",
          "Crypto Marketing",
          "AI Product Marketing",
        ],
        sameAs: ["https://www.linkedin.com/in/karansud-marketing", "https://x.com/KaranSudSocial"],
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
        name: "Karan Sud, growth and content for AI products",
        about: { "@id": `${siteUrl}/#person` },
        isPartOf: { "@id": `${siteUrl}/#website` },
      },
      {
        "@type": "ItemList",
        name: "Work",
        itemListElement: caseStudies.map((c, i) => ({
          "@type": "ListItem",
          position: i + 1,
          url: `${siteUrl}/work/${c.key}`,
          name: c.title,
          description: c.lede,
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

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }} />;
}
