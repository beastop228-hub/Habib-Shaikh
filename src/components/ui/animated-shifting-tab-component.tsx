'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import {
  ChevronDown,
  ExternalLink,
  Code2,
  Sparkles,
  Layers,
  Terminal,
  Cpu,
  ArrowRight,
  Globe,
  Briefcase,
  Menu,
  X,
} from 'lucide-react';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { OriginButton } from '@/components/ui/origin-button';

interface TabProps {
  children: React.ReactNode;
  tab: number;
  handleSetSelected: (val: number | null) => void;
  selected: number | null;
}

export function ShiftingNavbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-4 z-50 mx-auto w-full max-w-5xl mb-4">
      <div className="flex items-center justify-between rounded-2xl border border-zinc-200/80 dark:border-[#222533] bg-white/80 dark:bg-[#13141C]/85 px-4 py-2.5 backdrop-blur-xl shadow-lg shadow-black/5 dark:shadow-purple-950/10 transition-colors duration-250">
        
        {/* Left: Mini Brand Status */}
        <Link href="#home" className="flex items-center gap-3 group">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl overflow-hidden shadow-md shadow-purple-900/20 bg-[#0B0C10] border border-zinc-800 shrink-0">
            <img 
              src="/logo.png" 
              alt="Habib Shaikh Logo" 
              className="w-full h-full object-contain scale-110" 
            />
          </div>
          <div className="hidden sm:flex flex-col">
            <span className="text-xs font-bold text-zinc-900 dark:text-zinc-100 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
              Habib Shaikh
            </span>
            <span className="flex items-center gap-1.5 text-[10px] text-zinc-500 dark:text-zinc-400">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Available for work
            </span>
          </div>
        </Link>

        {/* Center: Dynamic Shifting Navigation Tabs */}
        <div className="hidden md:flex">
          <Tabs />
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          <ThemeToggle />
          <OriginButton
            href="#contact"
            size="sm"
            className="hidden sm:inline-flex h-9 px-3.5 text-xs gap-1.5 shadow-sm hover:shadow-[0_0_20px_rgba(124,58,237,0.35)]"
          >
            <span>Let&apos;s Talk</span>
            <ArrowRight size={14} />
          </OriginButton>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-xl bg-zinc-100 dark:bg-[#1A1C26] border border-zinc-200 dark:border-[#222533] text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X size={16} /> : <Menu size={16} />}
          </button>
        </div>

      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.16 }}
            className="md:hidden mt-2 rounded-2xl border border-zinc-200 dark:border-[#222533] bg-white/95 dark:bg-[#13141C]/95 p-4 shadow-xl backdrop-blur-2xl"
          >
            <div className="flex flex-col gap-1.5">
              <a
                href="#home"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3.5 py-2 rounded-xl text-xs font-medium text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
              >
                Home
              </a>
              <a
                href="#projects"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3.5 py-2 rounded-xl text-xs font-medium text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors flex items-center justify-between"
              >
                <span>Demo Projects</span>
                <span className="text-[10px] text-purple-600 dark:text-purple-400 font-mono">2 Live</span>
              </a>
              <a
                href="#about"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3.5 py-2 rounded-xl text-xs font-medium text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
              >
                About Habib
              </a>
              <a
                href="#platforms"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3.5 py-2 rounded-xl text-xs font-medium text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors flex items-center justify-between"
              >
                <span>Platforms &amp; Remote</span>
                <span className="text-[10px] text-emerald-500 font-mono">Available</span>
              </a>
              <a
                href="#services"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3.5 py-2 rounded-xl text-xs font-medium text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
              >
                Services
              </a>
              <a
                href="#skills"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3.5 py-2 rounded-xl text-xs font-medium text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
              >
                Tools I Work With
              </a>
              <a
                href="#process"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3.5 py-2 rounded-xl text-xs font-medium text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
              >
                How I Work (Process)
              </a>
              <a
                href="#experience"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3.5 py-2 rounded-xl text-xs font-medium text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
              >
                Background &amp; Journey
              </a>
              <a
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3.5 py-2 rounded-xl text-xs font-medium text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
              >
                Contact
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

