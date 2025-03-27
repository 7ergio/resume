<script setup lang="ts">
const { personal } = useResumeData()
</script>

<template>
  <div class="max-w-3xl mx-auto">
    <div class="flex flex-col md:flex-row gap-8 items-center mb-8">
      <div class="w-32 h-32 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">
        <img 
          src="/profile.jpg" 
          alt="Profile picture" 
          class="w-full h-full object-cover"
        />
      </div>
      <div>
        <h1 class="text-3xl font-bold mb-2">{{ personal.name }}</h1>
        <h2 class="text-xl text-blue-600 dark:text-blue-400 mb-2">{{ personal.title }}</h2>
        <p class="text-gray-600 dark:text-gray-300">{{ personal.location }}</p>
      </div>
    </div>

    <div class="prose dark:prose-invert max-w-none">
      <h2 class="text-2xl font-semibold mb-4">About Me</h2>
      <p class="whitespace-pre-line">{{ personal.summary }}</p>
    </div>
  </div>
</template>