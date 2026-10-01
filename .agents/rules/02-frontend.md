# Frontend & UX Guidelines

## 1. Design System & Aesthetics
- **Theme**: Cyberpunk Bento Dark / Minimal Studio.
- **Palette**:
  - Background: `#0B0C10`
  - Surface Card: `#13141C`
  - Surface Secondary: `#1A1C26`
  - Borders: `#222533`
  - Primary Accent: `#7C3AED` (Violet)
  - Accent Glow: `#A855F7`
  - Success Accent: `#10B981` (Emerald)
  - Text Primary: `#F9FAFB`
  - Text Secondary: `#9CA3AF`
  - Text Muted: `#6B7280`

## 2. Layout & Responsive Behavior
- **Desktop (>1024px)**: Two-column split layout:
  - Sticky identity sidebar (left, ~320px/w-80) containing profile, live status badge, quick contact button, navigation pills, and social links.
  - Scrollable showcase feed (right, flex-1) with dynamic bento grid cards, smooth scroll anchor targets, and deep-space atmospheric glow.
- **Mobile (<1024px)**: Elegant single-column stacked layout with top profile card and collapsible/streamlined navigation.

## 3. Micro-Interactions & Visual Polish
- Subtle 1px borders with border glow on hover (`hover:border-violet-500/50`).
- Frosted glass cards (`backdrop-blur-md bg-[#13141C]/80`).
- Pulsing emerald live status dot for availability indicator.
- Smooth transition timings (`transition-all duration-300 ease-out`).
- Focus rings for accessibility (`focus-visible:ring-2 focus-visible:ring-violet-500`).
