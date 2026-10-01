"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { MapPin, Clock, ArrowRight, Sparkles } from "lucide-react";
import { PORTFOLIO_DATA } from "@/data/portfolio-data";
import { Badge } from "@/components/ui/Badge";
import { OriginButton } from "@/components/ui/origin-button";
import { NavigationPills } from "@/components/sidebar/NavigationPills";
import { SocialLinks } from "@/components/sidebar/SocialLinks";

export function ProfileCard() {
  const [mumbaiTime, setMumbaiTime] = useState<string>("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      };
      setMumbaiTime(new Intl.DateTimeFormat("en-US", options).format(now));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <aside
      className="w-full lg:w-80 shrink-0 lg:sticky lg:top-8 self-start flex flex-col gap-6"
      aria-label="Profile Sidebar"
    >
      <div className="glass-card rounded-2xl p-6 relative flex flex-col gap-5 border border-[#222533] shadow-[0_10px_40px_rgba(0,0,0,0.5)]">
        {/* Ambient Top Card Glow */}
        <div className="absolute top-0 right-0 w-36 h-36 bg-[#7C3AED]/10 rounded-full blur-2xl pointer-events-none" />

        {/* Avatar Container with 3D Claw Machine Character */}
        <div className="relative group w-full aspect-square max-w-[260px] mx-auto rounded-2xl overflow-hidden border border-[#222533] bg-[#1A1C26] shadow-lg">
          <Image
            src={PORTFOLIO_DATA.profile.avatar}
            alt="Habib Shaikh - 3D Claw Machine Character"
            fill
            sizes="(max-width: 1024px) 260px, 280px"
            priority
            className="object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B0C10]/80 via-transparent to-transparent pointer-events-none" />

          {/* Quick floating craft badge */}
          <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-between text-[11px] font-mono text-[#F9FAFB] bg-[#0B0C10]/80 backdrop-blur-md px-2.5 py-1 rounded-lg border border-[#222533]">
            <span className="flex items-center gap-1.5">
              <Sparkles className="w-3 h-3 text-[#A855F7]" />
              AI Web Developer
            </span>
            <span className="text-[#10B981] flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] status-dot-pulse" />
              Online
            </span>
          </div>
        </div>

        {/* Identity & Status */}
        <div className="flex flex-col gap-2">
          {/* Status Badge */}
          <Badge
            variant="emerald"
            dot
            pulse
            className="self-start text-[11px] py-1 px-3"
          >
            {PORTFOLIO_DATA.profile.status}
          </Badge>

          <h1 className="text-2xl font-bold tracking-tight text-[#F9FAFB] font-[family-name:var(--font-jakarta)] mt-1">
            {PORTFOLIO_DATA.profile.name}
          </h1>

          <p className="text-sm font-medium text-[#A855F7] tracking-tight">
            {PORTFOLIO_DATA.profile.role}
          </p>

          <div className="flex flex-col gap-1.5 text-xs text-[#9CA3AF] mt-2">
            <div className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-[#7C3AED]" />
              <span>{PORTFOLIO_DATA.profile.location}</span>
            </div>
            <div className="flex items-center gap-1.5 font-mono text-[11px] text-[#9CA3AF]">
              <Clock className="w-3.5 h-3.5 text-[#10B981]" />
              <span>
                {mumbaiTime ? `${mumbaiTime} IST` : "Mumbai, India"}
              </span>
            </div>
          </div>
        </div>

        {/* Primary Let's Talk CTA */}
        <OriginButton
          variant="primary"
          size="md"
          href="#contact"
          className="w-full justify-between group shadow-sm hover:shadow-[0_0_25px_rgba(124,58,237,0.35)]"
        >
          <span>Let&apos;s Talk Together</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </OriginButton>

        {/* Section Navigation Pills */}
        <NavigationPills />

        {/* Social Links & Mail Copy */}
        <SocialLinks />
      </div>
    </aside>
  );
}
