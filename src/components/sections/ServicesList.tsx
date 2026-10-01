import React from "react";
import {
  Code,
  Sparkles,
  Layers,
  Terminal,
  Globe,
  Cpu,
  Check,
  ArrowRight,
} from "lucide-react";
import { PORTFOLIO_CONTENT } from "@/data/portfolio-content";
import { Button } from "@/components/ui/Button";

const iconMap: Record<string, React.ElementType> = {
  Code,
  Sparkles,
  Layers,
  Terminal,
  Globe,
  Cpu,
};

export function ServicesList() {
  const { eyebrow, title, intro, offerings } = PORTFOLIO_CONTENT.services;

  return (
    <section
      id="services"
      className="flex flex-col gap-6 pt-10 scroll-mt-8"
      aria-label="Services & Offerings"
    >
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-zinc-200 dark:border-[#222533] pb-4 transition-colors duration-250">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-[#7C3AED] dark:text-[#A855F7] uppercase tracking-wider mb-1">
            <Sparkles className="w-3.5 h-3.5" />
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

      {/* 2x2 Bento Grid of Services */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {offerings.map((service) => {
          const Icon = iconMap[service.icon] || Code;
          return (
            <div
              key={service.id}
              className="glass-card glass-card-hover rounded-2xl p-6 border bg-white dark:bg-[#13141C] border-zinc-200 dark:border-[#222533] flex flex-col justify-between group relative overflow-hidden shadow-sm transition-colors duration-250"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#7C3AED]/05 dark:bg-[#7C3AED]/10 rounded-full blur-2xl pointer-events-none group-hover:bg-[#7C3AED]/15 transition-all" />

              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-zinc-100 dark:bg-[#1A1C26] border border-zinc-200 dark:border-[#222533] group-hover:border-purple-400 dark:group-hover:border-[#7C3AED]/40 flex items-center justify-center text-[#7C3AED] dark:text-[#A855F7] transition-colors">
                    <Icon className="w-5 h-5 group-hover-spin transition-transform duration-700 ease-in-out group-hover:rotate-[360deg]" />
                  </div>
                  <h3 className="text-lg font-bold text-zinc-900 dark:text-[#F9FAFB] font-[family-name:var(--font-jakarta)]">
                    {service.title}
                  </h3>
                </div>

                <p className="text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed mb-5">
                  {service.description}
                </p>

                {/* Deliverables Checklist */}
                <div className="space-y-2 border-t border-zinc-200 dark:border-[#222533]/80 pt-4">
                  <div className="text-[11px] font-mono uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                    Core Deliverables
                  </div>
                  {service.deliverables.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-2.5 text-xs text-zinc-800 dark:text-[#F9FAFB]/90"
                    >
                      <span className="w-4 h-4 rounded-full bg-emerald-50 dark:bg-[#10B981]/15 text-[#10B981] flex items-center justify-center shrink-0 border border-emerald-200 dark:border-emerald-500/20">
                        <Check className="w-2.5 h-2.5" />
                      </span>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-5 mt-4 border-t border-zinc-200 dark:border-[#222533]/80">
                <Button
                  variant="outline"
                  size="sm"
                  href="#contact"
                  className="w-full justify-between text-xs bg-zinc-50 hover:bg-purple-50 dark:bg-transparent dark:hover:bg-[#7C3AED]/10 border border-zinc-200 dark:border-[#222533] hover:border-purple-300 dark:hover:border-[#7C3AED]/50 text-zinc-800 dark:text-[#F9FAFB]"
                >
                  <span>Inquire for Project</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#7C3AED] dark:text-[#A855F7]" />
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
