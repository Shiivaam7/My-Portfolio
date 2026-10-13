"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { LOADER_STEPS } from "@/lib/constants";

interface LoaderProps {
  onComplete: () => void;
}

export function Loader({ onComplete }: LoaderProps) {
  const [stepIndex, setStepIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const duration = shouldReduceMotion ? 800 : 4200;
    const interval = 40;
    let elapsed = 0;
    let completionTimer: ReturnType<typeof setTimeout> | undefined;

    const progressTimer = setInterval(() => {
      elapsed = Math.min(elapsed + interval, duration);
      setProgress(Math.round((elapsed / duration) * 100));
      setStepIndex(
        Math.min(
          Math.floor((elapsed / duration) * LOADER_STEPS.length),
          LOADER_STEPS.length - 1
        )
      );

      if (elapsed >= duration) {
        clearInterval(progressTimer);
        completionTimer = setTimeout(onComplete, shouldReduceMotion ? 0 : 500);
      }
    }, interval);

    return () => {
      clearInterval(progressTimer);
      if (completionTimer) clearTimeout(completionTimer);
    };
  }, [onComplete, shouldReduceMotion]);

  return (
    <motion.div
      key="loader"
      exit={{ opacity: 0, scale: shouldReduceMotion ? 1 : 1.04 }}
      transition={{ duration: shouldReduceMotion ? 0 : 0.55, ease: "easeInOut" }}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden bg-[#050816] px-6"
      role="status"
      aria-label={`Loading portfolio: ${progress}%`}
    >
      <div className="absolute inset-0 grid-bg opacity-50" />
      <div className="loader-ambient" aria-hidden="true" />
      <div className="loader-stage" aria-hidden="true">
        <div className="loader-orbit loader-orbit-one" />
        <div className="loader-orbit loader-orbit-two" />
        <div className="loader-orbit loader-orbit-three" />
        <div className="loader-core">
          <div className="loader-cube">
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
          </div>
          <div className="loader-core-glow" />
        </div>
        <div className="loader-particles">
          <span />
          <span />
          <span />
          <span />
          <span />
          <span />
        </div>
      </div>
      <motion.h1
        initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: shouldReduceMotion ? 0 : 0.4 }}
        className="mb-2 font-mono text-lg font-semibold tracking-[0.2em] text-white md:text-xl"
      >
        SHIVAM.DEV
      </motion.h1>
      <motion.p
        key={stepIndex}
        initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: shouldReduceMotion ? 0 : 0.25 }}
        className="mb-8 min-h-5 font-mono text-xs tracking-[0.16em] text-[#00FFFF]/80 md:text-sm"
        aria-live="polite"
      >
        {LOADER_STEPS[stepIndex]}
      </motion.p>
      <div
        className="h-1 w-64 overflow-hidden rounded-full bg-white/10 md:w-80"
        role="progressbar"
        aria-label="Portfolio loading progress"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={progress}
      >
        <div
          className="h-full rounded-full bg-gradient-to-r from-[#915EFF] via-[#00FFFF] to-[#FF00FF] shadow-[0_0_16px_rgba(0,255,255,0.5)] transition-[width] duration-75 ease-linear"
          style={{ width: `${progress}%` }}
        />
      </div>
      <p className="mt-3 font-mono text-xs tabular-nums text-white/45">
        {progress}%
      </p>
    </motion.div>
  );
}
