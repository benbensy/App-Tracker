<script setup lang="ts">
import ApkParser from 'app-info-parser-dist'
import { ref, useTemplateRef } from 'vue'

const fileInput = useTemplateRef('fileInput')

const files = ref<FileList | null>(null)

function handleFileChange() {
  files.value = fileInput.value!.files
  console.log(files.value)
  const parser = new ApkParser(files.value![0])
  parser.parse().then((result) => {
    console.log('app info ----> ', result)
    console.log('icon base64 ----> ', result.icon)
  }).catch((err) => {
    console.log('err ----> ', err)
  })
}
</script>

<template>
  <div>
    <input ref="fileInput" type="file" @change="handleFileChange">
  </div>
</template>
