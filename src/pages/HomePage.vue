<script setup lang="ts">
import { ElMessage, useLocale } from 'element-plus'
import { pickBy } from 'es-toolkit'
import { computed, ref } from 'vue'
import { useRequest } from 'vue-request'
import EpCopyDocument from '~icons/ep/copy-document'
import ExtraSearch from '@/components/base/ExtraSearch.vue'
import { searchAppInfos } from '@/data/app-info'

const { t } = useLocale()

const searchModel = ref<{ token: string, value: string }[]>([])

const byNameText = computed(() => searchModel.value.filter(item => item.token === 'byName').map(item => item.value).join(' '))
const byPackageNameText = computed(() => searchModel.value.filter(item => item.token === 'byPackageName').map(item => item.value).join(' '))
const byMainActivityText = computed(() => searchModel.value.filter(item => item.token === 'byMainActivity').map(item => item.value).join(' '))
const pagination = ref({
  page: 1,
  pageSize: 10,
})

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

const { data, loading, runAsync } = useRequest(() => searchAppInfos(pickBy({
  page: pagination.value.page,
  pageSize: pagination.value.pageSize,
  byName: byNameText.value,
  byPackageName: byPackageNameText.value,
  byMainActivity: byMainActivityText.value,
}, Boolean)), {
  manual: true,
})

function handleSearch() {
  runAsync()
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
    <div class="flex-1 flex flex-col items-end gap-4">
      <ElTable
        v-if="data"
        v-loading="loading"
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
      <ElPagination
        v-model:current-page="pagination.page"
        v-model:page-size="pagination.pageSize"
        :total="data?.data.metadata.total"
        layout="total, sizes, prev, pager, next, jumper"
        @current-change="handleSearch"
        @size-change="handleSearch"
      />
    </div>
  </div>
</template>
