"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useState } from "react";
import { NAV_LINKS } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const { scrollY } = useScroll();
  const background = useTransform(
    scrollY,
    [0, 80],
    ["rgba(5, 8, 22, 0)", "rgba(5, 8, 22, 0.9)"]
  );
  const borderOpacity = useTransform(scrollY, [0, 80], [0, 1]);

  return (
    <motion.header
      style={{ backgroundColor: background }}
      className="fixed top-0 right-0 left-0 z-50"
    >
      <motion.div
        style={{ opacity: borderOpacity }}
        className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#915EFF]/50 to-transparent"
      />
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <a href="#" className="group flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-[#915EFF] to-[#00FFFF] text-xs font-bold text-[#050816]">
            S
          </span>
          <span className="font-mono text-sm tracking-wider">
            <span className="text-[#915EFF]">SHIKO</span>
            <span className="text-white/60"> AI</span>
          </span>
        </a>

        <ul className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-sm text-white/70 transition-colors hover:text-[#00FFFF]"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href="#message"
          className="hidden rounded-lg border border-[#915EFF]/40 bg-[#915EFF]/10 px-4 py-2 text-sm font-medium text-[#915EFF] transition-all hover:bg-[#915EFF]/20 md:inline-block"
        >
          Message
        </a>

        <button
          type="button"
          aria-label="Toggle menu"
          className="flex flex-col gap-1.5 md:hidden"
          onClick={() => setOpen(!open)}
        >
          <span
            className={cn(
              "h-0.5 w-6 bg-white transition-transform",
              open && "translate-y-2 rotate-45"
            )}
          />
          <span
            className={cn("h-0.5 w-6 bg-white transition-opacity", open && "opacity-0")}
          />
          <span
            className={cn(
              "h-0.5 w-6 bg-white transition-transform",
              open && "-translate-y-2 -rotate-45"
            )}
          />
        </button>
      </nav>

      {open && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="glass-strong border-t border-white/5 md:hidden"
        >
          <ul className="flex flex-col gap-4 px-6 py-6">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="text-white/80"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </motion.div>
      )}
    </motion.header>
  );
}
