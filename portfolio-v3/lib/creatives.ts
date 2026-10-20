// Posts Karan made for each account, pulled from the live accounts inside his tenure
// (dates from his resume). Sources and dates: tasks/v3/research/creatives-log.md.
// Images that show a figure not in facts.md were left out on purpose.

export type Creative = {
  src: string;
  alt: string;
  /** "Fere AI on X, 30 Jan 2026": account, platform and date, shown under the image. */
  caption: string;
  href: string;
};

const x = (handle: string, id: string) => `https://x.com/${handle}/status/${id}`;
const ig = (code: string) => `https://www.instagram.com/p/${code}/`;

export const creatives: Record<string, Creative[]> = {
  fantv: [
    {
      src: "/Results/FanTV/creatives/1-x-2025-04-04.jpg",
      alt: "FanTV AI article cover: What happens when creators stop chasing algorithms?",
      caption: "FanTV AI on X, 4 Apr 2025",
      href: x("FanTV_official", "1908155413578567980"),
    },
    {
      src: "/Results/FanTV/creatives/2-x-2025-02-07.jpg",
      alt: "FanTV AI meme: a lone confused robot before FanTV AI agents, a busy robot team after",
      caption: "FanTV AI on X, 7 Feb 2025",
      href: x("FanTV_official", "1887804463852716420"),
    },
    {
      src: "/Results/FanTV/creatives/3-x-2025-02-26.jpg",
      alt: "FanTV AI meme: others watching TV on Sunday, me browsing FanTV on Sunday",
      caption: "FanTV AI on X, 26 Feb 2025",
      href: x("FanTV_official", "1894644025140855152"),
    },
  ],
  prashan: [
    {
      src: "/Results/Prashan/creatives/1-x-2025-01-23.jpg",
      alt: "Prashan Agarwal post announcing FanTV AI agents for creators, with the app on a phone",
      caption: "Prashan Agarwal on X, 23 Jan 2025",
      href: x("prashan_agarwal", "1882427656714535122"),
    },
    {
      src: "/Results/Prashan/creatives/2-x-2025-01-10.jpg",
      alt: "Prashan Agarwal post: how the first FanTV airdrop season works",
      caption: "Prashan Agarwal on X, 10 Jan 2025",
      href: x("prashan_agarwal", "1877715815547478020"),
    },
  ],
  fere: [
    {
      src: "/Results/Fere AI/creatives/1-x-2026-01-30.jpg",
      alt: "Fere AI post: a hooded figure with the Fere logo in a black and white landscape, The Fere Army never sleeps",
      caption: "Fere AI on X, 30 Jan 2026",
      href: x("fere_ai", "2017243940840485214"),
    },
    {
      src: "/Results/Fere AI/creatives/2-x-2025-11-12.jpg",
      alt: "Fere AI post written as an official apology statement for making trading too easy",
      caption: "Fere AI on X, 12 Nov 2025",
      href: x("fere_ai", "1988645490419020150"),
    },
    {
      src: "/Results/Fere AI/creatives/3-x-2026-02-26.jpg",
      alt: "Fere AI article cover: Trade structure beats conviction",
      caption: "Fere AI on X, 26 Feb 2026",
      href: x("fere_ai", "2026999094502359452"),
    },
  ],
  novaswap: [
    {
      src: "/Results/Novaswap/creatives/1-x-2026-04-13.jpg",
      alt: "Novaswap article cover: How private are your stablecoin swaps?",
      caption: "Novaswap on X, 13 Apr 2026",
      href: x("Novaswap", "2043691923588936108"),
    },
    {
      src: "/Results/Novaswap/creatives/2-x-2026-04-06.jpg",
      alt: "Novaswap article cover: Cross-chain payroll with stablecoins",
      caption: "Novaswap on X, 6 Apr 2026",
      href: x("Novaswap", "2041173474572640727"),
    },
  ],
  bima: [
    {
      src: "/Results/BimaBTC/creatives/1-x-2025-09-04.jpg",
      alt: "BimaBTC post: Multi-layered yield with USBD",
      caption: "BimaBTC on X, 4 Sep 2025",
      href: x("BimaBTC", "1963640719777960414"),
    },
    {
      src: "/Results/BimaBTC/creatives/2-x-2025-09-22.jpg",
      alt: "BimaBTC comic: a thermometer reading Need yield on Bitcoin, check my prescription daily",
      caption: "BimaBTC on X, 22 Sep 2025",
      href: x("BimaBTC", "1970163732576964901"),
    },
    {
      src: "/Results/BimaBTC/creatives/3-x-2025-10-19.jpg",
      alt: "BimaBTC post: an orange cassette tape held against a blue sky",
      caption: "BimaBTC on X, 19 Oct 2025",
      href: x("BimaBTC", "1979970878629880067"),
    },
  ],
  mohaimina: [
    {
      src: "/Results/Mohaimina Haque/creatives/1-ig-2026-02.jpg",
      alt: "Mohaimina Haque carousel cover: her op-ed on Fortune as CEO of Tony Roma's",
      caption: "Mohaimina Haque on Instagram, February 2026",
      href: ig("DU3q2f2ERY8"),
    },
    {
      src: "/Results/Mohaimina Haque/creatives/2-ig-2026-03.jpg",
      alt: "Mohaimina Haque carousel cover: You might be wondering who is she, really?",
      caption: "Mohaimina Haque on Instagram, March 2026",
      href: ig("DWE9DJTEdUh"),
    },
    {
      src: "/Results/Mohaimina Haque/creatives/3-ig-2026-04.jpg",
      alt: "Mohaimina Haque carousel cover: her Inc. feature on using brain science to sell ribs",
      caption: "Mohaimina Haque on Instagram, April 2026",
      href: ig("DWmOz9GEWdJ"),
    },
  ],
  tony: [
    {
      src: "/Results/Tony Roma's/creatives/1-ig-2026-10-20.jpg",
      alt: "Tony Roma's post: Plans fall apart, diets fall apart, our ribs fall off the bone",
      caption: "Tony Roma's on Instagram, 20 Oct 2026",
      href: ig("DeuUbKZDxev"),
    },
    {
      src: "/Results/Tony Roma's/creatives/2-ig-2026-10-18.jpg",
      alt: "Tony Roma's post: Pick your booth, a seat grid of dishes to comment on",
      caption: "Tony Roma's on Instagram, 18 Oct 2026",
      href: ig("DepK1afgQRN"),
    },
    {
      src: "/Results/Tony Roma's/creatives/3-ig-2026-10-17.jpg",
      alt: "Tony Roma's post: a table of dishes labelled my order, for the table and stealing this off your plate",
      caption: "Tony Roma's on Instagram, 17 Oct 2026",
      href: ig("DemmCnvjOPD"),
    },
  ],
  bones: [
    {
      src: "/Results/B&B/creatives/1-ig-2026-10-03.jpg",
      alt: "Bones & Burgers post: I think about it all the time, over a bowl of mac and cheese with ribs",
      caption: "Bones & Burgers on Instagram, 3 Oct 2026",
      href: ig("DeUj5BgoRZF"),
    },
    {
      src: "/Results/B&B/creatives/2-ig-2026-10-18.jpg",
      alt: "Bones & Burgers post: a burger landing at the foot of a skate ramp",
      caption: "Bones & Burgers on Instagram, 18 Oct 2026",
      href: ig("DeoolsABMAb"),
    },
    {
      src: "/Results/B&B/creatives/3-ig-2026-10-15.jpg",
      alt: "Bones & Burgers post: a fried shrimp basket with fries",
      caption: "Bones & Burgers on Instagram, 15 Oct 2026",
      href: ig("DehLULIhS12"),
    },
  ],
};
