import Link from "next/link";
import { flowFonts } from "@/components/flow/fonts";
import FlowField from "@/components/flow/FlowField";
import "@/app/flow/flow.css";

// easyui "Not Found", ported to Flow: the page is lost, the air still flows.
export default function NotFound() {
  return (
    <div className={`fl ${flowFonts}`}>
      <main className="fl-hero fl-404">
        <FlowField density={0.6} />
        <div className="fl-404-in">
          <p className="fl-muted">404</p>
          <h1>This page drifted off.</h1>
          <p className="fl-muted">The link may be old. The work is still here.</p>
          <Link href="/" className="fl-btn fl-call">Back to the home page</Link>
        </div>
      </main>
    </div>
  );
}
