import React from "react";
import { ArrowUpRight, Sparkles, Code2, Zap, MessageSquare } from "lucide-react";
import { PORTFOLIO_CONTENT } from "@/data/portfolio-content";
import { Badge } from "@/components/ui/Badge";
import { OriginButton } from "@/components/ui/origin-button";

export function HeroSection() {
  const { hero } = PORTFOLIO_CONTENT;

  return (
    <section
      id="home"
      className="flex flex-col gap-8 pt-2 pb-6 scroll-mt-8"
      aria-label="Hero Overview"
    >
      {/* Top Banner Tag */}
      <div className="flex items-center gap-3">
        <Badge variant="violet" dot pulse className="py-1 px-3 text-xs">
          <Sparkles className="w-3 h-3 text-[#7C3AED] dark:text-[#A855F7] animate-spin-slow shrink-0" />
          {hero.badge}
        </Badge>
      </div>

      {/* Main Headline & Subheadline */}
      <div className="flex flex-col gap-4">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-zinc-900 dark:text-[#F9FAFB] leading-[1.15] font-[family-name:var(--font-jakarta)] transition-colors duration-250">
          {hero.headline}
        </h2>
        <p className="text-base sm:text-lg text-zinc-600 dark:text-[#9CA3AF] max-w-2xl leading-relaxed transition-colors duration-250">
          {hero.subheadline}
        </p>
      </div>

      {/* Hero CTA Actions */}
      <div className="flex flex-wrap items-center gap-3.5">
        <OriginButton
          variant="primary"
          size="lg"
          href={hero.primaryCta.href}
          className="shadow-sm hover:shadow-[0_0_25px_rgba(124,58,237,0.35)]"
        >
          <span>{hero.primaryCta.label}</span>
          <ArrowUpRight className="w-4 h-4" />
        </OriginButton>
        <OriginButton
          variant="secondary"
          size="lg"
          href={hero.secondaryCta.href}
        >
          <span>{hero.secondaryCta.label}</span>
        </OriginButton>
      </div>

      {/* Honest Value Highlights Row (Replaces fake placeholder metrics) */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-2 relative z-10">
        {hero.valueHighlights.map((highlight, idx) => (
          <div
            key={idx}
            className="glass-card glass-card-hover rounded-2xl p-4 flex flex-col justify-between border bg-white/80 dark:bg-[#13141C]/85 backdrop-blur-md border-zinc-200 dark:border-[#222533] relative overflow-hidden group shadow-sm transition-colors duration-250"
          >
            <div className="flex items-center justify-between text-xs text-zinc-500 dark:text-[#9CA3AF] mb-2">
              <span className="font-mono text-[11px] text-[#7C3AED] dark:text-[#A855F7] group-hover:text-zinc-900 dark:group-hover:text-[#F9FAFB] transition-colors">
                0{idx + 1}
              </span>
              {idx === 0 && (
                <Code2 className="w-4 h-4 text-[#7C3AED] dark:text-[#A855F7] group-hover-spin transition-transform duration-700 ease-in-out group-hover:rotate-[360deg]" />
              )}
              {idx === 1 && (
                <Zap className="w-4 h-4 text-[#10B981] group-hover-spin transition-transform duration-700 ease-in-out group-hover:rotate-[360deg]" />
              )}
              {idx === 2 && (
                <MessageSquare className="w-4 h-4 text-[#7C3AED] group-hover-spin transition-transform duration-700 ease-in-out group-hover:rotate-[360deg]" />
              )}
            </div>
            <div className="text-base sm:text-lg font-bold text-zinc-900 dark:text-white font-[family-name:var(--font-jakarta)] tracking-tight transition-colors duration-250">
              {highlight.title}
            </div>
            <div className="text-xs text-zinc-600 dark:text-zinc-400 mt-1 leading-relaxed transition-colors duration-250">
              {highlight.desc}
            </div>
          </div>
        ))}
      </div>

      {/* Active Stack Badges */}
      <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-zinc-200 dark:border-[#222533]/60 transition-colors duration-250">
        <span className="text-xs font-mono text-zinc-500 dark:text-[#6B7280] uppercase tracking-wider mr-2">
          Active Stack:
        </span>
        {hero.activeStack.map((tech) => (
          <span
            key={tech}
            className="text-xs font-mono text-zinc-700 dark:text-[#9CA3AF] bg-white dark:bg-[#13141C] border border-zinc-200 dark:border-[#222533] px-2.5 py-1 rounded-lg hover:border-purple-400 dark:hover:border-[#7C3AED]/40 hover:text-purple-700 dark:hover:text-[#F9FAFB] transition-colors shadow-xs"
          >
            {tech}
          </span>
        ))}
      </div>
    </section>
  );
}
