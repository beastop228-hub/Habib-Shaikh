"use client";

import React, { useState } from "react";
import SphereImageGrid, { ImageData } from "@/components/ui/sphere-image-grid";
import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink } from "lucide-react";

export const remotePlatforms: ImageData[] = [
  { id: "upwork", src: "https://cdn.simpleicons.org/upwork/14A800", alt: "Upwork", title: "Hire me on Upwork", description: "Available for direct contracts, full-stack builds, and milestone-based AI development projects.", link: "#", bgColor: "#14A800", shortName: "Upwork" },
  { id: "fiverr", src: "https://cdn.simpleicons.org/fiverr/1DBF73", alt: "Fiverr", title: "Hire me on Fiverr", description: "Open for rapid prototyping, UI/UX conversions, and targeted Next.js gigs.", link: "#", bgColor: "#1DBF73", shortName: "Fiverr" },
  { id: "freelancer", src: "https://cdn.simpleicons.org/freelancer/29B2FE", alt: "Freelancer", title: "Freelancer.com", description: "Bidding on high-quality web architecture and AI automation projects.", link: "#", bgColor: "#29B2FE", shortName: "Freelancer" },
  { id: "weworkremotely", src: "https://cdn.simpleicons.org/weworkremotely/000000", alt: "We Work Remotely", title: "We Work Remotely", description: "Looking for long-term distributed team integrations.", link: "#", bgColor: "#000000", shortName: "WWR" },
  { id: "remoteok", src: "https://cdn.simpleicons.org/remoteok/FF4742", alt: "Remote OK", title: "Remote OK", description: "Open to async-first international remote roles.", link: "#", bgColor: "#FF4742", shortName: "Remote OK" },
  { id: "flexjobs", src: "https://cdn.simpleicons.org/flexjobs/00438F", alt: "FlexJobs", title: "FlexJobs", description: "Seeking verified, high-quality flexible tech contracts.", link: "#", bgColor: "#00438F", shortName: "FlexJobs" },
  { id: "linkedin", src: "https://cdn.simpleicons.org/linkedin/0A66C2", alt: "LinkedIn", title: "Connect on LinkedIn", description: "Let's network. Available for B2B collaborations and long-term remote roles.", link: "#", bgColor: "#0A66C2", shortName: "LinkedIn" },
  { id: "indeed", src: "https://cdn.simpleicons.org/indeed/003A9B", alt: "Indeed", title: "Indeed", description: "Exploring remote frontend and full-stack engineering opportunities.", link: "#", bgColor: "#003A9B", shortName: "Indeed" },
  { id: "glassdoor", src: "https://cdn.simpleicons.org/glassdoor/0CAA41", alt: "Glassdoor", title: "Glassdoor", description: "Available for remote tech roles with transparent, great companies.", link: "#", bgColor: "#0CAA41", shortName: "Glassdoor" },
  { id: "authenticjobs", src: "https://cdn.simpleicons.org/authenticjobs/27292D", alt: "Authentic Jobs", title: "Authentic Jobs", description: "Ready to partner with design-focused agencies and web teams.", link: "#", bgColor: "#27292D", shortName: "Authentic" },
  { id: "workingnomads", src: "https://cdn.simpleicons.org/workingnomads/0089A7", alt: "Working Nomads", title: "Working Nomads", description: "Digital nomad friendly engineering roles and freelance contracts.", link: "#", bgColor: "#0089A7", shortName: "Nomads" },
  { id: "angellist", src: "https://cdn.simpleicons.org/wellfound/000000", alt: "Wellfound", title: "Wellfound (AngelList)", description: "Partnering with startups for MVP builds and rapid scaling.", link: "#", bgColor: "#000000", shortName: "Wellfound" },
  { id: "toptal", src: "https://cdn.simpleicons.org/toptal/205081", alt: "Toptal", title: "Toptal Network", description: "Premium tier web engineering and AI product development.", link: "#", bgColor: "#205081", shortName: "Toptal" },
  { id: "peopleperhour", src: "https://cdn.simpleicons.org/peopleperhour/FF7300", alt: "PeoplePerHour", title: "PeoplePerHour", description: "Hourly consultation and quick turnaround web fixes.", link: "#", bgColor: "#FF7300", shortName: "PPH" },
  { id: "simplyhired", src: "https://cdn.simpleicons.org/simplyhired/212121", alt: "SimplyHired", title: "SimplyHired", description: "Available for remote independent contractor positions.", link: "#", bgColor: "#212121", shortName: "SimplyHired" },
  { id: "jooble", src: "https://cdn.simpleicons.org/jooble/01579B", alt: "Jooble", title: "Jooble", description: "Sourcing specialized Next.js and React project listings.", link: "#", bgColor: "#01579B", shortName: "Jooble" },
  { id: "remotive", src: "https://cdn.simpleicons.org/remotive/032541", alt: "Remotive", title: "Remotive", description: "Joining tech-forward teams with async communication cultures.", link: "#", bgColor: "#032541", shortName: "Remotive" },
  { id: "taskrabbit", src: "https://cdn.simpleicons.org/taskrabbit/00A859", alt: "TaskRabbit", title: "TaskRabbit", description: "Available for specialized local/remote tech tasks.", link: "#", bgColor: "#00A859", shortName: "TaskRabbit" },
  { id: "solidgigs", src: "https://cdn.simpleicons.org/solidgigs/56198C", alt: "SolidGigs", title: "SolidGigs", description: "On standby for premium freelance gig alerts.", link: "#", bgColor: "#56198C", shortName: "SolidGigs" },
  { id: "guru", src: "https://cdn.simpleicons.org/guru/008E35", alt: "Guru", title: "Guru", description: "Providing expert tech consultation and development services.", link: "#", bgColor: "#008E35", shortName: "Guru" }
];

