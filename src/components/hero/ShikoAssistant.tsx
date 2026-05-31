"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useMousePosition } from "@/hooks/useMousePosition";

const MESSAGES = [
  "Welcome Shivam",
  "Projects Loaded",
  "Systems Online",
] as const;

export function ShikoAssistant() {
  const { x, y } = useMousePosition();
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % MESSAGES.length);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  const offsetX = typeof window !== "undefined" ? (x / window.innerWidth - 0.5) * 20 : 0;
  const offsetY = typeof window !== "undefined" ? (y / window.innerHeight - 0.5) * 20 : 0;

  return (
    <motion.div
      className="fixed bottom-4 right-4 z-40 sm:bottom-6 sm:right-6"
      style={{ x: offsetX, y: offsetY }}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1.2, duration: 0.6 }}
    >
      <div className="glass-strong glow-primary relative max-w-[220px] overflow-hidden rounded-2xl p-3 sm:max-w-xs sm:p-4">
        <div className="absolute -top-10 -right-10 h-24 w-24 rounded-full bg-[#915EFF]/20 blur-2xl" />
        <div className="mb-3 flex items-center gap-3">
          <motion.div
            animate={{ boxShadow: ["0 0 10px #00FFFF", "0 0 20px #915EFF", "0 0 10px #00FFFF"] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-[#915EFF] to-[#00FFFF]"
          >
            <span className="text-xs font-bold text-[#050816]">AI</span>
          </motion.div>
          <div>
            <p className="font-mono text-xs text-[#00FFFF]">SHIKO AI</p>
            <p className="text-[10px] text-white/40">Assistant v2.0</p>
          </div>
          <span className="ml-auto flex h-2 w-2">
            <span className="absolute inline-flex h-2 w-2 animate-ping rounded-full bg-[#00FFFF] opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-[#00FFFF]" />
          </span>
        </div>
        <motion.p
          key={messageIndex}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          className="font-mono text-sm text-white/80"
        >
          {">"} {MESSAGES[messageIndex]}
        </motion.p>
        <div className="mt-3 flex gap-1">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.2 }}
              className="h-1 w-6 rounded-full bg-gradient-to-r from-[#915EFF] to-[#00FFFF]"
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}
