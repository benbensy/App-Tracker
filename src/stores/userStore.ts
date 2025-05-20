import type { SignInResult } from '@/data/designer'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserStore = defineStore('user', () => {
  const token = ref<string>()
  const id = ref<string>()
  const email = ref<string>()
  const name = ref<string>()

  function saveLoginInfo(loginInfo: Omit<SignInResult, 'createdAt'>) {
    token.value = loginInfo.token
    id.value = loginInfo.id
    email.value = loginInfo.email
    name.value = loginInfo.name
  }

  function clearLoginInfo() {
    token.value = undefined
    id.value = undefined
    email.value = undefined
    name.value = undefined
  }

  return {
    token,
    id,
    email,
    name,
    saveLoginInfo,
    clearLoginInfo,
  }
}, {
  persist: {
    pick: ['token'],
  },
})
