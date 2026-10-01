# Security & Compliance Rules

## 1. Input Sanitization & Validation
- All contact inputs (`name`, `email`, `subject`, `message`) must be strictly validated and sanitized.
- Max string lengths:
  - Name: 100 characters
  - Email: 150 characters
  - Subject: 150 characters
  - Message: 2000 characters
- Strip script tags, angle brackets, and non-printable characters before handling.

## 2. API Security & Secrets
- Never expose environment secrets or API keys to client-side bundles (do not prefix sensitive keys with `NEXT_PUBLIC_`).
- Implement basic rate-limiting considerations and graceful failure fallbacks on API routes.
- Include standard privacy / data collection notices on contact forms.
