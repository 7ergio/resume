<template>
    <form @submit.prevent="sendEmail" class="space-y-4">
      <div>
        <label for="name" class="block text-sm font-medium mb-1">Name</label>
        <input
          id="name"
          v-model="form.name"
          type="text"
          required
          class="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
        >
      </div>
      
      <div>
        <label for="email" class="block text-sm font-medium mb-1">Email</label>
        <input
          id="email"
          v-model="form.email"
          type="email"
          required
          class="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
        >
      </div>
      
      <div>
        <label for="message" class="block text-sm font-medium mb-1">Message</label>
        <textarea
          id="message"
          v-model="form.message"
          rows="4"
          required
          class="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
        ></textarea>
      </div>
      
      <button
        type="submit"
        class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
      >
        Send Message
      </button>
    </form>
  </template>
  
  <script setup lang="ts">
  import emailjs from '@emailjs/browser'

  const { personal } = useResumeData()
  const config = useRuntimeConfig()

  const form = ref({
    name: '',
    email: '',
    message: ''
  })

  const isLoading = ref(false)
    const isSuccess = ref(false)
    const error = ref('')

    onMounted(() => {
      emailjs.init(config.public.emailJsPublicKey)
    })
  
  const sendEmail = async () => {
    if (!form.value.name || !form.value.email || !form.value.message) {
      error.value = 'Please fill all fields'
      return
    }

    isLoading.value = true
    error.value = ''

    try {
      await emailjs.send(
        config.public.emailJsServiceId,
        config.public.emailJsTemplateId,
        {
          from_name: form.value.name,
          from_email: form.value.email,
          message: form.value.message,
          to_email: personal.email
        },
        config.public.emailJsPublicKey
      )

      isSuccess.value = true
      form.value = { name: '', email: '', message: '' }
      setTimeout(() => isSuccess.value = false, 3000)
    } catch (err) {
      error.value = 'Failed to send message. Please try again later.'
      console.error('EmailJS error:', err)
    } finally {
      isLoading.value = false
    }
  }
  </script>