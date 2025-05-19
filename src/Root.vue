<script setup lang="ts">
import { computed } from 'vue'

import locales from './locales'
import { useAppStore } from './stores/appStore'

const appStore = useAppStore()
const currentLocale = computed(() => locales[appStore.language!].translation)
</script>

<template>
  <ElConfigProvider :locale="currentLocale">
    <RouterView>
      <template #default="{ Component }">
        <KeepAlive>
          <component :is="Component" />
        </KeepAlive>
      </template>
    </RouterView>
  </ElConfigProvider>
</template>
