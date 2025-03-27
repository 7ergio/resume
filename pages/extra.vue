<script setup lang="ts">
const { education, languages, hobbies } = useResumeData()
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

    <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-8">
      <h2 class="text-xl font-bold mb-4">Languages</h2>
      <div class="space-y-3">
        <div v-for="(language, index) in languages" :key="index">
          <div class="flex justify-between items-center mb-1">
            <span class="font-medium">{{ language.name }}</span>
            <span class="text-sm text-gray-600 dark:text-gray-300">{{ language.level }}</span>
          </div>
          <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <div 
              class="bg-blue-600 h-2 rounded-full" 
              :style="{ width: language.level === 'native' ? '100%' : language.level === 'C1' ? '80%' : '60%' }"
            ></div>
          </div>
        </div>
      </div>
    </div>

    <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
      <h2 class="text-xl font-bold mb-4">Hobbies & Interests</h2>
      <p>{{ hobbies }}</p>
    </div>
  </div>
</template>