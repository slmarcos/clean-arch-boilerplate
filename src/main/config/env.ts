const AppEnv = {
  SERVICE_NAME: process.env.SERVICE_NAME ?? 'default-service-name',

  API_VERSION: process.env.API_VERSION ?? 'v0',

  NODE_ENV: process.env.NODE_ENV ?? 'development',
  PORT: process.env.PORT ?? 3018,

  DB_HOST: process.env.DB_HOST ?? 'default_database_host'
}

export { AppEnv }
