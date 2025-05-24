<script setup lang="ts">
import { useLocale } from 'element-plus'

const { t } = useLocale()

defineProps<{ row: any }>()
</script>

<template>
    <div class="px-8 py-8 bg-gray-50 grid grid-cols-2 gap-2">
              <ElFormItem class="col-span-2">
                <template #label>
                    <ElText>
                        {{ t('icon') }}:
                    </ElText>
                </template>
                <ElImage class="w-10 h-10" fit="contain" :src="`/api/app-icon?packageName=${row.packageName}`" />
              </ElFormItem>
              <ElFormItem class="col-span-2">
                <template #label>
                    <ElText>
                        {{ t('name') }}:
                    </ElText>
                </template>
                <ElText>
                    {{ row.defaultName }}
                </ElText>
              </ElFormItem>
              <ElFormItem class="col-span-2">
                <template #label>
                    <ElText>
                        {{ t('packageName') }}:
                    </ElText>
                </template>
                <ElText>
                    {{ row.packageName }}
                </ElText>
              </ElFormItem>
              <ElFormItem class="col-span-2">
                <template #label>
                    <ElText>
                        {{ t('mainActivity') }}:
                    </ElText>
                </template>
                <ElText>
                    {{ row.mainActivity }}
                </ElText>
              </ElFormItem>
            </div>
</template>

<style scoped>
.el-form-item {
    margin-bottom: 0;
}
</style>