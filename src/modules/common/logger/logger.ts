import pino from 'pino'

type LoggerResponse = {
  message: string
  code: string
  data: any
  stack?: string
}

const pinoInstance = pino({
  enabled: !process.env.NOLOG,
  formatters: {
    level: (label) => {
      return { level: label }
    }
  }
})

const logger = {
  info: (input: { message: string; data?: any }): void => {
    pinoInstance.info(input)
  },
  warn: (input: { [key: string]: LoggerResponse }): void => {
    pinoInstance.warn(input)
  },
  error: (input: { [key: string]: LoggerResponse }): void => {
    pinoInstance.error(input)
  }
}

export { LoggerResponse, logger }
