import type { Metadata, Viewport } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import ScrollProgress from "@/components/ScrollProgress";
import AmbientBackground from "@/components/AmbientBackground";
import JsonLd from "@/components/JsonLd";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

const siteUrl = "https://karansud.com";
const description =
  "Senior Content and Growth Strategist. 5+ years building brands across Web3, DeFi, AI, F&B, and e-commerce: content, community, paid channels, and the systems behind them.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Karan Sud — Content & Growth Strategist",
  description,
  keywords: [
    "Karan Sud",
    "content marketing",
    "growth strategist",
    "social media manager",
    "Web3 marketing",
    "community building",
    "personal branding",
  ],
  authors: [{ name: "Karan Sud" }],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: siteUrl,
    title: "Karan Sud — Content & Growth Strategist",
    description,
    siteName: "Karan Sud",
  },
  twitter: {
    card: "summary_large_image",
    title: "Karan Sud — Content & Growth Strategist",
    description,
    creator: "@KaranSudSocial",
  },
};

export const viewport: Viewport = {
  themeColor: "#08090C",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable}`}
    >
      <body>
        <AmbientBackground />
        <SmoothScroll />
        <ScrollProgress />
        {children}
        <JsonLd />
      </body>
    </html>
  );
}
