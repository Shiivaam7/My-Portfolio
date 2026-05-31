"use client";

import Link from "next/link";
import { CERTIFICATIONS } from "@/lib/certifications-data";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CertificationCard } from "./CertificationCard";

export function Certifications() {
  return (
    <section id="certifications" className="relative py-24 md:py-32">
      <div className="absolute inset-0 bg-gradient-to-t from-[#915EFF]/5 to-transparent" />
      <div className="relative mx-auto max-w-7xl px-6">
        <SectionHeading subtitle="Credentials" title="Certifications" />

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {CERTIFICATIONS.map((cert, index) => (
            <CertificationCard key={cert.id} cert={cert} index={index} />
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link
            href="/certifications"
            className="inline-flex items-center gap-2 rounded-xl border border-[#915EFF]/40 bg-[#915EFF]/10 px-6 py-3 text-sm font-semibold text-[#915EFF] transition-colors hover:bg-[#915EFF]/20"
          >
            Open full certificate showcase
            <span aria-hidden>→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
