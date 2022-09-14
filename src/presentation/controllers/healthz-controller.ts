import { Validation } from '@/presentation/contracts'
import { BaseController } from '@/presentation/controllers'

type ResponseType = {
  status: string
}

class HealthzController extends BaseController {
  protected buildValidators (_input: unknown): Validation.Schema {
    return {}
  }

  protected execute (_input: unknown): ResponseType {
    return { status: 'ok' }
  }
}

export default HealthzController
