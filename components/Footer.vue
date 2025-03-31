<template>
  <footer class="bg-gray-100 dark:bg-gray-800 py-8 mt-auto">
    <div class="container mx-auto px-4">
      <h3 class="text-lg font-semibold mb-4">Get in Touch</h3>
      <ContactInfo />
      
      <div class="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700 text-center text-sm">
        &copy; {{ new Date().getFullYear() }} {{ personal.name }}. All rights reserved.
      </div>
    </div>
  </footer>
</template>

<script setup>
import ContactInfo from './ContactInfo.vue'
const { personal } = useResumeData()
</script>