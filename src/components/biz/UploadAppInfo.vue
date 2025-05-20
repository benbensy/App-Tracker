<script setup lang="ts">
import type { ApkInfoType } from 'app-info-parser-dist/types'
import type { UploadFile } from 'element-plus'

import ApkParser from 'app-info-parser-dist'
import { ElMessage, useLocale } from 'element-plus'

import { computed, onErrorCaptured, ref, watch } from 'vue'
import { useRequest } from 'vue-request'
import EpPlus from '~icons/ep/plus'
import { createOrUpdateAppInfo } from '@/data/app-info'
import AppInfoSubForm from './AppInfoSubForm.vue'

const emit = defineEmits<{
  cancel: []
}>()

const { t } = useLocale()

const apkFileList = ref<UploadFile[]>([])

const parsedApkInfo = ref<ApkInfoType | null>(null)

watch(() => apkFileList.value.at(0), async (value) => {
  if (value) {
    const parser = new ApkParser(value.raw!)
    const result = await parser.parse() as ApkInfoType
    parsedApkInfo.value = result
  }
  else {
    parsedApkInfo.value = null
  }
})

const formValues = computed(() => {
  const defaultName = parsedApkInfo.value?.application.label.find(item => item.locate === 'default')?.value || ''

  const result = parsedApkInfo.value?.application.label.map(item => ({
    defaultName,
    languageCode: item.region ? `${item.locate}-${item.region.split('-')[0]}` : item.locate,
    localizedName: item.value,
    packageName: parsedApkInfo.value!.package,
    mainActivity: parsedApkInfo.value!.application.launcherActivities.at(0)!.name,
  })) || []

  return result
})

const { runAsync } = useRequest(() => createOrUpdateAppInfo(formValues.value), {
  manual: true,
})

function handleExceed() {
  ElMessage.error(t('uploadExceed'))
}

async function handleSubmit() {
  await runAsync()
  ElMessage.success(t('success'))
  emit('cancel')
}

onErrorCaptured((error) => {
  ElMessage.error(error.message)
})
</script>

<template>
  <ElCard>
    <div class="w-full flex flex-col gap-2">
      <div class="text-left" size="large">
        <ElUpload v-model:file-list="apkFileList" accept=".apk" :auto-upload="false" :limit="1" @exceed="handleExceed">
          <ElButton :icon="EpPlus">
            {{ t('parseApk') }}
          </ElButton>
        </ElUpload>
      </div>
      <ElForm v-if="parsedApkInfo" label-position="right" label-width="120px" disabled>
        <ElFormItem :label="t('defaultName')">
          <ElInput :model-value="formValues?.at(0)?.defaultName" :placeholder="t('defaultName')" />
        </ElFormItem>
        <ElFormItem :label="t('packageName')">
          <ElInput :model-value="formValues?.at(0)?.packageName" />
        </ElFormItem>
        <ElFormItem :label="t('mainActivity')">
          <ElInput :model-value="formValues?.at(0)?.mainActivity" />
        </ElFormItem>
      </ElForm>
    </div>
    <ElDivider v-if="parsedApkInfo" />
    <ElTabs v-if="parsedApkInfo" type="card">
      <ElTabPane v-for="item in formValues" :key="item.languageCode" :label="item.languageCode">
        <AppInfoSubForm :language-code="item.languageCode" :localized-names="item.localizedName" />
      </ElTabPane>
    </ElTabs>
    <template #footer>
      <div class="w-full flex justify-end gap-2">
        <ElButton @click="$emit('cancel')">
          {{ t('cancel') }}
        </ElButton>
        <ElButton type="primary" @click="handleSubmit">
          {{ t('save') }}
        </ElButton>
      </div>
    </template>
  </ElCard>
</template>
