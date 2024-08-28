import { SendNewEmployeeConsumerHandler } from '@/modules/external/data/services/implementations/messaging/handlers'

type SutTypes = {
  sut: SendNewEmployeeConsumerHandler
}

export const makeSut = (): SutTypes => {
  return { sut: new SendNewEmployeeConsumerHandler() }
}
