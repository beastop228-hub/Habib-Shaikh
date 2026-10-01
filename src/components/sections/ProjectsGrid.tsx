"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  ExternalLink,
  Sparkles,
  ArrowUpRight,
  Layers,
  X,
  CheckCircle2,
} from "lucide-react";
import { PORTFOLIO_DATA, Project } from "@/data/portfolio-data";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

export function ProjectsGrid() {
  const [filter, setFilter] = useState<string>("All");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const categories = [
    { id: "All", label: "All", count: PORTFOLIO_DATA.projects.length },
    { id: "Web Apps", label: "Web Apps", count: PORTFOLIO_DATA.projects.length },
  ];

  const filteredProjects =
    filter === "All"
      ? PORTFOLIO_DATA.projects
      : PORTFOLIO_DATA.projects.filter((p) => p.category === filter);

  return (
    <section
      id="projects"
      className="flex flex-col gap-6 pt-10 scroll-mt-8 relative"
      aria-label="Projects Portfolio"
    >
      <div id="portfolio" className="absolute -top-10" />
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-zinc-200 dark:border-[#222533] pb-4 transition-colors duration-300">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-[#7C3AED] dark:text-[#A855F7] uppercase tracking-wider mb-1">
            <Layers className="w-3.5 h-3.5" />
            <span>SELECTED WORK</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-[#F9FAFB] font-[family-name:var(--font-jakarta)] tracking-tight">
            Demo Projects
          </h2>
          <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 mt-1 max-w-xl">
            Two concept builds I created to show what I can deliver. They are demos, not client work.
          </p>
        </div>

        {/* Dynamic Filter Pills */}
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-zinc-100 dark:bg-[#13141C] border border-zinc-200 dark:border-[#222533] shadow-xs transition-colors duration-300">
          {categories.map((cat) => {
            const isSelected = filter === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setFilter(cat.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 cursor-pointer flex items-center gap-1.5 ${
                  isSelected
                    ? "bg-[#7C3AED] text-white shadow-[0_0_12px_rgba(124,58,237,0.4)]"
                    : "text-zinc-600 dark:text-[#9CA3AF] hover:text-zinc-900 dark:hover:text-[#F9FAFB] hover:bg-zinc-200/70 dark:hover:bg-[#1A1C26]"
                }`}
              >
                <span>{cat.label}</span>
                <span className="text-[10px] opacity-75 font-mono">({cat.count})</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Balanced 2-Column Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
        {filteredProjects.map((project) => (
          <article
            key={project.title}
            className="group glass-card glass-card-hover rounded-2xl overflow-hidden border bg-white/80 dark:bg-[#13141C]/85 backdrop-blur-md border-zinc-200 dark:border-[#222533] flex flex-col justify-between transition-colors duration-300 shadow-sm relative z-10"
          >
            {/* Project Image Preview linking directly to live demo */}
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Open ${project.title} Live Web App`}
              className="relative w-full aspect-[16/9] bg-zinc-100 dark:bg-[#1A1C26] overflow-hidden block cursor-pointer group/img"
            >
              <Image
                src={project.image || "/projects/nike-ecommerce.jpg"}
                alt={`${project.title} Preview`}
                fill
                sizes="(max-width: 768px) 100vw, 550px"
                className="object-cover object-center group-hover/img:scale-105 transition-transform duration-500 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 dark:from-[#13141C] via-transparent to-transparent opacity-80 pointer-events-none" />

              {/* Top floating tags */}
              <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
                <Badge variant="violet" className="text-[11px] backdrop-blur-md">
                  {project.badge || project.category}
                </Badge>
              </div>

              {/* Hover overlay hint */}
              <div className="absolute inset-0 bg-black/40 dark:bg-[#0B0C10]/60 backdrop-blur-xs opacity-0 group-hover/img:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2">
                <span className="text-xs font-semibold text-white bg-[#7C3AED] px-4 py-2 rounded-xl flex items-center gap-1.5 shadow-lg group-hover/img:scale-105 transition-transform">
                  <span>View Live Project</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </a>

            {/* Project Details */}
            <div className="p-5 sm:p-6 flex flex-col flex-1 justify-between gap-4">
              <div>
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group/title inline-block"
                    >
                      <h3 className="text-lg font-bold text-zinc-900 dark:text-[#F9FAFB] font-[family-name:var(--font-jakarta)] group-hover/title:text-[#7C3AED] dark:group-hover/title:text-[#A855F7] transition-colors flex items-center gap-1.5">
                        <span>{project.title}</span>
                        <ArrowUpRight className="w-4 h-4 opacity-0 group-hover/title:opacity-100 transition-opacity text-[#7C3AED] dark:text-[#A855F7]" />
                      </h3>
                    </a>
                    <p className="text-xs text-zinc-500 dark:text-[#9CA3AF] font-medium mt-0.5">
                      {project.subtitle}
                    </p>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed mt-3">
                  {project.description}
                </p>
              </div>

              {/* Tech Stack Chips in JetBrains Mono */}
              <div>
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="font-mono text-[11px] px-2 py-0.5 rounded bg-zinc-100 dark:bg-[#1A1C26] text-purple-700 dark:text-[#C4B5FD] border border-zinc-200 dark:border-[#222533]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Card Actions */}
                <div className="flex items-center gap-2.5 pt-4 mt-4 border-t border-zinc-200 dark:border-[#222533]/80">
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold bg-[#7C3AED] hover:bg-[#6D28D9] text-white shadow-[0_0_15px_rgba(124,58,237,0.35)] transition-all cursor-pointer"
                  >
                    <span>View Live Project</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>

                  <button
                    onClick={() => setSelectedProject(project)}
                    className="inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl text-xs font-medium bg-zinc-100 hover:bg-zinc-200 dark:bg-[#1A1C26] dark:hover:bg-[#222533] text-zinc-800 dark:text-zinc-200 border border-zinc-200 dark:border-[#222533] transition-colors cursor-pointer"
                    title="Inspect Architecture"
                    aria-label={`${project.title} Architecture Details`}
                  >
                    <Sparkles className="w-3.5 h-3.5 text-[#7C3AED] dark:text-[#A855F7]" />
                    <span className="hidden sm:inline">Details</span>
                  </button>

                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-xl bg-zinc-100 hover:bg-purple-50 dark:bg-[#1A1C26] dark:hover:bg-[#7C3AED]/20 border border-zinc-200 dark:border-[#222533] hover:border-purple-300 text-zinc-700 dark:text-[#9CA3AF] hover:text-purple-700 dark:hover:text-[#F9FAFB] transition-all"
                    title="Open Live Site in New Window"
                    aria-label={`${project.title} External Link`}
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Project Details Modal */}
      {selectedProject && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 dark:bg-[#0B0C10]/85 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setSelectedProject(null)}
        >
          <div
            className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl border bg-white dark:bg-[#13141C] border-zinc-200 dark:border-[#3B3F58] p-6 shadow-2xl transition-colors duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-4 right-4 p-2 rounded-xl bg-zinc-100 dark:bg-[#1A1C26] text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-200 dark:hover:bg-[#222533] transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="relative w-full aspect-[16/9] rounded-xl overflow-hidden mb-5 border border-zinc-200 dark:border-[#222533]">
              <Image
                src={selectedProject.image || "/projects/nike-ecommerce.jpg"}
                alt={selectedProject.title}
                fill
                className="object-cover"
              />
            </div>

            <div className="flex items-center gap-2 mb-2">
              <Badge variant="violet">
                {selectedProject.badge || selectedProject.category}
              </Badge>
            </div>

            <h3 className="text-2xl font-bold text-zinc-900 dark:text-[#F9FAFB] font-[family-name:var(--font-jakarta)]">
              {selectedProject.title}
            </h3>
            <p className="text-sm text-[#7C3AED] dark:text-[#A855F7] font-medium mb-3">
              {selectedProject.subtitle}
            </p>

            <p className="text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed mb-4">
              {selectedProject.description}
            </p>

            <div className="space-y-3 mb-6">
              <h4 className="text-xs font-mono uppercase text-zinc-500 dark:text-zinc-400">
                Engineering Highlights
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-zinc-800 dark:text-zinc-200">
                <div className="flex items-center gap-2 bg-zinc-50 dark:bg-[#1A1C26] p-2.5 rounded-lg border border-zinc-200 dark:border-[#222533]">
                  <CheckCircle2 className="w-4 h-4 text-[#10B981] shrink-0" />
                  <span>Sub-second edge execution</span>
                </div>
                <div className="flex items-center gap-2 bg-zinc-50 dark:bg-[#1A1C26] p-2.5 rounded-lg border border-zinc-200 dark:border-[#222533]">
                  <CheckCircle2 className="w-4 h-4 text-[#10B981] shrink-0" />
                  <span>Type-safe end-to-end contracts</span>
                </div>
                <div className="flex items-center gap-2 bg-zinc-50 dark:bg-[#1A1C26] p-2.5 rounded-lg border border-zinc-200 dark:border-[#222533]">
                  <CheckCircle2 className="w-4 h-4 text-[#10B981] shrink-0" />
                  <span>Real-time responsive UI state</span>
                </div>
                <div className="flex items-center gap-2 bg-zinc-50 dark:bg-[#1A1C26] p-2.5 rounded-lg border border-zinc-200 dark:border-[#222533]">
                  <CheckCircle2 className="w-4 h-4 text-[#10B981] shrink-0" />
                  <span>Responsive modern styling</span>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-1.5 mb-6">
              {selectedProject.tags.map((tag) => (
                <span
                  key={tag}
                  className="font-mono text-xs px-2.5 py-1 rounded-md bg-zinc-100 dark:bg-[#1A1C26] text-purple-700 dark:text-[#C4B5FD] border border-zinc-200 dark:border-[#222533]"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-zinc-200 dark:border-[#222533]">
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setSelectedProject(null)}
              >
                Close
              </Button>
              {selectedProject.liveUrl && (
                <Button
                  variant="primary"
                  size="sm"
                  href={selectedProject.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span>Launch Live Demo</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </Button>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
