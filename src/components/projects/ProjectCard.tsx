"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef, type MouseEvent } from "react";
import { cn } from "@/lib/utils";

interface ProjectCardProps {
  title: string;
  description: string;
  tech: readonly string[];
  github: string;
  gradient: string;
  index: number;
}

export function ProjectCard({
  title,
  description,
  tech,
  github,
  gradient,
  index,
}: ProjectCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [12, -12]), { stiffness: 300 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-12, 12]), { stiffness: 300 });

  const handleMouse = (e: MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 80 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay: index * 0.15 }}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      className="group relative"
    >
      <div className="glass-strong group-hover:glow-primary relative h-full overflow-hidden rounded-2xl border border-white/10 p-6 transition-shadow duration-500 md:p-8">
        <div
          className={cn(
            "absolute -top-20 -right-20 h-40 w-40 rounded-full bg-gradient-to-br opacity-20 blur-3xl transition-opacity group-hover:opacity-40",
            gradient
          )}
        />

        <div className="relative mb-4 flex items-start justify-between gap-4">
          <span className="font-mono text-xs text-[#00FFFF]">
            PROJECT_0{index + 1}
          </span>
          <motion.span
            className="text-2xl text-white/20"
            whileHover={{ rotate: 180, color: "#915EFF" }}
          >
            ↗
          </motion.span>
        </div>

        <h3 className="relative mb-3 text-xl font-bold text-white md:text-2xl">
          {title}
        </h3>
        <p className="relative mb-6 text-sm leading-relaxed text-white/60">
          {description}
        </p>

        <div className="relative mb-6 flex flex-wrap gap-2">
          {tech.map((t) => (
            <span
              key={t}
              className="rounded-full border border-[#915EFF]/20 bg-[#915EFF]/10 px-3 py-1 text-xs text-[#915EFF]"
            >
              {t}
            </span>
          ))}
        </div>

        <a
          href={github}
          target="_blank"
          rel="noopener noreferrer"
          className="relative inline-flex items-center gap-2 text-sm font-medium text-[#00FFFF] transition-colors hover:text-white"
        >
          View on GitHub
          <span className="transition-transform group-hover:translate-x-1">→</span>
        </a>
      </div>
    </motion.article>
  );
}
