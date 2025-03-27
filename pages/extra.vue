<script setup lang="ts">
const { education, hobbies } = useResumeData()
</script>

<template>
  <div class="max-w-3xl mx-auto">
    <h1 class="text-3xl font-bold mb-8">Additional Information</h1>
    
    <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-8">
      <h2 class="text-xl font-bold mb-4">Education</h2>
      <div class="space-y-4">
        <div v-for="(edu, index) in education" :key="index">
          <div class="flex justify-between items-start">
            <h3 class="text-lg font-semibold">{{ edu.institution }}</h3>
            <span class="text-sm text-gray-500 dark:text-gray-400">{{ edu.period }}</span>
          </div>
          <p class="text-gray-600 dark:text-gray-300">{{ edu.degree }}</p>
        </div>
      </div>
    </div>
    
    <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
      <h2 class="text-xl font-bold mb-4">Hobbies & Interests</h2>
      <p>{{ hobbies }}</p>
    </div>
  </div>
</template>