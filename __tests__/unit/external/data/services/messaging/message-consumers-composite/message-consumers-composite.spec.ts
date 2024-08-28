import { makeSut } from './make-sut'

describe('MessagesConsumerComposite', () => {
  describe('consume', () => {
    test("Should successfully call the 'consume' method of all consumers", async () => {
      const { sut, consumeSpies } = makeSut()

      await sut.consume()

      for (const consumeSpy of consumeSpies) {
        expect(consumeSpy).toHaveBeenCalledTimes(1)
      }
    })
  })
})
