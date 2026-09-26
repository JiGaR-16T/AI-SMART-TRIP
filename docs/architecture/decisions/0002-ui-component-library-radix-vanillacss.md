# ADR 0002: UI Component Architecture — Radix UI Primitives with Vanilla CSS Tokens

## Status
Accepted

## Context
TravelMind requires a high-performance, accessible ("Intelligent + Adventurous") travel-tech design system supporting:
- Strict accessibility compliance (WCAG 2.1 AA keyboard navigation, screen reader support, focus rings, ARIA attributes).
- Dual theme support (Light and Dark) with zero layout shift or flashing on initial page load.
- Seamless responsiveness from mobile viewports (360px) to desktops (1280px+).
- Complex overlay primitives: Modals, Drawers (used for "Why recommended?"), Popovers, Tooltips, Selects, and Tabs.
- Fast execution with low bundle size, without locking the application into a heavy, rigid UI framework.

## Decision
We decided to adopt a hybrid headless approach:
1. **Headless Primitives**: Use `@radix-ui/react-*` for complex behaviorally intensive components (Dialog, Drawer/Sheet, Select, Popover, Tooltip, Tabs, Accordion, Slider, Switch, RadioGroup, Checkbox).
2. **Vanilla CSS Design Tokens**: Maintain all styling in CSS custom properties (`index.css`), defining complete 10-step scales for Primary (Deep Ocean/Indigo), Accent (Warm Sunrise/Saffron), Success (Mint), Danger (Coral), and Neutral (Slate).
3. **Zustand for State**: Use lightweight Zustand stores for theme selection (`themeStore.ts`) and transient alerts (`toastStore.ts`).
4. **Icons**: Use `lucide-react` for clean, consistent geometric icons.

## Consequences

### Positive
- **Guaranteed Accessibility**: Radix UI handles focus management, ARIA roles, portaling, and keyboard escape handling out of the box without boilerplate.
- **Maximum Styling Freedom**: Zero CSS specificity conflicts. CSS variables allow instantaneous light/dark theme switching without re-rendering components.
- **Micro Bundle Footprint**: Gzip size for individual pages stays under 5–15 kB with clean route-level code splitting via `React.lazy`.
- **Maintainability**: Clear separation between headless behavioral logic and visual styling tokens.

### Negative / Trade-offs
- Headless components require initial CSS styling setup (which has now been fully built into `index.css`).
- jsdom tests require standard polyfills/mocks for `window.matchMedia` and `ResizeObserver` (configured in `src/test/setup.ts`).
