import { ErrorCode } from './code'

type APIErrorDTO = Omit<APIError, 'name'>

type APIErrorInput = {
  message?: string
  code?: ErrorCode
}

abstract class APIError extends Error {
  readonly code: ErrorCode

  constructor(data: APIErrorDTO) {
    super(data.message)
    Object.assign(this, data)
    Object.freeze(this)
  }
}

export { APIError, APIErrorDTO, APIErrorInput }
