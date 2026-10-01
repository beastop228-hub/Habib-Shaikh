---
name: seo-schema
description: Directs implementation of structured data (JSON-LD), OpenGraph tags, and semantic search optimizations.
---

# SEO & Schema Implementation Skill

## Overview
Ensures optimal search discoverability, social sharing preview fidelity, and schema compliance for Habib Shaikh's portfolio.

## Implementation Guide

### 1. Metadata Configuration (`src/app/layout.tsx`)
Include standard OpenGraph and Twitter cards:
- Title: `Habib Shaikh | AI Web Builder & Digital Product Creator`
- Description: `Portfolio of Habib Shaikh — Building next-generation web platforms and digital experiences with AI workflows in Mumbai, India.`
- Canonical URL & OpenGraph image (`/avatar.png` or dedicated social preview card).

### 2. JSON-LD Structured Data
Embed structured data script in `layout.tsx` or `page.tsx`:
```json
{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Habib Shaikh",
  "jobTitle": "AI Web Builder & Digital Product Creator",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Mumbai",
    "addressRegion": "Maharashtra",
    "addressCountry": "India"
  },
  "knowsAbout": [
    "Full-Stack Web Development",
    "Next.js",
    "React",
    "Tailwind CSS",
    "Artificial Intelligence Integration",
    "Autonomous Agent Workflows"
  ]
}
```
