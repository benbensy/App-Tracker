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
  return request<ApiResult<AppInfo[]>>({
    url: '/app-info/search',
    params,
  })
}

export interface CreateOrUpdateAppInfoParams {
  [index: number]: {
    defaultName: string
    localizedName: string
    languageCode: string
    packageName: string
    mainActivity: string
  }
}

export interface CreateOrUpdateAppInfoResult {
  id: string
  packageName: string
  mainActivity: string
  localizedNames: {
    languageCode: string
    name: string
    isPrimary: boolean
  }[]
}

export function createOrUpdateAppInfo(params: CreateOrUpdateAppInfoParams) {
  return request<CreateOrUpdateAppInfoResult>({
    url: '/app-info/create',
    method: 'post',
    data: params,
  })
}