const Tabs = () => {
  const [selected, setSelected] = useState<number | null>(null);
  const [dir, setDir] = useState<'l' | 'r' | null>(null);

  const handleSetSelected = (val: number | null) => {
    if (typeof selected === 'number' && typeof val === 'number') {
      setDir(selected > val ? 'r' : 'l');
    } else if (val === null) {
      setDir(null);
    }
    setSelected(val);
  };

  return (
    <nav
      onMouseLeave={() => handleSetSelected(null)}
      className="relative flex items-center gap-1"
    >
      <a
        href="#home"
        className="rounded-full px-3 py-1.5 text-xs font-medium text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
      >
        Home
      </a>

      {TABS.map((t) => (
        <Tab
          key={t.id}
          selected={selected}
          handleSetSelected={handleSetSelected}
          tab={t.id}
        >
          {t.title}
        </Tab>
      ))}

      <a
        href="#contact"
        className="rounded-full px-3 py-1.5 text-xs font-medium text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
      >
        Contact
      </a>

      <AnimatePresence>
        {selected !== null && <Content dir={dir} selected={selected} />}
      </AnimatePresence>
    </nav>
  );
};

const Tab = ({ children, tab, handleSetSelected, selected }: TabProps) => {
  const isSelected = selected === tab;
  return (
    <button
      id={`shift-tab-${tab}`}
      onMouseEnter={() => handleSetSelected(tab)}
      onClick={() => handleSetSelected(tab)}
      className={`flex items-center gap-1 rounded-full px-3 py-1.5 text-xs font-medium transition-all cursor-pointer ${
        isSelected
          ? 'bg-zinc-100 dark:bg-zinc-800 text-purple-600 dark:text-purple-400'
          : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100'
      }`}
    >
      <span>{children}</span>
      <ChevronDown
        size={14}
        className={`transition-transform duration-200 ${
          isSelected ? 'rotate-180 text-purple-500' : ''
        }`}
      />
    </button>
  );
};

const Content = ({ selected, dir }: { selected: number; dir: 'l' | 'r' | null }) => {
  return (
    <motion.div
      id="overlay-content"
      initial={{ opacity: 0, y: 8, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 8, scale: 0.98 }}
      transition={{ duration: 0.18, ease: 'easeOut' }}
      className="absolute left-1/2 -translate-x-1/2 top-[calc(100%_+_14px)] w-[420px] rounded-2xl border border-zinc-200 dark:border-[#222533] bg-white/95 dark:bg-[#13141C]/95 p-4 shadow-2xl backdrop-blur-2xl text-zinc-900 dark:text-zinc-100"
    >
      <div className="absolute -top-[14px] left-0 right-0 h-[14px]" />
      <Nub selected={selected} />

      {TABS.map((t) => {
        return (
          <div className="overflow-hidden" key={t.id}>
            {selected === t.id && (
              <motion.div
                initial={{
                  opacity: 0,
                  x: dir === 'l' ? 40 : dir === 'r' ? -40 : 0,
                }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.2, ease: 'easeInOut' }}
              >
                <t.Component />
              </motion.div>
            )}
          </div>
        );
      })}
    </motion.div>
  );
};

const Nub = ({ selected }: { selected: number }) => {
  const [left, setLeft] = useState(0);

  useEffect(() => {
    if (selected !== null) {
      const hoveredTab = document.getElementById(`shift-tab-${selected}`);
      const overlayContent = document.getElementById('overlay-content');

      if (!hoveredTab || !overlayContent) return;

      const tabRect = hoveredTab.getBoundingClientRect();
      const contentRect = overlayContent.getBoundingClientRect();
      const tabCenter = tabRect.left + tabRect.width / 2 - contentRect.left;

      setLeft(tabCenter);
    }
  }, [selected]);

  return (
    <motion.span
      style={{ clipPath: 'polygon(0 0, 100% 0, 50% 50%, 0% 100%)' }}
      animate={{ left }}
      transition={{ duration: 0.2, ease: 'easeInOut' }}
      className="absolute top-0 h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 rotate-45 border-t border-l border-zinc-200 dark:border-[#222533] bg-white dark:bg-[#13141C]"
    />
  );
};

