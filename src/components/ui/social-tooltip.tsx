import React from "react";
import { cn } from "@/lib/utils";

export interface SocialItem {
  href: string;
  ariaLabel: string;
  tooltip: string;
  svgUrl: string;
  color: string;
}

export interface SocialTooltipProps extends React.HTMLAttributes<HTMLUListElement> {
  items: SocialItem[];
}

const SocialTooltip = React.forwardRef<HTMLUListElement, SocialTooltipProps>(
  ({ className, items, ...props }, ref) => {
    const baseIconStyles =
      "relative flex items-center justify-center w-11 h-11 rounded-full bg-zinc-100 dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700 overflow-hidden transition-all duration-300 ease-in-out group-hover:shadow-lg group-hover:border-transparent cursor-pointer";
    const baseSvgStyles =
      "relative z-10 w-5 h-5 transition-transform duration-300 ease-in-out group-hover:scale-110 opacity-70 group-hover:opacity-100 dark:invert"; 
    const baseFilledStyles =
      "absolute bottom-0 left-0 w-full h-0 transition-all duration-300 ease-in-out group-hover:h-full";
    const baseTooltipStyles =
      "absolute bottom-[-40px] left-1/2 transform -translate-x-1/2 px-3 py-1.5 text-[11px] font-medium text-white whitespace-nowrap rounded-md opacity-0 invisible transition-all duration-300 ease-in-out group-hover:opacity-100 group-hover:visible group-hover:bottom-[-48px] z-50 shadow-xl pointer-events-none";

    return (
      <ul
        ref={ref}
        className={cn("flex items-center justify-center gap-4", className)}
        {...props}
      >
        {items.map((item, index) => (
          <li key={index} className="relative group flex justify-center">
            <button
              onClick={() => window.open(item.href, item.href.startsWith('mailto:') ? '_self' : '_blank')}
              aria-label={item.ariaLabel}
              className={cn(baseIconStyles)}
            >
              <div
                className={cn(baseFilledStyles)}
                style={{ backgroundColor: item.color }}
              />
              <img
                src={item.svgUrl}
                alt={item.ariaLabel}
                className={cn(baseSvgStyles)}
                style={item.color !== '' ? { filter: 'brightness(0) invert(1)' } : {}}
              />
            </button>
            <div
              className={cn(baseTooltipStyles)}
              style={{ backgroundColor: item.color }}
            >
              {item.tooltip}
            </div>
          </li>
        ))}
      </ul>
    );
  },
);

SocialTooltip.displayName = "SocialTooltip";

export { SocialTooltip };
export default SocialTooltip;
