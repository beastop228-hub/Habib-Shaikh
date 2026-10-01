import React from "react";
import { Terminal, Code, Sparkles, Cpu, Layers } from "lucide-react";
import { PORTFOLIO_CONTENT } from "@/data/portfolio-content";

const iconMap: Record<string, React.ElementType> = {
  Code,
  Sparkles,
  Terminal,
  Cpu,
  Layers,
};

export function SkillsArsenal() {
  const { eyebrow, title, intro, groups } = PORTFOLIO_CONTENT.tools;

  return (
    <section
      id="skills"
      className="flex flex-col gap-6 pt-10 scroll-mt-8"
      aria-label="Tools and Technologies"
    >
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-zinc-200 dark:border-[#222533] pb-4 transition-colors duration-250">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-[#7C3AED] dark:text-[#A855F7] uppercase tracking-wider mb-1">
            <Terminal className="w-3.5 h-3.5" />
            <span>{eyebrow}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-[#F9FAFB] font-[family-name:var(--font-jakarta)] tracking-tight transition-colors duration-250">
            {title}
          </h2>
        </div>
        <p className="text-sm text-zinc-600 dark:text-zinc-400 max-w-sm transition-colors duration-250 font-medium">
          {intro}
        </p>
      </div>

      {/* Grid of Grouped Tool Badges */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {groups.map((group) => {
          const Icon = iconMap[group.icon] || Cpu;
          return (
            <div
              key={group.category}
              className="glass-card glass-card-hover rounded-2xl p-5 border bg-white dark:bg-[#13141C] border-zinc-200 dark:border-[#222533] flex flex-col justify-between shadow-sm transition-colors duration-250 group relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-28 h-28 bg-[#7C3AED]/05 dark:bg-[#7C3AED]/10 rounded-full blur-2xl pointer-events-none group-hover:bg-[#7C3AED]/15 transition-all" />

              <div>
                <div className="flex items-center gap-2.5 pb-3 mb-3 border-b border-zinc-200 dark:border-[#222533]">
                  <div className="w-8 h-8 rounded-lg bg-zinc-100 dark:bg-[#1A1C26] border border-zinc-200 dark:border-[#222533] flex items-center justify-center text-[#7C3AED] dark:text-[#A855F7]">
                    <Icon className="w-4 h-4 group-hover-spin transition-transform duration-700 ease-in-out group-hover:rotate-[360deg]" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-zinc-900 dark:text-[#F9FAFB] font-[family-name:var(--font-jakarta)]">
                      {group.category}
                    </h3>
                  </div>
                </div>

                <p className="text-xs text-zinc-600 dark:text-zinc-400 mb-4 leading-relaxed">
                  {group.description}
                </p>

                {/* Clean Grouped Tool Badges */}
                <div className="flex flex-wrap gap-2">
                  {group.tools.map((tool) => (
                    <span
                      key={tool}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium bg-zinc-100 dark:bg-[#1A1C26] text-zinc-800 dark:text-zinc-200 border border-zinc-200/80 dark:border-[#282B3C] group-hover:border-purple-300 dark:group-hover:border-[#7C3AED]/40 transition-colors"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-[#7C3AED] dark:bg-[#A855F7]" />
                      {tool}
                    </span>
                  ))}
                </div>
              </div>

              {/* Bottom Subtle Tag */}
              <div className="pt-4 mt-4 border-t border-zinc-200 dark:border-[#222533]/80 flex items-center justify-between text-[11px] text-zinc-500 dark:text-zinc-400 font-mono">
                <span>Active Stack</span>
                <span className="text-[#10B981] flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Verified
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
