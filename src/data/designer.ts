import { request } from '@/utils/request'

export interface SignInParams {
  email: string
  password: string
}

export interface SignInResult {
  id: string
  email: string
  name: string
  token: string
  createdAt: number
}

export function signIn(params: SignInParams) {
  return request<SignInResult>({
    url: '/api/designer/login',
    method: 'get',
    headers: {
      Authorization: `Basic ${btoa(`${params.email}:${params.password}`)}`,
    },
  })
}

export interface refreshTokenParams {
  token: string
}

export function refreshToken(params: refreshTokenParams) {
  return request({
    url: '/api/designer/login',
    method: 'post',
    headers: {
      Authorization: `Bearer ${params.token}`,
    },
  })
}

export interface SignUpParams {
  name: string
  email: string
  password: string
}

export interface SignUpResult {
  id: string
  email: string
  name: string
  token: string
  createdAt: number
}

export function signUp(params: SignUpParams) {
  return request<SignUpResult>({
    url: '/api/designer/register',
    method: 'post',
    data: params,
  })
}
