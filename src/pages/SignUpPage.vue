<script setup lang="ts">
import { ElMessage, useLocale } from 'element-plus'
import { onErrorCaptured } from 'vue'
import { useRouter } from 'vue-router'
import { useForm } from '@/composables/useForm'
import { signUp } from '@/data/designer'

const router = useRouter()
const { t } = useLocale()

const { formRef, formValues, createRules, submit } = useForm({
  initialValues: {
    email: '',
    name: '',
    password: '',
  },
  async onSubmit(values) {
    await signUp(values)
    ElMessage.success(t('success'))
    router.push({ name: 'sign-in' })
  },
})

const rules = createRules({
  email: [
    { required: true, message: t('emailRequired') },
    { type: 'email', message: t('emailInvalid') },
  ],
  name: [
    { required: true, message: t('nameRequired') },
  ],
  password: [
    { required: true, message: t('passwordRequired') },
    { min: 8, message: t('passwordMinLength') },
  ],
})

onErrorCaptured((error) => {
  ElMessage.error(error.message)
})
</script>

<template>
  <div class="w-full h-full flex items-center justify-center">
    <ElCard>
      <template #header>
        <ElText>
          {{ t('signUp') }}
        </ElText>
      </template>
      <ElForm ref="formRef" :model="formValues" :rules="rules" label-position="right">
        <ElFormItem :label="t('email')" prop="email">
          <ElInput v-model="formValues.email" />
        </ElFormItem>
        <ElFormItem :label="t('name')" prop="name">
          <ElInput v-model="formValues.name" />
        </ElFormItem>
        <ElFormItem :label="t('password')" prop="password">
          <ElInput v-model="formValues.password" />
        </ElFormItem>
      </ElForm>
      <template #footer>
        <div class="flex justify-center gap-2">
          <ElButton type="primary" @click="submit">
            {{ t('signUp') }}
          </ElButton>
        </div>
      </template>
    </ElCard>
  </div>
</template>
