import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Inter, JetBrains_Mono, Geist } from "next/font/google";
import "./globals.css";
import { PORTFOLIO_DATA } from "@/data/portfolio-data";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import ConstellationGrid from "@/components/ui/constellation-grid";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-jakarta",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://habibshaikh.dev"),
  title: "Habib Shaikh | AI-Assisted Web Developer",
  description:
    "I build fast, modern, full-stack websites using AI-assisted development. Based in Mumbai.",
  keywords: [
    "Habib Shaikh",
    "AI-Assisted Web Developer",
    "Web Developer Mumbai",
    "Next.js Developer",
    "React Developer",
    "TypeScript",
    "Tailwind CSS",
    "AI Websites",
  ],
  authors: [{ name: "Habib Shaikh", url: "https://habibshaikh.dev" }],
  creator: "Habib Shaikh",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://habibshaikh.dev",
    title: "Habib Shaikh | AI-Assisted Web Developer",
    description:
      "I build fast, modern, full-stack websites using AI-assisted development. Based in Mumbai.",
    siteName: "Habib Shaikh Portfolio",
    images: [
      {
        url: "/avatar.png",
        width: 1200,
        height: 630,
        alt: "Habib Shaikh — AI-Assisted Web Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Habib Shaikh | AI-Assisted Web Developer",
    description:
      "I build fast, modern, full-stack websites using AI-assisted development. Based in Mumbai.",
    images: ["/avatar.png"],
    creator: "@habibshaikh_dev",
  },
  icons: {
    icon: "/icon.png",
    apple: "/icon.png",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": "https://habibshaikh.dev/#person",
      name: PORTFOLIO_DATA.profile.name,
      jobTitle: PORTFOLIO_DATA.profile.role,
      url: "https://habibshaikh.dev",
      image: "https://habibshaikh.dev/avatar.png",
      description: PORTFOLIO_DATA.profile.bio,
      address: {
        "@type": "PostalAddress",
        addressLocality: "Mumbai",
        addressRegion: "Maharashtra",
        addressCountry: "India",
      },
      sameAs: [
        PORTFOLIO_DATA.profile.github,
        PORTFOLIO_DATA.profile.linkedin,
        PORTFOLIO_DATA.profile.twitter,
      ],
      knowsAbout: [
        "Full-Stack Web Development",
        "Next.js App Router",
        "React",
        "TypeScript",
        "Tailwind CSS",
        "Autonomous AI Agents",
        "LLM System Design",
        "Web Performance Optimization",
      ],
    },
    {
      "@type": "WebSite",
      "@id": "https://habibshaikh.dev/#website",
      url: "https://habibshaikh.dev",
      name: "Habib Shaikh Portfolio",
      publisher: {
        "@id": "https://habibshaikh.dev/#person",
      },
      inLanguage: "en-US",
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn("scroll-smooth", "dark", jakarta.variable, inter.variable, jetbrains.variable, "font-sans", geist.variable)}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                const theme = localStorage.getItem('theme') || localStorage.getItem('portfolio_theme');
                if (theme === 'light') {
                  document.documentElement.classList.remove('dark');
                } else {
                  document.documentElement.classList.add('dark');
                }
              } catch (_) {}
            `,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="relative min-h-screen bg-[var(--bg-main)] text-[var(--text-primary)] antialiased selection:bg-[#7C3AED]/40 selection:text-white transition-colors duration-250 [isolation:isolate]">
        <ThemeProvider>
          {/* Global Animated Constellation Background Layer */}
          <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden">
            <ConstellationGrid />
          </div>
          <main className="relative z-10">
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
