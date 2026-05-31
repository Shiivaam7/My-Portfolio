"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useRef, type ReactNode, type MouseEvent } from "react";
import { cn } from "@/lib/utils";

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  href?: string;
  download?: string;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "ghost";
}

export function MagneticButton({
  children,
  className,
  href,
  download,
  onClick,
  variant = "primary",
}: MagneticButtonProps) {
  const ref = useRef<HTMLAnchorElement & HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 300, damping: 20 });
  const springY = useSpring(y, { stiffness: 300, damping: 20 });

  const handleMouse = (e: MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((e.clientX - centerX) * 0.2);
    y.set((e.clientY - centerY) * 0.2);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  const variants = {
    primary:
      "bg-gradient-to-r from-[#915EFF] to-[#7B4FE0] text-white glow-primary border border-[#915EFF]/30",
    secondary:
      "glass text-white border border-[#00FFFF]/30 hover:border-[#00FFFF]/60 glow-secondary",
    ghost: "glass text-white border border-white/10",
  };

  const motionProps = {
    style: { x: springX, y: springY },
    onMouseMove: handleMouse,
    onMouseLeave: reset,
    whileHover: { scale: 1.05 },
    whileTap: { scale: 0.98 },
    className: cn(
      "relative inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold tracking-wide transition-shadow duration-300",
      variants[variant],
      className
    ),
  };

  if (href) {
    return (
      <motion.a
        ref={ref}
        href={href}
        download={download}
        target={
          href.startsWith("http") && !download ? "_blank" : undefined
        }
        rel={
          href.startsWith("http") && !download
            ? "noopener noreferrer"
            : undefined
        }
        {...motionProps}
      >
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button ref={ref} onClick={onClick} type="button" {...motionProps}>
      {children}
    </motion.button>
  );
}
