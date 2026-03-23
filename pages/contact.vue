<script setup lang="ts">
useHead({
  title: 'Contact - Serhii Bilous',
  meta: [
    { name: 'description', content: 'Get in touch with Serhii Bilous — Frontend Developer based in Berlin.' }
  ]
})
</script>

<template>
    <div class="max-w-2xl mx-auto py-12 px-4">
      <h1 class="text-3xl font-bold mb-8 text-center">Contact Me</h1>
      <p class="max-w-xl text-gray-600 dark:text-gray-400 mb-4 mx-auto">
        Hey, if you have any questions, suggestions, want to work together, or just drink few biers, feel free to send me a message.
      </p>
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <ContactForm class="mb-8" />
      </div>
    </div>
  </template>