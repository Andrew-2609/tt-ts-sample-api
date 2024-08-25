import { APIError, APIErrorInput } from './error'

export class InternalServerError extends APIError {
  constructor({ code, message }: APIErrorInput) {
    super({
      code,
      message:
        message ?? 'An unexpected error occurred. Please, try again later or contact our support.'
    })
  }
}
