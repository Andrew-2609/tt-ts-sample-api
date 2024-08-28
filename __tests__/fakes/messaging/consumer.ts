import { Messaging } from '@/modules/external/data/services/contracts'

export class FakeConsumer implements Messaging.Broker.Consumer {
  async consume(): Promise<void> {}
}
