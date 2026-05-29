import type { ReactNode } from "react";
import Reveal from "./Reveal";
import RevealMask from "./RevealMask";

export default function SectionHead({
  title,
  sub,
}: {
  title: ReactNode;
  sub?: ReactNode;
}) {
  return (
    <div className="section-head">
      <h2 className="section-title">
        <RevealMask delay={0.05}>{title}</RevealMask>
      </h2>
      {sub ? (
        <Reveal delay={0.18}>
          <p className="section-sub">{sub}</p>
        </Reveal>
      ) : null}
    </div>
  );
}
