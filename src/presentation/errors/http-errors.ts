type ClientErrorInput = {
  [key: string]: ClientErrorInput | string[]
}

class ClientError extends Error {
  constructor (
    readonly data: ClientErrorInput
  ) {
    super('BadRequestError')
    this.name = 'ClientError'
    this.data = data
  }
}

class UnauthorizedError extends Error {
  constructor () {
    super('Unauthorized')
    this.name = 'UnauthorizedError'
  }
}

class ServerError extends Error {
  constructor (stack?: string) {
    super('Internal Server Error')
    this.name = 'ServerError'
    this.stack = stack
  }
}

export {
  ClientError,
  ClientErrorInput,
  UnauthorizedError,
  ServerError
}
