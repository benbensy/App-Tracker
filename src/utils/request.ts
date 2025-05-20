import type { AxiosRequestConfig } from 'axios'
import axios from 'axios'

const client = axios.create({
  baseURL: '/api',
})

export function request<T>(config: AxiosRequestConfig) {
  return client.request<T>(config)
}
