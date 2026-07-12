import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Work from "@/components/Work";
import Services from "@/components/Services";
import Brands from "@/components/Brands";
import Skills from "@/components/Skills";
import Labs from "@/components/Labs";
import CtaBand from "@/components/CtaBand";
import Faq from "@/components/Faq";
import WordMarquee from "@/components/WordMarquee";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Work />
        <Services />
        <Labs />
        <CtaBand />
        <Brands />
        <Skills />
        <Faq />
        <WordMarquee />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
