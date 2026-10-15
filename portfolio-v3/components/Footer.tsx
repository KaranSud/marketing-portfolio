import Link from "next/link";

export default function Footer() {
  return (
    <footer className="v3-footer">
      <span>Karan Sud, growth and content</span>
      <nav aria-label="Footer">
        <Link href="/#work">Work</Link>
        <Link href="/#method">How I work</Link>
        <Link href="/#tools">Tools</Link>
        <Link href="/blog">Writing</Link>
        <a href="https://www.linkedin.com/in/karansud-marketing" target="_blank" rel="noopener noreferrer">
          LinkedIn
        </a>
        <a href="https://x.com/KaranSudSocial" target="_blank" rel="noopener noreferrer">
          X
        </a>
      </nav>
      <span className="v3-footer-end">© 2026 Karan Sud</span>
    </footer>
  );
}
