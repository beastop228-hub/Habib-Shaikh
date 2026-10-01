"use client";

import React from "react";
import { PORTFOLIO_DATA } from "@/data/portfolio-data";
import { SocialTooltip, SocialItem } from "@/components/ui/social-tooltip";

const socialLinks: SocialItem[] = [
  {
    href: "https://github.com/beastop228-hub",
    ariaLabel: "GitHub",
    tooltip: "beastop228-hub",
    svgUrl: "https://cdn.simpleicons.org/github/white", // White forced for hover fill
    color: "#181717" // Official GitHub Black
  },
  {
    href: "https://www.instagram.com/_shaikh_habib_?stkn=MW44MWExN2tlcTJvMg%3D%3D&utm_source=qr",
    ariaLabel: "Instagram",
    tooltip: "@_shaikh_habib_",
    svgUrl: "https://cdn.simpleicons.org/instagram/white",
    color: "#E4405F" // Official Instagram Pink/Red
  },
  {
    href: "mailto:habibshaikhbtw100@gmail.com",
    ariaLabel: "Email",
    tooltip: "habibshaikhbtw100@gmail.com",
    svgUrl: "https://cdn.simpleicons.org/gmail/white",
    color: "#EA4335" // Official Google/Gmail Red
  }
];

export function SocialLinks() {
  return (
    <div className="mt-auto pt-6 border-t border-zinc-200 dark:border-[#222533] w-full flex justify-center">
      <SocialTooltip items={socialLinks} />
    </div>
  );
}
