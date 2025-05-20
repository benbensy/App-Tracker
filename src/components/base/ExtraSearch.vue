<script setup lang="ts">
import { useLocale } from 'element-plus'
import { isUndefined } from 'es-toolkit'
import { computed, ref, useTemplateRef, watch } from 'vue'
import EpSearch from '~icons/ep/search'

interface SearchConfig {
  token: string
  label: string
  suggestions?: string[]
}

interface ModelItem {
  token: string
  value: string
}

interface Props {
  modelValue: ModelItem[]
  configs: SearchConfig[]
}

const props = defineProps<Props>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: ModelItem[]): void
  (e: 'search', value: ModelItem[]): void
}>()

const { t } = useLocale()

const tokenMatchPattern = /(\S+):(\S*)/g

const inputValue = ref('')

const inputRef = useTemplateRef('input')

// 获取所有有效的 token
const validTokens = computed(() => props.configs.map(config => config.token))

watch(() => props.modelValue, (value) => {
  // 过滤掉不在 configs 中的 token
  const filteredValue = value.filter((item) => {
    if (item.token === '')
      return true
    return validTokens.value.includes(item.token)
  })

  inputValue.value = filteredValue
    .map((item) => {
      if (item.token === '')
        return item.value
      return `${item.token}:${item.value}`
    })
    .join(' ')
}, { immediate: true, deep: true })

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
    return undefined
  }).filter((item): item is ModelItem => !isUndefined(item))

  // 过滤掉不在 configs 中的 token
  const filteredResult = result.filter((item) => {
    if (item.token === '')
      return true
    return validTokens.value.includes(item.token)
  })

  emit('update:modelValue', filteredResult)
})

const currentSuggestionToken = computed(() => {
  const matches = currentMatches.value
  const lastMatch = matches.at(-1)

  if (!lastMatch)
    return undefined

  const remainingText = inputValue.value.slice(lastMatch.index! + lastMatch[0].length).trimEnd()
  if (remainingText === '') {
    return lastMatch[1]
  }
  return undefined
})

const currentSuggestions = computed(() => {
  const config = props.configs.find(config => config.token === currentSuggestionToken.value)
  return config?.suggestions || []
})

const usedTokens = computed(() => {
  return [...new Set(props.modelValue.map(item => item.token))]
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

function handleSearch() {
  emit('search', props.modelValue)
}

function handleClickTag(token: string) {
  emit('update:modelValue', [...props.modelValue, { token, value: '' }])
  inputRef.value?.focus()
}
</script>

<template>
  <el-card body-class="p-0 rounded-xl" shadow="never">
    <div class="flex flex-col">
      <ElInput
        ref="input"
        v-model="inputValue"
        :prefix-icon="EpSearch"
        clearable
        @keyup.enter="handleSearch"
      />
      <div v-show="currentSuggestions.length > 0" class="w-full flex flex-col items-start p-2">
        <ElText v-for="suggestion in currentSuggestions" :key="suggestion" size="small" class="w-full rounded cursor-pointer px-2 hover:bg-gray-100 p-1 text-left" @click="handleSuggestionClick(suggestion)">
          {{ suggestion }}
        </ElText>
      </div>
    </div>
    <template #footer>
      <div class="flex flex-row flex-wrap items-center gap-2">
        <ElText>{{ t('searchConditions') }}: </ElText>
        <div class="flex flex-row gap-2">
          <ElTag v-for="config in configs" :key="config.token" :class="{ 'is-used': usedTokens.includes(config.token) }" class="cursor-pointer" @click="handleClickTag(config.token)">
            {{ config.label }}
          </ElTag>
        </div>
      </div>
    </template>
  </el-card>
</template>

<style scoped>
.el-input {
    @apply rounded-xl;
}

.el-tag.is-used {
    @apply border-blue;
}
</style>