/* --- TAB 1: Real Projects View --- */
const ProjectsTab = () => {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between pb-1 border-b border-zinc-100 dark:border-zinc-800">
        <span className="text-[11px] font-semibold uppercase tracking-wider text-zinc-400">Demo Projects</span>
        <a href="#projects" className="text-[11px] font-medium text-purple-600 dark:text-purple-400 hover:underline">
          View all
        </a>
      </div>

      <div className="grid grid-cols-1 gap-2">
        <a
          href="https://nike-three-topaz.vercel.app/#"
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-start gap-3 rounded-xl p-2.5 transition-colors hover:bg-zinc-100/70 dark:hover:bg-zinc-800/60"
        >
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-purple-500/10 text-purple-600 dark:text-purple-400 group-hover:scale-105 transition-transform">
            <Globe size={18} />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-1.5 font-medium text-xs">
              <span>Nike E-Commerce Platform</span>
              <ExternalLink size={12} className="opacity-0 group-hover:opacity-100 transition-opacity text-purple-500" />
            </div>
            <p className="text-[11px] text-zinc-500 dark:text-zinc-400 line-clamp-1">
              Modern footwear storefront concept with cart flow.
            </p>
          </div>
        </a>

        <a
          href="https://gaming-website1-flame.vercel.app/#"
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-start gap-3 rounded-xl p-2.5 transition-colors hover:bg-zinc-100/70 dark:hover:bg-zinc-800/60"
        >
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-pink-500/10 text-pink-500 group-hover:scale-105 transition-transform">
            <Sparkles size={18} />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-1.5 font-medium text-xs">
              <span>Cyber Gaming Showcase</span>
              <ExternalLink size={12} className="opacity-0 group-hover:opacity-100 transition-opacity text-pink-500" />
            </div>
            <p className="text-[11px] text-zinc-500 dark:text-zinc-400 line-clamp-1">
              Gaming portal concept with community &amp; smooth animations.
            </p>
          </div>
        </a>
      </div>
    </div>
  );
};

/* --- TAB 2: Tech Arsenal --- */
const ArsenalTab = () => {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between pb-1 border-b border-zinc-100 dark:border-zinc-800">
        <span className="text-[11px] font-semibold uppercase tracking-wider text-zinc-400">Tools I Work With</span>
        <span className="text-[10px] text-emerald-500 font-mono">Verified Stack</span>
      </div>

      <div className="grid grid-cols-2 gap-2 text-xs">
        <div className="flex items-center gap-2 p-2 rounded-lg bg-zinc-50 dark:bg-zinc-800/50">
          <Terminal size={15} className="text-purple-500" />
          <span className="font-medium text-[11px]">Next.js &amp; React</span>
        </div>
        <div className="flex items-center gap-2 p-2 rounded-lg bg-zinc-50 dark:bg-zinc-800/50">
          <Layers size={15} className="text-indigo-500" />
          <span className="font-medium text-[11px]">Tailwind CSS</span>
        </div>
        <div className="flex items-center gap-2 p-2 rounded-lg bg-zinc-50 dark:bg-zinc-800/50">
          <Code2 size={15} className="text-cyan-500" />
          <span className="font-medium text-[11px]">TypeScript</span>
        </div>
        <div className="flex items-center gap-2 p-2 rounded-lg bg-zinc-50 dark:bg-zinc-800/50">
          <Cpu size={15} className="text-emerald-500" />
          <span className="font-medium text-[11px]">Claude &amp; ChatGPT</span>
        </div>
      </div>
    </div>
  );
};

/* --- TAB 3: Services & Offerings --- */
const ServicesTab = () => {
  return (
    <div className="space-y-2">
      <a
        href="#services"
        className="block p-2 rounded-xl hover:bg-zinc-100 dark:hover:bg-zinc-800/60 transition-colors"
      >
        <div className="flex items-center gap-2 font-medium text-xs text-purple-600 dark:text-purple-400">
          <Globe size={14} />
          <span>Business &amp; Portfolio Websites</span>
        </div>
        <p className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-0.5">
          Custom, fast websites with dark/light themes and SEO.
        </p>
      </a>

      <a
        href="#services"
        className="block p-2 rounded-xl hover:bg-zinc-100 dark:hover:bg-zinc-800/60 transition-colors"
      >
        <div className="flex items-center gap-2 font-medium text-xs text-purple-600 dark:text-purple-400">
          <Code2 size={14} />
          <span>Full-Stack Web Apps &amp; Landing Pages</span>
        </div>
        <p className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-0.5">
          Dynamic Next.js apps with backend APIs and Framer Motion.
        </p>
      </a>
    </div>
  );
};

const TABS = [
  {
    id: 1,
    title: 'Projects',
    Component: ProjectsTab,
  },
  {
    id: 2,
    title: 'Arsenal',
    Component: ArsenalTab,
  },
  {
    id: 3,
    title: 'Services',
    Component: ServicesTab,
  },
];
