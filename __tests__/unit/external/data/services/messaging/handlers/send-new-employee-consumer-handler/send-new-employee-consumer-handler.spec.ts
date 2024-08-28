import { loadEnvironment } from '@/modules/common/config'
import { ErrorCode, InternalServerError } from '@/modules/common/error'
import { StatusCodes } from 'http-status-codes'
import { makeSut } from './make-sut'

describe('SendNewEmployeeConsumerHandler', () => {
  beforeAll(async () => {
    await loadEnvironment()
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })

  describe('handle', () => {
    test('Should throw an InternalServerError if employee could not be registered due to an error', async () => {
      const { sut } = makeSut()

      const fakeError = new Error('AWS exploded')

      jest.spyOn(global, 'fetch').mockImplementationOnce(() => {
        throw fakeError
      })

      const promise = sut.handle({
        stack: 'TypeScript'
      })

      await expect(promise).rejects.toThrow()

      try {
        await promise
      } catch (err) {
        expect(err).toBeInstanceOf(InternalServerError)
        expect(err.message).toBe(`Could not register new employee: ${fakeError.message}`)
        expect(err.code).toBe(ErrorCode.EMPLOYEE_REGISTRATION_FAILED)
      }
    })

    test('Should throw an InternalServerError if employee could not be registered (StatusCode !== 201)', async () => {
      const { sut } = makeSut()

      jest.spyOn(global, 'fetch').mockImplementationOnce((): any => ({
        status: StatusCodes.SERVICE_UNAVAILABLE,
        json: jest.fn()
      }))

      const promise = sut.handle({
        stack: 'TypeScript'
      })

      await expect(promise).rejects.toThrow()

      try {
        await promise
      } catch (err) {
        expect(err).toBeInstanceOf(InternalServerError)
        expect(err.message).toContain(
          'Could not register new employee: Employee registration service returned unexpected response:'
        )
        expect(err.code).toBe(ErrorCode.EMPLOYEE_REGISTRATION_FAILED)
      }
    })

    test('Should successfully register an employee with the given stack', async () => {
      const { sut } = makeSut()

      jest.spyOn(global, 'fetch').mockImplementationOnce((): any => ({
        status: StatusCodes.CREATED,
        json: jest.fn(() => ({
          newEmployee: { id: 23 }
        }))
      }))

      const promise = sut.handle({ stack: 'TypeScript' })

      await expect(promise).resolves.not.toThrow()
    })
  })
})
