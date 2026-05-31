"use client";

import { PROJECTS } from "@/lib/constants";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProjectCard } from "./ProjectCard";

export function Projects() {
  return (
    <section id="projects" className="relative py-24 md:py-32">
      <div className="absolute inset-0 bg-gradient-to-b from-[#915EFF]/5 via-transparent to-transparent" />
      <div className="relative mx-auto max-w-7xl px-6">
        <SectionHeading subtitle="Portfolio" title="Featured Projects" />
        <div
          className="grid gap-8 lg:grid-cols-3"
          style={{ perspective: "1200px" }}
        >
          {PROJECTS.map((project, index) => (
            <ProjectCard key={project.id} {...project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
