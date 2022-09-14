import { expressRouteAdapter } from '@/infra/http'
import { HealthzControllerFactory } from '@/main/factories/controllers'
import { Router } from 'express'

export default (router: Router): void => {
  router.get('/healthz', expressRouteAdapter(HealthzControllerFactory))
}
