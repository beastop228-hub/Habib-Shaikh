import React from "react";
import { cn } from "@/lib/utils";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "violet" | "emerald" | "outline" | "mono";
  dot?: boolean;
  pulse?: boolean;
}

export function Badge({
  children,
  className,
  variant = "default",
  dot = false,
  pulse = false,
  ...props
}: BadgeProps) {
  const variantStyles = {
    default:
      "bg-zinc-100 dark:bg-[#1A1C26] text-zinc-700 dark:text-[#9CA3AF] border-zinc-200 dark:border-[#222533]",
    violet:
      "bg-purple-50 dark:bg-[#7C3AED]/10 text-purple-700 dark:text-[#C4B5FD] border-purple-200 dark:border-[#7C3AED]/30 shadow-[0_0_12px_rgba(124,58,237,0.15)]",
    emerald:
      "bg-emerald-50 dark:bg-[#10B981]/10 text-emerald-700 dark:text-[#6EE7B7] border-emerald-200 dark:border-[#10B981]/30 shadow-[0_0_12px_rgba(16,185,129,0.15)]",
    outline:
      "bg-transparent text-zinc-600 dark:text-[#9CA3AF] border-zinc-200 dark:border-[#222533]",
    mono:
      "font-mono text-xs bg-zinc-100 dark:bg-[#13141C] text-purple-700 dark:text-[#C4B5FD] border-zinc-200 dark:border-[#222533]",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border transition-colors duration-250",
        variantStyles[variant],
        className
      )}
      {...props}
    >
      {dot && (
        <span
          className={cn(
            "w-2 h-2 rounded-full",
            variant === "emerald"
              ? "bg-[#10B981]"
              : variant === "violet"
              ? "bg-[#7C3AED] dark:bg-[#A855F7]"
              : "bg-zinc-400 dark:bg-gray-400",
            pulse && "status-dot-pulse"
          )}
        />
      )}
      {children}
    </span>
  );
}
