<script setup lang="ts">
import type { VNode } from 'vue'
import { provide, ref } from 'vue'
import { TooltipInjectionKey } from './composable'

const visible = ref(false)
const virtualRef = ref<any>()
const content = ref<string | VNode | undefined>()

provide(TooltipInjectionKey, {
  visible,
  virtualRef,
  content,
})
</script>

<template>
  <ElTooltip :visible="visible" :virtual-ref="virtualRef" virtual-triggering :disabled="!virtualRef">
    <template #content>
      <template v-if="typeof content === 'string'">
        {{ content }}
      </template>
      <component :is="content" v-else />
    </template>
  </ElTooltip>
  <slot />
</template>
