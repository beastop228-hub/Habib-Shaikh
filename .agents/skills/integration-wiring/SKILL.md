---
name: integration-wiring
description: Guides the integration between data models, API route handlers, and dynamic UI components in the portfolio.
---

# Integration Wiring Skill

## Overview
This skill provides instructions for wiring dynamic functionality (such as the contact form, external links, and data updates) into the portfolio architecture.

## Patterns

### 1. Centralized Data Updates
When adding new projects or skills, update `src/data/portfolio-data.ts`. The UI components consume these typed objects automatically.

### 2. Contact API Wiring
1. Client form state in `src/components/sections/ContactForm.tsx`:
   - Submits JSON `{ name, email, subject, message }` to `/api/contact`.
   - Displays loading spinner, inline validation feedback, and success confirmation.
   - Falls back gracefully to `mailto:` trigger if API call fails or is unavailable.
2. Route handler in `src/app/api/contact/route.ts`:
   - Validates input format and length.
   - Forwards to email provider (if API key present) or logs safely in development.
