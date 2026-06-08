"use client";

import { useEffect, useRef, useState } from "react";
import Nav from "@/components/Nav";

type Stage =
  | "New"
  | "Researched"
  | "Contacted"
  | "Replied"
  | "Won"
  | "Lost";
const STAGES: Stage[] = [
  "New",
  "Researched",
  "Contacted",
  "Replied",
  "Won",
  "Lost",
];

type Lead = {
  id: string;
  company: string;
  domain: string;
  contact: string;
  email: string;
  fit: string;
  stage: Stage;
  notes: string;
  createdAt: number;
};

const KEY = "crm_leads_v1";
const uid = () =>
  Date.now().toString(36) + Math.random().toString(36).slice(2, 7);

function parseCsv(text: string): string[][] {
  const rows: string[][] = [];
  let row: string[] = [];
  let field = "";
  let q = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (q) {
      if (c === '"') {
        if (text[i + 1] === '"') {
          field += '"';
          i++;
        } else q = false;
      } else field += c;
    } else if (c === '"') q = true;
    else if (c === ",") {
      row.push(field);
      field = "";
    } else if (c === "\n") {
      row.push(field);
      rows.push(row);
      row = [];
      field = "";
    } else if (c !== "\r") field += c;
  }
  if (field.length || row.length) {
    row.push(field);
    rows.push(row);
  }
  return rows.filter((r) => r.some((c) => c.trim()));
}

