import type { Metadata, Viewport } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import "./v3.css";
import JsonLd from "@/components/JsonLd";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

// Still used by the blog, tools and samples pages; the home page uses none.
const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
  preload: false,
});

const siteUrl = "https://karan-sud-portfolio.vercel.app";
const description =
  "Karan Sud, growth and content marketing for AI products. Case studies with public numbers, the tools he builds, and how to book a call.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Karan Sud, growth and content for AI products",
  description,
  keywords: [
    "Karan Sud",
    "growth marketing",
    "content marketing",
    "AI product marketing",
    "community building",
  ],
  authors: [{ name: "Karan Sud" }],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: siteUrl,
    title: "Karan Sud, growth and content for AI products",
    description,
    siteName: "Karan Sud",
  },
  twitter: {
    card: "summary_large_image",
    title: "Karan Sud, growth and content for AI products",
    description,
    creator: "@KaranSudSocial",
  },
};

export const viewport: Viewport = {
  themeColor: "#0A0A0B",
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
      suppressHydrationWarning
    >
      <head>
        {/* Entrance animations only hide content once script is known to run. */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        {children}
        <JsonLd />
      </body>
    </html>
  );
}
