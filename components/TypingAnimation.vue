<template>
  <div class="terminal min-h-[120px] p-4 bg-gray-900 flex justify-center items-center">
    <div ref="typingElement" class="text-green-400 font-mono text-lg h-fit"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const phrases = [
  "Hey there! 👋",
  "Welcome to my corner of the web.",
  "Let me introduce myself...",
  "I build things for the browser, love solving puzzles, and ride mountains when I can!))"
]

const typingElement = ref<HTMLElement | null>(null)
const typingSpeed = 50
const deletingSpeed = 30
const pauseBetween = 1500

let timeoutId: ReturnType<typeof setTimeout> | null = null

onMounted(() => {
  let phraseIndex = 0
  let charIndex = 0
  let isDeleting = false

  const type = () => {
    const currentPhrase = phrases[phraseIndex]

    if (!typingElement.value) return

    if (isDeleting) {
      typingElement.value.textContent = currentPhrase.substring(0, charIndex - 1)
      charIndex--
    } else {
      typingElement.value.textContent = currentPhrase.substring(0, charIndex + 1)
      charIndex++
    }

    let delay = isDeleting ? deletingSpeed : typingSpeed

    if (!isDeleting && charIndex === currentPhrase.length) {
      delay = pauseBetween
      isDeleting = true
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false
      phraseIndex = (phraseIndex + 1) % phrases.length
      delay = 500
    }

    timeoutId = setTimeout(type, delay)
  }

  timeoutId = setTimeout(type, 1000)
})

onUnmounted(() => {
  if (timeoutId !== null) {
    clearTimeout(timeoutId)
  }
})
</script>

<style>
.terminal {
  border: 1px solid #2e7d32;
  box-shadow: 0 0 10px rgba(46, 125, 50, 0.3);
}

/* Blinking cursor effect */
.font-mono::after {
  content: "▋";
  animation: blink 1s step-end infinite;
  @apply text-green-400;
}

@keyframes blink {
  from, to { opacity: 1 }
  50% { opacity: 0 }
}
</style>
