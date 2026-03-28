# Thunderclap Labs — Design & Style Guidelines

This document describes the visual language and component patterns used across the Thunderclap Labs website. Feed this to AI when generating new pages or components to ensure consistency.

---

## 1. Color System

### Brand Colors (CSS Custom Properties)

| Variable       | Value             | Usage                                    |
| -------------- | ----------------- | ---------------------------------------- |
| `--primary`    | `#97DFFC`         | Sky/ice blue — accent highlights         |
| `--secondary`  | `#858AE3`         | Periwinkle purple — secondary highlights |
| `--accent`     | `#613DC1`         | Deep violet — brand accent               |
| `--background` | `#000` (Tailwind) | Page background                          |
| `--foreground` | `#fff`            | Primary text                             |

### Tailwind Color Tokens

Use these Tailwind classes instead of raw hex values:

| Token                                   | Value                 | Common Use                           |
| --------------------------------------- | --------------------- | ------------------------------------ |
| `text-primary-400` / `text-primary-500` | `#97DFFC` variants    | Highlighted text, stat values, icons |
| `text-secondary`                        | `#858AE3`             | Secondary highlights                 |
| `text-accent`                           | `#613DC1`             | Accent marks                         |
| `text-neutral-100/200/300/400`          | Near-white to grey    | Body text hierarchy                  |
| `bg-black`                              | `#000`                | Page & card backgrounds              |
| `bg-neutral-600 bg-opacity-55`          | Semi-transparent grey | Card border shimmer wrapper          |
| `text-default-500/600`                  | Muted grey            | Nav links, muted icons               |

### Gradient Backgrounds

Apply as inline `style` or Tailwind `bg-*` classes:

```
Radial top-right purple:   radial-gradient(circle at top right, rgba(121, 68, 154, 0.13), transparent)
Radial bottom-left cyan:   radial-gradient(circle at 20% 80%, rgba(41, 196, 255, 0.13), transparent)
```

Sections typically layer `<StarsBackground />` and `<ShootingStars />` as `z-0` backgrounds with content at `z-[1]`.

### Category Badge Colors

When displaying project or content category badges use these patterns:

| Category      | Classes                                                           |
| ------------- | ----------------------------------------------------------------- |
| Aerospace     | `bg-blue-500/20 text-blue-400 border-blue-500/30`                 |
| Chemistry     | `bg-purple-500/20 text-purple-400 border-purple-500/30`           |
| Software      | `bg-green-500/20 text-green-400 border-green-500/30`              |
| Hardware      | `bg-orange-500/20 text-orange-400 border-orange-500/30`           |
| Research      | `bg-cyan-500/20 text-cyan-400 border-cyan-500/30`                 |
| AI            | `bg-yellow-500/20 text-yellow-400 border-yellow-500/30`           |
| Default       | `bg-gray-500/20 text-gray-400 border-gray-500/30`                 |
| Active/Status | `bg-green-500/20 text-green-400 border-green-500/30 rounded-full` |

Tag pills (non-category): `bg-primary-500/20 text-primary-400 px-2 py-1 text-xs rounded-md`

### Glow Effect

Apply the `.glow` CSS class for glowing icons or decorative elements:

```css
filter: drop-shadow(0 0 1px white) drop-shadow(0 0 24px white)
  drop-shadow(0 0 4px #97dffc);
```

---

## 2. Typography

### Font Stack

| Font                         | Variable             | Use                                              |
| ---------------------------- | -------------------- | ------------------------------------------------ |
| **Inter** (Google Fonts)     | `var(--font-sans)`   | All body and UI text (`font-sans`)               |
| **Fira Code** (Google Fonts) | `var(--font-mono)`   | Code blocks (`font-mono`)                        |
| **Anurati** (CDN font)       | inline `font-family` | Hero/display titles only (`THUNDERCLAP`, `LABS`) |

`<body>` carries: `font-sans antialiased`

### Heading Scale

