import { logger } from '@/modules/common/logger'
import { Messaging } from '../../../contracts'

export class SendNewEmployeeConsumerHandler implements Messaging.ConsumerHandler {
  async handle(message: any): Promise<void> {
    logger.info({ message: 'Received a message', data: message })
  }
}
