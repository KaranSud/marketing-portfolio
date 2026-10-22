import { homeFaqs } from "@/lib/faqs";
import BookButton from "./BookButton";

export default function Faq() {
  return (
    <section id="faq" className="v3-section" aria-label="Questions">
      <ul className="v3-faq">
        <li className="v3-faq-row" data-reveal>
          <h2 className="v3-faq-q v3-faq-head">Before you book</h2>
        </li>
        {homeFaqs.map((f, k) => (
          <li key={f.q} className="v3-faq-row" data-reveal style={{ ["--i" as string]: Math.min(k, 3) }}>
            <h3 className="v3-faq-q">{f.q}</h3>
            <p className="v3-faq-a">{f.a}</p>
          </li>
        ))}
        <li className="v3-faq-row v3-faq-book" data-reveal>
          <div className="v3-faq-a">
            <BookButton />
          </div>
        </li>
      </ul>
    </section>
  );
}
