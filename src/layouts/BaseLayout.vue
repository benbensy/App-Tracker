<script setup lang="ts">
import AppHeader from '@/components/biz/AppHeader.vue'
</script>

<template>
  <div class="w-full h-full flex flex-col">
    <div>
      <AppHeader />
    </div>
    <main class="flex-1 overflow-y-auto">
      <div class="w-full flex flex-row justify-center">
        <RouterView />
      </div>
    </main>
  </div>
</template>
