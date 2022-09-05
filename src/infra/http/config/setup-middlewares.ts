import { bodyParser, contentType, cors } from '@/infra/http/middlewares'
import { Express } from 'express'

const setupMiddlewares = (app: Express): void => {
  app.use(bodyParser)
  app.use(cors)
  app.use(contentType)
}

export default setupMiddlewares
