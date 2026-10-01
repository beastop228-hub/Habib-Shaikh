import React from "react";
import { User, Zap, Sparkles, Sliders, CheckCircle2 } from "lucide-react";
import { PORTFOLIO_DATA } from "@/data/portfolio-data";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";

export function AboutSection() {
  const { about } = PORTFOLIO_DATA;

  const ethosIcons = [Zap, Sparkles, Sliders];

  return (
    <section
      id="about"
      className="flex flex-col gap-6 pt-10 scroll-mt-8"
      aria-label="About & Engineering Ethos"
    >
      {/* Section Header */}
      <div className="border-b border-zinc-200 dark:border-[#222533] pb-4 transition-colors duration-250">
        <div className="flex items-center gap-2 text-xs font-mono text-[#7C3AED] dark:text-[#A855F7] uppercase tracking-wider mb-1">
          <User className="w-3.5 h-3.5" />
          <span>ABOUT ME</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-[#F9FAFB] font-[family-name:var(--font-jakarta)] tracking-tight transition-colors duration-250">
          About Habib
        </h2>
      </div>

      {/* Main Narrative Card */}
      <div className="glass-card rounded-2xl p-6 sm:p-8 border bg-white dark:bg-[#13141C] border-zinc-200 dark:border-[#222533] flex flex-col gap-4 relative overflow-hidden shadow-sm transition-colors duration-250">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#7C3AED]/06 dark:bg-[#7C3AED]/08 rounded-full blur-3xl pointer-events-none" />

        <p className="text-base sm:text-lg font-semibold text-zinc-900 dark:text-[#F9FAFB] leading-relaxed font-[family-name:var(--font-jakarta)] transition-colors duration-250">
          {about.lead}
        </p>

        {about.paragraphs.map((p, idx) => (
          <p key={idx} className="text-sm sm:text-base text-zinc-700 dark:text-zinc-300 leading-relaxed transition-colors duration-250">
            {p}
          </p>
        ))}

        {/* Quick Highlights Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 mt-2 border-t border-zinc-200 dark:border-[#222533]/80 transition-colors duration-250">
          <div className="flex items-center gap-2 text-xs text-zinc-700 dark:text-zinc-300">
            <CheckCircle2 className="w-4 h-4 text-[#10B981] shrink-0" />
            <span>Direct developer communication</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-zinc-700 dark:text-zinc-300">
            <CheckCircle2 className="w-4 h-4 text-[#10B981] shrink-0" />
            <span>Clean, responsive builds</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-zinc-700 dark:text-zinc-300">
            <CheckCircle2 className="w-4 h-4 text-[#10B981] shrink-0" />
            <span>AI-accelerated delivery</span>
          </div>
        </div>
      </div>

      {/* Ethos Cards Bento */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {about.ethos.map((item, idx) => {
          const Icon = ethosIcons[idx] || Sparkles;
          return (
            <Card
              key={idx}
              interactive
              className="flex flex-col justify-between p-5 bg-white dark:bg-[#13141C] border-zinc-200 dark:border-[#222533] shadow-sm transition-colors duration-250 group"
            >
              <CardHeader className="mb-2">
                <div className="w-9 h-9 rounded-xl bg-zinc-100 dark:bg-[#1A1C26] border border-zinc-200 dark:border-[#222533] flex items-center justify-center text-[#7C3AED] dark:text-[#A855F7] mb-3">
                  <Icon className="w-4 h-4 group-hover-spin transition-transform duration-700 ease-in-out group-hover:rotate-[360deg]" />
                </div>
                <CardTitle className="text-base font-bold text-zinc-900 dark:text-[#F9FAFB]">
                  {item.title}
                </CardTitle>
              </CardHeader>
              <CardDescription className="text-xs text-zinc-600 dark:text-[#9CA3AF] leading-relaxed">
                {item.desc}
              </CardDescription>
            </Card>
          );
        })}
      </div>
    </section>
  );
}