export function PlatformAvailability() {
  const [selectedPlatform, setSelectedPlatform] = useState<ImageData | null>(null);

  return (
    <section id="platforms" className="py-16 relative">
      <div className="max-w-7xl mx-auto px-4 flex flex-col lg:flex-row items-center gap-12">
        
        {/* Text Content */}
        <div className="flex-1 text-center lg:text-left">
          <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-purple-600 dark:text-purple-400 mb-4">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Global Reach
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-zinc-900 dark:text-white mb-4">
            Available On &amp; Working Through Top Platforms.
          </h2>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 max-w-lg mx-auto lg:mx-0">
            Ready to collaborate seamlessly across 20+ major freelance networks, remote contract platforms, and talent directories. 
            Click any platform on the sphere to explore hiring options.
          </p>
        </div>

        {/* Interactive 3D Sphere Component */}
        <div className="flex-1 flex justify-center lg:justify-end">
          <div className="w-full max-w-[500px] aspect-square bg-white/5 dark:bg-[#13141C]/50 rounded-full border border-zinc-200 dark:border-[#222533] backdrop-blur-sm shadow-xl flex items-center justify-center p-4 relative">
            <SphereImageGrid 
              autoRotate={true}
              autoRotateSpeed={0.4} 
              baseImageScale={0.25} 
              containerSize={450} 
              images={remotePlatforms} 
              sphereRadius={200}
              onNodeClick={(platform) => setSelectedPlatform(platform)}
            />

            {/* Custom "Hire Habib" Pop-up Modal */}
            <AnimatePresence>
              {selectedPlatform && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: 10 }}
                  className="absolute inset-0 m-auto w-[85%] h-fit max-w-[340px] bg-white dark:bg-[#1A1C26] rounded-2xl shadow-2xl border border-zinc-200 dark:border-[#222533] overflow-hidden z-50 flex flex-col"
                >
                  <div className="p-6 relative flex flex-col items-center text-center">
                    <button 
                      onClick={() => setSelectedPlatform(null)}
                      className="absolute top-4 right-4 p-1.5 rounded-full bg-zinc-100 dark:bg-[#222533] text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                    
                    {/* Platform Logo Avatar */}
                    <div className="w-20 h-20 bg-white rounded-full shadow-sm border border-zinc-200 flex items-center justify-center p-4 mb-5">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img 
                        src={selectedPlatform.src} 
                        alt={selectedPlatform.alt} 
                        className="w-full h-full object-contain"
                        onError={(e) => {
                          (e.target as HTMLImageElement).style.display = 'none';
                        }}
                      />
                    </div>
                    
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-medium bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 mb-3 border border-emerald-500/20">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      Available for Work
                    </span>

                    <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-2">
                      {selectedPlatform.title}
                    </h3>
                    
                    <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-6 leading-relaxed">
                      {selectedPlatform.description}
                    </p>

                    <a 
                      href={selectedPlatform.link || "#"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-3 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-sm font-semibold transition-colors flex items-center justify-center gap-2 shadow-lg shadow-purple-500/25"
                    >
                      View Profile
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

          </div>
        </div>

      </div>
    </section>
  );
}

export default PlatformAvailability;
