import { Messaging } from '@/modules/external/data/services/contracts'
import { EventEmitter } from 'events'
import { SQSEngine } from './sqs-engine'

type ConsumerConfiguration = {
  queueUrl: string
  consumerHandler: Messaging.ConsumerHandler
  pollingWaitTimeInSeconds: number
  waitTimeSeconds: number
  visibilityTimeout: number
}

export class AWSSQSEmployeesConsumer extends EventEmitter implements Messaging.Broker.Consumer {
  private readonly sqsEngine: SQSEngine
  private pollingIntervalID: NodeJS.Timeout

  constructor(private readonly config: ConsumerConfiguration) {
    super()

    this.sqsEngine = new SQSEngine(
      this.config.queueUrl,
      this.config.waitTimeSeconds,
      this.config.visibilityTimeout
    )

    this.once('start', async () => {
      this.pollingIntervalID = setInterval(
        async () => await this.poll(),
        this.config.pollingWaitTimeInSeconds * 1000
      )
    })

    this.once('stop', () => {
      clearInterval(this.pollingIntervalID)
      this.pollingIntervalID = undefined
    })
  }

  async consume(): Promise<void> {
    await this.sqsEngine.validateConnection()
    this.emit('start')
  }

  private async poll(): Promise<void> {
    const commandOutput = await this.sqsEngine.receiveMessage()

    if (!this.sqsEngine.hasMessages(commandOutput)) {
      return
    }

    for (const message of commandOutput.Messages) {
      const parsedMessage = JSON.parse(message.Body)

      await this.config.consumerHandler.handle(parsedMessage)
      await this.sqsEngine.deleteMessage(message)
    }
  }
}
