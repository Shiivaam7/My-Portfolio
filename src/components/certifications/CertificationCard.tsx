"use client";

import { motion } from "framer-motion";
import type { Certification } from "@/lib/certifications-data";
import { cn } from "@/lib/utils";

interface CertificationCardProps {
  cert: Certification;
  index: number;
  variant?: "grid" | "list";
}

export function CertificationCard({
  cert,
  index,
  variant = "grid",
}: CertificationCardProps) {
  const hasVerify = Boolean(cert.verifyUrl?.trim());

  return (
    <motion.div
      initial={{ opacity: 0, y: variant === "list" ? 24 : 50, rotateX: variant === "grid" ? -10 : 0 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      whileHover={
        variant === "grid"
          ? {
              scale: 1.03,
              boxShadow:
                "0 0 30px rgba(145, 94, 255, 0.4), 0 0 60px rgba(0, 255, 255, 0.15)",
            }
          : undefined
      }
      className={cn(
        "glass-strong group relative overflow-hidden rounded-2xl border border-white/5",
        variant === "grid" ? "p-8 text-center" : "flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between"
      )}
    >
      <div
        className={cn(
          "absolute inset-0 bg-gradient-to-br from-[#915EFF]/10 via-transparent to-[#00FFFF]/10 opacity-0 transition-opacity group-hover:opacity-100",
          variant === "list" && "opacity-30 group-hover:opacity-50"
        )}
      />

      <div
        className={cn(
          "relative flex items-center gap-4",
          variant === "grid" && "flex-col"
        )}
      >
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#915EFF] to-[#00FFFF] text-xl font-bold text-[#050816]">
          {cert.provider.charAt(0)}
        </div>
        <div className={variant === "grid" ? "text-center" : "text-left"}>
          <h3 className="text-lg font-bold text-white">{cert.name}</h3>
          <p className="text-sm text-white/50">{cert.provider}</p>
          {(cert.issued || cert.credentialId) && (
            <p className="mt-1 font-mono text-xs text-[#00FFFF]/70">
              {cert.issued && `Issued ${cert.issued}`}
              {cert.issued && cert.credentialId && " · "}
              {cert.credentialId && `ID: ${cert.credentialId}`}
            </p>
          )}
        </div>
      </div>

      {hasVerify ? (
        <a
          href={cert.verifyUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            "relative z-10 inline-flex items-center justify-center gap-2 rounded-lg border border-[#00FFFF]/30 bg-[#00FFFF]/10 px-4 py-2 text-sm font-medium text-[#00FFFF] transition-colors hover:bg-[#00FFFF]/20",
            variant === "grid" && "mt-4 w-full"
          )}
        >
          Verify Credential
          <span aria-hidden>↗</span>
        </a>
      ) : (
        <span
          className={cn(
            "relative z-10 rounded-lg border border-white/10 px-4 py-2 text-xs text-white/35",
            variant === "grid" && "mt-4 inline-block"
          )}
        >
          Add verify URL in certifications-data.ts
        </span>
      )}

      {variant === "grid" && (
        <div className="absolute -bottom-4 left-1/2 h-1 w-0 -translate-x-1/2 rounded-full bg-gradient-to-r from-[#915EFF] to-[#00FFFF] transition-all duration-500 group-hover:w-3/4" />
      )}
    </motion.div>
  );
}
