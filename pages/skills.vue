<script setup lang="ts">
const { skills, languages } = useResumeData()
</script>

<template>
  <div class="max-w-3xl mx-auto">
    <h1 class="text-3xl font-bold mb-8">Skills & Languages</h1>
    
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
      <div v-for="(skillCategory, index) in skills" :key="index" class="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h2 class="text-xl font-bold mb-4">{{ skillCategory.category }}</h2>
        <div class="flex flex-wrap gap-2">
          <span 
            v-for="(skill, sIndex) in skillCategory.items" 
            :key="sIndex"
            class="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm"
          >
            {{ skill }}
          </span>
        </div>
      </div>
    </div>
    
    <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
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
  </div>
</template>