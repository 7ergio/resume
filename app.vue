<script setup lang="ts">
const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Serhii Bilous',
  jobTitle: 'Frontend Developer',
  url: 'https://serhii-cv.netlify.app',
  image: 'https://serhii-cv.netlify.app/profile.jpg',
  sameAs: [
    'https://www.linkedin.com/in/bilous-serhii/'
  ],
  description: 'Frontend Developer with expertise in Vue.js, JavaScript, and more.'
}

useHead({
  htmlAttrs: {
    lang: 'en'
  },
  bodyAttrs: {
    class: 'bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300'
  },
  title: 'Serhii Bilous - Frontend Developer',
  meta: [
    { name: 'description', content: 'Frontend Developer with 10+ years of experience in Vue.js, JavaScript, and e-commerce applications.' },
    { name: 'keywords', content: 'frontend developer, vue.js, nuxt.js, javascript, berlin' },
    // Open Graph tags for social sharing
    { property: 'og:title', content: 'Serhii Bilous - Frontend Developer' },
    { property: 'og:description', content: 'Frontend Developer with expertise in Vue.js, JavaScript, and more.' },
    { property: 'og:image', content: 'https://serhii-cv.netlify.app/profile.jpg' },
    { property: 'og:url', content: 'https://serhii-cv.netlify.app/' },
    { property: 'og:type', content: 'website' }
  ],
  link: [
    {
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css2?family=VT323&display=swap'
    },
    {
      rel: 'canonical',
      href: `https://serhii-cv.netlify.app${useRoute().path}`
    },
    {
      rel: 'manifest',
      href: '/manifest.webmanifest'
    }
  ],
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify(structuredData)
    }
  ]
})

</script>

<template>
  <div class="flex flex-col min-h-screen">
    <Header />
    <main class="container mx-auto px-4 py-8 pt-[100px]">
      <NuxtPage />
    </main>
    <Footer />
  </div>
</template>