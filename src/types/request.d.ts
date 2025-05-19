interface ApiResult<T = null> {
  items: T[]
  metadata: {
    page: number
    per: number
    total: number
  }
}

interface PaginationParams {
  page?: number
  per?: number
}
