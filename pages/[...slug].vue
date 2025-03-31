<script setup lang="ts">
useHead({
  title: 'Page Not Found | My CV'
})

</script>

<template>
  <div class="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
    <div class="max-w-md w-full text-center">
      <!-- Error Container -->
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg">

        <!-- Error Message -->
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2 pt-4">404</h1>
        <h2 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">Page Not Found</h2>
        <p class="text-gray-600 dark:text-gray-300 mb-6">
          Oops! The page you're looking for doesn't exist or has been moved.
        </p>

        <NuxtLink 
          to="/" 
          class="px-4 py-2 inline-block mt-4 mb-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          Go to Homepage
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Smooth background transition for dark mode */
.bg-gray-50, .bg-gray-900 {
  transition: background-color 0.3s ease;
}
</style>