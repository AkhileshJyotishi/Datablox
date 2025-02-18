import { WalletUIProperties } from "./metadata"

interface WalletConnector {
  // ### Properties ###
  readonly name: string
  readonly config: WalletUIProperties

  address: `0x${string}` | undefined
  isConnected: boolean

  // ### Methods ###
  connect(): Promise<void>

  disconnect(): Promise<void>

  getProvider: () => Promise<EIP6963.Provider>
}

export default WalletConnector
