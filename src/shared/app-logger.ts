import winston from 'winston'
import { AppEnv } from '@/main/config'

const LoggerSetup = (): winston.Logger => winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    winston.format.errors({ stack: true }),
    winston.format.json()
  ),
  defaultMeta: { service: AppEnv.SERVICE_NAME },
  transports: [
    new winston.transports.Console()
  ]
})

const AppLogger = LoggerSetup()

export { AppLogger }
