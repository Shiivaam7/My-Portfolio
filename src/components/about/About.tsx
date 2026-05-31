"use client";

import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { ABOUT_COUNTERS } from "@/lib/constants";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FadeUp } from "@/components/ui/FadeUp";

function AnimatedCounter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 2000;
    const step = (timestamp: number) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      setCount(Math.floor(progress * value));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [inView, value]);

  return (
    <span ref={ref} className="text-gradient text-4xl font-bold md:text-5xl">
      {count}
      {suffix}
    </span>
  );
}

export function About() {
  return (
    <section id="about" className="relative py-24 md:py-32">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#915EFF]/5 to-transparent" />
      <div className="relative mx-auto max-w-7xl px-6">
        <SectionHeading subtitle="About Me" title="Who I Am" />

        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <FadeUp>
            <div className="glass-strong relative overflow-hidden rounded-3xl p-8 md:p-10">
              <div className="absolute -top-20 -right-20 h-40 w-40 rounded-full bg-[#915EFF]/20 blur-3xl" />
              <div className="absolute -bottom-20 -left-20 h-40 w-40 rounded-full bg-[#00FFFF]/10 blur-3xl" />
              <p className="relative text-lg leading-relaxed text-white/80 md:text-xl">
                B.Tech <span className="text-[#915EFF]">AI &amp; ML</span> student passionate
                about{" "}
                <span className="text-[#00FFFF]">Artificial Intelligence</span>,{" "}
                <span className="text-[#915EFF]">Machine Learning</span>,{" "}
                <span className="text-[#FF00FF]">Data Science</span>,{" "}
                <span className="text-white">Automation</span> and intelligent systems.
              </p>
              <div className="mt-8 flex items-center gap-4">
                <div className="h-px flex-1 bg-gradient-to-r from-[#915EFF] to-transparent" />
                <span className="font-mono text-xs text-[#00FFFF]/60">SHIKO.OS</span>
              </div>
            </div>
          </FadeUp>

          <div className="grid grid-cols-2 gap-4">
            {ABOUT_COUNTERS.map((item, i) => (
              <FadeUp key={item.label} delay={i * 0.1}>
                <motion.div
                  whileHover={{ scale: 1.03, rotateY: 5 }}
                  className="glass group rounded-2xl p-6 text-center transition-shadow hover:glow-primary"
                >
                  {"value" in item ? (
                    <>
                      <AnimatedCounter value={item.value} suffix={item.suffix} />
                      <p className="mt-2 text-sm text-white/50">Major Projects</p>
                    </>
                  ) : (
                    <>
                      <p className="text-gradient text-lg font-bold md:text-xl">
                        {item.text}
                      </p>
                      <p className="mt-2 text-sm text-white/50">{item.label}</p>
                    </>
                  )}
                </motion.div>
              </FadeUp>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
