import type { FormInstance, FormRules } from 'element-plus'
import type { MaybeRef } from 'vue'
import { isFunction } from 'es-toolkit'
import { computed, ref } from 'vue'

export interface UseFormParams<T> {
  initialValues: T | (() => T)
  onSubmit?: (values: T) => void
}

export function useForm<T extends Record<string, any>>(params: UseFormParams<T>) {
  const formRef = ref<FormInstance>()

  const defaultValues = computed(() => isFunction(params.initialValues) ? params.initialValues() : params.initialValues)
  const formValues = ref<T>(defaultValues.value)

  const resetForm = () => {
    formValues.value = defaultValues.value
  }

  const createRules = (rules: FormRules<MaybeRef<T>> | (() => FormRules<MaybeRef<T>>)) => {
    if (isFunction(rules)) {
      return computed(rules)
    }
    else {
      return computed(() => rules)
    }
  }

  const validate = async () => {
    return formRef.value?.validate()
  }

  const validateField = (prop: string) => {
    return formRef.value?.validateField(prop)
  }

  const clearValidate = () => {
    formRef.value?.clearValidate()
  }

  const submit = async () => {
    if (await validate()) {
      return params.onSubmit?.(formValues.value)
    }
  }

  return {
    formRef,
    formValues,
    resetForm,
    createRules,
    validate,
    validateField,
    clearValidate,
    submit,
  }
}
