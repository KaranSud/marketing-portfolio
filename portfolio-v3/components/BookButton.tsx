"use client";

// The one primary action on the site. It opens Karan's real Calendly event in
// a popup; the script and stylesheet load only on the first click. Without
// JavaScript (or if Calendly is blocked) the plain link still works.
export const CALENDLY = "https://calendly.com/contactkaransud/30min";
export const BOOK_LABEL = "Book a 30-minute call";

type CalendlyWindow = Window & {
  Calendly?: { initPopupWidget: (o: { url: string }) => void };
};

let loading: Promise<void> | null = null;

function loadCalendly(): Promise<void> {
  if (loading) return loading;
  loading = new Promise((resolve, reject) => {
    const css = document.createElement("link");
    css.rel = "stylesheet";
    css.href = "https://assets.calendly.com/assets/external/widget.css";
    document.head.appendChild(css);
    const s = document.createElement("script");
    s.src = "https://assets.calendly.com/assets/external/widget.js";
    s.async = true;
    s.onload = () => resolve();
    s.onerror = () => {
      loading = null;
      reject(new Error("calendly blocked"));
    };
    document.head.appendChild(s);
  });
  return loading;
}

export default function BookButton({
  className = "cta",
  label = BOOK_LABEL,
}: {
  className?: string;
  label?: string;
}) {
  async function onClick(e: React.MouseEvent<HTMLAnchorElement>) {
    if (e.metaKey || e.ctrlKey || e.shiftKey) return;
    e.preventDefault();
    try {
      await loadCalendly();
      const w = window as CalendlyWindow;
      if (!w.Calendly) throw new Error("no calendly");
      w.Calendly.initPopupWidget({ url: CALENDLY });
    } catch {
      window.location.href = CALENDLY;
    }
  }
  return (
    <a href={CALENDLY} className={className} onClick={onClick} rel="noopener">
      {label}
    </a>
  );
}
