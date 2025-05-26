<script setup lang="ts">
import { createAppFilterItem } from '@/utils/appFilter';
import { ElMessage, useLocale } from 'element-plus'
import EpCopyDocument from '~icons/ep/copy-document';
const props = defineProps<{ row: any }>()

const { t } = useLocale()

async function handleCopyAppFilterItem() {
    const appFilter = createAppFilterItem({
        ...props.row,
        appName: props.row.defaultName,
    })

    await navigator.clipboard.writeText(appFilter)
    ElMessage.success(t('copySuccess'))
}
</script>

<template>
  <div class="w-full h-full px-6 py-4 bg-gray-50 flex flex-col gap-2">
    <!-- App Icon -->
    <div class="flex items-center gap-4">
      <ElText class="w-20 flex-shrink-0">
        {{ t('icon') }}:
      </ElText>
      <ElImage
        class="w-10 h-10"
        fit="contain"
        :src="`/api/app-icon?packageName=${row.packageName}`"
      />
    </div>

    <!-- App Name -->
    <div class="flex gap-4">
      <ElText class="w-20 flex-shrink-0">
        {{ t('name') }}:
      </ElText>
      <ElText class="flex-1">
        {{ row.defaultName }}
      </ElText>
    </div>

    <!-- Package Name -->
    <div class="flex gap-4">
      <ElText class="w-20 flex-shrink-0">
        {{ t('packageName') }}:
      </ElText>
      <ElText class="flex-1">
        {{ row.packageName }}
      </ElText>
    </div>

    <!-- Main Activity -->
    <div class="flex gap-4">
      <ElText class="w-20 flex-shrink-0">
        {{ t('mainActivity') }}:
      </ElText>
      <ElText class="flex-1">
        {{ row.mainActivity }}
      </ElText>
    </div>

    <!-- Operation -->
    <div class="flex gap-4">
      <ElText class="w-20 flex-shrink-0">
        {{ t('operation') }}:
      </ElText>
      <ElText class="flex-1">
        <ElButton type="primary" link :icon="EpCopyDocument" @click="handleCopyAppFilterItem">
          {{ t('copyAppFilterItem') }}
        </ElButton>
        <ElButton type="primary" link>
          {{ t('export') }}
        </ElButton>
      </ElText>
    </div>
  </div>
</template>

<style scoped>
.el-form-item {
    margin-bottom: 0;
}
</style>
