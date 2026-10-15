const WORDS = ["Content", "Community", "Growth", "Systems"];

/** Oversized outlined-text strip that drifts across the page. Decorative. */
export default function WordMarquee() {
  const row = WORDS.map((w) => `${w} · `).join("");
  return (
    <div className="word-marquee" aria-hidden="true">
      <div className="word-marquee-track">
        <span>{row.repeat(3)}</span>
        <span>{row.repeat(3)}</span>
      </div>
    </div>
  );
}
