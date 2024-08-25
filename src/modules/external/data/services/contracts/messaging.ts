export namespace Messaging {
  export interface ConsumerHandler<T = any> {
    handle: (message: T) => Promise<void>
  }

  export namespace Broker {
    export interface Consumer {
      consume: () => Promise<void>
    }
  }
}
