import type { AxiosRequestConfig } from 'axios'
import axios from 'axios'

const client = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
})

export function request<T>(config: AxiosRequestConfig) {
  return client.request<T>(config)
}
