<template>
    <div class="grid md:flex grid-cols-1 sm:grid-cols-2 md:justify-between gap-4">
      <div v-for="(item, index) in contactItems" :key="index" class="flex items-center space-x-3">
        <div class="p-2 rounded-full bg-gray-100 dark:bg-gray-700">
          <component :is="item.icon" class="h-5 w-5" />
        </div>
        <div>
          <p class="text-sm text-gray-500 dark:text-gray-400">{{ item.label }}</p>
          <a 
            v-if="item.href" 
            :href="item.href"
            target="_blank" 
            class="font-medium hover:text-blue-600 dark:hover:text-blue-400"
          >
            {{ item.value }}
          </a>
          <p v-else class="font-medium">{{ item.value }}</p>
        </div>
      </div>
    </div>
  </template>
  
<script setup lang="ts">
  import { 
    EnvelopeIcon,
    PhoneIcon,
    MapPinIcon,
    GlobeAltIcon
  } from '@heroicons/vue/24/outline'
  
  const { personal } = useResumeData()
  
  const contactItems = [
    {
      icon: EnvelopeIcon,
      label: 'Email',
      value: personal.email,
      href: `mailto:${personal.email}`
    },
    {
      icon: PhoneIcon,
      label: 'Phone',
      value: personal.phone,
      href: `tel:${personal.phone}`
    },
    {
      icon: MapPinIcon,
      label: 'Location',
      value: personal.location
    },
    {
      icon: GlobeAltIcon,
      label: 'LinkedIn',
      value: 'My Profile',
      href: personal.linkedin
    }
  ]
</script>