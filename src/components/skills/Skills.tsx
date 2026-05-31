"use client";

import { SKILL_CATEGORIES } from "@/lib/constants";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SkillCard } from "./SkillCard";

export function Skills() {
  return (
    <section id="skills" className="relative py-24 md:py-32">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#915EFF]/5 to-transparent" />
      <div className="relative mx-auto max-w-7xl px-6">
        <SectionHeading subtitle="Toolkit" title="Skills" />
        <div
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
          style={{ perspective: "1000px" }}
        >
          {SKILL_CATEGORIES.map((category, index) => (
            <SkillCard
              key={category.title}
              title={category.title}
              groups={category.groups}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
