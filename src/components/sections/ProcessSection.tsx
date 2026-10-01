import React from "react";
import {
  GitPullRequest,
  MessageSquare,
  Palette,
  Code,
  Rocket,
  Check,
} from "lucide-react";
import { PORTFOLIO_CONTENT } from "@/data/portfolio-content";

const stepIcons = [MessageSquare, Palette, Code, Rocket];

export function ProcessSection() {
  const { eyebrow, title, intro, steps } = PORTFOLIO_CONTENT.process;

  return (
    <section
      id="process"
      className="flex flex-col gap-6 pt-10 scroll-mt-8"
      aria-label="Development Process"
    >
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-zinc-200 dark:border-[#222533] pb-4 transition-colors duration-250">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-[#7C3AED] dark:text-[#A855F7] uppercase tracking-wider mb-1">
            <GitPullRequest className="w-3.5 h-3.5" />
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

      {/* 4-Step Process Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {steps.map((item, index) => {
          const Icon = stepIcons[index] || Code;
          return (
            <div
              key={item.step}
              className="glass-card glass-card-hover rounded-2xl p-5 border bg-white dark:bg-[#13141C] border-zinc-200 dark:border-[#222533] flex flex-col justify-between shadow-sm transition-colors duration-250 group relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-[#7C3AED]/05 dark:bg-[#7C3AED]/10 rounded-full blur-xl pointer-events-none group-hover:bg-[#7C3AED]/15 transition-all" />

              <div>
                {/* Step Index & Icon */}
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-zinc-200 dark:border-[#222533]">
                  <span className="font-mono text-sm font-bold text-[#7C3AED] dark:text-[#A855F7]">
                    {item.step}
                  </span>
                  <div className="w-8 h-8 rounded-lg bg-zinc-100 dark:bg-[#1A1C26] border border-zinc-200 dark:border-[#222533] flex items-center justify-center text-[#7C3AED] dark:text-[#A855F7]">
                    <Icon className="w-4 h-4 group-hover-spin transition-transform duration-700 ease-in-out group-hover:rotate-[360deg]" />
                  </div>
                </div>

                <h3 className="text-base font-bold text-zinc-900 dark:text-[#F9FAFB] font-[family-name:var(--font-jakarta)] mb-2">
                  {item.title}
                </h3>

                <p className="text-xs text-zinc-600 dark:text-zinc-300 leading-relaxed mb-4">
                  {item.description}
                </p>
              </div>

              {/* Detail Guarantee */}
              <div className="pt-3 border-t border-zinc-200 dark:border-[#222533]/80 flex items-start gap-2 text-[11px] text-zinc-700 dark:text-zinc-400">
                <span className="w-3.5 h-3.5 rounded-full bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 mt-0.5 border border-emerald-200 dark:border-emerald-500/20">
                  <Check className="w-2.5 h-2.5" />
                </span>
                <span>{item.details}</span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
