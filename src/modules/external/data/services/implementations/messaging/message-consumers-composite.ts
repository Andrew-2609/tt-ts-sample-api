import { logger } from '@/modules/common/logger'
import { Messaging } from '../../contracts'

export class MessagesConsumerComposite {
  constructor(private readonly consumers: Messaging.Broker.Consumer[]) {}

  async consume(): Promise<void> {
    for (const consumer of this.consumers) {
      await consumer.consume()
    }

    logger.info({ message: 'Message consumers successfully initialized' })
  }
}
