import type { Metadata } from "next";
import Link from "next/link";
import {
  CERTIFICATIONS,
  CERTIFICATIONS_PAGE_PATH,
} from "@/lib/certifications-data";
import { SITE } from "@/lib/constants";
import { CertificateShowcase } from "@/components/certifications/CertificateShowcase";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || "";

export const metadata: Metadata = {
  title: `Certifications | ${SITE.name}`,
  description: `All certifications and credentials for ${SITE.name}. View badges and verification links.`,
  openGraph: {
    title: `${SITE.name} — All Certifications`,
    description: "Certificate showcase with verification links.",
    url: siteUrl ? `${siteUrl}${CERTIFICATIONS_PAGE_PATH}` : undefined,
  },
};

export default function CertificationsPage() {
  return (
    <div className="min-h-screen bg-[#050816]">
      <div className="absolute inset-0 grid-bg opacity-40" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#915EFF]/10 via-transparent to-[#00FFFF]/5" />

      <header className="relative border-b border-white/5 px-6 py-6">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <Link
            href="/"
            className="font-mono text-sm text-white/50 transition-colors hover:text-[#00FFFF]"
          >
            ← Portfolio
          </Link>
          <span className="font-mono text-xs tracking-widest text-[#915EFF]">
            SHIKO AI · CREDENTIALS
          </span>
        </div>
      </header>

      <main className="relative mx-auto max-w-6xl px-6 py-12 md:py-16">
        <div className="mb-10 text-center">
          <p className="mb-2 font-mono text-xs uppercase tracking-[0.3em] text-[#00FFFF]">
            Certificate Showcase
          </p>
          <h1 className="mb-3 text-3xl font-bold text-white md:text-5xl">
            <span className="text-gradient">{SITE.name}</span>
          </h1>
          <p className="text-white/50">
            {CERTIFICATIONS.length} certifications · badges &amp; verify links
          </p>
        </div>

        <h2 className="mb-6 font-mono text-xs uppercase tracking-widest text-[#915EFF]">
          All certificates
        </h2>
        <CertificateShowcase />

        <footer className="mt-16 border-t border-white/5 pt-8 text-center text-xs text-white/30">
          <p>
            {SITE.name} · {SITE.role} ·{" "}
            <a
              href={SITE.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#00FFFF]/70 hover:text-[#00FFFF]"
            >
              LinkedIn
            </a>
            {" · "}
            <a
              href={SITE.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#00FFFF]/70 hover:text-[#00FFFF]"
            >
              GitHub
            </a>
          </p>
        </footer>
      </main>
    </div>
  );
}
