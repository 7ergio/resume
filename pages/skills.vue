<template>
  <div class="max-w-3xl mx-auto">
    <h1 class="text-3xl font-bold mb-8">My Skills</h1>
    
    <div class="mb-8">
      <h2 class="text-xl font-semibold mb-4">Choose skills important to you:</h2>
    </div>

    <!-- Original skills grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
      <div v-for="(skillCategory, index) in skills" :key="index" 
           class="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h2 class="text-xl font-bold mb-4">{{ skillCategory.category }}</h2>
        <div class="flex flex-wrap gap-2">
          <button
            v-for="(skill, sIndex) in skillCategory.items"
            :key="sIndex"
            @click="toggleSkill(skill)"
            class="px-3 py-1 rounded-full transition-all"
            :class="{
              'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200': selectedSkills.includes(skill),
              'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300': !selectedSkills.includes(skill)
            }"
          >
          {{ skill }}
        </button>
        </div>
      </div>
    </div>

    <div class="mb-8">
      <div class="text-center">
        <p class="mb-2">You've selected {{ selectedSkills.length }} skills</p>
        <div class="flex justify-center items-center h-12">
          <template v-if="selectedSkills.length > 0">
            <HeartIcon class="h-3 w-3 text-red-500" :style="{ transform: `scale(${0.5 + selectedSkills.length/4})` }"/>
          </template>
        </div>
        <TransitionGroup name="fade" tag="div" class="mt-2 space-y-2">
          <p v-if="selectedSkills.length > allSkills.length / 4 && selectedSkills.length <= allSkills.length / 2" 
            key="good"
            class="text-green-600 dark:text-green-400 font-medium">
            It's going pretty good! Looks promising
          </p>
          <p v-if="selectedSkills.length > allSkills.length / 2" 
            key="perfect"
            class="text-green-600 dark:text-green-400 font-medium">
            Looks like we have a perfect match!
          </p>
        </TransitionGroup>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { skills } = useResumeData()

import { 
    HeartIcon
  } from '@heroicons/vue/24/outline'

// Flatten all skills into one array
const allSkills = computed(() => {
  return skills.flatMap(category => category.items)
})

const selectedSkills = ref<string[]>([])

const toggleSkill = (skill: string) => {
  const index = selectedSkills.value.indexOf(skill)
  if (index === -1) {
    selectedSkills.value.push(skill)
  } else {
    selectedSkills.value.splice(index, 1)
  }
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>