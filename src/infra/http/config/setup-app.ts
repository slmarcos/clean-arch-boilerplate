import { setupMiddlewares, setupRoutes } from '@/infra/http/config'
import express, { Express } from 'express'

const setupApp = (): Express => {
  const app = express()

  setupMiddlewares(app)
  setupRoutes(app)

  return app
}

export default setupApp
