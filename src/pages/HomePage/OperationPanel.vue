<script setup lang="ts">
import { ElButton, ElMessage, ElText } from 'element-plus'
import { useLocale } from 'element-plus'
import { createAppFilter } from '@/utils/appFilter'

const props = defineProps<{ rows: any[] }>()

const { t } = useLocale()

async function handleCopyAppFilter() {
    const appFilter = createAppFilter(props.rows.map(row => ({
        ...row,
        appName: row.defaultName,
    })))

    await navigator.clipboard.writeText(appFilter)
    ElMessage.success(t('copySuccess'))
}
</script>

<template>
  <div class="w-full h-full px-6 py-4 bg-gray-50 flex flex-col gap-2">
    <div>
        <ElText>
        {{ t('batchOperation') }}
        </ElText>
    </div>
    <div class="flex flex-wrap flex-row  gap-2">
        <ElButton size="small" type="primary" @click="handleCopyAppFilter">
      {{ t('copyAppFilter') }}
    </ElButton>

    <ElButton size="small" type="primary">
      {{ t('export') }}
    </ElButton> 
    </div>
  </div>
</template>

<style scoped>
.el-form-item {
    margin-bottom: 0;
}
</style>
