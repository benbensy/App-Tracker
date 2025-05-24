<script setup lang="ts">
import type { FormItemProp } from 'element-plus'
import { ElMessage, useLocale } from 'element-plus'
import { isUndefined } from 'es-toolkit'
import { computed, ref, watch } from 'vue'
import EpSearch from '~icons/ep/search'
import { useForm } from '@/composables/useForm'

interface SearchConfig {
  token: string | undefined
  label: string
  suggestions?: string[]
}

interface ModelItem {
  token: string | undefined
  value: string
}

interface Props {
  modelValue: ModelItem[]
  configs?: SearchConfig[]
  predicate?: string
  placeholder?: string
}

const props = withDefaults(defineProps<Props>(), {
  predicate: ':',
  placeholder: '',
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: ModelItem[]): void
  (e: 'search', value: ModelItem[]): void
}>()

const { t } = useLocale()

const tokenMatchPattern = new RegExp(`(\\S+)?${props.predicate}(\\S*)`, 'g')

const { formRef, formValues, createRules, submit, clearValidate } = useForm({
  initialValues: {
    inputValue: '',
  },
  onSubmit() {
    emit('search', props.modelValue)
  },
})

const rules = createRules(() => ({
  inputValue: [
    { validator: (_rule, _value, callback) => {
      if (props.modelValue.length === 0) {
        callback(new Error(t('inputValueRequired')))
      }
      callback()
    }, message: '', trigger: [] },
  ],
}))

const currentMatches = computed(() => {
  return Array.from(formValues.value.inputValue.matchAll(tokenMatchPattern))
})

watch(() => formValues.value.inputValue, (value) => {
  const inputWords = value.split(/\s+/).filter(Boolean)
  const result = inputWords.map((word) => {
    const match = currentMatches.value.find(m => m[0] === word)
    if (match) {
      return {
        token: match[1],
        value: match[2],
      }
    }
    return {
      token: undefined,
      value: word,
    }
  }).filter((item): item is ModelItem => !isUndefined(item))

  emit('update:modelValue', result)
})

watch(() => props.modelValue, (value) => {
  formValues.value.inputValue = value
    .map((item) => {
      if (item.token === undefined)
        return item.value
      return `${item.token}${props.predicate}${item.value}`
    })
    .join(' ')
}, { immediate: true, deep: true, once: true })

const currentSuggestionToken = computed(() => {
  const matches = currentMatches.value
  const lastMatch = matches.at(-1)

  const isEndWithEmpty = lastMatch?.input.trimEnd().length !== lastMatch?.input.length

  if (!lastMatch || isEndWithEmpty)
    return undefined

  const remainingText = formValues.value.inputValue.slice(lastMatch.index! + lastMatch[0].length).trimEnd()
  if (remainingText === '') {
    return lastMatch[1]
  }
  return undefined
})

const currentSuggestions = computed(() => {
  const config = props.configs?.find(config => config.token === currentSuggestionToken.value)
  return config?.suggestions || []
})

const usedTokens = computed(() => {
  return [...new Set(props.modelValue.map(item => item.token))]
})

function handleClickSuggestion(suggestion: string) {
  const matches = currentMatches.value
  if (matches.length === 0)
    return

  const lastMatch = matches[matches.length - 1]
  const [fullMatch, key] = lastMatch

  formValues.value.inputValue = `${formValues.value.inputValue.substring(0, lastMatch.index)
  }${key}${props.predicate}${suggestion}${
    formValues.value.inputValue.substring(lastMatch.index! + fullMatch.length)}`
}

async function handleClickTag(token: string | undefined) {
  if (formValues.value.inputValue.endsWith(' ')) {
    formValues.value.inputValue += `${token}${props.predicate}`
  }
  else {
    formValues.value.inputValue += ` ${token}${props.predicate}`
  }
}

defineExpose({
  search: submit,
})

const isFocused = ref(false)

function handleValidate(_prop: FormItemProp, isValid: boolean) {
  if (!isValid) {
    ElMessage.error(t('inputValueRequired'))
  }
}
</script>

<template>
  <el-card body-class="p-0 rounded-xl" shadow="never">
    <div class="flex flex-col">
      <ElForm ref="formRef" :model="formValues" :rules="rules" @validate="handleValidate" @submit.prevent>
        <ElFormItem class="mb-0" prop="inputValue">
          <ElInput
            v-model="formValues.inputValue"
            :prefix-icon="EpSearch"
            clearable
            :placeholder="placeholder"
            @keyup.enter="submit()"
            @focus="isFocused = true; clearValidate()"
            @blur="isFocused = false"
          >
            <template #append>
              <ElButton :icon="EpSearch" @click="submit()" />
            </template>
          </ElInput>
        </ElFormItem>
      </ElForm>
      <div v-show="currentSuggestions.length > 0 && isFocused" class="w-full flex flex-col items-start p-2">
        <ElText v-for="suggestion in currentSuggestions" :key="suggestion" size="small" class="w-full rounded cursor-pointer px-2 hover:bg-gray-100 p-1 text-left" @click="handleClickSuggestion(suggestion)" @mousedown.prevent>
          {{ suggestion }}
        </ElText>
      </div>
    </div>
    <template v-if="isFocused" #footer>
      <div class="flex flex-row flex-wrap items-center gap-2">
        <ElText>{{ t('searchConditions') }}: </ElText>
        <div class="flex flex-row gap-2">
          <ElTag v-for="config in configs" :key="config.token" :class="{ 'is-used': usedTokens.includes(config.token) }" class="cursor-pointer" @click="handleClickTag(config.token)" @mousedown.prevent>
            {{ config.label }}
          </ElTag>
        </div>
      </div>
    </template>
  </el-card>
</template>

<style scoped>
.el-card {
    @apply border-0;
}

.el-input {
    @apply rounded-xl;
}

.el-tag.is-used {
    @apply border-blue;
}

:deep(.el-card__footer) {
    @apply border-t-0;
}
</style>
