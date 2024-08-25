import { APP_CONFIG } from '@/modules/common/config'
import { Messaging } from '@/modules/external/data/services/contracts'
import { AWSSQSEmployeesConsumer } from '@/modules/external/infra/aws/messaging'

export const buildSQSConsumers = (): Messaging.Broker.Consumer[] => {
  const employeesConsumer = new AWSSQSEmployeesConsumer({
    queueUrl: APP_CONFIG.AWS_SQS_EMPLOYEES_QUEUE_URL,
    waitTimeSeconds: 20,
    visibilityTimeout: 5,
    pollingWaitTimeInSeconds: 20
  })

  return [employeesConsumer]
}
