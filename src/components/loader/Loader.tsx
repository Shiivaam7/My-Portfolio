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
    }, 900);

    return () => {
      clearInterval(stepInterval);
      clearInterval(progressInterval);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      <motion.div
        key="loader"
        exit={{ opacity: 0, scale: 1.04, filter: "blur(10px)" }}
        transition={{ duration: 0.65 }}
        className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden bg-[#050816]"
      >
        <div className="absolute inset-0 grid-bg opacity-40" />
        <div className="pointer-events-none absolute h-80 w-80 rounded-full bg-[#915EFF]/10 blur-3xl" />

        {/* CSS 3D holographic core; lightweight and WebGL-free */}
        <div className="relative mb-9 flex h-44 w-44 items-center justify-center [perspective:700px]">
          <motion.div
            aria-hidden="true"
            animate={{ rotateZ: 360, rotateX: [0, 22, 0], rotateY: [0, 18, 0] }}
            transition={{
              rotateZ: { duration: 7, repeat: Infinity, ease: "linear" },
              rotateX: { duration: 3.5, repeat: Infinity, ease: "easeInOut" },
              rotateY: { duration: 4.5, repeat: Infinity, ease: "easeInOut" },
            }}
            className="absolute h-36 w-36 rounded-[32%] border border-[#00FFFF]/70 shadow-[0_0_28px_rgba(0,255,255,0.18),inset_0_0_26px_rgba(145,94,255,0.15)]"
          />
          <motion.div
            aria-hidden="true"
            animate={{ rotateZ: -360, rotateX: [68, 48, 68], rotateY: [0, 28, 0] }}
            transition={{
              rotateZ: { duration: 10, repeat: Infinity, ease: "linear" },
              rotateX: { duration: 4, repeat: Infinity, ease: "easeInOut" },
              rotateY: { duration: 5, repeat: Infinity, ease: "easeInOut" },
            }}
            className="absolute h-28 w-40 rounded-[50%] border-2 border-[#915EFF]/80 shadow-[0_0_22px_rgba(145,94,255,0.25)]"
          />
          <motion.div
            aria-hidden="true"
            animate={{ rotateX: [0, 360], rotateY: [0, 180], scale: [0.92, 1.05, 0.92] }}
            transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
            className="absolute h-20 w-20 rounded-2xl border border-white/50 bg-gradient-to-br from-[#915EFF]/35 via-[#050816]/80 to-[#00FFFF]/30 shadow-[0_0_40px_rgba(145,94,255,0.3)] [transform-style:preserve-3d]"
          />
          <motion.div
            animate={{ opacity: [0.5, 1, 0.5], scale: [0.8, 1.15, 0.8] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
            className="h-5 w-5 rounded-full bg-[#00FFFF] shadow-[0_0_30px_10px_rgba(0,255,255,0.35)]"
          />
          <span className="absolute -bottom-1 font-mono text-[9px] tracking-[0.35em] text-white/30">
            CORE ONLINE
          </span>
        </div>

        <motion.h1
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-2 font-mono text-xl font-semibold tracking-[0.28em] text-white md:text-2xl"
        >
          SHIVAM<span className="text-[#00FFFF]">.DEV</span>
        </motion.h1>
        <motion.p
          key={stepIndex}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 font-mono text-xs tracking-[0.16em] text-[#915EFF] md:text-sm"
        >
          {LOADER_STEPS[stepIndex]}
        </motion.p>

        <div className="w-64 overflow-hidden rounded-full border border-white/10 bg-white/5 p-[2px] md:w-80">
          <motion.div
            className="h-1 rounded-full bg-gradient-to-r from-[#915EFF] via-[#00FFFF] to-[#915EFF]"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="mt-3 font-mono text-[10px] tracking-widest text-white/40">
          LOADING PORTFOLIO · {progress}%
        </p>
      </motion.div>
    </AnimatePresence>
  );
}
