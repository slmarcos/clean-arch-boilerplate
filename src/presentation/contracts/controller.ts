import { HttpResponse } from '@/presentation/contracts'

export interface Controller<T = unknown> {
  handle: (request: T) => Promise<HttpResponse>
}
