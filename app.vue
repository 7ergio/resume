<script setup lang="ts">
useHead({
  htmlAttrs: {
    lang: 'en'
  },
  bodyAttrs: {
    class: 'bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300'
  },
  title: 'Serhii CV',
  meta: [
    {
      name: 'description',
      content: 'A simple resume built with VitePress'
    }
  ],
  link: [
    {
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css2?family=VT323&display=swap'
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