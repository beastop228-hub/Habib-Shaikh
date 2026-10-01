import React from "react";
import { GlowEffect } from "@/components/ui/GlowEffect";
import { SidebarCard } from "@/components/sidebar/SidebarCard";
import { ShiftingNavbar } from "@/components/ui/animated-shifting-tab-component";
import { HeroSection } from "@/components/sections/HeroSection";
import { ProjectsGrid } from "@/components/sections/ProjectsGrid";
import { AboutSection } from "@/components/sections/AboutSection";
import { PlatformAvailability } from "@/components/sections/PlatformAvailability";
import { ServicesList } from "@/components/sections/ServicesList";
import { SkillsArsenal } from "@/components/sections/SkillsArsenal";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { ExperienceTimeline } from "@/components/sections/ExperienceTimeline";
import { InfiniteTestimonials } from "@/components/ui/infinite-testimonials";
import ContactWithGlobe from "@/components/ui/contact-with-globe";
import { ArrowUp } from "lucide-react";

export default function Home() {
  return (
    <div className="relative min-h-screen text-[var(--text-primary)] transition-colors duration-250">
      {/* Ambient Radial Glow */}
      <GlowEffect />

      {/* Main Container Framing with stacking context z-10 above constellation canvas */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-10">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">
          {/* Sticky Left Identity Sidebar */}
          <SidebarCard />

          {/* Right Scrollable Showcase Feed */}
          <div className="flex-1 w-full min-w-0 flex flex-col gap-10 sm:gap-14">
            {/* Top Navigation Bar with Dynamic Shifting Tabs */}
            <ShiftingNavbar />

            {/* 1. Hero Hook */}
            <HeroSection />

            {/* 2. Visual Proof: Demo Projects Bento Grid */}
            <ProjectsGrid />

            {/* 3. About Habib */}
            <AboutSection />

            {/* 1. Platforms Availability (Detailed Grid) */}
            <PlatformAvailability />


            {/* 4. Capabilities & Services */}
            <ServicesList />

            {/* 5. Tools I Work With */}
            <SkillsArsenal />

            {/* 6. How I Work: 4-Step Process */}
            <ProcessSection />

            {/* 7. Background & Journey */}
            <ExperienceTimeline />

            {/* 8. Sample Reviews (Demo Preview) */}
            <InfiniteTestimonials />

            {/* 9. Interactive 3D Globe Contact Channel */}
            <ContactWithGlobe
              subtitle="CONTACT"
              title="Let's build something great together."
              description="Have a website in mind? Tell me what you need and I'll reply within 24 hours with a clear plan and price."
            />

            {/* Persistent Showcase Footer */}
            <footer className="pt-8 pb-12 border-t border-zinc-200 dark:border-[#222533] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500 dark:text-[#6B7280] transition-colors duration-250">
              <div className="flex items-center gap-2">
                <span>© 2026 Habib Shaikh. Made in Mumbai.</span>
              </div>

              <div className="flex items-center gap-4">
                <span className="font-mono text-[11px] text-purple-600 dark:text-[#A855F7]">
                  Next.js + Tailwind CSS + Framer Motion
                </span>
                <a
                  href="#home"
                  aria-label="Back to top"
                  className="p-2 rounded-xl bg-white dark:bg-[#1A1C26] hover:bg-purple-50 dark:hover:bg-[#7C3AED]/20 border border-zinc-200 dark:border-[#222533] text-zinc-600 dark:text-[#9CA3AF] hover:text-purple-600 dark:hover:text-[#F9FAFB] transition-colors shadow-sm"
                >
                  <ArrowUp className="w-3.5 h-3.5" />
                </a>
              </div>
            </footer>
          </div>
        </div>
      </div>
    </div>
  );
}
