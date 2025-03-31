<script setup lang="ts">
import { ref } from 'vue'
import { onClickOutside } from '@vueuse/core'
import { 
  Bars3Icon, 
  XMarkIcon,
  MoonIcon,
  SunIcon 
} from '@heroicons/vue/24/solid'

const route = useRoute()
const isDark = useDark()
const toggleDark = useToggle(isDark)
const isMenuOpen = ref(false)
const menuRef = ref(null)

const links = [
  { name: 'Home', path: '/' },
  { name: 'Experience', path: '/experience' },
  { name: 'Skills', path: '/skills' },
  { name: 'Extra Info', path: '/extra' }
]

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}

onClickOutside(menuRef, () => {
  isMenuOpen.value = false
})
</script>

<template>
  <header class="fixed top-0 left-0 right-0 z-50 bg-white dark:bg-gray-800 shadow-sm">
    <div class="container mx-auto px-4 py-4 flex justify-between items-center">
      <div>
        <NuxtLink to="/" class="text-sm text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">&lt; FrontEnd Dev &#47;&gt;</NuxtLink>
      </div>
      
      <!-- Desktop Navigation -->
      <nav class="hidden md:flex items-center space-x-6">
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
        
        <!-- Desktop Dark Mode Toggle -->
        <button 
          @click="toggleDark()" 
          class="hidden md:block p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
        >
          <SunIcon v-if="isDark" class="h-5 w-5" />
          <MoonIcon v-else class="h-5 w-5" />
        </button>
      </nav>

      <!-- Mobile Hamburger Button -->
      <button 
        @click="toggleMenu"
        class="md:hidden p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
        aria-label="Toggle menu"
      >
        <Bars3Icon v-if="!isMenuOpen" class="h-6 w-6" />
        <XMarkIcon v-else class="h-6 w-6" />
      </button>
    </div>

    <!-- Mobile Menu Overlay -->
    <Transition name="slide">
      <div 
        v-if="isMenuOpen"
        class="fixed inset-0 z-50 md:hidden"
      >
        <!-- Overlay Background -->
        <div 
          class="absolute inset-0 bg-black bg-opacity-50"
          @click="isMenuOpen = false"
        ></div>
        
        <!-- Menu Content -->
        <div 
          ref="menuRef"
          class="absolute right-0 top-0 h-full w-3/4 bg-white dark:bg-gray-800 shadow-lg"
        >
          <div class="p-4 flex flex-col h-full">
            <button 
              @click="isMenuOpen = false"
              class="self-end p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
              aria-label="Close menu"
            >
              <XMarkIcon class="h-6 w-6" />
            </button>
            
            <nav class="flex-1 flex flex-col space-y-4 mt-4">
              <NuxtLink 
                v-for="link in links" 
                :key="link.path" 
                :to="link.path"
                @click="isMenuOpen = false"
                class="px-4 py-3 rounded-lg font-medium hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                :class="{
                  'text-blue-600 dark:text-blue-400 bg-gray-100 dark:bg-gray-700': route.path === link.path,
                  'text-gray-700 dark:text-gray-300': route.path !== link.path
                }"
              >
                {{ link.name }}
              </NuxtLink>
            </nav>
            
            <!-- Mobile Dark Mode Toggle -->
            <div class="mt-auto pt-4 border-t border-gray-200 dark:border-gray-700">
              <button 
                @click="toggleDark()"
                class="w-full px-4 py-3 rounded-lg font-medium text-left hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors flex items-center gap-2"
              >
                <SunIcon v-if="isDark" class="h-5 w-5" />
                <MoonIcon v-else class="h-5 w-5" />
                <span>{{ isDark ? 'Light Mode' : 'Dark Mode' }}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </header>
</template>

<style scoped>
/* Slide animation */
.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s ease;
}

.slide-enter-from,
.slide-leave-to {
  opacity: 0;
}

.slide-enter-from .absolute.right-0,
.slide-leave-to .absolute.right-0 {
  transform: translateX(100%);
}

/* Smooth transform for the menu panel */
.transform {
  will-change: transform;
}
</style>