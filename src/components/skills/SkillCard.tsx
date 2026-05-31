"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef, type MouseEvent } from "react";
import { cn } from "@/lib/utils";

interface SkillCardProps {
  title: string;
  groups: readonly (readonly string[])[];
  index: number;
}

export function SkillCard({ title, groups, index }: SkillCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [8, -8]));
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-8, 8]));

  const handleMouse = (e: MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    x.set(px);
    y.set(py);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  const colors = [
    "from-[#915EFF]/20 to-[#00FFFF]/10 border-[#915EFF]/30",
    "from-[#00FFFF]/20 to-[#915EFF]/10 border-[#00FFFF]/30",
    "from-[#FF00FF]/20 to-[#915EFF]/10 border-[#FF00FF]/30",
    "from-[#915EFF]/15 to-[#FF00FF]/10 border-[#00FFFF]/25",
  ];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60, rotateX: -15 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.6, delay: index * 0.12 }}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      className={cn(
        "glass-strong group relative flex h-full cursor-default flex-col overflow-hidden rounded-2xl border bg-gradient-to-br p-5 md:p-6",
        colors[index % colors.length]
      )}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />

      <h3 className="relative mb-4 font-mono text-sm font-semibold tracking-wider text-[#00FFFF]">
        {title}
      </h3>

      <div className="relative flex flex-1 flex-col gap-3">
        {groups.map((group, gi) => (
          <motion.div
            key={gi}
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.08 * gi }}
            className="rounded-xl border border-white/5 bg-black/30 px-4 py-3"
          >
            <p className="text-sm leading-relaxed text-white/85">
              {group.join(", ")}
            </p>
          </motion.div>
        ))}
      </div>

      <motion.div
        className="absolute -bottom-8 -right-8 h-24 w-24 rounded-full bg-[#915EFF]/10 blur-2xl"
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 4, repeat: Infinity }}
      />
    </motion.div>
  );
}
