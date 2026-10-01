'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import { reviewsSection, demoReviews } from '@/data/portfolio-content';

export function DemoBadge() {
  return (
    <span className="rounded-full border border-amber-400/40 bg-amber-400/10 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wide text-amber-700 dark:text-amber-300">
      Demo
    </span>
  );
}

export function DemoReviewsHeader() {
  return (
    <div
      role="note"
      className="mb-6 flex items-start gap-3 rounded-xl border border-amber-400/30 bg-amber-400/10 p-4 text-sm text-amber-900 dark:text-amber-100"
    >
      <span aria-hidden className="mt-0.5">ℹ️</span>
      <p>
        <strong className="font-semibold">Demo section.</strong> {reviewsSection.note}
      </p>
    </div>
  );
}

interface DemoReviewItem {
  name: string;
  role: string;
  text: string;
  initials?: string;
}

const reviewsWithInitials: DemoReviewItem[] = demoReviews.map((rev) => {
  const parts = rev.name.split(' ');
  const initials = parts.length > 1 ? `${parts[0][0]}${parts[parts.length - 1][0]}` : rev.name.slice(0, 2).toUpperCase();
  return {
    ...rev,
    initials,
  };
});

// Distribute across 2 columns for the dual-column infinite marquee
const firstColumn = [reviewsWithInitials[0], reviewsWithInitials[1]];
const secondColumn = [reviewsWithInitials[2], reviewsWithInitials[3]];

const TestimonialsColumn = ({
  items,
  duration = 16,
  className = "",
}: {
  items: DemoReviewItem[];
  duration?: number;
  className?: string;
}) => {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <motion.ul
        animate={{ translateY: "-50%" }}
        transition={{
          duration,
          repeat: Infinity,
          ease: "linear",
          repeatType: "loop",
        }}
        className="flex flex-col gap-5 pb-5 list-none m-0 p-0"
      >
        {[...new Array(3).fill(0)].map((_, groupIndex) => (
          <React.Fragment key={groupIndex}>
            {items.map(({ text, initials, name, role }, idx) => (
              <motion.li
                key={`${groupIndex}-${idx}`}
                whileHover={{
                  scale: 1.02,
                  y: -4,
                  transition: { type: "spring", stiffness: 350, damping: 20 },
                }}
                className="p-6 rounded-2xl border border-zinc-200/80 dark:border-[#222533] bg-white/90 dark:bg-[#13141C]/90 shadow-md shadow-black/5 dark:shadow-purple-950/5 backdrop-blur-xl w-full max-w-sm transition-colors duration-200 group"
              >
                {/* Header: Stars & Demo Badge */}
                <div className="flex items-center justify-between gap-2 mb-3.5">
                  <div className="flex items-center gap-1 text-amber-400/90">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={14} fill="currentColor" />
                    ))}
                  </div>
                  <DemoBadge />
                </div>

                {/* Review Quote */}
                <p className="text-xs leading-relaxed text-zinc-600 dark:text-zinc-300 font-normal italic">
                  &ldquo;{text}&rdquo;
                </p>

                {/* Footer: Author profile */}
                <div className="flex items-center gap-3 mt-5 pt-3 border-t border-zinc-100 dark:border-zinc-800/80">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-purple-600/15 text-purple-600 dark:text-purple-400 font-bold text-xs ring-1 ring-purple-500/20">
                    {initials}
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="font-semibold text-xs text-zinc-900 dark:text-zinc-100 truncate">
                      {name}
                    </span>
                    <span className="text-[11px] text-zinc-500 dark:text-zinc-400 truncate">
                      {role}
                    </span>
                  </div>
                </div>
              </motion.li>
            ))}
          </React.Fragment>
        ))}
      </motion.ul>
    </div>
  );
};

export function InfiniteTestimonials() {
  const { eyebrow, title } = reviewsSection;

  return (
    <section
      id="testimonials"
      className="relative py-8 sm:py-12 overflow-hidden scroll-mt-8"
      aria-label="Reviews and Testimonials Preview"
    >
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-zinc-200 dark:border-[#222533] pb-4 mb-6 transition-colors duration-250">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-[#7C3AED] dark:text-[#A855F7] uppercase tracking-wider mb-1">
            <span className="h-1.5 w-1.5 rounded-full bg-purple-500 animate-pulse" />
            <span>{eyebrow}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-[#F9FAFB] font-[family-name:var(--font-jakarta)] tracking-tight">
            {title}
          </h2>
        </div>
        <DemoBadge />
      </div>

      {/* DemoReviewsHeader rendered directly above the animated reviews container */}
      <DemoReviewsHeader />

      {/* Vertical Marquee Mask Container */}
      <div className="relative [mask-image:linear-gradient(to_bottom,transparent,black_10%,black_90%,transparent)] [-webkit-mask-image:linear-gradient(to_bottom,transparent,black_10%,black_90%,transparent)] max-h-[520px] overflow-hidden py-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 justify-center max-w-3xl mx-auto">
          <TestimonialsColumn items={firstColumn} duration={18} />
          <TestimonialsColumn items={secondColumn} duration={22} className="hidden md:block" />
        </div>
      </div>
    </section>
  );
}

export const TestimonialsSection = InfiniteTestimonials;
