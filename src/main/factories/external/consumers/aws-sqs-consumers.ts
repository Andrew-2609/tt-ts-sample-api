import { APP_CONFIG } from '@/modules/common/config'
import { Messaging } from '@/modules/external/data/services/contracts'
import { AWSSQSEmployeesConsumer } from '@/modules/external/infra/aws/messaging'
import { makeSendNewEmployeeConsumerHandler } from '../messaging/handlers'

export const buildSQSConsumers = (): Messaging.Broker.Consumer[] => {
  const employeesConsumer = new AWSSQSEmployeesConsumer({
    queueUrl: APP_CONFIG.AWS_SQS_EMPLOYEES_QUEUE_URL,
    consumerHandler: makeSendNewEmployeeConsumerHandler(),
    waitTimeSeconds: 20,
    visibilityTimeout: 5,
    pollingWaitTimeInSeconds: 20
  })

  return [employeesConsumer]
}
