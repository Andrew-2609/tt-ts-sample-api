import { APP_CONFIG } from '@/modules/common/config'
import { ErrorCode, InternalServerError } from '@/modules/common/error'
import { logger } from '@/modules/common/logger'
import { StatusCodes } from 'http-status-codes'
import { Messaging } from '../../../contracts'

type NewEmployeeMessagePayload = {
  stack: string
}

export class SendNewEmployeeConsumerHandler implements Messaging.ConsumerHandler {
  async handle(message: NewEmployeeMessagePayload): Promise<void> {
    logger.info({
      message: `Received a message to hire a new employee that works with ${message.stack}`
    })

    let newEmployeeId: number

    try {
      const response = await fetch(APP_CONFIG.EMPLOYEES_APP_URL, {
        method: 'POST',
        body: JSON.stringify({ name: 'Andrew Silva' }),
        headers: { 'Content-Type': 'application/json' }
      })

      const responseJson = await response.json()

      if (response.status !== StatusCodes.CREATED) {
        throw new InternalServerError({
          message: `Employee registration service returned unexpected response: ${responseJson}`,
          code: ErrorCode.EMPLOYEE_REGISTRATION_FAILED
        })
      }

      newEmployeeId = responseJson.newEmployee.id
    } catch ({ message }) {
      throw new InternalServerError({
        message: `Could not register new employee: ${message}`,
        code: ErrorCode.EMPLOYEE_REGISTRATION_FAILED
      })
    }

    logger.info({ message: 'New employee registered!', data: { newEmployeeId } })
  }
}
