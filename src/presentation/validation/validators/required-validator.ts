import { Validator } from '@/presentation/contracts'
import { RequiredError } from '@/presentation/validation/validators/errors'

class RequiredValidator implements Validator {
  constructor (
    readonly value: unknown
  ) {}

  execute (): RequiredError | undefined {
    if (this.value === null || this.value === undefined) {
      return new RequiredError()
    }
    return undefined
  }
}

export default RequiredValidator
