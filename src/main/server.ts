import './config/module-alias'
import { AppEnv } from '@/main/config'
import { setupApp } from '@/infra/http'
import { AppLogger } from '@/shared'

AppLogger.info(`starting ${AppEnv.SERVICE_NAME}`)

process.on('uncaughtException', (e) => {
  AppLogger.error('uncaughtException', e)
  process.exit(1)
})
process.on('unhandledRejection', (e) => {
  AppLogger.error('unhandledRejection', e)
  process.exit(1)
})

const app = setupApp()

app.listen(
  AppEnv.PORT,
  () => AppLogger.info(`server running on port ${AppEnv.PORT} in ${AppEnv.NODE_ENV.toUpperCase()} mode`)
)
