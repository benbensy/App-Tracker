import { request } from '@/utils/request'

export interface GetAppIconParams {
  packageName: string
}

export function getAppIcon(params: GetAppIconParams) {
  return request<Blob>({
    url: '/app-icon',
    params,
    responseType: 'blob',
  })
}
