import { logger } from '../logger'

type CONFIG = Partial<{
  APP_PORT: string
}>

export const APP_CONFIG: CONFIG = {}

export const loadEnvironment = async (): Promise<void> => {
  if (process.env.NODE_ENV !== 'production') {
    loadLocalEnvironment()
    Object.freeze(APP_CONFIG)
  }

  // Add logic to load environment variables from Cloud, e.g. from AWS Secrets Manager

  logger.info({ message: 'Environment successfully loaded' })
}

const loadLocalEnvironment = () => {
  APP_CONFIG.APP_PORT = process.env.APP_PORT
}
