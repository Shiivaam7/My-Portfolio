"use client";

import { motion } from "framer-motion";
import { SITE } from "@/lib/constants";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FadeUp } from "@/components/ui/FadeUp";
import { ContactForm } from "./ContactForm";

const CONTACT_ITEMS = [
  {
    label: "GitHub",
    value: "Shiivaam7",
    href: SITE.github,
    icon: "⌘",
  },
  {
    label: "LinkedIn",
    value: "Shivam Kumar",
    href: SITE.linkedin,
    icon: "in",
  },
  {
    label: "Phone",
    value: SITE.phone,
    href: `tel:${SITE.phone.replace(/\s/g, "")}`,
    icon: "☎",
  },
  {
    label: "Email",
    value: SITE.email,
    href: "#message",
    icon: "@",
  },
] as const;

export function Contact() {
  return (
    <section id="contact" className="relative py-24 md:py-32">
      <div className="absolute inset-0 bg-gradient-to-t from-[#915EFF]/5 to-transparent" />
      <div className="relative mx-auto max-w-5xl px-6">
        <SectionHeading subtitle="Get In Touch" title="Contact Me" />

        <ContactForm />

        <FadeUp className="mt-12">
          <p className="mb-6 text-center text-sm text-white/50">
            Or reach me directly
          </p>
          <div className="grid gap-4 sm:grid-cols-2">
            {CONTACT_ITEMS.map((item, i) => (
              <motion.a
                key={item.label}
                href={item.href}
                target={
                  item.href.startsWith("http") ? "_blank" : undefined
                }
                rel={
                  item.href.startsWith("http")
                    ? "noopener noreferrer"
                    : undefined
                }
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                whileHover={{ scale: 1.02, x: 4 }}
                className="glass flex items-center gap-4 rounded-xl p-4 transition-colors hover:border-[#915EFF]/40"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#915EFF]/20 font-mono text-sm text-[#915EFF]">
                  {item.icon}
                </span>
                <div>
                  <p className="text-xs text-white/40">{item.label}</p>
                  <p className="text-sm font-medium text-white">{item.value}</p>
                </div>
              </motion.a>
            ))}
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
