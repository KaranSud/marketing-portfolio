import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Work from "@/components/Work";
import Services from "@/components/Services";
import Brands from "@/components/Brands";
import Skills from "@/components/Skills";
import Labs from "@/components/Labs";
import Faq from "@/components/Faq";
import WordMarquee from "@/components/WordMarquee";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Work />
        <Services />
        <Brands />
        <Skills />
        <Labs />
        <Faq />
        <WordMarquee />
        <Contact />
      </main>
      <footer>
        <div className="footer-inner">
          <span className="footer-name">Karan Sud</span>
          <span className="footer-tag">
            &copy; {new Date().getFullYear()} Brands don&rsquo;t go viral. Systems do.
          </span>
        </div>
      </footer>
    </>
  );
}
