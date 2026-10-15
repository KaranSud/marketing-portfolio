"use client";

import { useEffect, useState } from "react";
import Reveal from "./Reveal";
import RevealMask from "./RevealMask";
import { getLenis } from "@/lib/lenis";

const CALENDLY = "https://calendly.com/contactkaransud/30min";
const FORMSPREE =
  process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT ||
  "https://formspree.io/f/xkoykoye";

type Tab = "form" | "schedule";

export default function Contact() {
  const [modalOpen, setModalOpen] = useState(false);
  const [tab, setTab] = useState<Tab>("form");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  function openModal(t: Tab) {
    setTab(t);
    setModalOpen(true);
  }
  const closeModal = () => setModalOpen(false);

  useEffect(() => {
    const lenis = getLenis();
    if (modalOpen) {
      lenis?.stop();
      document.body.style.overflow = "hidden";
    } else {
      lenis?.start();
      document.body.style.overflow = "";
    }
    return () => {
      lenis?.start();
      document.body.style.overflow = "";
    };
  }, [modalOpen]);

  async function submitForm(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const payload = {
      name: (data.get("name") as string)?.trim(),
      email: (data.get("email") as string)?.trim(),
      message: (data.get("message") as string)?.trim(),
    };
    setSending(true);
    try {
      const res = await fetch(FORMSPREE, {
        method: "POST",
        headers: { Accept: "application/json", "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        setSent(true);
      } else {
        const d = await res.json().catch(() => ({}));
        throw new Error(d.error || "Submission failed");
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Something went wrong";
      alert(
        "Something went wrong: " +
          msg +
          ". Try emailing contactkaransud@gmail.com directly."
      );
    } finally {
      setSending(false);
    }
  }

  return (
    <section id="contact" className="section">
      <div className="glow glow-amber" />
      <div className="container">
        <div className="contact-inner">
          <h2 className="contact-title">
            <RevealMask delay={0.05}>
              Let&apos;s build <em>something real</em>
            </RevealMask>
          </h2>
          <Reveal delay={0.12}>
            <p className="contact-sub">
              If your brand needs more than just posts, get in touch. I reply
              within 24 hours.
            </p>
          </Reveal>

          <Reveal delay={0.18} className="contact-ctas">
            <button className="btn btn-primary" onClick={() => openModal("form")}>
              Send a message
            </button>
            <a
              href={CALENDLY}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-ghost"
            >
              Book a 30-min call
            </a>
          </Reveal>

          <div className="contact-links">
            <a href="mailto:contactkaransud@gmail.com" className="contact-link">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <rect x="2" y="4" width="20" height="16" rx="2" />
                <path d="m2 7 10 7 10-7" />
              </svg>
              contactkaransud@gmail.com
            </a>
            <a href="https://linkedin.com/in/karansud7" target="_blank" rel="noopener noreferrer" className="contact-link">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                <rect x="2" y="9" width="4" height="12" />
                <circle cx="4" cy="4" r="2" />
              </svg>
              linkedin.com/in/karansud7
            </a>
            <a href="https://twitter.com/KaranSudSocial" target="_blank" rel="noopener noreferrer" className="contact-link">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L1.254 2.25H8.08l4.259 5.629 5.905-5.629zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
              @KaranSudSocial
            </a>
          </div>
        </div>
      </div>

      {/* CONTACT MODAL */}
      <div
        className={`contact-modal-overlay${modalOpen ? " open" : ""}`}
        onClick={(e) => {
          if (e.target === e.currentTarget) closeModal();
        }}
        data-lenis-prevent
      >
        <div className="contact-modal">
          <button className="contact-modal-close" onClick={closeModal} aria-label="Close">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
          <div className="contact-modal-tabs">
            <button
              className={`ctab${tab === "form" ? " active" : ""}`}
              onClick={() => setTab("form")}
            >
              Send a message
            </button>
            <button
              className={`ctab${tab === "schedule" ? " active" : ""}`}
              onClick={() => setTab("schedule")}
            >
              Book a call
            </button>
          </div>

          {tab === "form" ? (
            sent ? (
              <div className="cform-success">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#4F8BFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                  <polyline points="22 4 12 14.01 9 11.01" />
                </svg>
                <h3>Message sent</h3>
                <p>I&apos;ll get back to you within 24 hours.</p>
              </div>
            ) : (
              <form className="cform" onSubmit={submitForm}>
                <input type="text" name="name" placeholder="Your name" required />
                <input type="email" name="email" placeholder="Your email" required />
                <textarea name="message" placeholder="What are you working on?" required />
                <button type="submit" className="cform-submit" disabled={sending}>
                  {sending ? "Sending…" : "Send message"}
                </button>
              </form>
            )
          ) : (
            <div className="cschedule-panel">
              <p>
                Pick a time that works for you. A free 30-minute call to talk
                through your brand, your goals, and how I can help.
              </p>
              <a href={CALENDLY} target="_blank" rel="noopener noreferrer" className="cschedule-btn">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="18" rx="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
                Book a 30-min call
              </a>
              <p className="cschedule-note">Free, and no pressure.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
