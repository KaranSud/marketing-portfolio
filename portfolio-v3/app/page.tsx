import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Work from "@/components/Work";
import Method from "@/components/Method";
import Tools from "@/components/Tools";
import About from "@/components/About";
import Faq from "@/components/Faq";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import StickyCta from "@/components/StickyCta";
import RevealObserver from "@/components/RevealObserver";

export default function Home() {
  return (
    <>
      <Nav />
      <main id="main">
        <Hero />
        <Work />
        <Method />
        <Tools />
        <About />
        <Faq />
        <Contact />
      </main>
      <Footer />
      <StickyCta />
      <RevealObserver />
    </>
  );
}
