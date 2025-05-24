import { apiBaseUrl, apiPrefix, isDev } from '@/constants/app'
import type { AxiosRequestConfig } from 'axios'
import axios from 'axios'

const client = axios.create({
  baseURL: isDev ? apiPrefix : apiBaseUrl,
})

export function request<T>(config: AxiosRequestConfig) {
  return client.request<T>(config)
}