| Level                       | Classes                                          | Notes                             |
| --------------------------- | ------------------------------------------------ | --------------------------------- |
| Hero display (Anurati)      | `md:text-4xl text-3xl` + custom font             | ONLY for the brand name hero text |
| Page section title (large)  | `text-4xl sm:text-5xl md:text-7xl font-semibold` | Used in `SectionLayout`           |
| Page section title (medium) | `text-4xl sm:text-5xl lg:text-6xl font-semibold` | Used in `Heading` component       |
| Card / component title      | `text-xl font-semibold` or `text-xl font-bold`   |                                   |
| Stat value                  | `text-6xl font-bold text-primary-500`            |                                   |
| Stat label                  | `text-xl font-semibold`                          |                                   |

### Body & Supporting Text

| Level                         | Classes                                                    |
| ----------------------------- | ---------------------------------------------------------- |
| Large description (hero area) | `text-lg md:text-3xl font-normal leading-relaxed`          |
| Body subtitle                 | `w-full md:w-1/2 my-2 text-lg lg:text-xl text-default-600` |
| Card body                     | `text-sm text-neutral-300`                                 |
| Muted detail / stat desc      | `text-neutral-400`                                         |
| Badge / tag text              | `text-xs` or `text-[11px]`                                 |

### Title Gradient Variants (`primitives.ts`)

Use the `title()` helper from `components/primitives.ts` for gradient-clipped headings:

| Color        | Gradient                         |
| ------------ | -------------------------------- |
| `violet`     | `#FF1CF7 → #b249f8`              |
| `yellow`     | `#FF705B → #FFB457`              |
| `blue`       | `#5EA2EF → #0072F5`              |
| `cyan`       | `#00b7fa → #01cfea`              |
| `green`      | `#6FEE8D → #17c964`              |
| `pink`       | `#FF72E1 → #F54C7A`              |
| `foreground` | `#FFFFFF → #4B4B4B` (white fade) |

```tsx
import { title, subtitle } from "@/components/primitives";
<h1 className={title({ color: "cyan", size: "lg" })}>Section Title</h1>
<p className={subtitle()}>Supporting description text.</p>
```

---

## 3. Layout & Spacing

### Page Container

All page content wraps with:

```html
<div class="container max-w-7xl mx-auto px-4"></div>
```

Narrow sections may use `max-w-2xl` or `max-w-5xl`.

### Section Padding

| Context                   | Class        |
| ------------------------- | ------------ |
| Standard section          | `py-32`      |
| `SectionLayout` component | `py-20`      |
| Title block bottom gap    | `pb-12`      |
| Description block spacing | `my-4 pb-12` |

### Grid Layouts

| Grid              | Classes                                          |
| ----------------- | ------------------------------------------------ |
| 3-column cards    | `grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8` |
| 4-column features | `grid grid-cols-1 md:grid-cols-4`                |
| Stats (3 col)     | `grid grid-cols-1 md:grid-cols-3`                |

### Global Layout Rules

- `<html>`: `overflow-x-hidden`
- `<body>`: `relative overflow-x-hidden min-h-screen`
- `<main>`: `relative !overflow-hidden`
- Navbar is `fixed z-50`; account for navbar height in first section

---

## 4. Card Pattern ("Glass Border" Effect)

All cards use a 1px shimmer border achieved by nesting two divs:

```html
<!-- Outer wrapper: creates the 1px border illusion -->
<div
  class="featured-card white-feature bg-neutral-600 bg-opacity-55 p-[1px] rounded-lg"
>
  <!-- Inner: actual card background -->
  <div class="bg-black bg-opacity-95 p-6 rounded-lg h-full">
    <!-- Card content here -->
  </div>
</div>
```

The `featured-card white-feature` classes enable a **mouse-follow radial glow** effect (requires `useFeaturedCardMouseEffect()` hook from `lib/featured-card.ts` — call it in your page component).

### Card Variants by Content Type

**Stat card:**

```html
<div
  class="featured-card white-feature bg-neutral-600 rounded-lg bg-opacity-55 p-[1px]"
>
  <div
    class="flex flex-col items-center justify-center p-6 bg-black bg-opacity-90 rounded-lg"
  >
    <span class="text-6xl font-bold text-primary-500">42</span>
    <p class="mt-2 text-xl font-semibold">Title</p>
    <p class="text-neutral-400 mt-1">Description</p>
  </div>
</div>
```

**Feature/icon card:**

