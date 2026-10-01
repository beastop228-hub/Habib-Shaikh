export interface ProjectItem {
  title: string;
  subtitle: string;
  description: string;
  tags: string[];
  liveUrl: string;
  githubUrl?: string;
  badge: string;
  category: string;
  image?: string;
  featured?: boolean;
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  icon: string;
  deliverables: string[];
}

export interface ExperienceRecord {
  id: string;
  period: string;
  role: string;
  company: string;
  location: string;
  badge?: string;
  description: string;
  highlights: string[];
}

export interface ToolGroup {
  category: string;
  icon: string;
  description: string;
  tools: string[];
}

export interface ProcessStep {
  step: string;
  title: string;
  description: string;
  details: string;
}

export const PORTFOLIO_CONTENT = {
  site: {
    name: "Habib Shaikh",
    title: "AI-Assisted Web Developer",
    badge: "Building Modern Websites with AI",
    location: "Mumbai, Maharashtra, India",
    email: "habibshaikhbtw100@gmail.com",
    availability: "Available for Freelance & Open to Work",
    sidebarBio:
      "I build fast, modern, full-stack websites using AI-assisted development. Based in Mumbai, working with clients everywhere.",
    avatar: "/avatar.png",
    github: "https://github.com/habibshaikh",
    linkedin: "https://linkedin.com/in/habib-shaikh",
    twitter: "https://twitter.com/habibshaikh_dev",
    timezone: "Asia/Kolkata",
  },

  hero: {
    badge: "Building Modern Websites with AI",
    headline: "Fast, modern websites for businesses and creators, built with AI.",
    subheadline:
      "I'm Habib, an AI-assisted web developer in Mumbai. I design and build complete websites, front end and back end, delivered clean, responsive and on time.",
    primaryCta: {
      label: "Let's Talk",
      href: "#contact",
    },
    secondaryCta: {
      label: "See My Work",
      href: "#projects",
    },
    activeStack: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Framer Motion",
    ],
    valueHighlights: [
      {
        title: "Full-Stack Delivery",
        desc: "Front end, back end & databases",
      },
      {
        title: "AI-Powered Velocity",
        desc: "Rapid delivery without cutting corners",
      },
      {
        title: "100% Direct Contact",
        desc: "Direct communication with the developer",
      },
    ],
  },

  projects: {
    eyebrow: "SELECTED WORK",
    title: "Demo Projects",
    intro:
      "Two concept builds I created to show what I can deliver. They are demos, not client work.",
    items: [
      {
        title: "Nike E-Commerce Platform",
        subtitle: "Modern footwear storefront concept",
        description:
          "A concept storefront with product displays, a cart flow and a responsive shopping layout.",
        tags: ["Next.js", "React", "Tailwind CSS", "TypeScript"],
        liveUrl: "https://nike-three-topaz.vercel.app/#",
        badge: "Concept Build",
        category: "Web Apps",
        image: "/projects/nike-ecommerce.jpg",
        featured: true,
      },
      {
        title: "Cyber Gaming Showcase",
        subtitle: "Gaming portal concept",
        description:
          "A gaming hub concept with a game catalog, community sections and smooth animations.",
        tags: ["Next.js", "Tailwind CSS", "Framer Motion"],
        liveUrl: "https://gaming-website1-flame.vercel.app/#",
        badge: "Concept Build",
        category: "Web Apps",
        image: "/projects/cyber-gaming.jpg",
        featured: true,
      },
    ] as ProjectItem[],
  },

  about: {
    eyebrow: "ABOUT ME",
    title: "About Habib",
    lead: "I build complete websites using AI, and I focus on results you can see and use.",
    paragraphs: [
      "I'm an independent developer based in Mumbai, India. I specialize in building complete websites by combining modern web frameworks like Next.js and React with cutting-edge AI development tools. This workflow allows me to build and iterate at high speed without cutting corners on design or code quality.",
      "Rather than getting lost in abstract tech jargon, I focus on deliverables that create tangible value for your business or brand: fast loading speeds, seamless mobile responsiveness, clean UI ergonomics, and intuitive user experiences that convert visitors into customers.",
      "When you work with me, you communicate directly with the person writing your code. No agency overhead, no account managers, and no miscommunication—just transparent progress, clear pricing, and reliable delivery.",
    ],
    values: [
      {
        title: "Fast Delivery",
        desc: "Rapid turnaround from concept to production by leveraging modern AI-assisted engineering pipelines.",
      },
      {
        title: "AI-Powered Workflow",
        desc: "Deep expertise with LLM tools, prompt systems, and generative workflows for superior development velocity.",
      },
      {
        title: "Clean, Modern Design",
        desc: "Tactile micro-interactions, responsive ergonomics, and polished dark & light mode styling.",
      },
    ],
  },

  services: {
    eyebrow: "SERVICES",
    title: "How We Can Work Together",
    intro: "Websites for businesses, creators and small teams.",
    offerings: [
      {
        id: "business-websites",
        title: "Business & Portfolio Websites",
        description:
          "Custom, high-performing websites to establish your digital presence and showcase your brand authority.",
        icon: "Globe",
        deliverables: [
          "Responsive modern layouts",
          "Dark & light mode themes",
          "Contact & lead capture forms",
          "SEO & performance optimization",
        ],
      },
      {
        id: "landing-pages",
        title: "Landing Pages",
        description:
          "High-converting single-page experiences built to launch products, capture leads, or validate ideas fast.",
        icon: "Sparkles",
        deliverables: [
          "Conversion-focused copy structure",
          "Smooth Framer Motion animations",
          "Fast loading speeds",
          "Mobile-first responsive UI",
        ],
      },
      {
        id: "web-apps",
        title: "Full-Stack Web Apps",
        description:
          "Dynamic web applications with interactive state, backend APIs, and modern database architectures.",
        icon: "Code",
        deliverables: [
          "Next.js App Router & Server Components",
          "Type-safe API endpoints",
          "Database & authentication wiring",
          "Production deployment on Vercel",
        ],
      },
      {
        id: "ai-prompt-systems",
        title: "Custom AI Prompt Systems",
        description:
          "Structured prompt architectures and generative workflows tailored for your business needs.",
        icon: "Cpu",
        deliverables: [
          "Structured XML & markdown prompts",
          "Tool-calling workflow design",
          "Content automation pipelines",
          "Practical AI integration guidance",
        ],
      },
    ] as ServiceItem[],
  },

  tools: {
    eyebrow: "TOOLS",
    title: "Tools I Work With",
    intro:
      "A modern, focused toolkit optimized for fast builds and dependable code quality.",
    groups: [
      {
        category: "Website Building",
        icon: "Code",
        description:
          "Core web stack for fast, responsive, and type-safe frontends.",
        tools: [
          "Next.js",
          "React",
          "TypeScript",
          "Tailwind CSS",
          "Framer Motion",
        ],
      },
      {
        category: "AI Tools",
        icon: "Sparkles",
        description:
          "Intelligent systems used to speed up planning, scaffolding, and testing.",
        tools: [
          "Claude",
          "ChatGPT",
          "Prompt engineering",
          "Structured XML prompts",
        ],
      },
      {
        category: "Workflow & Cloud",
        icon: "Terminal",
        description:
          "Modern DevOps and deployment tools ensuring seamless shipping.",
        tools: [
          "Git & GitHub",
          "Vercel deployment",
          "Responsive testing",
          "Turbopack",
        ],
      },
    ] as ToolGroup[],
  },

  process: {
    eyebrow: "PROCESS",
    title: "How I Work",
    intro: "A simple, transparent 4-step workflow from first chat to live launch.",
    steps: [
      {
        step: "01",
        title: "Brief",
        description:
          "We discuss your goals, target audience, content requirements, and project timeline.",
        details: "Clear requirements and fixed quote with zero hidden fees.",
      },
      {
        step: "02",
        title: "Design",
        description:
          "I craft clean, responsive UI layouts and tactile interactions tailored to your brand.",
        details: "Interactive previews and rapid feedback loops before coding.",
      },
      {
        step: "03",
        title: "Build",
        description:
          "I engineer the full website with Next.js, TypeScript, and AI-accelerated workflows.",
        details: "Clean, production-grade code with 100% type safety.",
      },
      {
        step: "04",
        title: "Launch",
        description:
          "We test across devices, optimize performance and SEO, and deploy live to production.",
        details: "Seamless Vercel deployment and post-launch verification.",
      },
    ] as ProcessStep[],
  },

  experience: {
    eyebrow: "EXPERIENCE",
    title: "Background & Journey",
    items: [
      {
        id: "exp-1",
        period: "2024 — Present",
        role: "Independent Web Builder",
        company: "Habib Studio",
        location: "Mumbai, India",
        badge: "Current",
        description:
          "Designing and building complete web platforms for businesses and creators using AI-assisted development.",
        highlights: [
          "End-to-end frontend and backend delivery with Next.js, React, and Tailwind CSS.",
          "Accelerated turnaround using AI tools and prompt systems.",
          "Direct client collaboration from initial brief to live production.",
        ],
      },
      {
        id: "exp-2",
        period: "About 2 years",
        role: "AI Tools & Prompt Engineering",
        company: "Self-directed",
        location: "Mumbai, India",
        badge: "Specialization",
        description:
          "Continuous research and deep practical experimentation with LLM prompt systems, autonomous agent workflows, and AI coding assistants.",
        highlights: [
          "Developed structured XML prompting architectures for rapid code scaffolding.",
          "Benchmarked and integrated state-of-the-art AI development tools.",
          "Engineered repeatable workflows for production-quality web development.",
        ],
      },
    ] as ExperienceRecord[],
  },

  contact: {
    eyebrow: "CONTACT",
    title: "Let's build something great together.",
    description:
      "Have a website in mind? Tell me what you need and I'll reply within 24 hours with a clear plan and price.",
    email: "habibshaikhbtw100@gmail.com",
    info: {
      location: "Mumbai, Maharashtra, India (UTC+5:30)",
      turnaround: "Usually replies within 12–24 hours.",
      privacy:
        "Your details are used only to reply to your message. No spam, no sharing.",
    },
  },

  footer: {
    copyright: `© ${new Date().getFullYear()} Habib Shaikh. Made in Mumbai.`,
    note: "Crafted from Mumbai to the world.",
  },

  navigation: [
    { label: "Home", href: "#home", id: "home" },
    { label: "Projects", href: "#projects", id: "projects" },
    { label: "About", href: "#about", id: "about" },
    { label: "Platforms", href: "#platforms", id: "platforms" },
    { label: "Services", href: "#services", id: "services" },
    { label: "Tools", href: "#skills", id: "skills" },
    { label: "Process", href: "#process", id: "process" },
    { label: "Experience", href: "#experience", id: "experience" },
    { label: "Contact", href: "#contact", id: "contact" },
  ],
};

export const reviewsSection = {
  eyebrow: "SAMPLE REVIEWS (DEMO)",
  title: "Reviews Section Preview",
  note: "These are sample reviews written to show how this animated section will look. They are not from real clients. Real reviews will replace them as I complete projects.",
};

export const demoReviews = [
  {
    name: "Sample Client A",
    role: "Founder, Example Company",
    text: "This is a sample review that shows how a client's feedback will appear here, including line breaks and spacing.",
  },
  {
    name: "Sample Client B",
    role: "Marketing Lead, Example Studio",
    text: "Another placeholder review, used only to demonstrate the layout and animation of this section.",
  },
  {
    name: "Sample Client C",
    role: "Owner, Example Store",
    text: "A third sample entry. Replace this with a real testimonial once you have one.",
  },
  {
    name: "Sample Client D",
    role: "Product Manager, Example App",
    text: "Placeholder text for demonstration purposes only.",
  },
];

