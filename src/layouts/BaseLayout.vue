<script setup lang="ts">
import AppHeader from '@/components/AppHeader.vue'
</script>

<template>
  <div class="w-full h-full flex flex-col">
    <div>
      <AppHeader />
    </div>
    <main class="flex-1 overflow-y-auto">
      <RouterView />
    </main>
  </div>
</template>
