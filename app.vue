<script setup lang="ts">
useHead({
  htmlAttrs: {
    lang: 'en'
  },
  bodyAttrs: {
    class: 'bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300'
  }
})

const isDark = useDark()
const toggleDark = useToggle(isDark)
</script>

<template>
  <div>
    <Header />
    <main class="container mx-auto px-4 py-8">
      <NuxtPage />
    </main>
    <Footer />
  </div>
</template>