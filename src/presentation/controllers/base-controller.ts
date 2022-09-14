import { Controller, HttpResponse, Validation } from '@/presentation/contracts'
import { ClientError } from '@/presentation/errors'
import { badRequest, ok, serverError } from '@/presentation/helpers'
import { ValidationComposite } from '@/presentation/validation'
import { AppLogger } from '@/shared'

abstract class BaseController implements Controller {
  protected abstract execute (input: unknown): unknown | Promise<unknown>

  protected abstract buildValidators (_input: unknown): Validation.Schema

  private validate (input: unknown): void {
    const validators = this.buildValidators(input)
    const validationComposite = new ValidationComposite(validators)
    validationComposite.execute()
  }

  async handle (httpRequest: unknown): Promise<HttpResponse> {
    try {
      this.validate(httpRequest)

      const response = await this.execute(httpRequest)

      return ok(response)
    } catch (error) {
      AppLogger.error(error)

      if (error instanceof ClientError) {
        return badRequest(error)
      }

      return serverError()
    }
  }
}

export default BaseController
