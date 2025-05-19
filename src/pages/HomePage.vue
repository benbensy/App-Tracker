<script setup lang="ts">
import { ref } from 'vue'
import ExtraSearch from '@/components/ExtraSearch.vue'

const searchModel = ref<Record<string, string[]>[]>([])

const searchConfigs = [
  {
    token: 'byName',
    label: '应用名',
    suggestions: [
      'QQ',
      'WeChat',
      'Weibo',
    ],
  },
  {
    token: 'byPackageName',
    label: '包名',
    suggestions: [],
  },
  {
    token: 'byMainActivity',
    label: '主活动',
    suggestions: [],
  },
]
</script>

<template>
  <div class="w-full h-full p-4">
    <ExtraSearch v-model="searchModel" :configs="searchConfigs">
      <template #footer>
        <div class="flex flex-row gap-2">
          <ElText>
            搜索条件：
          </ElText>
        </div>
      </template>
    </ExtraSearch>
  </div>
</template>
