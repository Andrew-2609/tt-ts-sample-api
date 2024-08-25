/* eslint-disable @typescript-eslint/no-floating-promises */
import compression from 'compression'
import express, { Express } from 'express'
import 'express-async-errors'
import { healthHandler } from './routes/health'

export const createExpressApp = (): Express => {
  const app = express()

  // Setup global middlewares
  app.use(compression())
  app.use(express.json())

  // Configure app
  app.disable('x-powered-by')

  // Setup routes
  app.get('/health', healthHandler)

  return app
}
