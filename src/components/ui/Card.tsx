import React from "react";
import { cn } from "@/lib/utils";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  glow?: boolean;
  interactive?: boolean;
}

export function Card({
  children,
  className,
  glow = false,
  interactive = false,
  ...props
}: CardProps) {
  return (
    <div
      className={cn(
        "rounded-2xl bg-white dark:bg-[#13141C] backdrop-blur-md border border-zinc-200 dark:border-[#222533] p-6 relative overflow-hidden shadow-xs transition-colors duration-250",
        interactive &&
          "transition-all duration-300 hover:border-purple-300 dark:hover:border-[#7C3AED]/40 hover:-translate-y-1 hover:shadow-md dark:hover:shadow-[0_12px_30px_-10px_rgba(0,0,0,0.6),0_0_20px_-5px_rgba(124,58,237,0.2)]",
        glow &&
          "before:absolute before:inset-0 before:bg-radial-[circle_at_top,_rgba(124,58,237,0.08),_transparent_70%] before:pointer-events-none",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardHeader({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("flex flex-col gap-1.5 mb-4", className)} {...props}>
      {children}
    </div>
  );
}

export function CardTitle({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3
      className={cn(
        "font-semibold text-lg text-zinc-900 dark:text-[#F9FAFB] tracking-tight font-[family-name:var(--font-jakarta)]",
        className
      )}
      {...props}
    >
      {children}
    </h3>
  );
}

export function CardDescription({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p className={cn("text-sm text-zinc-600 dark:text-[#9CA3AF] leading-relaxed", className)} {...props}>
      {children}
    </p>
  );
}

export function CardContent({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("space-y-4", className)} {...props}>
      {children}
    </div>
  );
}
