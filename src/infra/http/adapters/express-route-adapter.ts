import { Controller } from '@/presentation/contracts'
import { Request, Response } from 'express'

const expressRouteAdapter = (controllerFactory: () => Controller) => async (
  req: Request,
  res: Response
) => {
  const request: unknown = {
    ...(req.params || {}),
    ...(req.query || {}),
    ...(req.body || {})
  }

  const controller = controllerFactory()
  const response = await controller.handle(request)

  res.status(response.code).json(response)
}

export default expressRouteAdapter
