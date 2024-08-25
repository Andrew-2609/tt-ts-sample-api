import { logger } from '@/modules/common/logger'
import { APP_CONFIG, loadEnvironment } from '../modules/common/config'
import { ServicesLoader, createExpressApp } from './app'
;(async (): Promise<void> => {
  await loadEnvironment()
  await new ServicesLoader().load()

  const app = createExpressApp()

  app.listen(APP_CONFIG.APP_PORT, () => {
    logger.info({ message: `Server running at port ${APP_CONFIG.APP_PORT}` })
  })
})()
