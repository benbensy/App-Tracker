<script setup lang="ts">
import { useLocale } from 'element-plus'
import { ref } from 'vue'
import EpUploadFilled from '~icons/ep/upload-filled'
import MdiExitToApp from '~icons/mdi/exit-to-app'
import LogoSrc from '@/assets/images/logo.png'
import LanguageSelector from './LanguageSelector.vue'
import UploadAppInfo from './UploadAppInfo.vue'

const { t } = useLocale()

const uploadDrawerVisible = ref(false)

function goToDesigner() {
  open('/designer', '_blank')
}
</script>

<template>
  <div class="sticky top-0 z-10 w-full flex justify-between items-center px-4 py-2 shadow backdrop-blur-md gap-4">
    <RouterLink class="cursor-pointer" :to="{ name: 'home' }" custom>
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
        <ElButton link @click="uploadDrawerVisible = true">
          <ElIcon :size="20">
            <EpUploadFilled />
          </ElIcon>
        </ElButton>
        <LanguageSelector />
        <ElButton link @click="goToDesigner">
          <ElIcon :size="20">
            <MdiExitToApp />
          </ElIcon>
        </ElButton>
      </div>
    </div>
    <ElDrawer v-model="uploadDrawerVisible" size="100%" :title="t('uploadAppInfo')" append-to-body :open-delay="50" :lock-scroll="false" :modal="false" direction="btt" destroy-on-close>
      <UploadAppInfo @cancel="uploadDrawerVisible = false" />
    </ElDrawer>
  </div>
</template>
