"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import BookButton from "../BookButton";
import type { Post } from "@/lib/posts";

export type Client = {
  key: string;
  name: string;
  meta: string;
  kind: string;
  stat: { val: string; label: string } | null;
  shot: string | null;
  logo: string;
  handle: string;
  from: string; // YYYY-MM
  to: string;
  posts: Post[];
};

const TABS = ["The feed", "The control room", "Rewind"] as const;

export default function Concepts({ clients }: { clients: Client[] }) {
  const [tab, setTab] = useState<(typeof TABS)[number]>("The feed");
  return (
    <>
      <div className="cx-tabs" role="tablist" aria-label="Concepts">
        {TABS.map((t, i) => (
          <button key={t} role="tab" aria-selected={tab === t} onClick={() => setTab(t)}>
            <span>{i + 1}</span> {t}
          </button>
        ))}
      </div>
      {tab === "The feed" ? <Feed clients={clients} /> : tab === "The control room" ? <Studio clients={clients} /> : <Rewind clients={clients} />}
    </>
  );
}

/* ---------- 1. The feed: the site is a social app, every client is an account ---------- */
function Feed({ clients }: { clients: Client[] }) {
  const [sel, setSel] = useState(clients[0].key);
  const [open, setOpen] = useState<Post | null>(null);
  const [view, setView] = useState<"profile" | "alerts">("profile");
  const c = clients.find((x) => x.key === sel)!;
  return (
    <section className="cx-feed">
      <div className="cx-phone">
        <div className="cx-phone-top">
          <strong>karansud</strong>
          <div>
            <button className={view === "profile" ? "is-on" : ""} onClick={() => setView("profile")}>Work</button>
            <button className={view === "alerts" ? "is-on" : ""} onClick={() => setView("alerts")}>Notifications</button>
          </div>
        </div>
        <ul className="cx-stories" aria-label="Clients">
          {clients.map((x) => (
            <li key={x.key}>
              <button className={x.key === sel ? "is-on" : ""} onClick={() => { setSel(x.key); setOpen(null); setView("profile"); }}>
                <Image src={x.logo} alt="" width={56} height={56} />
                <span>{x.name}</span>
              </button>
            </li>
          ))}
        </ul>
        {view === "alerts" ? (
          <ul className="cx-alerts">
            {clients.filter((x) => x.stat).map((x) => (
              <li key={x.key}>
                <Image src={x.logo} alt="" width={36} height={36} />
                <p><strong>{x.name}</strong> {x.stat!.val}: {x.stat!.label}</p>
              </li>
            ))}
          </ul>
        ) : open ? (
          <div className="cx-post">
            <button className="cx-back" onClick={() => setOpen(null)}>← {c.name}</button>
            <div className="cx-post-media" style={{ aspectRatio: `${open.w} / ${open.h}` }}>
              {open.video ? <video src={open.video} poster={open.src} controls autoPlay playsInline /> : <Image src={open.src} alt={open.alt} fill sizes="380px" />}
            </div>
            <p className="cx-muted">{open.caption}</p>
          </div>
        ) : (
          <div className="cx-profile">
            <div className="cx-profile-head">
              <Image src={c.logo} alt="" width={72} height={72} />
              <div>
                <strong>{c.name}</strong>
                {c.handle ? <span className="cx-muted">@{c.handle}</span> : null}
              </div>
            </div>
            {c.stat ? (
              <p className="cx-stat" key={c.key}>
                <b>{c.stat.val}</b> <span>{c.stat.label}</span>
              </p>
            ) : null}
            <p className="cx-muted cx-bio">{c.meta}</p>
            <div className="cx-dm"><BookButton className="cx-btn" /></div>
            <ul className="cx-grid">
              {c.posts.map((p) => (
                <li key={p.src}>
                  <button onClick={() => setOpen(p)} aria-label={`Open post: ${p.caption}`}>
                    <Image src={p.src} alt="" fill sizes="130px" />
                    {p.video ? <i className="cx-reel" aria-hidden="true" /> : null}
                  </button>
                </li>
              ))}
              {!c.posts.length ? <li className="cx-empty">Posts coming in the next pull</li> : null}
            </ul>
          </div>
        )}
      </div>
      <aside className="cx-insights" aria-label="Insights">
        <p className="cx-label">Insights · {c.name}</p>
        {c.shot ? (
          <div className="cx-shot"><Image src={c.shot} alt={`${c.name} analytics`} fill sizes="40vw" /></div>
        ) : <p className="cx-muted">No analytics screenshot for this account.</p>}
        <p className="cx-muted">{c.kind}</p>
      </aside>
    </section>
  );
}

