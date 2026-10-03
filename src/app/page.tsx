import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import TrustBar from "@/components/TrustBar";
import Statement from "@/components/Statement";
import Portfolio from "@/components/Portfolio";
import Services from "@/components/Services";
import DigitalBlueprint from "@/components/DigitalBlueprint";
import InteractiveBrandMoment from "@/components/InteractiveBrandMoment";
import Process from "@/components/Process";
import Pricing from "@/components/Pricing";
import About from "@/components/About";
import CTA from "@/components/CTA";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="product-site min-h-screen bg-[#fafaf7] text-[#171814] selection:bg-[#f0db3b]">
      <Navbar />
      <Hero />
      <Statement />
      <TrustBar />
      <Portfolio />
      <InteractiveBrandMoment />
      <Services />
      <Process />
      <DigitalBlueprint />
      <About />
      <Pricing />
      <CTA />
      <Contact />
      <Footer />
    </main>
  );
}
