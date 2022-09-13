import { Validator } from '@/presentation/contracts'
import { IsStringValidator, RequiredValidator } from '@/presentation/validation/validators'

class ValidationBuilder {
  constructor (
    private readonly validators: Validator[],
    private readonly value?: unknown
  ) {}

  static of (input: unknown): { required: () => ValidationBuilder, optional: () => ValidationBuilder } {
    return {
      required: () => new ValidationBuilder([], input).required(),
      optional: () => new ValidationBuilder([], input)
    }
  }

  private required (): ValidationBuilder {
    this.validators.push(
      new RequiredValidator(this.value)
    )
    return this
  }

  isString (): ValidationBuilder {
    this.validators.push(
      new IsStringValidator(this.value)
    )
    return this
  }

  build (): Validator[] {
    return this.validators
  }
}

export default ValidationBuilder
