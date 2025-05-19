<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import EpSearch from '~icons/ep/search'

interface SearchConfig {
  token: string
  suggestions?: string[]
}

interface Props {
  modelValue: Record<string, string[]>[]
  configs: SearchConfig[]
}

const props = defineProps<Props>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: Record<string, string>[]): void
  (e: 'search', value: Record<string, string>[]): void
}>()

const tokenMatchPattern = /(\S+):(\S*)/g

const inputValue = ref('')

watch(() => props.modelValue, (value) => {
  inputValue.value = value
    .map((item) => {
      const key = Object.keys(item)[0]
      const value = Object.values(item)[0]
      return `${key}:${value}`
    })
    .join(' ')
}, { immediate: true, deep: true, once: true })

const currentMatches = computed(() => {
  return Array.from(inputValue.value.matchAll(tokenMatchPattern))
})

watch(inputValue, (value) => {
  const inputWords = value.split(' ').filter(word => word.trim())
  const result = inputWords.map((word) => {
    const match = currentMatches.value.find(m => m[0] === word)
    if (match) {
      return {
        token: match[1],
        value: match[2],
      }
    }
    return {
      token: '',
      value: word,
    }
  })

  emit('update:modelValue', result)
})

const currentSuggestionToken = computed(() => {
  const matches = currentMatches.value

  if (matches.length > 0) {
    const lastMatch = matches.at(-1)
    if (!lastMatch)
      return undefined
    const [fullMatch, token] = lastMatch

    const remainingText = inputValue.value.slice(lastMatch.index! + fullMatch.length).trimEnd()
    if (remainingText === '') {
      return token
    }
  }
  return undefined
})

const currentSuggestions = computed(() => {
  const config = props.configs.find(config => config.token === currentSuggestionToken.value)
  return config?.suggestions || []
})

function handleSuggestionClick(suggestion: string) {
  const matches = currentMatches.value
  if (matches.length === 0)
    return

  const lastMatch = matches[matches.length - 1]
  const [fullMatch, key] = lastMatch

  inputValue.value = `${inputValue.value.substring(0, lastMatch.index)
  }${key}:${suggestion}${
    inputValue.value.substring(lastMatch.index! + fullMatch.length)}`
}
</script>

<template>
  <el-card body-class="p-0 rounded-xl" shadow="never">
    <div class="flex flex-col">
      <ElInput
        v-model="inputValue"
        :suffix-icon="EpSearch"
        clearable
      />
      <div v-show="currentSuggestions.length > 0" class="w-full flex flex-col items-start p-2">
        <ElText v-for="suggestion in currentSuggestions" :key="suggestion" size="small" class="w-full rounded cursor-pointer px-2 hover:bg-gray-100 p-1 text-left" @click="handleSuggestionClick(suggestion)">
          {{ suggestion }}
        </ElText>
      </div>
    </div>
  </el-card>
</template>

<style scoped>
.el-input {
    @apply rounded-xl;
}
</style>
