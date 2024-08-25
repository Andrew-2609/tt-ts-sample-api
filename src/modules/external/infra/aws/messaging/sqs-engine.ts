import { APP_CONFIG } from '@/modules/common/config/environment'
import { ErrorCode, InternalServerError } from '@/modules/common/error'
import {
  GetQueueAttributesCommand,
  ReceiveMessageCommand,
  ReceiveMessageCommandOutput,
  SQSClient,
  ServiceOutputTypes
} from '@aws-sdk/client-sqs'

export class SQSEngine {
  private readonly sqs = new SQSClient({
    apiVersion: '2012-11-05',
    region: APP_CONFIG.AWS_REGION,
    endpoint: APP_CONFIG.AWS_ENDPOINT,
    credentials: { accessKeyId: 'test', secretAccessKey: 'test' }
  })

  constructor(
    private readonly queueUrl: string,
    protected readonly waitTimeSeconds: number,
    protected readonly visibilityTimeout: number
  ) {}

  async validateConnection(): Promise<void> {
    try {
      await this.sqs.send(new GetQueueAttributesCommand({ QueueUrl: this.queueUrl }))
    } catch ({ message }) {
      throw new InternalServerError({ code: ErrorCode.SQS_CONNECTION_FAILED, message })
    }
  }

  hasMessages(commandOutput: ReceiveMessageCommandOutput): boolean {
    return commandOutput?.Messages?.length > 0
  }

  async receiveMessage(): Promise<ReceiveMessageCommandOutput> {
    const command = new ReceiveMessageCommand({
      QueueUrl: this.queueUrl,
      WaitTimeSeconds: this.waitTimeSeconds,
      VisibilityTimeout: this.visibilityTimeout,
      AttributeNames: ['MessageGroupId', 'ApproximateReceiveCount']
    })

    return await this.executeCommand<ReceiveMessageCommandOutput>(command)
  }

  private async executeCommand<T extends ServiceOutputTypes>(command: any): Promise<T> {
    try {
      return await this.sqs.send(command)
    } catch ({ message }) {
      throw new InternalServerError({ code: ErrorCode.SQS_COMMAND_FAILED, message })
    }
  }
}
