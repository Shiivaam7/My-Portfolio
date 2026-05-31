"use client";

import { useCallback, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { Loader } from "@/components/loader/Loader";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/hero/Hero";
import { About } from "@/components/about/About";
import { Skills } from "@/components/skills/Skills";
import { Projects } from "@/components/projects/Projects";
import { Timeline } from "@/components/timeline/Timeline";
import { Certifications } from "@/components/certifications/Certifications";
import { Contact } from "@/components/contact/Contact";

export default function Home() {
  const [loading, setLoading] = useState(true);

  const handleLoadComplete = useCallback(() => {
    setLoading(false);
  }, []);

  return (
    <>
      <AnimatePresence mode="wait">
        {loading && <Loader key="loader" onComplete={handleLoadComplete} />}
      </AnimatePresence>

      {!loading && (
        <main>
          <Navbar />
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Timeline />
          <Certifications />
          <Contact />
          <Footer />
        </main>
      )}
    </>
  );
}
