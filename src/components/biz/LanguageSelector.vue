<script setup lang="ts">
import { map, toPairs } from 'es-toolkit/compat'
import MdiLanguage from '~icons/mdi/language'
import locales from '@/locales'
import { useAppStore } from '@/stores/appStore'

type LocaleKey = keyof typeof locales

interface Props {
  size?: number
}

withDefaults(defineProps<Props>(), {
  size: 20,
})

const appStore = useAppStore()

const localeOptions = map(toPairs(locales), ([value, { description: label }]) => ({
  value: value as LocaleKey,
  label,
}))

function handleSelect(value: LocaleKey) {
  appStore.language = value
}
</script>

<template>
  <ElDropdown trigger="click">
    <ElButtonGroup>
      <ElButton link>
        <ElIcon :size="size">
          <MdiLanguage />
        </ElIcon>
      </ElButton>
    </ElButtonGroup>
    <template #dropdown>
      <ElDropdownMenu>
        <ElDropdownItem v-for="locale of localeOptions" :key="locale.value" @click="handleSelect(locale.value)">
          {{ locale.label }}
        </ElDropdownItem>
      </ElDropdownMenu>
    </template>
  </ElDropdown>
</template>
