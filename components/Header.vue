<script setup lang="ts">
const { personal } = useResumeData()
const route = useRoute()
const isDark = useDark()
const toggleDark = useToggle(isDark)

const links = [
  { name: 'Home', path: '/' },
  { name: 'Experience', path: '/experience' },
  { name: 'Skills', path: '/skills' },
  { name: 'Extra Info', path: '/extra' }
]
</script>

<template>
  <header class="bg-white dark:bg-gray-800 shadow-sm">
    <div class="container mx-auto px-4 py-4 flex justify-between items-center">
      <div>
        <p class="text-sm text-gray-600 dark:text-gray-300">&lt; FrontEnd Dev &#47;&gt;</p>
      </div>
      
      <nav class="flex items-center space-x-6">
        <NuxtLink 
          v-for="link in links" 
          :key="link.path" 
          :to="link.path"
          class="text-sm font-medium hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          :class="{
            'text-blue-600 dark:text-blue-400': route.path === link.path,
            'text-gray-700 dark:text-gray-300': route.path !== link.path
          }"
        >
          {{ link.name }}
        </NuxtLink>
        
        <button @click="toggleDark()" class="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700">
          <span v-if="isDark" class="i-heroicons-sun-20-solid text-xl"></span>
          <span v-else class="i-heroicons-moon-20-solid text-xl"></span>
        </button>
      </nav>
    </div>
  </header>
</template>