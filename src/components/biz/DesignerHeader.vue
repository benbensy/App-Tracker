<script setup lang="ts">
import { useLocale } from 'element-plus'
import { useRouter } from 'vue-router'
import LogoSrc from '@/assets/images/logo.png'
import LanguageSelector from './LanguageSelector.vue'

const { t } = useLocale()
const router = useRouter()

function goToSignIn() {
  router.push({ name: 'auth-sign-in' })
}
</script>

<template>
  <div class="sticky top-0 z-10 w-full flex justify-between items-center px-4 py-2 shadow backdrop-blur-md gap-4 bg-white/80">
    <RouterLink class="cursor-pointer" :to="{ name: 'designer-home' }" custom>
      <template #default="{ navigate }">
        <ElImage :style="{ height: '32px' }" fit="contain" :z-index="999" :src="LogoSrc" alt="Logo" @click="navigate()" />
      </template>
    </RouterLink>

    <el-text size="large" type="primary" class="mr-auto pointer-events-none">
      App Tracker /d
    </el-text>

    <div class="flex items-center gap-4">
      <nav class="flex gap-4">
        <div />
      </nav>
      <div class="flex gap-4 ml-auto">
        <LanguageSelector />
        <ElDropdown trigger="click">
          <ElAvatar :size="26" />
          <template #dropdown>
            <ElDropdownMenu>
              <ElDropdownItem @click="goToSignIn">
                {{ t('signIn') }}
              </ElDropdownItem>
            </ElDropdownMenu>
          </template>
        </ElDropdown>
      </div>
    </div>
  </div>
</template>
