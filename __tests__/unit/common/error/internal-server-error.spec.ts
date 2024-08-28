import { ErrorCode, InternalServerError } from '@/modules/common/error'

describe('Internal Server Error Module', () => {
  test('Should successfully create a new InternalServerError with default message', () => {
    const code = ErrorCode.UNKNOWN_SERVER_ERROR

    const sut = new InternalServerError({ code })

    expect(sut).toBeInstanceOf(InternalServerError)
    expect(sut.code).toBe(code)
    expect(sut.message).toBe(
      'An unexpected error occurred. Please, try again later or contact our support.'
    )
  })

  test('Should successfully create a new InternalServerError with given message', () => {
    const code = ErrorCode.UNKNOWN_SERVER_ERROR
    const message = 'Database dropped in production'

    const sut = new InternalServerError({ code, message })

    expect(sut).toBeInstanceOf(InternalServerError)
    expect(sut.code).toBe(code)
    expect(sut.message).toBe(message)
  })
})
