declare namespace EIP6963 {
  interface Provider {
    request: (payload: { method: string; params?: unknown[] | object }) => Promise<unknown>
    on(eventName: string, callback: (...args: T[]) => void): void
  }

  interface ProviderInfo {
    uuid: string
    name: string
    icon: string
    rdns?: string
  }

  interface ProviderDetail {
    info: ProviderInfo
    provider: EIP1193Provider
  }

  interface EVMProviderDetected extends ProviderDetail {
    accounts: string[]
    request?: EIP1193Provider["request"]
  }

  interface AnnounceProviderEvent extends Event {
    detail: ProviderDetail
  }
}
