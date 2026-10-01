# Data & State Management Rules

## 1. Static Configuration Architecture
- All content and metadata are defined in `src/data/portfolio-data.ts`.
- Data is strictly typed with TypeScript interfaces (`Project`, `Experience`, `Service`, `SkillCategory`, `Testimonial`, `SocialLink`).
- Zero external database dependencies required for baseline presentation, ensuring sub-second LCP and 100/100 performance scores.

## 2. Dynamic Integration Hooks
- Form submissions are routed through Next.js Route Handlers (`/api/contact`).
- Optional database or third-party email providers (e.g., Resend, Supabase, Neon) can be attached via environment variables without altering component presentation logic.
