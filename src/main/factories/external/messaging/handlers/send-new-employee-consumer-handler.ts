import { SendNewEmployeeConsumerHandler } from '@/modules/external/data/services/implementations/messaging/handlers'

export const makeSendNewEmployeeConsumerHandler = (): SendNewEmployeeConsumerHandler => {
  return new SendNewEmployeeConsumerHandler()
}
