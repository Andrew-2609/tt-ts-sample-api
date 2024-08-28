import { MessagesConsumerComposite } from '@/modules/external/data/services/implementations/messaging'
import { FakeConsumer } from '../../../../../../fakes/messaging'

type SutTypes = {
  sut: MessagesConsumerComposite
  consumeSpies: jest.SpyInstance[]
}

export const makeSut = (): SutTypes => {
  const consumers = [new FakeConsumer(), new FakeConsumer()]

  const sut = new MessagesConsumerComposite(consumers)

  return {
    sut,
    consumeSpies: consumers.map((consumer) => jest.spyOn(consumer, 'consume'))
  }
}
