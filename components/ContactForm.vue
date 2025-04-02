<template>
  <form @submit.prevent="handleSubmit" class="space-y-4">
    <div>
      <label for="name" class="block text-sm font-medium mb-1">Name</label>
      <input
        id="name"
        v-model="form.name"
        type="text"
        @input="validateField('name')"
        @blur="touchField('name')"
        class="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
        :class="{ 'border-red-500': errors.name && touched.name }"
      >
      <p v-if="errors.name && touched.name" class="mt-1 text-sm text-red-500">{{ errors.name }}</p>
    </div>
    
    <div>
      <label for="email" class="block text-sm font-medium mb-1">Email</label>
      <input
        id="email"
        v-model="form.email"
        type="email"
        @input="validateField('email')"
        @blur="touchField('email')"
        class="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
        :class="{ 'border-red-500': errors.email && touched.email }"
      >
      <p v-if="errors.email && touched.email" class="mt-1 text-sm text-red-500">{{ errors.email }}</p>
    </div>
    
    <div>
      <label for="message" class="block text-sm font-medium mb-1">Message</label>
      <textarea
        id="message"
        v-model="form.message"
        rows="4"
        @input="validateField('message')"
        @blur="touchField('message')"
        class="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
        :class="{ 'border-red-500': errors.message && touched.message }"
      ></textarea>
      <p v-if="errors.message && touched.message" class="mt-1 text-sm text-red-500">{{ errors.message }}</p>
    </div>
    
    <div v-if="error" class="p-3 bg-red-100 text-red-700 rounded-md">
      {{ error }}
    </div>
    
    <div v-if="isSuccess" class="p-3 bg-green-100 text-green-700 rounded-md">
      Message sent successfully!
    </div>
    
    <button
      type="submit"
      class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
      :disabled="isLoading"
    >
      <span v-if="isLoading">Sending...</span>
      <span v-else>Send Message</span>
    </button>
  </form>
</template>

<script setup lang="ts">
import emailjs from '@emailjs/browser'
import { ref, reactive } from 'vue'

const { personal } = useResumeData()
const config = useRuntimeConfig()

const form = reactive({
  name: '',
  email: '',
  message: ''
})

const errors = reactive({
  name: '',
  email: '',
  message: ''
})

const touched = reactive({
  name: false,
  email: false,
  message: false
})

const isLoading = ref(false)
const isSuccess = ref(false)
const error = ref('')

onMounted(() => {
  emailjs.init(config.public.emailJsPublicKey)
})

// Email validation with regex
const isValidEmail = (email: string): boolean => {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return re.test(String(email).toLowerCase())
}

// Validate a specific field
const validateField = (field: 'name' | 'email' | 'message') => {
  if (field === 'name') {
    if (!form.name.trim()) {
      errors.name = 'Name is required'
    } else if (form.name.trim().length < 2) {
      errors.name = 'Name must be at least 2 characters'
    } else {
      errors.name = ''
    }
  }
  
  if (field === 'email') {
    if (!form.email.trim()) {
      errors.email = 'Email is required'
    } else if (!isValidEmail(form.email)) {
      errors.email = 'Please enter a valid email address'
    } else {
      errors.email = ''
    }
  }
  
  if (field === 'message') {
    if (!form.message.trim()) {
      errors.message = 'Message is required'
    } else if (form.message.trim().length < 10) {
      errors.message = 'Message must be at least 10 characters'
    } else {
      errors.message = ''
    }
  }
}

// Mark a field as touched (for showing errors after user interaction)
const touchField = (field: 'name' | 'email' | 'message') => {
  touched[field] = true
}

// Validate all fields
const validateForm = (): boolean => {
  validateField('name')
  validateField('email')
  validateField('message')
  
  // Mark all fields as touched to show all errors
  touched.name = true
  touched.email = true
  touched.message = true
  
  return !errors.name && !errors.email && !errors.message
}

const handleSubmit = async () => {
  error.value = ''
  
  if (!validateForm()) {
    return
  }
  
  isLoading.value = true
  
  try {
    await emailjs.send(
      config.public.emailJsServiceId,
      config.public.emailJsTemplateId,
      {
        from_name: form.name,
        from_email: form.email,
        message: form.message,
        to_email: personal.email
      },
      config.public.emailJsPublicKey
    )
    
    isSuccess.value = true
    form.name = ''
    form.email = ''
    form.message = ''
    
    // Reset touched and errors state
    Object.keys(touched).forEach(key => {
      touched[key as keyof typeof touched] = false
    })
    Object.keys(errors).forEach(key => {
      errors[key as keyof typeof errors] = ''
    })
    
    setTimeout(() => isSuccess.value = false, 3000)
  } catch (err) {
    error.value = 'Failed to send message. Please try again later.'
    console.error('EmailJS error:', err)
  } finally {
    isLoading.value = false
  }
}
</script>