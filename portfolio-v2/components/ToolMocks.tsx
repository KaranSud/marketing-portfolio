// Small skeleton visuals shared by the homepage Labs section and /tools page.

export function PipelineMock() {
  const rows = [
    { domain: "stripe.com", fit: 88, tier: "strong" },
    { domain: "vercel.com", fit: 85, tier: "strong" },
    { domain: "notion.so", fit: 64, tier: "moderate" },
    { domain: "wikipedia.org", fit: 15, tier: "weak" },
  ];
  return (
    <div className="labs-mock" aria-hidden="true">
      <div className="labs-mock-head">
        <span className="labs-mock-label">Pipeline by fit</span>
      </div>
      <div className="labs-mock-rows">
        {rows.map((p) => (
          <div className="labs-mock-row" key={p.domain}>
            <span className="labs-mock-domain">{p.domain}</span>
            <span className="labs-mock-track">
              <i
                className={`labs-mock-fill ${p.tier}`}
                style={{ width: `${p.fit}%` }}
              />
            </span>
            <span className="labs-mock-score">{p.fit}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function BoardMock() {
  const cols: [string, number][] = [
    ["New", 1],
    ["Contacted", 2],
    ["Replied", 1],
    ["Won", 1],
  ];
  return (
    <div className="tp-board-mock" aria-hidden="true">
      {cols.map(([name, cards]) => (
        <div className="tp-board-col" key={name}>
          <span className="tp-board-label">{name}</span>
          {Array.from({ length: cards }).map((_, i) => (
            <div className="tp-board-card" key={i}>
              <i />
              <i className="short" />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
