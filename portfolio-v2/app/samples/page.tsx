import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Samples from "@/components/Samples";

export const metadata: Metadata = {
  title: "Samples",
  description:
    "A gallery of work samples by Karan Sud: emails, landing pages, SEO articles, blogs, designs, and social posts.",
  alternates: { canonical: "/samples" },
  openGraph: {
    title: "Work samples by Karan Sud",
    description:
      "Emails, landing pages, SEO articles, blogs, designs, and social posts.",
    url: "/samples",
    type: "website",
  },
};

export default function SamplesPage() {
  return (
    <>
      <Nav />
      <main className="page-wrap">
        <header className="page-head">
          <div className="eyebrow">Samples</div>
          <h1 className="page-h1">
            Selected <em>work samples</em>
          </h1>
          <p className="page-sub">
            A working gallery of the things I make: emails, landing pages, SEO
            articles, blogs, designs, and posts. View and watch them here, or
            open the original.
          </p>
        </header>
        <Samples />
      </main>
      <footer>
        <div className="footer-inner">
          <span className="footer-name">Karan Sud</span>
          <span className="footer-tag">
            &copy; {new Date().getFullYear()} Making brands impossible to ignore
          </span>
        </div>
      </footer>
    </>
  );
}
