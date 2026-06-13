"use client";

import Nav from "@/components/Nav";
import { useAnalytics } from "@/hooks/useAnalytics";
import Hero from "@/components/Hero";
// import About from "@/components/About";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
// import TrustSignals from "@/components/TrustSignals";
// import Education from "@/components/Education";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ui/ScrollToTop";

export default function Page() {
  useAnalytics();

  return (
    <>
      <Nav />
      <main id="main-content">
        <Hero />
        <Divider />
        {/* <About /> */}
        <Divider />
        <Experience />
        <Divider />
        <Projects />
        <Divider />
        <Skills />
        <Divider />
        {/* <TrustSignals /> */}
        <Divider />
        {/* <Education /> */}
        <Divider />
        <Contact />
      </main>
      <Footer />
      <ScrollToTop />
    </>
  );
}

function Divider() {
  return (
    <div className="max-w-[1100px] mx-auto px-10" aria-hidden="true">
      <hr style={{ border: "none", borderTop: "1px solid var(--border)" }} />
    </div>
  );
}
