<script setup lang="ts">
import type { LinkProps } from 'element-plus'
import type { RouteLocationAsPathGeneric, RouteLocationAsRelativeGeneric } from 'vue-router'

type Props = Partial<Omit<LinkProps, 'href' | 'underline' | 'type'>> & {
  to: string | RouteLocationAsRelativeGeneric | RouteLocationAsPathGeneric
}

defineProps<Props>()
</script>

<template>
  <RouterLink :to="to">
    <template #default="{ isActive, href }">
      <ElLink :type="isActive ? 'primary' : 'default'" :href="href" :disabled="disabled" :icon="icon" :target="target" :underline="isActive ? 'always' : 'hover'">
        <slot />
      </ElLink>
    </template>
  </RouterLink>
</template>

<style scoped>

</style>
