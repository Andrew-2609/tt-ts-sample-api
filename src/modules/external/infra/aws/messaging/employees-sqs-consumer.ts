import { Messaging } from '@/modules/external/data/services/contracts'
import { EventEmitter } from 'events'
import { SQSEngine } from './sqs-engine'

type ConsumerConfiguration = {
  queueUrl: string
  pollingWaitTimeInSeconds: number
  waitTimeSeconds: number
  visibilityTimeout: number
}

export class AWSSQSEmployeesConsumer extends EventEmitter implements Messaging.Broker.Consumer {
  private readonly sqsEngine: SQSEngine

  constructor(private readonly config: ConsumerConfiguration) {
    super()

    this.sqsEngine = new SQSEngine(
      this.config.queueUrl,
      this.config.waitTimeSeconds,
      this.config.visibilityTimeout
    )

    this.once('start', () => {
      setInterval(async () => await this.poll(), this.config.pollingWaitTimeInSeconds * 1000)
    })
  }

  async consume(): Promise<void> {
    await this.sqsEngine.validateConnection()
    this.emit('start')
  }

  private async poll(): Promise<void> {
    const message = await this.sqsEngine.receiveMessage()

    if (!this.sqsEngine.hasMessages(message)) {
      return
    }
  }
}
