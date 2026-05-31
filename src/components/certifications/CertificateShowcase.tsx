"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import type { Certification } from "@/lib/certifications-data";
import {
  CERTIFICATIONS,
  getCertificateFileCandidates,
} from "@/lib/certifications-data";

function useCertificateFile(cert: Certification) {
  const [src, setSrc] = useState<string | null>(null);
  const [isPdf, setIsPdf] = useState(false);

  useEffect(() => {
    if (cert.file) {
      const path = getCertificateFileCandidates(cert)[0];
      setSrc(path);
      setIsPdf(path.toLowerCase().endsWith(".pdf"));
      return;
    }

    const candidates = getCertificateFileCandidates(cert);
    let cancelled = false;

    const tryNext = (index: number) => {
      if (index >= candidates.length) {
        if (!cancelled) setSrc(null);
        return;
      }
      const path = candidates[index];
      fetch(path, { method: "HEAD", cache: "no-store" })
        .then((res) => {
          if (cancelled) return;
          if (res.ok) {
            setSrc(path);
            setIsPdf(path.endsWith(".pdf"));
          } else {
            tryNext(index + 1);
          }
        })
        .catch(() => tryNext(index + 1));
    };

    tryNext(0);
    return () => {
      cancelled = true;
    };
  }, [cert]);

  return { src, isPdf };
}

function ShowcaseCard({
  cert,
  index,
}: {
  cert: Certification;
  index: number;
}) {
  const { src, isPdf } = useCertificateFile(cert);
  const hasVerify = Boolean(cert.verifyUrl?.trim());

  return (
    <motion.article
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="glass-strong overflow-hidden rounded-2xl border border-white/10"
    >
      <div className="relative aspect-[4/3] w-full bg-black/40">
        {src && !isPdf && (
          <Image
            src={src}
            alt={`${cert.name} certificate`}
            fill
            className="object-contain p-4"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        )}
        {src && isPdf && (
          <>
            <iframe
              title={`${cert.name} certificate`}
              src={`${src}#view=FitH`}
              className="h-full w-full border-0 bg-white/5"
            />
            <a
              href={src}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute bottom-3 right-3 rounded-lg bg-[#915EFF]/90 px-3 py-1.5 text-xs font-medium text-white shadow-lg"
            >
              Open full PDF ↗
            </a>
          </>
        )}
        {!src && (
          <div className="flex h-full flex-col items-center justify-center gap-2 p-6 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-to-br from-[#915EFF]/30 to-[#00FFFF]/20 text-2xl font-bold text-[#915EFF]">
              {cert.provider.charAt(0)}
            </div>
            <p className="text-xs text-white/40">
              Add file:{" "}
              <code className="text-[#00FFFF]/70">
                public/certificates/{cert.id}.png
              </code>
            </p>
          </div>
        )}
      </div>

      <div className="border-t border-white/5 p-5">
        <div className="mb-1 font-mono text-[10px] uppercase tracking-wider text-[#00FFFF]/70">
          CERT_{String(index + 1).padStart(2, "0")}
        </div>
        <h3 className="text-lg font-bold text-white">{cert.name}</h3>
        <p className="text-sm text-white/50">{cert.provider}</p>
        {cert.issued && (
          <p className="mt-1 font-mono text-xs text-white/40">
            Issued {cert.issued}
            {cert.credentialId ? ` · ID ${cert.credentialId}` : ""}
          </p>
        )}
        <div className="mt-4 flex flex-wrap gap-2">
          {hasVerify && (
            <a
              href={cert.verifyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 rounded-lg border border-[#00FFFF]/30 bg-[#00FFFF]/10 px-4 py-2 text-xs font-medium text-[#00FFFF]"
            >
              Verify online ↗
            </a>
          )}
          {src && (
            <a
              href={src}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 rounded-lg border border-[#915EFF]/30 bg-[#915EFF]/10 px-4 py-2 text-xs font-medium text-[#915EFF]"
            >
              View file ↗
            </a>
          )}
        </div>
      </div>
    </motion.article>
  );
}

export function CertificateShowcase() {
  return (
    <div className="grid gap-8 md:grid-cols-2">
      {CERTIFICATIONS.map((cert, index) => (
        <ShowcaseCard key={cert.id} cert={cert} index={index} />
      ))}
    </div>
  );
}
