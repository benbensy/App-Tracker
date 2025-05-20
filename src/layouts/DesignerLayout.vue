<script setup lang="ts">
import DesignerHeader from '@/components/biz/DesignerHeader.vue'
</script>

<template>
  <div class="w-full h-full flex flex-col">
    <div>
      <DesignerHeader />
    </div>
    <main class="flex-1 overflow-y-auto">
      <RouterView />
    </main>
  </div>
</template>