/* ---------- 2. The control room: a business-suite style studio ---------- */
function Studio({ clients }: { clients: Client[] }) {
  const [sel, setSel] = useState(clients[0].key);
  const c = clients.find((x) => x.key === sel)!;
  const months = useMemo(() => {
    const m = new Map<string, Post[]>();
    c.posts.forEach((p) => {
      const k = p.date ? p.date.slice(0, 7) : p.caption.replace(/^.* on \w+, /, "");
      m.set(k, [...(m.get(k) ?? []), p]);
    });
    return [...m.entries()].sort();
  }, [c]);
  return (
    <section className="cx-studio">
      <nav className="cx-rail" aria-label="Accounts">
        <p className="cx-label">Accounts</p>
        {clients.map((x) => (
          <button key={x.key} className={x.key === sel ? "is-on" : ""} onClick={() => setSel(x.key)}>
            <Image src={x.logo} alt="" width={28} height={28} /> {x.name}
            <span>{x.posts.length}</span>
          </button>
        ))}
      </nav>
      <div className="cx-main">
        <header className="cx-main-head">
          <div>
            <h2>{c.name}</h2>
            <p className="cx-muted">{c.meta}</p>
          </div>
          <BookButton className="cx-btn" />
        </header>
        <div className="cx-kpis">
          <div className="cx-kpi"><b>{c.stat?.val ?? "Current"}</b><span>{c.stat?.label ?? "client"}</span></div>
          <div className="cx-kpi"><b>{c.posts.length}</b><span>posts on this page</span></div>
          <div className="cx-kpi"><b>{c.from.replace("-", "/")}</b><span>to {c.to.replace("-", "/")}</span></div>
        </div>
        <div className="cx-cols">
          <div>
            <p className="cx-label">Content calendar</p>
            <div className="cx-cal">
              {months.map(([m, list]) => (
                <div key={m} className="cx-cal-col">
                  <span>{m}</span>
                  {list.map((p) => (
                    <a key={p.src} href={p.href} target="_blank" rel="noopener noreferrer" className="cx-cal-tile">
                      <Image src={p.src} alt={p.alt} fill sizes="120px" />
                    </a>
                  ))}
                </div>
              ))}
            </div>
          </div>
          <div>
            <p className="cx-label">Insights</p>
            {c.shot ? <div className="cx-shot"><Image src={c.shot} alt={`${c.name} analytics`} fill sizes="35vw" /></div> : null}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- 3. Rewind: one timeline, drag through the years ---------- */
const START = new Date(2023, 10, 1).getTime(); // Nov 2023, start of agency marketing
const END = new Date(2026, 9, 1).getTime();
const ym = (s: string) => new Date(Number(s.slice(0, 4)), Number(s.slice(5, 7)) - 1, 1).getTime();
function Rewind({ clients }: { clients: Client[] }) {
  const [t, setT] = useState(new Date(2025, 1, 1).getTime());
  const active = clients.filter((c) => ym(c.from) <= t && t < ym(c.to) + 31 * 864e5);
  const label = new Date(t).toLocaleDateString("en-GB", { month: "long", year: "numeric" });
  // Only posts made within four months of the chosen month, so the wall matches the date.
  const near = (p: Post) => p.date && Math.abs(new Date(p.date).getTime() - t) < 122 * 864e5;
  const wall = active.flatMap((c) => c.posts.filter(near).slice(0, 8));
  return (
    <section className="cx-rewind">
      <div className="cx-rw-head">
        <p className="cx-label">Drag through time</p>
        <h2>{label}</h2>
        <p className="cx-muted">{active.length ? `Working on ${active.map((c) => c.name).join(", ")}` : "Between projects"}</p>
      </div>
      <input
        className="cx-range" type="range" min={START} max={END} step={30 * 864e5} value={t}
        onChange={(e) => setT(Number(e.target.value))} aria-label="Month" aria-valuetext={label}
      />
      <div className="cx-years">{[2024, 2025, 2026].map((y) => (<span key={y} style={{ left: `${((new Date(y, 0, 1).getTime() - START) / (END - START)) * 100}%` }}>{y}</span>))}</div>
      <ul className="cx-rw-clients">
        {active.map((c) => (
          <li key={c.key}>
            <Image src={c.logo} alt="" width={44} height={44} />
            <div>
              <strong>{c.name}</strong>
              <span className="cx-muted">{c.stat ? `${c.stat.val}: ${c.stat.label}` : c.kind}</span>
            </div>
          </li>
        ))}
      </ul>
      {!wall.length ? <p className="cx-muted">No posts from this month on the page yet.</p> : null}
      <ul className="cx-rw-wall">
        {wall.map((p) => (
          <li key={p.src} style={{ aspectRatio: `${p.w} / ${p.h}` }}>
            <Image src={p.src} alt={p.alt} fill sizes="200px" />
          </li>
        ))}
      </ul>
      <div className="cx-rw-cta"><BookButton className="cx-btn" /></div>
    </section>
  );
}
