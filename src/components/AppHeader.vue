<script setup lang="ts">
import MdiExitToApp from '~icons/mdi/exit-to-app'
import LogoSrc from '@/assets/images/logo.png'
import NavLink from '@/components/NavLink.vue'

function goToAdmin() {
  open('/admin', '_blank')
}
</script>

<template>
  <div class="sticky top-0 z-10 w-full flex justify-between items-center px-4 py-2 shadow backdrop-blur-md gap-4 bg-white/80">
    <RouterLink class="cursor-pointer" to="/" custom>
      <template #default="{ navigate }">
        <ElImage :style="{ height: '32px' }" fit="contain" :z-index="999" :src="LogoSrc" alt="Logo" @click="navigate()" />
      </template>
    </RouterLink>

    <el-text size="large" type="primary" class="mr-auto pointer-events-none">
      App Tracker
    </el-text>

    <div class="flex items-center gap-4">
      <nav class="flex gap-4">
        <div />
      </nav>
      <div class="flex gap-4 ml-auto">
        <LanguageSelector />
        <ElButton link @click="goToAdmin">
          <ElIcon :size="24">
            <MdiExitToApp />
          </ElIcon>
        </ElButton>
      </div>
    </div>
  </div>
</template>
