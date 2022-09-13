import { Validation, Validator } from '@/presentation/contracts'
import { ClientError, ClientErrorInput } from '@/presentation/errors'
import { RequiredValidator } from '@/presentation/validation/validators'

class ValidationComposite implements Validation {
  constructor (
    private readonly validationSchema: Validation.Schema
  ) {}

  execute (): void {
    const result = this.validateSchema(this.validationSchema)
    if (Object.keys(result).length > 0) {
      throw new ClientError(result)
    }
  }

  private validateSchema (schema: Validation.Schema): ClientErrorInput {
    const result: ClientErrorInput = {}

    Object.keys(schema).forEach((key) => {
      if (Array.isArray(schema[key])) {
        const validators = schema[key] as Validator[]

        const isFieldOptional = !(validators[0] instanceof RequiredValidator)
        const isFieldValueUndefined = validators[0].value === undefined

        if (isFieldOptional && isFieldValueUndefined) {
          return
        }

        const errors = validators.reduce<string[]>((acc, validator) => {
          const error = validator.execute()
          if (error != null) {
            acc.push(error.message)
          }
          return acc
        }, [])

        if (errors.length > 0) {
          result[key] = errors
        }
      } else {
        const errors = this.validateSchema(schema[key] as Validation.Schema)
        if (Object.keys(errors).length > 0) {
          result[key] = errors
        }
      }
    })

    return result
  }
}

export default ValidationComposite
