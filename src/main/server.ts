import { APP_CONFIG, loadEnvironment } from '../modules/common/config/environment'
import { createExpressApp } from './app/app'
;(async (): Promise<void> => {
  await loadEnvironment()

  const app = createExpressApp()

  app.listen(APP_CONFIG.APP_PORT, () => {
    console.log(`Server running at port ${APP_CONFIG.APP_PORT}`)
  })
})()
