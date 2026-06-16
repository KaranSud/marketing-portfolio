// Article header graphic: a gradient banner with a network-mesh overlay.
// Static SVG, accent-tinted per post, so each article looks designed rather
// than templated. Used on post pages and (compact) on the blog index cards.

const NODES: [number, number][] = [
  [70, 70], [210, 150], [120, 270], [320, 90], [300, 300], [460, 190],
  [560, 80], [520, 320], [690, 150], [770, 290], [880, 90], [840, 330],
  [1000, 210], [1120, 120], [1080, 330], [960, 50],
];
const EDGES: [number, number][] = [
  [0, 1], [1, 2], [1, 3], [3, 5], [2, 4], [4, 5], [5, 6], [5, 7], [6, 8],
  [7, 8], [8, 9], [8, 10], [9, 11], [10, 12], [11, 12], [10, 15], [12, 13],
  [12, 14], [13, 14], [6, 15], [3, 6], [0, 2],
];

function Mesh() {
  return (
    <svg
      className="blog-hero-mesh"
      viewBox="0 0 1200 360"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <g className="mesh-lines">
        {EDGES.map(([a, b], i) => (
          <line
            key={i}
            x1={NODES[a][0]}
            y1={NODES[a][1]}
            x2={NODES[b][0]}
            y2={NODES[b][1]}
          />
        ))}
      </g>
      <g className="mesh-nodes">
        {NODES.map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r={i % 4 === 0 ? 4.5 : 2.5} />
        ))}
      </g>
    </svg>
  );
}

export default function BlogHeader({
  title,
  dateLabel,
  readingTime,
  tags,
  accent,
}: {
  title: string;
  dateLabel: string;
  readingTime: string;
  tags: string[];
  accent: string;
}) {
  return (
    <header className={`blog-hero accent-${accent}`}>
      <Mesh />
      <div className="blog-hero-inner">
        <div className="post-meta">
          <time>{dateLabel}</time>
          <span aria-hidden>·</span>
          <span>{readingTime}</span>
        </div>
        <h1 className="blog-hero-title">{title}</h1>
        {tags.length > 0 && (
          <div className="post-tags">
            {tags.map((t) => (
              <span key={t}>{t}</span>
            ))}
          </div>
        )}
      </div>
    </header>
  );
}

// Compact decorative version for index cards (mesh + gradient strip only).
export function BlogThumb({ accent }: { accent: string }) {
  return (
    <div className={`blog-thumb accent-${accent}`} aria-hidden="true">
      <Mesh />
    </div>
  );
}
