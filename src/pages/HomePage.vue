<script setup lang="ts">
import { useQuery } from '@tanstack/vue-query'
import { ElMessage, useLocale } from 'element-plus'
import { pickBy } from 'es-toolkit'
import { computed, ref } from 'vue'
import EpCopyDocument from '~icons/ep/copy-document'
import ExtraSearch from '@/components/base/ExtraSearch.vue'
import { searchAppInfos } from '@/data/app-info'

const { t } = useLocale()

const searchModel = ref<{ token: string, value: string }[]>([])

const byNameText = computed(() => searchModel.value.filter(item => item.token === 'byName').map(item => item.value).join(' '))
const byPackageNameText = computed(() => searchModel.value.filter(item => item.token === 'byPackageName').map(item => item.value).join(' '))
const byMainActivityText = computed(() => searchModel.value.filter(item => item.token === 'byMainActivity').map(item => item.value).join(' '))

const searchConfigs = computed(() => [
  {
    token: 'byName',
    label: t('name'),
    suggestions: [
      'QQ',
      'WeChat',
      'Weibo',
    ],
  },
  {
    token: 'byPackageName',
    label: t('packageName'),
    suggestions: [],
  },
  {
    token: 'byMainActivity',
    label: t('mainActivity'),
    suggestions: [],
  },
])

const { data, isLoading, refetch } = useQuery({
  queryKey: ['/app-info/search'],
  queryFn: () => searchAppInfos(pickBy({
    byName: byNameText.value,
    byPackageName: byPackageNameText.value,
    byMainActivity: byMainActivityText.value,
  }, Boolean)),
  enabled: false,
})

function handleSearch() {
  refetch()
}

async function handleCopy(id: string) {
  await navigator.clipboard.writeText(id)
  ElMessage.success(t('success'))
}
</script>

<template>
  <div class="w-full h-full p-4 flex flex-col gap-4">
    <ElText class="text-2xl font-bold">
      App Tracker for Icon Pack
    </ElText>
    <ExtraSearch v-model="searchModel" :configs="searchConfigs" @search="handleSearch" />
    <ElTable
      v-if="data"
      v-loading="isLoading"
      :data="data.data.items"
      stripe
    >
      <ElTableColumn type="selection" />
      <ElTableColumn prop="defaultName" :label="t('name')" />
      <ElTableColumn prop="packageName" :label="t('packageName')" />
      <ElTableColumn prop="mainActivity" :label="t('mainActivity')" />
      <ElTableColumn :label="t('operation')" fixed="right">
        <template #default="{ row }">
          <ElButton link :icon="EpCopyDocument" @click="handleCopy(row.id)" />
        </template>
      </ElTableColumn>
    </ElTable>
  </div>
</template>
