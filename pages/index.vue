<script setup lang="ts">
const { personal } = useResumeData()
const showFullText = ref(false)

import { 
  ChevronDownIcon
  } from '@heroicons/vue/24/outline'
</script>

<template>
  <div class="max-w-3xl mx-auto">
    <!-- Profile Header -->
    <div class="flex flex-col md:flex-row gap-8 items-center mb-8">
      <div class="w-32 h-32 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">
        <img 
          src="/profile.jpg" 
          alt="Serhii Bilous FrontEnd developer profile picture" 
          class="w-full h-full object-cover"
        />
      </div>
      <div>
        <h1 class="text-3xl font-bold mb-2">{{ personal.name }}</h1>
        <h2 class="text-xl text-blue-600 dark:text-blue-400 mb-2">{{ personal.title }}</h2>
        <p class="text-gray-600 dark:text-gray-300">{{ personal.location }}</p>
      </div>
    </div>

    <!-- Typing Animation Section -->
    <div class="mb-8">
      <TypingAnimation />
    </div>

    <!-- About Me Section -->
    <div class="prose dark:prose-invert max-w-none mb-8">
      <h2 class="text-2xl font-semibold mb-4">About Me</h2>
      <p class="whitespace-pre-line">{{ personal.summary }}</p>
    </div>

    <!-- Expandable Personal Section -->
    <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-200 dark:border-gray-700">
      <button 
        @click="showFullText = !showFullText"
        class="flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors mb-4"
      >
        <span>{{ showFullText ? 'Show less about me' : 'Want to know me better?' }}</span>
        <ChevronDownIcon 
          class="h-4 w-4 transition-transform duration-300"
          :class="{ 'rotate-180': showFullText }"
        />
      </button>

      <Transition name="fade-expand">
        <div v-if="showFullText" class="prose dark:prose-invert max-w-none space-y-4">
          <h3>Beyond Code</h3>
          <p>When I'm not crafting interfaces, you'll find me:</p>
          <ul>
            <li>🏂 Snowboarding in the Tatras (winter is my favorite season)</li>
            <li>🛹 Skateboarding through Berlin's streets</li>
            <li>🌄 Hiking mountains for that perfect sunrise view</li>
          </ul>
          
          <h3>My Approach</h3>
          <p>I believe in:</p>
          <ul>
            <li>🧩 Solving problems, not just writing code</li>
            <li>🚀 Building fast, accessible, and maintainable apps</li>
            <li>🤝 Collaborating closely with designers and stakeholders</li>
          </ul>
        </div>
      </Transition>
    </div>
  </div>
</template>

<style>
.fade-expand-enter-active,
.fade-expand-leave-active {
  transition: 
    opacity 0.3s ease,
    transform 0.3s ease,
    max-height 0.5s ease;
  max-height: 500px;
  overflow: hidden;
}

.fade-expand-enter-from,
.fade-expand-leave-to {
  opacity: 0;
  transform: translateY(-10px);
  max-height: 0;
}
</style>