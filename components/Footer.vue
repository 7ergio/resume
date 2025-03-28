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

<template>
  <footer class="bg-gray-100 dark:bg-gray-800 py-8 mt-12">
    <div class="container mx-auto px-4">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h3 class="text-lg font-semibold mb-4">Contact Me</h3>
          <p class="text-gray-600 dark:text-gray-400 mb-4">
            If you have any questions, suggestions, just want to drink beers or work together, feel free to send me a message.
          </p>
          <form @submit.prevent="sendEmail" class="space-y-4">
            <div>
              <label for="name" class="block text-sm font-medium mb-1">Name</label>
              <input
                id="name"
                v-model="form.name"
                type="text"
                class="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
                required
              />
            </div>
            <div>
              <label for="email" class="block text-sm font-medium mb-1">Email</label>
              <input
                id="email"
                v-model="form.email"
                type="email"
                class="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
                required
              />
            </div>
            <div>
              <label for="message" class="block text-sm font-medium mb-1">Message</label>
              <textarea
                id="message"
                v-model="form.message"
                rows="4"
                class="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
                required
              ></textarea>
            </div>
            <button
              type="submit"
              class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              :disabled="isLoading"
            >
              {{ isLoading ? 'Sending...' : 'Send Message' }}
            </button>
            <p v-if="error" class="text-red-500 text-sm mt-2">{{ error }}</p>
            <p v-if="isSuccess" class="text-green-500 text-sm mt-2">
              Awesome! The message sent successfully!
            </p>
          </form>
        </div>
        <div>
          <h3 class="text-lg font-semibold mb-4">Contact Information</h3>
          <ul class="space-y-2">
            <li class="flex items-center">
              <span class="i-heroicons-envelope mr-2"></span>
              <a :href="`mailto:${personal.email}`" class="hover:text-blue-600 dark:hover:text-blue-400">
                {{ personal.email }}
              </a>
            </li>
            <li class="flex items-center">
              <span class="i-heroicons-phone mr-2"></span>
              <a :href="`tel:${personal.phone}`" class="hover:text-blue-600 dark:hover:text-blue-400">
                {{ personal.phone }}
              </a>
            </li>
            <li class="flex items-center">
              <span class="i-heroicons-map-pin mr-2"></span>
              {{ personal.location }}
            </li>
            <li class="flex items-center">
              <span class="i-heroicons-globe-alt mr-2"></span>
              <a :href="personal.linkedin" target="_blank" class="hover:text-blue-600 dark:hover:text-blue-400">
                LinkedIn Profile
              </a>
            </li>
          </ul>
          <a 
            href="/CV-Bilous.pdf" 
            download="Serhii_Bilous_CV.pdf"
            class="inline-block mt-4 px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors"
          >
            Download CV
          </a>
        </div>
      </div>
      <div class="mt-8 pt-4 border-t border-gray-200 dark:border-gray-700 text-center text-sm text-gray-600 dark:text-gray-400">
        &copy; {{ new Date().getFullYear() }} {{ personal.name }}. All rights reserved.
      </div>
    </div>
  </footer>
</template>