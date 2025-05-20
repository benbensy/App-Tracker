<script setup lang="ts">
import { ElMessage, useLocale } from 'element-plus'
import { onErrorCaptured } from 'vue'
import { useRouter } from 'vue-router'
import { useForm } from '@/composables/useForm'
import { signIn } from '@/data/designer'
import { useUserStore } from '@/stores/userStore'

const { t } = useLocale()
const router = useRouter()
const userStore = useUserStore()

const { formRef, formValues, createRules, submit } = useForm({
  initialValues: {
    email: '',
    password: '',
  },
  async onSubmit(values) {
    const { data } = await signIn(values)
    ElMessage.success(t('success'))
    userStore.saveLoginInfo({
      token: data.token,
      id: data.id,
      email: data.email,
      name: data.name,
    })
    router.push({ name: 'designer-home' })
  },
})

const rules = createRules({
  email: [
    { required: true, message: t('emailRequired') },
    { type: 'email', message: t('emailInvalid') },
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
          {{ t('signIn') }}
        </ElText>
      </template>
      <ElForm ref="formRef" :model="formValues" :rules="rules" label-position="right">
        <ElFormItem :label="t('email')" prop="email">
          <ElInput v-model="formValues.email" />
        </ElFormItem>
        <ElFormItem :label="t('password')" prop="password">
          <ElInput v-model="formValues.password" />
        </ElFormItem>
      </ElForm>
      <template #footer>
        <div class="flex justify-center gap-2">
          <ElButton type="primary" @click="submit">
            {{ t('signIn') }}
          </ElButton>
        </div>
      </template>
    </ElCard>
  </div>
</template>
