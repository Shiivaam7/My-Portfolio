"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { SITE } from "@/lib/constants";
import { useTypingEffect } from "@/hooks/useTypingEffect";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { ParticlesBackground } from "./ParticlesBackground";
import { ShikoAssistant } from "./ShikoAssistant";

const HeroScene = dynamic(() => import("./HeroScene").then((m) => m.HeroScene), {
  ssr: false,
  loading: () => null,
});

const TYPING_WORDS = [
  "AI/ML ENGINEER",
  "DATA SCIENTIST",
  "PROBLEM SOLVER",
] as const;

export function Hero() {
  const typedText = useTypingEffect(TYPING_WORDS);

  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center justify-center overflow-hidden"
      onMouseMove={(e) => {
        e.currentTarget.style.setProperty(
          "--mouse-x",
          `${(e.clientX / window.innerWidth) * 100}%`
        );
        e.currentTarget.style.setProperty(
          "--mouse-y",
          `${(e.clientY / window.innerHeight) * 100}%`
        );
      }}
    >
      <ParticlesBackground />
      <HeroScene />

      <div
        className="pointer-events-none absolute inset-0 z-[2]"
        style={{
          background: `radial-gradient(600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(145, 94, 255, 0.12), transparent 40%)`,
        }}
      />
      <div className="absolute inset-0 z-[2] grid-bg opacity-30" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 pt-24 text-center md:pt-32">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-4 font-mono text-sm tracking-[0.4em] text-[#00FFFF]/80 md:text-base"
        >
          HELLO, I&apos;M
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="mb-6 text-4xl font-bold tracking-tight md:text-7xl lg:text-8xl"
        >
          <span className="text-gradient">{SITE.name.toUpperCase()}</span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mb-4 h-8 font-mono text-lg text-[#915EFF] md:text-2xl"
        >
          {typedText}
          <span className="animate-pulse text-[#00FFFF]">|</span>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.55 }}
          className="mx-auto mb-10 max-w-xl text-sm text-white/50 md:text-base"
        >
          {SITE.role} · Data Science Enthusiast · B.Tech AI &amp; ML Student
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          <MagneticButton
            href={SITE.resumeUrl}
            download="Shivam_Kumar_Resume.pdf"
            variant="primary"
          >
            Download Resume
          </MagneticButton>
          <MagneticButton href="#projects" variant="secondary">
            View Projects
          </MagneticButton>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="mt-20 flex justify-center"
        >
          <a href="#about" className="flex flex-col items-center gap-2 text-white/30">
            <span className="text-xs tracking-widest">SCROLL</span>
            <motion.span
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="h-8 w-5 rounded-full border border-white/20 p-1"
            >
              <span className="mx-auto block h-2 w-1 rounded-full bg-[#915EFF]" />
            </motion.span>
          </a>
        </motion.div>
      </div>

      <ShikoAssistant />
    </section>
  );
}
