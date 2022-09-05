import { AppEnv } from '@/main/config'
import { Express, Router } from 'express'
import { readdirSync } from 'fs'
import path from 'path'

type RouteImport = { default: (router: Router) => void }

const setupRoutes = (app: Express): void => {
  const router = Router()
  app.use(`/api/${AppEnv.API_VERSION}`, router)

  const routesDir = path.join(__dirname, '..', 'routes')
  readdirSync(routesDir).map(async (file) => {
    if (!file.endsWith('.map')) {
      const route: RouteImport = await import (`../routes/${file}`)
      route.default(router)
    }
  })
}

export default setupRoutes
