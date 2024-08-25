import { MessagesConsumerComposite } from '@/modules/external/data/services/implementations/messaging'
import { buildSQSConsumers } from '../factories/external/consumers'

export class ServicesLoader {
  async load(): Promise<void> {
    await this.startMessageConsumers()
  }

  private async startMessageConsumers(): Promise<void> {
    const messagesConsumerComposite = new MessagesConsumerComposite(buildSQSConsumers())
    await messagesConsumerComposite.consume()
  }
}
