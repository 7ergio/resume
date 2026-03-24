# Developer CV

Personal portfolio and resume website built with Nuxt 3, Vue 3, and Tailwind CSS.

**Live site:** https://serhii-cv.netlify.app

## Tech Stack

- **Framework:** Nuxt 3 + Vue 3
- **Styling:** Tailwind CSS + SCSS, dark mode support
- **Email:** EmailJS (contact form, no backend required)
- **PWA:** Offline-capable via `@vite-pwa/nuxt`
- **Testing:** Vitest (unit) + Playwright (e2e)
- **CI/CD:** GitHub Actions → Netlify

## Setup

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment variables

Copy `.env.example` to `.env` and fill in the values:

```bash
cp .env.example .env
```

| Variable | Description |
|---|---|
| `NUXT_PUBLIC_SITE_URL` | Full site URL, used for canonical links and Open Graph |
| `EMAILJS_SERVICE_ID` | EmailJS service ID |
| `EMAILJS_TEMPLATE_ID` | EmailJS template ID |
| `EMAILJS_PUBLIC_KEY` | EmailJS public key |

Get your EmailJS credentials at [emailjs.com](https://www.emailjs.com/).

### 3. Start the dev server

```bash
npm run dev
```

Opens at `http://localhost:3000`.

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start dev server |
| `npm run build` | Build for production |
| `npm run generate` | Static site generation |
| `npm run preview` | Preview production build |
| `npm run unit` | Run unit tests (Vitest) |
| `npm run unit:watch` | Run unit tests in watch mode |
| `npm run e2e` | Run e2e tests (Playwright) |
| `npm run e2e:ui` | Run e2e tests with UI |
| `npm run test:all` | Run all tests |

## Testing

### Unit tests

```bash
npm run unit
```

Tests live in `tests/` — covering components and composables.

### E2E tests

```bash
# Install Playwright browsers once
npx playwright install

npm run e2e
```

E2E tests run against a local dev server on port 3000. Tests cover navigation and the contact form across Chromium, Firefox, and WebKit.

## Project Structure

```
pages/          # Route pages (index, experience, skills, extra, contact)
components/     # Reusable Vue components
composables/    # useResumeData — loads resume.json
public/data/    # resume.json — all resume content
tests/          # Vitest unit tests
e2e/            # Playwright e2e tests
```

## Deployment

The site is deployed to Netlify. Set the environment variables in Netlify's site settings to match your `.env` file.
