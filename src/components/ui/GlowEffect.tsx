import React from "react";
import { cn } from "@/lib/utils";

interface GlowEffectProps {
  className?: string;
}

export function GlowEffect({ className }: GlowEffectProps) {
  return (
    <div
      className={cn(
        "pointer-events-none fixed inset-0 -z-10 overflow-hidden",
        className
      )}
      aria-hidden="true"
    >
      {/* Top Left Deep Violet Orb */}
      <div className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full bg-[#7C3AED]/06 dark:bg-[#7C3AED]/12 blur-[140px] animate-pulse duration-[8000ms]" />

      {/* Center Right Ambient Glow */}
      <div className="absolute top-[35%] -right-40 w-[550px] h-[550px] rounded-full bg-[#A855F7]/05 dark:bg-[#A855F7]/10 blur-[150px]" />

      {/* Bottom Emerald Subtle Tint */}
      <div className="absolute -bottom-40 left-[20%] w-[500px] h-[500px] rounded-full bg-[#10B981]/04 dark:bg-[#10B981]/08 blur-[160px]" />

      {/* Subtle Noise Texture Overlay */}
      <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.025] bg-[radial-gradient(#000_1px,transparent_1px)] dark:bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]" />
    </div>
  );
}
