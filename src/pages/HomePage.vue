<script setup lang="ts">
import { ElCarousel, ElCarouselItem, ElMessage, ElText, useLocale } from 'element-plus'
import { pickBy } from 'es-toolkit'
import { computed, ref } from 'vue'
import { useRequest } from 'vue-request'
import ExtraSearch from '@/components/base/ExtraSearch.vue'
import TooltipProvider from '@/components/base/TooltipProvider/TooltipProvider.vue'
import { searchAppInfos } from '@/data/app-info'
import AppInfoPanel from '@/pages/HomePage/AppInfoPanel.vue'
import OperationPanel from '@/pages/HomePage/OperationPanel.vue'

const { t } = useLocale()

const searchModel = ref<{ token: string, value: string }[]>([])

const byNameText = computed(() => searchModel.value.filter(item => item.token === 'byName' || item.token === undefined).map(item => item.value).join(' '))
const byPackageNameText = computed(() => searchModel.value.filter(item => item.token === 'byPackageName').map(item => item.value).join(' '))
const byMainActivityText = computed(() => searchModel.value.filter(item => item.token === 'byMainActivity').map(item => item.value).join(' '))
const pagination = ref({
  page: 1,
  per: 10,
})

const searchConfigs = computed(() => [
  {
    token: 'byName',
    label: t('name'),
    suggestions: [],
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

const hasSearched = ref(false)
const { data, loading, runAsync } = useRequest(() => searchAppInfos(pickBy({
  page: pagination.value.page,
  per: pagination.value.per,
  byName: byNameText.value,
  byPackageName: byPackageNameText.value,
  byMainActivity: byMainActivityText.value,
}, Boolean)), {
  manual: true,
  debounceInterval: 300,
  onBefore: () => {
    hasSearched.value = true
  },
})

function handleSearch() {
  runAsync()
}

async function handleCopy(row: any, prop: string) {
  await navigator.clipboard.writeText(row[prop])
  ElMessage.success(t('copySuccess'))
}

const selectedRows = ref<any[]>([])

function handleSelectionChange(selection: any[]) {
  console.log(selection)

  selectedRows.value = selection
}

</script>

<template>
  <div class="w-full max-w-6xl h-full p-4 flex flex-col gap-4">
    <div class="mx-auto w-full">
      <ExtraSearch v-model="searchModel" :configs="searchConfigs" :placeholder="t('searchPlaceholder')" @search="handleSearch" />
    </div>
    <div class="w-full flex-1 flex flex-col gap-4">
      <div class="w-full flex flex-row justify-between gap-4">
        <div v-if="hasSearched || data" v-loading="loading" class="w-full flex-1 grid gap-4">
          <TooltipProvider>
            <ElTable
              :data="data?.data?.items || []"
              @selection-change="handleSelectionChange"
            >
              <ElTableColumn width="32" type="selection" />
              <ElTableColumn prop="defaultName" :label="t('name')">
                <template #default="{ row }">
                  <Tooltip :content="row.defaultName">
                    <ElText class="hover:(cursor-pointer underline underline-offset-2 underline-dotted) text-ellipsis whitespace-nowrap" @click="handleCopy(row, 'defaultName')">
                      {{ row.defaultName }}
                    </ElText>
                  </Tooltip>
                </template>
              </ElTableColumn>
              <ElTableColumn prop="packageName" :label="t('packageName')">
                <template #default="{ row }">
                  <Tooltip :content="row.packageName">
                    <ElText class="hover:(cursor-pointer underline underline-offset-2 underline-dotted) text-ellipsis whitespace-nowrap" @click="handleCopy(row, 'packageName')">
                      {{ row.packageName }}
                    </ElText>
                  </Tooltip>
                </template>
              </ElTableColumn>
              <ElTableColumn prop="mainActivity" :label="t('mainActivity')">
                <template #default="{ row }">
                  <Tooltip :content="row.mainActivity">
                    <ElText class="hover:(cursor-pointer underline underline-offset-2 underline-dotted) text-ellipsis whitespace-nowrap" @click="handleCopy(row, 'mainActivity')">
                      {{ row.mainActivity }}
                    </ElText>
                  </Tooltip>
                </template>
              </ElTableColumn>
            </ElTable>
          </TooltipProvider>
          <div class="w-full flex justify-end">
            <ElPagination
              v-model:current-page="pagination.page"
              v-model:page-size="pagination.per"
              :total="data?.data.metadata.total || 0"
              layout="total, sizes, prev, pager, next, jumper"
              background
              @current-change="handleSearch"
              @size-change="handleSearch"
            />
          </div>
        </div>

        <div v-if="selectedRows.length > 0" class="w-full max-w-md h-full flex flex-col gap-2">
          <ElCarousel :autoplay="false" indicator-position="none">
            <ElCarouselItem v-for="item in selectedRows" :key="item.packageName">
              <AppInfoPanel class="h-full" :row="item" />
            </ElCarouselItem>
          </ElCarousel>
          <OperationPanel :rows="selectedRows" />
        </div>
      </div>
    </div>
  </div>
</template>
