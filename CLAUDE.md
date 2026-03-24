# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

The app description is in the @spec.md file. Read that file for general architectural tasks or to double check the tech stack.

Keep yor replies remly concise and focus on convying the key information. No unnecessary fluff, no long code snippets.

Always use Context7 when I need library/API documentation, code generation, setup or configuration steps without me having to explicitly ask.

Whenever orking with any third-party library or something similar, you MUST look up the official documentation to ensure that you're working with up-to-date information.
Use the DocsExplorer subagent for fficient documentation lookup.

## Project Overview

Personal resume/CV website for Serhii Bilous, built with Nuxt 3, Vue 3, Tailwind CSS, and PWA support. Deployed to Netlify. Resume data is stored as static JSON in `public/data/resume.json` and accessed via the `useResumeData()` composable.

## Commands

- `npm run dev` — start dev server on http://localhost:3000
- `npm run build` — production build
- `npm run unit` — run Vitest unit tests
- `npm run unit:watch` — run unit tests in watch mode
- `npm run e2e` — run Playwright e2e tests (starts dev server automatically)
- `npm run e2e:ui` — run Playwright e2e tests with UI

## Architecture

- **Framework**: Nuxt 3 (Vue 3) with SSR, TypeScript
- **Styling**: Tailwind CSS with SCSS (`assets/styles/`), dark mode via `class` strategy
- **PWA**: `@vite-pwa/nuxt` — disabled in dev, auto-update in production
- **Testing**: Vitest (unit, `happy-dom` environment) + Playwright (e2e, Chromium only, `e2e/` directory)
- **Data flow**: All resume content lives in `public/data/resume.json` → consumed by `composables/useResumeData.ts` → used by page components
- **Contact form**: Uses EmailJS (`@emailjs/browser`) with keys in runtime config env vars (`EMAILJS_SERVICE_ID`, `EMAILJS_TEMPLATE_ID`, `EMAILJS_PUBLIC_KEY`)
- **Pages**: `index` (profile/about), `experience`, `skills`, `contact`, `extra`, `[...slug]` (404 catch-all, client-side only)
- **CI**: GitHub Actions runs unit and e2e tests on push/PR to `main`/`develop`
