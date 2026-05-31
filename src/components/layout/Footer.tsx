"use client";

import { SITE } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="border-t border-white/5 py-8">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 md:flex-row">
        <p className="font-mono text-xs text-white/40">
          © {new Date().getFullYear()} {SITE.name} · SHIKO AI OS
        </p>
        <p className="text-xs text-white/30">
          Built with Next.js · Three.js · Framer Motion
        </p>
      </div>
    </footer>
  );
}
