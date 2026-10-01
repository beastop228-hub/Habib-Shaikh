import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--bg-main)",
        surface: "var(--surface-card)",
        "surface-secondary": "var(--surface-subtle)",
        border: "var(--border-color)",
        "primary-accent": "var(--primary-accent)",
        "accent-glow": "var(--accent-glow)",
        "success-accent": "var(--success-accent)",
        "text-primary": "var(--text-primary)",
        "text-secondary": "var(--text-secondary)",
        "text-muted": "var(--text-muted)",
      },
      fontFamily: {
        headline: ["var(--font-jakarta)", "sans-serif"],
        body: ["var(--font-inter)", "sans-serif"],
        mono: ["var(--font-jetbrains)", "monospace"],
      },
      fontSize: {
        xs: ["12px", { lineHeight: "1.5" }],
        sm: ["14px", { lineHeight: "1.5" }],
        base: ["16px", { lineHeight: "1.6" }],
        lg: ["18px", { lineHeight: "1.6" }],
        xl: ["20px", { lineHeight: "1.5" }],
        "2xl": ["24px", { lineHeight: "1.4" }],
        "3xl": ["32px", { lineHeight: "1.25" }],
        "4xl": ["44px", { lineHeight: "1.15" }],
        "5xl": ["56px", { lineHeight: "1.1" }],
      },
      boxShadow: {
        "glow-violet":
          "0 0 25px -5px rgba(168, 85, 247, 0.4), 0 0 10px -2px rgba(124, 58, 237, 0.3)",
        "glow-emerald":
          "0 0 25px -5px rgba(16, 185, 129, 0.4), 0 0 10px -2px rgba(16, 185, 129, 0.3)",
        "border-glow": "0 0 15px rgba(124, 58, 237, 0.35)",
        "card-hover":
          "0 12px 30px -10px rgba(0, 0, 0, 0.6), 0 0 20px -5px rgba(168, 85, 247, 0.25)",
      },
    },
  },
  plugins: [],
};

export default config;
