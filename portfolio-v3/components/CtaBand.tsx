import Reveal from "./Reveal";

export default function CtaBand() {
  return (
    <section className="midcta" aria-label="Work with Karan">
      <div className="container">
        <Reveal>
          <div className="midcta-card">
            <div>
              <h2 className="midcta-title">
                Strong product, quiet brand? That gap is fixable.
              </h2>
              <p className="midcta-sub">
                Tell me what you are building. I reply within 24 hours.
              </p>
            </div>
            <a className="btn btn-primary midcta-btn" href="#contact">
              Get in touch
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
