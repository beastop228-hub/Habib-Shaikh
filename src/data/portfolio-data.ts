import { PORTFOLIO_CONTENT } from "./portfolio-content";

export interface Project {
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

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  deliverables: string[];
}

export interface ExperienceItem {
  id: string;
  period: string;
  role: string;
  company: string;
  location: string;
  description: string;
  highlights: string[];
  badge?: string;
}

export interface SkillCategory {
  title: string;
  icon: string;
  skills: { name: string; level?: number; featured?: boolean }[];
  tools?: string[];
}

export interface SocialLink {
  label: string;
  href: string;
  icon: string;
}

export const projects: Project[] = PORTFOLIO_CONTENT.projects.items;

export const PORTFOLIO_DATA = {
  profile: {
    name: PORTFOLIO_CONTENT.site.name,
    role: PORTFOLIO_CONTENT.site.title,
    taglineRole: PORTFOLIO_CONTENT.site.title,
    location: PORTFOLIO_CONTENT.site.location,
    status: PORTFOLIO_CONTENT.site.availability,
    avatar: PORTFOLIO_CONTENT.site.avatar,
    email: PORTFOLIO_CONTENT.site.email,
    github: PORTFOLIO_CONTENT.site.github,
    linkedin: PORTFOLIO_CONTENT.site.linkedin,
    twitter: PORTFOLIO_CONTENT.site.twitter,
    timezone: PORTFOLIO_CONTENT.site.timezone,
    bio: PORTFOLIO_CONTENT.site.sidebarBio,
  },

  hero: {
    badge: PORTFOLIO_CONTENT.hero.badge,
    headline: PORTFOLIO_CONTENT.hero.headline,
    subheadline: PORTFOLIO_CONTENT.hero.subheadline,
    primaryCta: PORTFOLIO_CONTENT.hero.primaryCta,
    secondaryCta: PORTFOLIO_CONTENT.hero.secondaryCta,
    activeStack: PORTFOLIO_CONTENT.hero.activeStack,
    valueHighlights: PORTFOLIO_CONTENT.hero.valueHighlights,
  },

  navigation: PORTFOLIO_CONTENT.navigation,

  projects: PORTFOLIO_CONTENT.projects.items,

  about: {
    eyebrow: PORTFOLIO_CONTENT.about.eyebrow,
    title: PORTFOLIO_CONTENT.about.title,
    lead: PORTFOLIO_CONTENT.about.lead,
    paragraphs: PORTFOLIO_CONTENT.about.paragraphs,
    ethos: PORTFOLIO_CONTENT.about.values.map((v) => ({
      title: v.title,
      desc: v.desc,
    })),
  },

  services: PORTFOLIO_CONTENT.services.offerings as Service[],

  skills: PORTFOLIO_CONTENT.tools.groups.map((group) => ({
    title: group.category,
    icon: group.icon,
    description: group.description,
    tools: group.tools,
    skills: group.tools.map((t) => ({ name: t })),
  })),

  process: PORTFOLIO_CONTENT.process,

  experience: PORTFOLIO_CONTENT.experience.items as ExperienceItem[],

  contact: {
    eyebrow: PORTFOLIO_CONTENT.contact.eyebrow,
    headline: PORTFOLIO_CONTENT.contact.title,
    subheadline: PORTFOLIO_CONTENT.contact.description,
    email: PORTFOLIO_CONTENT.contact.email,
    location: PORTFOLIO_CONTENT.contact.info.location,
    status: PORTFOLIO_CONTENT.site.availability,
    responseTime: PORTFOLIO_CONTENT.contact.info.turnaround,
    privacy: PORTFOLIO_CONTENT.contact.info.privacy,
  },

  footer: PORTFOLIO_CONTENT.footer,

  reviews: {
    ...PORTFOLIO_CONTENT,
  },
};

export { PORTFOLIO_CONTENT, reviewsSection, demoReviews } from "./portfolio-content";

