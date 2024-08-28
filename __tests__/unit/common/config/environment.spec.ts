import { APP_CONFIG, loadEnvironment } from '@/modules/common/config'

describe('Environment Loading Module', () => {
  describe('loadEnvironment', () => {
    test('Should populate APP_CONFIG properly in local environment', async () => {
      for (const key of Object.keys(APP_CONFIG)) {
        expect(key).toBeFalsy()
      }

      expect(Object.isFrozen(APP_CONFIG)).toBeFalsy()

      await loadEnvironment()

      for (const key of Object.keys(APP_CONFIG)) {
        expect(APP_CONFIG[key]).toBe(process.env[key])
      }

      expect(Object.isFrozen(APP_CONFIG)).toBeTruthy()
    })
  })
})
