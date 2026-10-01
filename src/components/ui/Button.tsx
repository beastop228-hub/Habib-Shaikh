import React from "react";
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

export const buttonVariants = cva(
  "inline-flex shrink-0 items-center justify-center font-medium rounded-xl transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:pointer-events-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7C3AED] select-none",
  {
    variants: {
      variant: {
        default:
          "bg-[#7C3AED] hover:bg-[#6D28D9] text-white shadow-[0_0_20px_rgba(124,58,237,0.35)] hover:shadow-[0_0_30px_rgba(124,58,237,0.55)] border border-[#A855F7]/30 active:scale-[0.98]",
        primary:
          "bg-[#7C3AED] hover:bg-[#6D28D9] text-white shadow-[0_0_20px_rgba(124,58,237,0.35)] hover:shadow-[0_0_30px_rgba(124,58,237,0.55)] border border-[#A855F7]/30 active:scale-[0.98]",
        secondary:
          "bg-zinc-100 hover:bg-zinc-200 dark:bg-[#1A1C26] dark:hover:bg-[#222533] text-zinc-800 dark:text-[#F9FAFB] border border-zinc-200 dark:border-[#222533] hover:border-zinc-300 dark:hover:border-[#3B3F58] active:scale-[0.98]",
        outline:
          "bg-transparent hover:bg-zinc-100 dark:hover:bg-[#13141C] text-zinc-800 dark:text-[#F9FAFB] border border-zinc-200 dark:border-[#222533] hover:border-[#7C3AED]/50 active:scale-[0.98]",
        ghost:
          "bg-transparent hover:bg-zinc-100 dark:hover:bg-[#1A1C26] text-zinc-600 dark:text-[#9CA3AF] hover:text-zinc-900 dark:hover:text-[#F9FAFB] active:scale-[0.98]",
        glass:
          "bg-white/80 dark:bg-[#13141C]/80 hover:bg-zinc-100 dark:hover:bg-[#1A1C26]/90 backdrop-blur-md text-zinc-900 dark:text-[#F9FAFB] border border-zinc-200 dark:border-[#222533] hover:border-[#7C3AED]/40 shadow-sm active:scale-[0.98]",
        destructive:
          "bg-red-500/10 text-red-600 hover:bg-red-500/20 border border-red-500/30 dark:bg-red-500/20 dark:hover:bg-red-500/30",
        link: "text-[#7C3AED] underline-offset-4 hover:underline",
      },
      size: {
        default: "px-5 py-2.5 text-sm gap-2",
        xs: "px-2.5 py-1 text-xs gap-1",
        sm: "px-3.5 py-1.5 text-xs gap-1.5",
        md: "px-5 py-2.5 text-sm gap-2",
        lg: "px-6 py-3.5 text-base gap-2.5",
        icon: "p-2.5 rounded-xl aspect-square",
        "icon-xs": "p-1.5 rounded-lg aspect-square",
        "icon-sm": "p-2 rounded-lg aspect-square",
        "icon-lg": "p-3 rounded-xl aspect-square",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
  VariantProps<typeof buttonVariants> {
  href?: string;
  target?: string;
  rel?: string;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      className,
      variant = "default",
      size = "default",
      href,
      target,
      rel,
      ...props
    },
    ref
  ) => {
    const combinedClassName = cn(buttonVariants({ variant, size, className }));

    if (href) {
      return (
        <a
          href={href}
          target={target}
          rel={rel}
          className={combinedClassName}
          onClick={props.onClick as any}
        >
          {children}
        </a>
      );
    }

    return (
      <button ref={ref} className={combinedClassName} {...props}>
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export { OriginButton } from "./origin-button";
export type { OriginButtonProps } from "./origin-button";
