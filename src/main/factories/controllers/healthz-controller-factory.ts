import { Controller } from '@/presentation/contracts'
import { HealthzController } from '@/presentation/controllers'

const HealthzControllerFactory = (): Controller => {
  return new HealthzController()
}

export {
  HealthzControllerFactory
}
