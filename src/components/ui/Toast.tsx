"use client";

import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export type ToastType = "success" | "error";

interface ToastProps {
  message: string;
  type: ToastType;
  visible: boolean;
  onClose: () => void;
}

export function Toast({ message, type, visible, onClose }: ToastProps) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          role="alert"
          initial={{ opacity: 0, y: -16, x: "-50%" }}
          animate={{ opacity: 1, y: 0, x: "-50%" }}
          exit={{ opacity: 0, y: -16, x: "-50%" }}
          className={cn(
            "fixed top-24 left-1/2 z-[200] max-w-md rounded-xl border px-5 py-4 shadow-xl backdrop-blur-md",
            type === "success"
              ? "border-[#00FFFF]/40 bg-[#050816]/95 text-[#00FFFF]"
              : "border-red-500/40 bg-[#050816]/95 text-red-300"
          )}
        >
          <div className="flex items-start justify-between gap-4">
            <p className="text-sm font-medium">{message}</p>
            <button
              type="button"
              onClick={onClose}
              className="shrink-0 text-white/50 hover:text-white"
              aria-label="Dismiss"
            >
              ×
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
