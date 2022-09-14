import { HttpResponse } from '@/presentation/contracts'
import { ClientError, ServerError, UnauthorizedError } from '@/presentation/errors'

const badRequest = (error: ClientError): HttpResponse => ({
  code: 400,
  error: {
    message: error.message,
    data: error.data
  }
})

const unauthorized = (): HttpResponse => ({
  code: 401,
  error: {
    message: new UnauthorizedError().message
  }
})

const serverError = (): HttpResponse => ({
  code: 500,
  error: {
    message: new ServerError().message
  }
})

const ok = <T>(data: T): HttpResponse => ({
  code: 200,
  data
})

export {
  badRequest,
  unauthorized,
  serverError,
  ok
}