export default function CrmPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [adding, setAdding] = useState(false);
  const [form, setForm] = useState({
    company: "",
    domain: "",
    contact: "",
    email: "",
    fit: "",
  });
  const [filter, setFilter] = useState<Stage | "All">("All");
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setLeads(JSON.parse(raw));
    } catch {}
    setLoaded(true);
  }, []);
  useEffect(() => {
    if (!loaded) return;
    try {
      localStorage.setItem(KEY, JSON.stringify(leads));
    } catch {}
  }, [leads, loaded]);

  function addLead() {
    if (!form.company.trim() && !form.domain.trim()) return;
    setLeads((p) => [
      {
        id: uid(),
        company: form.company.trim() || form.domain.trim(),
        domain: form.domain.trim(),
        contact: form.contact.trim(),
        email: form.email.trim(),
        fit: form.fit.trim(),
        stage: "New",
        notes: "",
        createdAt: Date.now(),
      },
      ...p,
    ]);
    setForm({ company: "", domain: "", contact: "", email: "", fit: "" });
    setAdding(false);
  }

  function update(id: string, patch: Partial<Lead>) {
    setLeads((p) => p.map((l) => (l.id === id ? { ...l, ...patch } : l)));
  }
  function remove(id: string) {
    setLeads((p) => p.filter((l) => l.id !== id));
  }

  function importCsv(text: string) {
    const rows = parseCsv(text);
    if (rows.length < 2) return;
    const header = rows[0].map((h) => h.trim().toLowerCase());
    const idx = (...names: string[]) =>
      header.findIndex((h) => names.some((n) => h === n || h.includes(n)));
    const di = idx("domain");
    const ci = idx("name", "company");
    const fi = idx("fit score", "fit");
    const ki = idx("decision makers", "contact");
    const ei = idx("emails", "email");
    const li = idx("likely emails");
    const existing = new Set(leads.map((l) => l.domain.toLowerCase()));
    const next: Lead[] = [];
    for (const r of rows.slice(1)) {
      const get = (i: number) => (i >= 0 ? (r[i] || "").trim() : "");
      const domain = get(di);
      const company = get(ci) || domain;
      if (!domain && !company) continue;
      if (domain && existing.has(domain.toLowerCase())) continue;
      const email = (get(ei) || get(li)).split(";")[0].trim();
      const contact = get(ki).split(";")[0].trim();
      next.push({
        id: uid(),
        company,
        domain,
        contact,
        email,
        fit: get(fi),
        stage: "Researched",
        notes: "",
        createdAt: Date.now(),
      });
      if (domain) existing.add(domain.toLowerCase());
    }
    if (next.length) setLeads((p) => [...next, ...p]);
  }

  function onFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => importCsv(String(reader.result || ""));
    reader.readAsText(file);
    e.target.value = "";
  }

  function exportCsv() {
    if (!leads.length) return;
    const esc = (s: unknown) => `"${String(s ?? "").replace(/"/g, '""')}"`;
    const head = [
      "Company",
      "Domain",
      "Contact",
      "Email",
      "Fit",
      "Stage",
      "Notes",
    ];
    const lines = leads.map((l) =>
      [l.company, l.domain, l.contact, l.email, l.fit, l.stage, l.notes]
        .map(esc)
        .join(",")
    );
    const csv = [head.map(esc).join(","), ...lines].join("\n");
    const url = URL.createObjectURL(
      new Blob([csv], { type: "text/csv;charset=utf-8" })
    );
    const a = document.createElement("a");
    a.href = url;
    a.download = "crm-pipeline.csv";
    a.click();
    URL.revokeObjectURL(url);
  }

  const shown =
    filter === "All" ? leads : leads.filter((l) => l.stage === filter);
  const counts = STAGES.map(
    (s) => leads.filter((l) => l.stage === s).length
  );

  return (
    <>
      <Nav />
      <main className="page-wrap crm">
        <header className="page-head">
          <div className="eyebrow">Labs / Outbound CRM</div>
          <h1 className="page-h1">
            Your pipeline, <em>end to end</em>
          </h1>
          <p className="page-sub">
            Import the leads you researched, move them through stages, and keep
            your outbound organized. Everything is saved in your browser, no
            account needed.
          </p>
        </header>

        <div className="crm-stats">
          <button
            className={`crm-stat ${filter === "All" ? "active" : ""}`}
            onClick={() => setFilter("All")}
          >
            <span className="crm-stat-n">{leads.length}</span>
            <span className="crm-stat-l">All</span>
          </button>
          {STAGES.map((s, i) => (
            <button
              key={s}
              className={`crm-stat ${filter === s ? "active" : ""}`}
              onClick={() => setFilter(s)}
            >
              <span className="crm-stat-n">{counts[i]}</span>
              <span className="crm-stat-l">{s}</span>
            </button>
          ))}
        </div>

        <div className="crm-toolbar">
          <button className="btn btn-primary" onClick={() => setAdding((a) => !a)}>
            {adding ? "Close" : "Add lead"}
          </button>
          <button className="btn btn-ghost" onClick={() => fileRef.current?.click()}>
            Import CSV
          </button>
          <button
            className="btn btn-ghost"
            onClick={exportCsv}
            disabled={!leads.length}
          >
            Export CSV
          </button>
          {leads.length > 0 && (
            <button
              className="linkbtn crm-clear"
              onClick={() => {
                if (confirm("Clear all leads? This cannot be undone.")) setLeads([]);
              }}
            >
              Clear all
            </button>
          )}
          <input
            ref={fileRef}
            type="file"
            accept=".csv,text/csv"
            onChange={onFile}
            hidden
          />
        </div>

        {adding && (
          <div className="crm-add">
            <input
              placeholder="Company"
              value={form.company}
              onChange={(e) => setForm({ ...form, company: e.target.value })}
            />
            <input
              placeholder="domain.com"
              value={form.domain}
              onChange={(e) => setForm({ ...form, domain: e.target.value })}
            />
            <input
              placeholder="Contact"
              value={form.contact}
              onChange={(e) => setForm({ ...form, contact: e.target.value })}
            />
            <input
              placeholder="email@domain.com"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
            <input
              placeholder="Fit"
              value={form.fit}
              onChange={(e) => setForm({ ...form, fit: e.target.value })}
            />
            <button className="btn btn-primary" onClick={addLead}>
              Save
            </button>
          </div>
        )}

        {leads.length === 0 ? (
          <div className="crm-empty">
            <h3>No leads yet</h3>
            <p>
              Add a lead, or export a CSV from the{" "}
              <a
                href="https://account-research-five.vercel.app"
                target="_blank"
                rel="noopener noreferrer"
              >
                Account Research engine
              </a>{" "}
              and import it here to start your pipeline.
            </p>
          </div>
        ) : (
          <div className="crm-list">
            {shown.map((l) => (
              <div className="crm-card" key={l.id}>
                <div className="crm-card-top">
                  <div className="crm-card-id">
                    <span className="crm-company">{l.company}</span>
                    {l.domain && (
                      <a
                        className="crm-domain"
                        href={`https://${l.domain}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {l.domain}
                      </a>
                    )}
                  </div>
                  <div className="crm-card-actions">
                    {l.fit && <span className="crm-fit">Fit {l.fit}</span>}
                    <select
                      className={`crm-stage stage-${l.stage.toLowerCase()}`}
                      value={l.stage}
                      onChange={(e) =>
                        update(l.id, { stage: e.target.value as Stage })
                      }
                    >
                      {STAGES.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                    <button
                      className="crm-del"
                      onClick={() => remove(l.id)}
                      aria-label="Delete lead"
                    >
                      ×
                    </button>
                  </div>
                </div>
                {(l.contact || l.email) && (
                  <div className="crm-contact">
                    {l.contact && <span>{l.contact}</span>}
                    {l.email && (
                      <a href={`mailto:${l.email}`}>{l.email}</a>
                    )}
                  </div>
                )}
                <textarea
                  className="crm-notes"
                  placeholder="Notes, next step, last touch…"
                  value={l.notes}
                  rows={2}
                  onChange={(e) => update(l.id, { notes: e.target.value })}
                />
              </div>
            ))}
          </div>
        )}
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
