import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  modules: [
    '@nuxtjs/tailwindcss',
    '@vite-pwa/nuxt',
    '@vueuse/nuxt'
  ],

  tailwindcss: {
    configPath: '~/tailwind.config.js'
  },

  pwa: {
    registerType: 'autoUpdate',
    manifest: {
      name: 'Serhii Bilous - Frontend Developer',
      short_name: 'Serhii CV',
      theme_color: '#ffffff',
      background_color: '#ffffff',
      orientation: 'portrait',
      display: 'standalone', // Important for app-like experience
      icons: [
        {
          src: 'pwa-192x192.png',
          sizes: '192x192',
          type: 'image/png'
        },
        {
          src: 'pwa-512x512.png',
          sizes: '512x512',
          type: 'image/png'
        }
      ]
    },
    workbox: {
      navigateFallback: '/',
      globPatterns: ['**/*.{js,css,html,png,svg,ico,json}']
    },
    client: {
      installPrompt: true,
    }
  },

  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@use "@/assets/styles/main.scss" as *;`
        }
      }
    }
  },

  runtimeConfig: {
    public: {
      emailJsServiceId: process.env.EMAILJS_SERVICE_ID,
      emailJsTemplateId: process.env.EMAILJS_TEMPLATE_ID,
      emailJsPublicKey: process.env.EMAILJS_PUBLIC_KEY
    }
  },

  routeRules: {
    // Enable client-side rendering for 404 page
    '/[...slug]': { ssr: false }
  },

  compatibilityDate: '2025-03-27'
})