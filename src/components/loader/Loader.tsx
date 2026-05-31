"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { LOADER_STEPS } from "@/lib/constants";

interface LoaderProps {
  onComplete: () => void;
}

export function Loader({ onComplete }: LoaderProps) {
  const [stepIndex, setStepIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const stepDuration = 900;
    const progressInterval = setInterval(() => {
      setProgress((prev) => Math.min(prev + 2, 100));
    }, 36);

    const stepInterval = setInterval(() => {
      setStepIndex((prev) => {
        if (prev >= LOADER_STEPS.length - 1) {
          clearInterval(stepInterval);
          clearInterval(progressInterval);
          setTimeout(onComplete, 600);
          return prev;
        }
        return prev + 1;
      });
    }, stepDuration);

    return () => {
      clearInterval(stepInterval);
      clearInterval(progressInterval);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      <motion.div
        key="loader"
        exit={{ opacity: 0, scale: 1.05 }}
        transition={{ duration: 0.6 }}
        className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#050816]"
      >
        <div className="absolute inset-0 grid-bg opacity-50" />
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          className="mb-8 h-24 w-24 rounded-full border-2 border-transparent border-t-[#915EFF] border-r-[#00FFFF]"
        />
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mb-2 font-mono text-lg tracking-[0.2em] text-[#915EFF] md:text-xl"
        >
          SHIKO AI
        </motion.h1>
        <motion.p
          key={stepIndex}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 font-mono text-sm text-[#00FFFF]/80"
        >
          {LOADER_STEPS[stepIndex]}
        </motion.p>
        <div className="w-64 overflow-hidden rounded-full bg-white/5 md:w-80">
          <motion.div
            className="h-1 rounded-full bg-gradient-to-r from-[#915EFF] via-[#00FFFF] to-[#FF00FF]"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="mt-3 font-mono text-xs text-white/40">{progress}%</p>
      </motion.div>
    </AnimatePresence>
  );
}
