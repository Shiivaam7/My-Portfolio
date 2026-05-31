"use client";

import { motion } from "framer-motion";
import { TIMELINE } from "@/lib/constants";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function Timeline() {
  return (
    <section id="timeline" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-3xl px-6">
        <SectionHeading subtitle="Journey" title="Timeline" />

        <div className="relative">
          <div className="absolute top-0 bottom-0 left-6 w-px bg-gradient-to-b from-[#915EFF] via-[#00FFFF] to-[#FF00FF] md:left-1/2 md:-translate-x-px" />

          {TIMELINE.map((item, index) => (
            <motion.div
              key={`${item.title}-${index}`}
              initial={{ opacity: 0, x: index % 2 === 0 ? -40 : 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`relative mb-12 flex items-center gap-8 ${
                index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
              }`}
            >
              <div className="hidden flex-1 md:block" />
              <motion.div
                whileHover={{ scale: 1.2 }}
                className="absolute left-6 z-10 flex h-4 w-4 -translate-x-1/2 items-center justify-center rounded-full border-2 border-[#00FFFF] bg-[#050816] shadow-[0_0_15px_#00FFFF] md:left-1/2"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-[#915EFF]" />
              </motion.div>
              <div
                className={`ml-14 flex-1 md:ml-0 ${
                  index % 2 === 0 ? "md:pr-12 md:text-right" : "md:pl-12"
                }`}
              >
                <span className="mb-1 inline-block font-mono text-sm text-[#915EFF]">
                  {item.year}
                </span>
                <div className="glass rounded-xl p-5 transition-shadow hover:glow-secondary">
                  <h3 className="font-semibold text-white">{item.title}</h3>
                  {"description" in item && item.description && (
                    <p className="mt-2 text-sm text-white/50">{item.description}</p>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
