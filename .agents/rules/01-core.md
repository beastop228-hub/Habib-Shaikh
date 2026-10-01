# Core Architecture & Engineering Rules

## 1. Principles
- **TypeScript First**: Strict type safety everywhere. No `any` types. Provide explicit interfaces for all data structures, props, and API payloads.
- **Component Modularity**: Single-responsibility components organized under `src/components/` by feature (`sidebar/`, `sections/`, `ui/`).
- **Data Centralization**: All portfolio text, projects, testimonials, and timeline items originate from typed data objects in `src/data/portfolio-data.ts`.
- **Next.js Conventions**: App Router conventions with Server Components by default. Use `'use client'` only when local interactivity (state, effects, event listeners) is required.

## 2. Directory Structure
```
src/
├── app/
│   ├── api/
│   │   └── contact/
│   │       └── route.ts
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── sections/
│   ├── sidebar/
│   └── ui/
├── data/
│   └── portfolio-data.ts
└── lib/
    └── utils.ts
```

## 3. Code Standards
- Import aliasing with `@/*`.
- Use `cn()` helper from `@/lib/utils` for conditional and merged Tailwind classes.
- Accessible semantic HTML tags: `<main>`, `<aside>`, `<section>`, `<nav>`, `<article>`.
