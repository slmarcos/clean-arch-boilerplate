export type HttpResponse = {
  code: number
  data?: unknown
  error?: {
    message: string
    data?: unknown
  }
}
