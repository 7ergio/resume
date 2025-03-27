<script setup lang="ts">
const { experience } = useResumeData()
</script>

<template>
  <div class="max-w-3xl mx-auto">
    <h1 class="text-3xl font-bold mb-8">Professional Experience</h1>
    
    <div class="space-y-8">
      <div v-for="(job, index) in experience" :key="index" class="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <div class="flex justify-between items-start mb-2">
          <h2 class="text-xl font-bold">{{ job.position }}</h2>
          <span class="text-sm text-gray-500 dark:text-gray-400">{{ job.period }}</span>
        </div>
        <h3 class="text-lg text-blue-600 dark:text-blue-400 mb-4">{{ job.company }}</h3>
        
        <p class="mb-4">{{ job.description }}</p>
        
        <h4 class="font-semibold mb-2">Key Achievements:</h4>
        <ul class="list-disc pl-5 space-y-1">
          <li v-for="(achievement, aIndex) in job.achievements" :key="aIndex">
            {{ achievement }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>