/* eslint-disable @typescript-eslint/no-floating-promises */
import compression from 'compression'
import express, { Express } from 'express'
import 'express-async-errors'

export const createExpressApp = (): Express => {
  const app = express()
  app.use(compression())
  app.disable('x-powered-by')
  app.use(express.json())
  return app
}
