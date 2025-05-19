import type locales from '@/locales'
import { defineStore } from 'pinia'

import { ref } from 'vue'

export const useAppStore = defineStore('app', () => {
  const language = ref<keyof typeof locales>('en')

  return {
    language,
  }
}, {
  persist: true,
})
