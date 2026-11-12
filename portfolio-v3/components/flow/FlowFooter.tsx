import Link from "next/link";
import BookButton from "../BookButton";

// One footer for every Flow page: a short ask, the email as the big moment, the call,
// then where else to find Karan. Night palette with the shooting stars.
const socials = [
  { href: "https://www.linkedin.com/in/karansud-marketing", label: "LinkedIn" },
  { href: "https://x.com/KaranSudSocial", label: "X" },
  { href: "https://www.instagram.com/karansudsmm", label: "Instagram" },
];

export default function FlowFooter({ ask = "Tell me what you are building." }: { ask?: string }) {
  return (
    <footer className="fl-night">
      <div className="fl-shooting" aria-hidden="true"><i /><i /><i /></div>
      <p className="fl-night-ask">{ask}</p>
      <a className="fl-email" href="mailto:contactkaransud@gmail.com">contactkaransud@gmail.com</a>
      <div className="fl-night-cta">
        <BookButton className="fl-btn fl-btn-light fl-call" />
        <span>Or email me directly.</span>
      </div>
      <div className="fl-night-base">
        <nav aria-label="Footer">
          <Link href="/#work">Work</Link>
          <Link href="/blog">Writing</Link>
          <Link href="/#built">Built</Link>
        </nav>
        <nav aria-label="Elsewhere">
          {socials.map((s) => <a key={s.href} href={s.href} target="_blank" rel="noopener noreferrer">{s.label}</a>)}
        </nav>
        <p>Karan Sud · Noida, India · © 2026</p>
      </div>
    </footer>
  );
}
