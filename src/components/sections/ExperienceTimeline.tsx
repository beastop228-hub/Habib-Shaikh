"use client";

import React, { useState } from "react";
import {
  Briefcase,
  Sparkles,
  MapPin,
  Download,
  CheckCircle2,
  Check,
} from "lucide-react";
import { PORTFOLIO_CONTENT } from "@/data/portfolio-content";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

export function ExperienceTimeline() {
  const { eyebrow, title, items } = PORTFOLIO_CONTENT.experience;
  const { site } = PORTFOLIO_CONTENT;
  const [downloaded, setDownloaded] = useState(false);

  const handleResumeDownload = () => {
    const resumeContent = `${site.name.toUpperCase()}
${site.title}
${site.location}
Email: ${site.email}
Status: ${site.availability}

SUMMARY:
${site.sidebarBio}

EXPERIENCE & BACKGROUND:
1. ${items[0].role} — ${items[0].company} (${items[0].period})
   Location: ${items[0].location}
   ${items[0].description}
   Highlights:
${items[0].highlights.map((h) => `   - ${h}`).join("\n")}

2. ${items[1].role} — ${items[1].company} (${items[1].period})
   Location: ${items[1].location}
   ${items[1].description}
   Highlights:
${items[1].highlights.map((h) => `   - ${h}`).join("\n")}

TECHNICAL STACK:
Next.js, React, TypeScript, Tailwind CSS, Framer Motion, Claude, ChatGPT, Prompt Engineering, Vercel, Git
`;
    const blob = new Blob([resumeContent], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "Habib_Shaikh_CV.txt";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    setDownloaded(true);
    setTimeout(() => setDownloaded(false), 3000);
  };

  return (
    <section
      id="experience"
      className="flex flex-col gap-6 pt-10 scroll-mt-8"
      aria-label="Experience and Background"
    >
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-zinc-200 dark:border-[#222533] pb-4 transition-colors duration-250">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-[#7C3AED] dark:text-[#A855F7] uppercase tracking-wider mb-1">
            <Briefcase className="w-3.5 h-3.5" />
            <span>{eyebrow}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-[#F9FAFB] font-[family-name:var(--font-jakarta)] tracking-tight transition-colors duration-250">
            {title}
          </h2>
        </div>

        {/* Download CV Button */}
        <Button
          variant="outline"
          size="sm"
          onClick={handleResumeDownload}
          className="border-zinc-200 dark:border-[#7C3AED]/40 hover:bg-purple-50 dark:hover:bg-[#7C3AED]/10 text-xs text-zinc-800 dark:text-[#F9FAFB]"
        >
          {downloaded ? (
            <>
              <Check className="w-3.5 h-3.5 text-[#10B981]" />
              <span className="text-[#10B981]">Downloaded CV</span>
            </>
          ) : (
            <>
              <Download className="w-3.5 h-3.5 text-[#7C3AED] dark:text-[#A855F7]" />
              <span>Download CV</span>
            </>
          )}
        </Button>
      </div>

      {/* Timeline Items */}
      <div className="relative pl-6 sm:pl-8 border-l border-zinc-200 dark:border-[#222533] space-y-8 transition-colors duration-250">
        {items.map((item, idx) => {
          const isCurrent = idx === 0;
          return (
            <div key={item.id} className="relative group">
              {/* Timeline Indicator Dot */}
              <div
                className={`absolute -left-[31px] sm:-left-[39px] top-1.5 w-4 h-4 rounded-full border-2 border-[var(--bg-main)] transition-colors ${
                  isCurrent
                    ? "bg-[#10B981] shadow-[0_0_10px_#10B981]"
                    : "bg-[#7C3AED]"
                }`}
              />

              <div className="glass-card glass-card-hover rounded-2xl p-5 sm:p-6 border bg-white dark:bg-[#13141C] border-zinc-200 dark:border-[#222533] flex flex-col gap-3 shadow-sm transition-colors duration-250">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    {isCurrent ? (
                      <Briefcase className="w-4 h-4 text-[#7C3AED]" />
                    ) : (
                      <Sparkles className="w-4 h-4 text-[#7C3AED] dark:text-[#A855F7]" />
                    )}
                    <h3 className="text-base sm:text-lg font-bold text-zinc-900 dark:text-[#F9FAFB] font-[family-name:var(--font-jakarta)]">
                      {item.role}
                    </h3>
                  </div>

                  <div className="flex items-center gap-2">
                    {item.badge && (
                      <Badge
                        variant={item.badge === "Current" ? "emerald" : "violet"}
                        className="text-[11px]"
                      >
                        {item.badge}
                      </Badge>
                    )}
                    <span className="font-mono text-xs text-zinc-700 dark:text-zinc-300 bg-zinc-100 dark:bg-[#1A1C26] px-2.5 py-1 rounded-md border border-zinc-200 dark:border-[#222533]">
                      {item.period}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-xs text-zinc-700 dark:text-zinc-300 font-medium">
                  <span className="text-purple-700 dark:text-[#C4B5FD] font-semibold">{item.company}</span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-zinc-500 dark:text-[#6B7280]" />
                    {item.location}
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">
                  {item.description}
                </p>

                {/* Highlights List */}
                <div className="space-y-1.5 pt-2">
                  {item.highlights.map((highlight, hIdx) => (
                    <div
                      key={hIdx}
                      className="flex items-start gap-2 text-xs text-zinc-700 dark:text-zinc-300"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#10B981] shrink-0 mt-0.5" />
                      <span>{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
