import type { Metadata } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Aurora from "@/components/Aurora";
import CursorField from "@/components/CursorField";

const display = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});
const body = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});
const mono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

const SITE = "https://account-research-five.vercel.app";
const DESC =
  "A free AI engine that finds your ideal customers, researches any company (tech, retail, restaurants, local, services) from public data, scores fit, and writes a full outbound sequence. Every fact cited, nothing fabricated. Built by Karan Sud.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: {
    default: "Account Research & Outreach Engine by Karan Sud",
    template: "%s · Account Research Engine",
  },
  description: DESC,
  applicationName: "Account Research & Outreach Engine",
  authors: [{ name: "Karan Sud", url: "https://karan-sud-portfolio.vercel.app" }],
  creator: "Karan Sud",
  keywords: [
    "outbound lead generation",
    "account research",
    "AI sales tool",
    "ICP builder",
    "lead discovery",
    "cold email generator",
    "sales prospecting",
    "GTM engineering",
  ],
  alternates: { canonical: SITE },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    url: SITE,
    siteName: "Account Research & Outreach Engine",
    title: "Account Research & Outreach Engine",
    description:
      "Find your ideal customers, research any company from public data, and get a full outbound sequence. Free, and every fact is cited.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Account Research & Outreach Engine",
    description:
      "Find ICP companies, research them from public data, get a full outbound cadence. Free.",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Account Research & Outreach Engine",
  url: SITE,
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  description: DESC,
  creator: {
    "@type": "Person",
    name: "Karan Sud",
    url: "https://karan-sud-portfolio.vercel.app",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${body.variable} ${mono.variable}`}
    >
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Aurora />
        <CursorField />
        {children}
      </body>
    </html>
  );
}
