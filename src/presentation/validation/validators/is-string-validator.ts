import { Validator } from '@/presentation/contracts'
import { IsStringError } from '@/presentation/validation/validators/errors'

class IsStringValidator implements Validator {
  constructor (
    readonly value: unknown
  ) {}

  execute (): IsStringError | undefined {
    if (typeof this.value !== 'string' || this.value.trim().length === 0) {
      return new IsStringError()
    }
    return undefined
  }
}

export default IsStringValidator
