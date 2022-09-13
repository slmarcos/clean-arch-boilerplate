export class RequiredError extends Error {
  constructor () {
    super('This field must be required')
    this.name = 'RequiredError'
  }
}

export class IsStringError extends Error {
  constructor () {
    super('This field must be a string')
    this.name = 'IsStringError'
  }
}
