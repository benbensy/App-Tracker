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
    <ElFormItem :label="t('localizedName')">
      <ElInput :model-value="localizedNames" :placeholder="t('localizedName')" />
    </ElFormItem>
  </ElForm>
</template>
