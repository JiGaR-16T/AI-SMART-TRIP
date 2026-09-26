# TravelMind Frontend Design System

## Overview
The TravelMind frontend design system embodies an **"Intelligent + Adventurous"** aesthetic: spacious, calm, and editorial, built with accessible primitives, modern CSS variables, and distinctive travel-tech visual motifs.

---

## 1. Design Tokens

### Color Palette
Defined as CSS custom properties in `frontend/src/index.css`:
- **Primary (Deep Ocean / Indigo)**: `--color-primary-50` through `--color-primary-950` (Hero, active states, key CTAs).
- **Accent (Warm Sunrise / Saffron)**: `--color-accent-50` through `--color-accent-950` (Highlights, scores, ratings).
- **Success (Mint)**: `--color-success-50` through `--color-success-950` (Confirmed states, verified metrics, LIVE badges).
- **Danger (Coral)**: `--color-danger-50` through `--color-danger-950` (Errors, constraints, destructive actions).
- **Warning (Amber)**: `--color-warning-50` through `--color-warning-950` (CACHED data alerts, budget threshold notices).
- **Neutral (Slate Scale)**: `--color-neutral-0` to `--color-neutral-950`.

### Typography
- **Display Font**: `Plus Jakarta Sans`, tight letter spacing (`--tracking-tight: -0.025em`).
- **Body Font**: `Plus Jakarta Sans`, line heights (`--leading-normal: 1.5`, `--leading-relaxed: 1.625`).
- **Monospace Font**: `JetBrains Mono` for algorithmic formulas, durations, complex data, and `AlgorithmReceiptChip`.

### Elevation & Surfaces
- Layered box shadows (`--shadow-xs` through `--shadow-2xl`).
- Glassmorphic panels (`.glass-panel`) with `backdrop-filter: blur(12px)`.
- Card elevation on hover (`.surface-card-hover`).

---

## 2. Component Catalog (`src/components/ui/`)

| Component | Description | Key Props / Variants |
|-----------|-------------|----------------------|
| `Button` | Accessible button with focus rings & spinner | `variant: primary, secondary, outline, ghost, danger`, `size: sm, md, lg`, `isLoading` |
| `IconButton` | Icon-only button with mandatory `aria-label` | `variant`, `size`, `aria-label` |
| `Input` | Text input with labels, icons, error messages | `label`, `error`, `helperText`, `startIcon`, `endIcon` |
| `Textarea` | Multi-line text field | `label`, `error`, `rows`, `helperText` |
| `Select` | Dropdown selector with Radix portal | `options`, `value`, `onValueChange`, `placeholder` |
| `Combobox` | Searchable select with search filter | `options`, `value`, `onChange`, `placeholder` |
| `Checkbox` | Accessible checkbox with SVG checkmark | `checked`, `onCheckedChange`, `label` |
| `RadioGroup` | Accessible radio list with item descriptions | `options`, `value`, `onValueChange`, `orientation` |
| `Switch` | Smooth sliding toggle switch | `checked`, `onCheckedChange`, `label` |
| `Slider` | Continuous/stepped range slider | `min`, `max`, `step`, `value`, `formatValue` |
| `Chip` / `ChipGroup` | Filter chips with multi-select support | `options`, `selectedValues`, `onChange`, `multiSelect` |
| `Badge` | Colored status badge | `variant: neutral, primary, success, warning, danger, accent` |
| `TrustBadge` | Four-tier trust level indicator (Golden Rule 8) | `level: LIVE, ESTIMATED, CACHED, DEMO` |
| `Card` | Structured container with header, content, footer | `interactive`, `glass` |
| `Avatar` | Profile photo with initials fallback | `name`, `src`, `size: sm, md, lg` |
| `Tabs` | Accessible tab switcher | `Tabs`, `TabsList`, `TabsTrigger`, `TabsContent` |
| `Accordion` | Animated expandable collapsible section | `type: single, multiple`, `AccordionItem` |
| `Modal` | Dialog overlay with focus trapping | `open`, `onOpenChange`, `title`, `description`, `footer` |
| `Drawer` | Sheet sliding from right edge | `open`, `onOpenChange`, `title`, `description` |
| `Tooltip` | Hover tooltip with arrow | `content`, `side`, `align` |
| `Popover` | Triggered popover panel | `trigger`, `children`, `align`, `side` |
| `Toaster` | Global notification viewport | Integrated with `toast.success`, `toast.error`, etc. |
| `Skeleton` | Shimmer loading placeholder | `width`, `height`, `circle` |
| `Spinner` | Accessible animated spinner | `size: sm, md, lg`, `color` |
| `ProgressBar` | Linear progress bar with percentage | `value`, `max`, `label`, `showValue` |
| `ProgressRing` | Circular SVG score meter | `score`, `max`, `size`, `label`, `color` |
| `Stepper` | Multi-step wizard indicator | `steps`, `currentStep`, `orientation` |
| `EmptyState` | Empty placeholder with icon & action CTA | `title`, `description`, `actionLabel`, `onAction` |
| `ErrorState` | Error notification with retry trigger | `title`, `message`, `onRetry` |
| `DataTable` | Sortable table with pagination | `columns`, `data`, `pageSize`, `keyExtractor` |
| `Pagination` | Page navigation buttons | `currentPage`, `totalPages`, `onPageChange` |
| `Breadcrumbs` | Hierarchy path navigation | `items: [{ label, href, isCurrent }]` |
| `StatCard` | Key metric card with trend indicator | `title`, `value`, `change`, `trend`, `trustLevel` |
| `SectionHeader` | Standard section title with badge & action | `badge`, `title`, `subtitle`, `align`, `action` |
| `AlgorithmReceiptChip` | Clickable chip opening execution receipt | `receipt`, `name`, `timeMs`, `complexity` |
| `RouteLine` | Decorative animated SVG journey curve | `from`, `to`, `stops`, `animated` |
| `ThemeToggle` | Button cycling light, dark, and system themes | `showLabel` |

