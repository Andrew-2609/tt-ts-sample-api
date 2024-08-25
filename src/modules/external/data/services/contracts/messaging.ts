export namespace Messaging {
  export namespace Broker {
    export interface Consumer {
      consume: () => Promise<void>
    }
  }
}
