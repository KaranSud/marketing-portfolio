export type Faq = { q: string; a: string };

// First person, shown on the home page. Every answer traces to facts.md or to
// Karan's own published words (v2 copy: "open to select projects", "within 24 hours").
export const homeFaqs: Faq[] = [
  {
    q: "What do you work on?",
    a: "Growth and content for AI products: the content system, KOL and community programs, launches, and the campaigns that turn attention into signups and trades. I have also run brand content for restaurants and for founders.",
  },
  {
    q: "Do you take projects or part-time work?",
    a: "Both. Past projects include Tony Roma's, Bones & Burgers and Potters' Hub, and I have worked on the team at FanTV AI and at Crowwd Labs. I work from Noida, India, on IST.",
  },
  {
    q: "Where do the numbers come from?",
    a: "My own analytics screenshots and public pages like DefiLlama and Product Hunt. Each case page shows the screenshot and the dates it covers where I have them; Opaque Studio is the one case without a screenshot.",
  },
  {
    q: "What does it cost?",
    a: "It depends on scope. We agree the price after the 30-minute call, once we know what the work is.",
  },
  {
    q: "What happens after I book?",
    a: "Calendly sends you an invite, and we talk for 30 minutes about the product and who should be using it.",
  },
];

// Third person, for JSON-LD only (answer engines quote it out of context).
export const faqs: Faq[] = [
  {
    q: "What does Karan Sud do?",
    a: "Karan Sud is a growth and content marketer for AI products. He builds content systems, KOL and community programs, and launch campaigns, and he builds his own marketing software.",
  },
  {
    q: "What results has Karan Sud driven?",
    a: "He took FanTV AI's X account from 70K to 297.7K followers in 11 months, helped Defx reach $1.5B in cumulative perp volume (public on DefiLlama), and launched Fere AI to #2 Product of the Day on Product Hunt.",
  },
  {
    q: "How do you work with Karan Sud?",
    a: "He takes on new client projects and some part-time work. Book a 30-minute call at calendly.com/contactkaransud/30min or email contactkaransud@gmail.com.",
  },
];