---

## 3. Four-Tier Trust System (Golden Rule 8)

All data presented to users carries an explicit trust level:
1. **LIVE**: Direct, real-time verified data from live provider API (e.g. current IRCTC seat availability).
2. **ESTIMATED**: Algorithmic computation based on historical rates and heuristics.
3. **CACHED**: Recently retrieved and cached snapshot; subject to expiry.
4. **DEMO**: Simulated architectural placeholder data for demonstration.

---

## 4. Theme & Layout Architecture

### Theme Management
- State is managed via `useThemeStore` in `src/store/themeStore.ts`.
- Persisted to `localStorage` under `travelmind-theme`.
- System preference (`prefers-color-scheme`) is respected by default.
- Anti-flash inline script in `frontend/index.html` prevents Flash of Unstyled Content (FOUC).

### Layouts
1. **`PublicLayout`**: Top navigation header + Brand + Navigation links + Theme toggle + CTA + Accessible Skip Link + Comprehensive 4-column footer.
2. **`AppLayout`**: Collapsible desktop sidebar (16rem / 4.5rem) + Top search & notification bar + Mobile bottom navigation bar (< 768px).
3. **`AdminLayout`**: Admin sidebar + breadcrumbs + operational metrics.

### Pages & Routes
- `/` — Landing Page with Hero, Smart Trip Search, Dijkstra graph visualizer, 0/1 Knapsack toy, 6-step How It Works, and Social Proof.
- `/destinations` — Curated circuit corridors with filters and DEMO badges.
- `/how-it-works` — Detailed architectural explanations of the 6 algorithmic engines.
- `/dsa-lab` — Interactive algorithm playground hosting the live Knapsack toy and Dijkstra visualizer.
- `/design-system` — Living catalog page demonstrating every UI component and theme.
- `/status` — Preserved Part 1 system health readiness probe.
- `/app/dashboard` — Authenticated dashboard shell with stat cards, upcoming journey, recent trips table, budget mini-chart, and "Why Recommended?" drawer.
- `/app/trips`, `/app/profile`, `/admin`, and `404` NotFound.