```html
<div
  class="featured-card white-feature bg-neutral-600 bg-opacity-55 p-[1px] rounded-lg"
>
  <div
    class="flex flex-col bg-black bg-opacity-95 p-8 items-center justify-center rounded-lg"
  >
    <!-- FontAwesome icon: text-primary-500, size="3x" -->
    <p class="text-xl font-semibold mb-3">Title</p>
    <p class="text-neutral-400 text-sm text-center">Description text.</p>
  </div>
</div>
```

**Media card (image + content):**

```html
<div
  class="featured-card white-feature bg-neutral-600 bg-opacity-55 p-[1px] rounded-lg"
>
  <div class="flex flex-col bg-black bg-opacity-95 p-1 rounded-lg">
    <div class="relative h-48 w-full">
      <image src="..." fill class="object-cover rounded-t-lg" />
    </div>
    <div class="p-4 flex flex-col flex-grow">
      <h3 class="text-xl font-bold text-neutral-100">Title</h3>
      <!-- badges -->
      <p class="text-neutral-200 text-sm">Description</p>
    </div>
  </div>
</div>
```

---

## 5. Components

### SectionLayout

Use `SectionLayout` for all major page sections. It provides consistent padding, the `max-w-7xl` container, and baked-in AOS animations on title + description.

```tsx
<SectionLayout
  title="Section Title"
  description="Supporting paragraph text for the section."
>
  {/* section content */}
</SectionLayout>
```

Internally renders:

- Title: `text-4xl sm:text-5xl md:text-7xl font-semibold` + `data-aos="fade-up"`
- Description: `max-w-3xl text-lg md:text-3xl font-normal leading-relaxed` + `data-aos-delay="100"`
- Content slot: `data-aos-delay="200"`

### Heading Component

Lighter page heading with optional logo, title, subtitle, and stats:

```tsx
<Heading title="Page Title" subtitle="Page description text goes here." />
```

### Buttons (CTA)

Primary action button:

```tsx
<Button
  className="bg-black/15 text-white shadow-xl rounded-lg"
  variant="bordered"
>
  Label
</Button>
```

### Navbar

Fixed at top, `z-50`. Uses HeroUI `<Navbar>` with `maxWidth="xl"`. Nav links use `color: "foreground"` with `text-primary` for the active route. A vertical `<Divider className="h-6" />` separates `Projects` from the remaining nav items. Social icons are `text-default-500 text-lg md:text-xl`.

---

## 6. Scroll Animations (AOS)

Initialize once in the root layout/page:

```ts
AOS.init({ duration: 800, once: true });
```

Standard usage:

```html
<div data-aos="fade-up">...</div>
<div data-aos="fade-down">...</div>
<div data-aos="fade-right">...</div>
<div data-aos="zoom-in">...</div>
```

Stagger a list of items by index:

```tsx
items.map((item, index) => (
  <div data-aos="fade-up" data-aos-delay={index * 100}>
    ...
  </div>
));
```

---

## 7. Background Layers

### Stars Background

Wrap all post-hero sections content in a relative container with background star layers at `z-0`, content at `z-[1]`:

```tsx
<section className="relative">
  <StarsBackground className="z-0" />
  <ShootingStars className="z-0" />
  <div className="relative z-[1]">{/* content */}</div>
</section>
```

### Swirl Accent (optional)

For R&D or tech-focused sections, add a subtle animated swirl:

```tsx
<Swirl className="absolute inset-0 z-0 opacity-30 pointer-events-none" />
```

### Hero Section Background

The hero uses a full-black background (`bg-black min-h-screen`) with:

- Desktop: Three.js WebGL globe (left side)
- Mobile: `<StarsBackground />` + `<ShootingStars />`

---

## 8. Animations Reference

### CSS Keyframes (hero.css — available globally)

| Animation     | Trigger                | Effect                           |
| ------------- | ---------------------- | -------------------------------- |
| `titleAnim`   | Page load (1.5s delay) | Slides up from +20px, fades in   |
| `subAnim`     | Page load (1.5s delay) | Slides down from -20px, fades in |
| `opacity1`    | Page load (1s delay)   | Fades in from opacity 0          |
| `globeFadeIn` | Page load (0.5s delay) | Fades in + scales from 0.8       |

### Tailwind Custom Animation Classes

