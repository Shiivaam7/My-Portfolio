"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  subtitle: string;
  title: string;
  className?: string;
}

export function SectionHeading({ subtitle, title, className }: SectionHeadingProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6 }}
      className={cn("mb-16 text-center", className)}
    >
      <span className="mb-3 inline-block font-mono text-xs uppercase tracking-[0.3em] text-[#00FFFF]">
        {subtitle}
      </span>
      <h2 className="text-3xl font-bold tracking-tight text-white md:text-5xl">
        <span className="text-gradient">{title}</span>
      </h2>
      <div className="mx-auto mt-4 h-1 w-24 rounded-full bg-gradient-to-r from-[#915EFF] via-[#00FFFF] to-[#FF00FF]" />
    </motion.div>
  );
}
