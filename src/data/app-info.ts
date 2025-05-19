import { request } from '@/utils/request'

export interface AppInfo {
  id: string
  packageName: string
  mainActivity: string
  localizedNames: [
    {
      languageCode: string
      name: string
      isPrimary: boolean
    }[],
  ]
}

export type SearchAppInfosParams = PaginationParams & {
  byName?: string
  byPackageName?: string
  byMainActivity?: string
}

export function searchAppInfos(params: SearchAppInfosParams) {
  return request<AppInfo[]>({
    url: '/api/app-info/search',
    params,
  })
}