| Class                     | Effect                                      |
| ------------------------- | ------------------------------------------- |
| `animate-mouse-wheel`     | Scroll indicator bounce (1.8s infinite)     |
| `animate-fade-in-delayed` | Fade in after 10s (scroll indicator)        |
| `animate-expand`          | Accordion open (maxHeight + opacity, 0.3s)  |
| `animate-collapse`        | Accordion close (maxHeight + opacity, 0.3s) |

---

## 9. Icons

Use **FontAwesome React** for feature icons. Standard size in cards: `size="3x"`, colored `text-primary-500`.

```tsx
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRocket } from "@fortawesome/free-solid-svg-icons";

<FontAwesomeIcon icon={faRocket} size="3x" className="text-primary-500 mb-4" />;
```

For nav/social icons, use the icons from `components/icons.tsx` or HeroUI icon utilities.

---

## 10. Page Structure Template

When building a new page, follow this structure:

```tsx
"use client";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { SectionLayout } from "@/components/common/section-layout";
import { StarsBackground } from "@/components/ui/stars-background";
import { ShootingStars } from "@/components/ui/shooting-stars";
import { useFeaturedCardMouseEffect } from "@/lib/featured-card";

export default function MyPage() {
  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  useFeaturedCardMouseEffect(); // enables card glow effect

  return (
    <main>
      {/* Hero / intro section */}
      <section className="relative bg-black min-h-[60vh] flex items-center">
        <StarsBackground className="z-0" />
        <ShootingStars className="z-0" />
        <div className="relative z-[1] container max-w-7xl mx-auto px-4 py-32">
          <h1
            className="text-4xl sm:text-5xl md:text-7xl font-semibold"
            data-aos="fade-up"
          >
            Page Title
          </h1>
          <p
            className="max-w-3xl text-lg md:text-3xl font-normal leading-relaxed text-neutral-300 mt-4"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            Supporting description text.
          </p>
        </div>
      </section>

      {/* Content sections */}
      <div className="relative">
        <StarsBackground className="z-0" />
        <ShootingStars className="z-0" />

        <SectionLayout title="Section One" description="Description here.">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {/* Cards */}
          </div>
        </SectionLayout>
      </div>
    </main>
  );
}
```

---

## 11. UI Libraries & Dependencies

| Library               | Import from                      | Role                                              |
| --------------------- | -------------------------------- | ------------------------------------------------- |
| **HeroUI**            | `@heroui/react`                  | Navbar, Button, Link, Progress, Divider, etc.     |
| **Tailwind CSS**      | utility classes                  | Core styling system                               |
| **tailwind-variants** | `tv()`                           | `title` / `subtitle` primitive styles             |
| **AOS**               | `aos` + `aos/dist/aos.css`       | Scroll-triggered entrance animations              |
| **Swiper.js**         | `swiper/react`                   | Carousels with Autoplay module                    |
| **Chart.js**          | `react-chartjs-2`                | Data visualizations (doughnut, bar, etc.)         |
| **FontAwesome**       | `@fortawesome/react-fontawesome` | Feature icons                                     |
| **next/image**        | built-in                         | All images (use `fill` + `object-cover` in cards) |
| **clsx**              | `clsx`                           | Conditional class merging                         |

---

## 12. Do's and Don'ts

### Do

- Use `bg-black bg-opacity-95` for all card interiors
- Wrap every card in the `featured-card white-feature` glass-border pattern
- Apply AOS `fade-up` with 100ms stagger delays on lists
- Keep section titles at `md:text-7xl font-semibold`
- Use `text-primary-500` for all primary accent highlights and icon colors
- Stack `<StarsBackground />` + `<ShootingStars />` behind all non-hero sections
- Use the `container max-w-7xl mx-auto px-4` wrapper for all section content

### Don't

- Don't use any background color other than black or near-black (`bg-neutral-900` max)
- Don't use rounded corners larger than `rounded-lg`
- Don't use colored buttons — stick to `variant="bordered"` with `bg-black/15 text-white`
- Don't use light/white color schemes — this is a dark-only site
- Don't add drop shadows to cards — the shimmer border + mouse glow provides depth
- Don't skip AOS — all new content blocks should animate in
