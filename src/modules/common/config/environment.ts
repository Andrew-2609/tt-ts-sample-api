import { logger } from '../logger'

type CONFIG = Partial<{
  APP_PORT: string
  AWS_REGION: string
  AWS_ENDPOINT: string
  AWS_SQS_EMPLOYEES_QUEUE_URL: string
  EMPLOYEES_APP_URL: string
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

const loadLocalEnvironment = (): void => {
  APP_CONFIG.APP_PORT = process.env.APP_PORT
  APP_CONFIG.AWS_REGION = process.env.AWS_REGION
  APP_CONFIG.AWS_ENDPOINT = process.env.AWS_ENDPOINT
  APP_CONFIG.AWS_SQS_EMPLOYEES_QUEUE_URL = process.env.AWS_SQS_EMPLOYEES_QUEUE_URL
  APP_CONFIG.EMPLOYEES_APP_URL = process.env.EMPLOYEES_APP_URL
}
