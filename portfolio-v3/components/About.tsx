import Image from "next/image";
import Link from "next/link";

// History from his public LinkedIn (facts.md "Site-wide and profile"); location VP.
export default function About() {
  return (
    <section id="about" className="v3-section" aria-labelledby="about-title">
      <h2 id="about-title" className="sr-only">
        About Karan
      </h2>
      <div className="v3-about">
        <ul className="v3-about-facts" data-reveal>
          <li>Noida, India</li>
          <li>In marketing since 2023</li>
          <li>
            <a className="tlink" href="mailto:contactkaransud@gmail.com">
              Email me
            </a>
          </li>
        </ul>
        <div className="v3-about-text">
          <p data-reveal>
            <span className="v3-about-portrait">
              <Image src="/karan.jpg" alt="Karan Sud" fill sizes="120px" />
            </span>
            <strong>Karan Sud.</strong> A mechanical engineer who worked in CFD, then moved into marketing in 2023. I run
            growth and content for AI and crypto products.
          </p>
          <p className="v3-about-body" data-reveal style={{ ["--i" as string]: 1 }}>
            I have also run brand content for restaurants and for founders, and I wrote for brands as a freelancer from
            2020 to 2021. I build the software behind some of my work, and this site. I write about AI marketing on{" "}
            <Link className="tlink" href="/blog">
              the blog
            </Link>
            .
          </p>
        </div>
      </div>
    </section>
  );
}
