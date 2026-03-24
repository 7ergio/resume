# Technical Specification — Serhii Bilous Resume

## Overview

A personal CV/portfolio single-page application built with **Nuxt 3** and **Vue 3**. The site presents Serhii Bilous's professional experience, skills, education, and contact information in a responsive, accessible, PWA-enabled web application.

**Production URL:** https://serhii-cv.netlify.app

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Nuxt 3.16.1 (Vue 3.5) |
| Language | TypeScript 5.3 |
| Styling | Tailwind CSS + SCSS |
| Icons | @heroicons/vue |
| Utilities | @vueuse/core (dark mode, composables) |
| Email | @emailjs/browser |
| PWA | @vite-pwa/nuxt + Workbox |
| Unit Testing | Vitest + Vue Test Utils + Happy DOM |
| E2E Testing | Playwright (Chromium) |
| CI/CD | GitHub Actions |
| Hosting | Netlify |

---

## Project Structure

```
resume/
├── app.vue                        # Root layout (Header + NuxtPage + Footer)
├── nuxt.config.ts                 # Nuxt configuration
├── tailwind.config.js             # Tailwind CSS configuration
├── vitest.config.ts               # Unit test configuration
├── playwright.config.ts           # E2E test configuration
├── components/
│   ├── Header.vue                 # Navigation bar + dark mode toggle
│   ├── Footer.vue                 # Page footer with contact links
│   ├── ContactForm.vue            # Email form with validation
│   ├── ContactInfo.vue            # Contact links display
│   └── TypingAnimation.vue        # Terminal-style typewriter effect
├── pages/
│   ├── index.vue                  # Home / about page
│   ├── experience.vue             # Work history
│   ├── skills.vue                 # Interactive skills listing
│   ├── extra.vue                  # Education, languages, hobbies
│   ├── contact.vue                # Contact form page
│   └── [...slug].vue              # 404 catch-all
├── composables/
│   └── useResumeData.ts           # Typed access to resume JSON
├── assets/styles/
│   ├── main.scss                  # Tailwind imports + base styles
│   └── dark.scss                  # Dark mode overrides
├── public/
│   ├── data/resume.json           # All resume content (single source of truth)
│   ├── profile.jpg                # Profile photo
│   ├── CV-Bilous.pdf              # Downloadable PDF resume
│   ├── sw.js                      # Service worker
│   ├── robots.txt                 # Search engine directives
│   ├── sitemap.xml                # Sitemap for SEO
│   ├── _headers / _redirects      # Netlify hosting config
│   └── icons (favicon, PWA)       # App icons
├── tests/
│   ├── components/                # Unit tests for components
│   └── composables/               # Unit tests for composables
├── e2e/                           # Playwright E2E tests
└── .github/workflows/
    └── test-and-deploy.yml        # CI pipeline
```

---

## Architecture

### Routing

File-based routing via Nuxt `pages/` convention:

| Route | Page | Description |
|-------|------|-------------|
| `/` | `index.vue` | Profile photo, typing animation, about section |
| `/experience` | `experience.vue` | Professional work history |
| `/skills` | `skills.vue` | Skills by category with interactive selection |
| `/extra` | `extra.vue` | Education, languages, hobbies |
| `/contact` | `contact.vue` | Contact form + info |
| `/*` | `[...slug].vue` | 404 error page |

### Data Flow

1. All resume content lives in `public/data/resume.json` (single source of truth)
2. `useResumeData()` composable imports the JSON and provides typed access
3. Page components consume data via the composable
4. Contact form submissions go through EmailJS API (client-side)

### Component Hierarchy

```
app.vue
├── Header.vue          (fixed nav, mobile menu, dark mode)
├── <NuxtPage />        (current route page)
└── Footer.vue          (copyright, contact links)
```

### State Management

- No external store (Vuex/Pinia) — state is local to components
- Dark mode toggle via `useDark()` from VueUse (persisted to localStorage)
- Form state managed with `ref()` inside ContactForm

---

## Key Features

### Dark Mode
- Class-based toggle on `<html>` element via VueUse `useDark()`
- All components use Tailwind `dark:` variant classes
- Additional overrides in `dark.scss`

### Typing Animation
- Terminal-style green monospace text (`TypingAnimation.vue`)
- Cycles through configurable phrases with typewriter effect
- Uses VT323 Google Font

### Skills Page
- Skills grouped by category from resume data
- Interactive toggle selection with real-time counter
- Dynamic feedback message based on selection count

### Contact Form
- Client-side validation: name (min 2 chars), email (regex), message (min 10 chars)
- Errors shown on blur with `role="alert"` for screen readers
- Success state with `role="status"` after submission
- Loading indicator during EmailJS API call
- Environment variables: `EMAILJS_SERVICE_ID`, `EMAILJS_TEMPLATE_ID`, `EMAILJS_PUBLIC_KEY`

### PWA
- Manifest with app name, theme color, icons (192×192, 512×512)
- Service worker via Workbox for offline caching
- Installable on mobile and desktop

### SEO
- JSON-LD structured data (Person schema) on home page
- Open Graph and meta tags on all pages
- Canonical URLs, `robots.txt`, `sitemap.xml`

### Accessibility
- Semantic HTML with proper heading hierarchy
- ARIA labels on interactive elements
- `role="alert"` / `role="status"` for dynamic content
- Keyboard navigation support
- Sufficient color contrast in both themes

---

## Testing

### Unit Tests (Vitest)

| File | Coverage |
|------|----------|
| `ContactForm.test.ts` | Form validation, error display, submission, accessibility attributes |
| `TypingAnimation.test.ts` | Component rendering and class structure |
| `useResumeData.test.ts` | Data shape and type correctness |

### E2E Tests (Playwright)

| File | Coverage |
|------|----------|
| `navigation.spec.ts` | Page navigation, active link highlighting, dark mode toggle |
| `contactForm.spec.ts` | Form field validation, error message display |

### Scripts

```bash
npm run unit            # Run unit tests
npm run unit:watch      # Unit tests in watch mode
npm run unit:coverage   # Unit tests with coverage report
npm run e2e             # E2E tests headless
npm run e2e:ui          # E2E tests with interactive UI
npm run test:all        # Unit + E2E
```

---

## CI/CD Pipeline

**Trigger:** Push or PR to `main` / `develop` branches

**Jobs (GitHub Actions):**

1. **Unit Tests** — Node 18, `npm ci`, `npm run unit`
2. **E2E Tests** — Node 18, `npm ci`, install Playwright browsers, run Playwright

**Deployment:** Netlify (static site generation via `nuxt generate`)
- `_headers` for custom HTTP headers
- `_redirects` for URL rewriting

---

## Environment Variables

| Variable | Purpose |
|----------|---------|
| `EMAILJS_SERVICE_ID` | EmailJS service identifier |
| `EMAILJS_TEMPLATE_ID` | EmailJS email template |
| `EMAILJS_PUBLIC_KEY` | EmailJS public API key |

Configured in `nuxt.config.ts` under `runtimeConfig.public` and read via `useRuntimeConfig()`.

---

## Styling

- **Tailwind CSS** for utility classes and responsive design
- **SCSS** for custom styles (`main.scss`, `dark.scss`)
- **Fonts:** Courier New (monospace), VT323 (Google Fonts — typing animation)
- **Dark mode:** class-based strategy in Tailwind config
- SCSS auto-injected into all components via Vite preprocessor options
