<script setup lang="ts">
import { useLocale } from 'element-plus'

defineProps<{
  languageCode: string
  localizedNames: string
}>()

const { t } = useLocale()
</script>

<template>
  <ElForm label-position="right" label-width="120px" disabled>
    <ElFormItem :label="t('languageCode')">
      <ElInput :model-value="languageCode" :placeholder="t('languageCode')" />
    </ElFormItem>
    <ElFormItem :label="t('localizedNames')">
      <ElInput :model-value="localizedNames" :placeholder="t('localizedNames')" />
    </ElFormItem>
  </ElForm>
</template>
