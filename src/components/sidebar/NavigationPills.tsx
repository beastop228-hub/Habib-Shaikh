"use client";

import React, { useEffect, useState } from "react";
import {
  Home,
  FolderGit2,
  User,
  Sparkles,
  Terminal,
  Briefcase,
  Mail,
  GitPullRequest,
  Globe2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { PORTFOLIO_DATA } from "@/data/portfolio-data";

const iconMap: Record<string, React.ElementType> = {
  home: Home,
  projects: FolderGit2,
  portfolio: FolderGit2,
  about: User,
  platforms: Globe2,
  services: Sparkles,
  skills: Terminal,
  process: GitPullRequest,
  experience: Briefcase,
  contact: Mail,
};

export function NavigationPills() {
  const [activeSection, setActiveSection] = useState<string>("home");

  useEffect(() => {
    const handleScroll = () => {
      const sections = PORTFOLIO_DATA.navigation.map((n) => n.id);
      const scrollPosition = window.scrollY + 200;

      for (let i = sections.length - 1; i >= 0; i--) {
        const element = document.getElementById(sections[i]);
        if (element) {
          const top = element.offsetTop;
          if (scrollPosition >= top) {
            setActiveSection(sections[i]);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setActiveSection(id);
    }
  };

  return (
    <nav
      className="flex flex-col gap-1.5 py-3 border-y border-zinc-200 dark:border-[#222533]/80 transition-colors duration-300"
      aria-label="Sidebar Section Navigation"
    >
      <div className="text-[11px] font-mono uppercase tracking-wider text-zinc-500 dark:text-zinc-400 px-3 pb-1">
        Navigation
      </div>
      {PORTFOLIO_DATA.navigation.map((item) => {
        const Icon = iconMap[item.id] || Home;
        const isActive = activeSection === item.id;

        return (
          <a
            key={item.id}
            href={item.href}
            onClick={(e) => handleClick(e, item.id)}
            className={cn(
              "group flex items-center justify-between px-3 py-2 rounded-xl text-sm font-medium transition-all duration-200 cursor-pointer",
              isActive
                ? "bg-purple-50 dark:bg-[#7C3AED]/15 text-purple-700 dark:text-[#F9FAFB] border border-purple-200 dark:border-[#7C3AED]/40 shadow-xs font-semibold"
                : "text-zinc-700 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-[#1A1C26] border border-transparent"
            )}
          >
            <div className="flex items-center gap-2.5">
              <Icon
                className={cn(
                  "w-4 h-4 transition-colors",
                  isActive
                    ? "text-[#7C3AED] dark:text-[#A855F7]"
                    : "text-zinc-500 dark:text-zinc-400 group-hover:text-zinc-800 dark:group-hover:text-zinc-200"
                )}
              />
              <span>{item.label}</span>
            </div>
            {isActive && (
              <span className="w-1.5 h-1.5 rounded-full bg-[#7C3AED] dark:bg-[#A855F7] shadow-[0_0_8px_#A855F7]" />
            )}
          </a>
        );
      })}
    </nav>
  );
}
