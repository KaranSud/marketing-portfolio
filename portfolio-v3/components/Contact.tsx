import BookButton from "./BookButton";

export default function Contact() {
  return (
    <section id="contact" className="v3-contact" aria-labelledby="contact-title">
      <h2 id="contact-title" className="sr-only">
        Contact
      </h2>
      <div className="v3-contact-top" data-reveal>
        <p>Tell me about the product and who should be using it.</p>
      </div>
      <a className="v3-contact-mail" href="mailto:contactkaransud@gmail.com" data-reveal style={{ ["--i" as string]: 1 }}>
        contactkaransud@gmail.com
      </a>
      <div className="v3-contact-foot">
        <div className="v3-contact-book">
          <BookButton className="cta cta-dark" />
          <span>Noida, India · Replies within 24 hours</span>
        </div>
        <div>
          <a href="https://www.linkedin.com/in/karansud-marketing" target="_blank" rel="noopener noreferrer">
            LinkedIn
          </a>
          <a href="https://x.com/KaranSudSocial" target="_blank" rel="noopener noreferrer">
            X
          </a>
        </div>
      </div>
    </section>
  );
}
