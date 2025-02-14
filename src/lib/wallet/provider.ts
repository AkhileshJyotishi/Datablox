import Errors from "@/errors"

import EIP6963Web3Provider from "./EIP6963"
import WalletConnector from "./interface"
import type { WalletMetadata, WalletUIProperties } from "./metadata"
import { kiichainMetadata } from "./metadata"

declare global {
  interface WindowEventMap {
    "eip6963:announceProvider": CustomEvent
    "eip6963:requestProvider": Event
  }
}

class EIP6963Provider implements WalletConnector {
  // ### Properties ###

  // Readonly properties
  readonly name: string
  readonly config: WalletUIProperties

  // Private properties
  private provider: EIP6963Web3Provider | undefined

  // Public properties
  address: `0x${string}` | undefined
  isConnected: boolean

  // ### Constructor ###
  constructor(properties: WalletMetadata) {
    this.name = properties.name
    this.config = properties.uiProperties

    this.isConnected = false

    // Listen for the EIP-6963 event
    window.addEventListener("eip6963:announceProvider", (event: CustomEvent) => {
      const detail = event.detail as EIP6963.ProviderDetail
      if (detail.info.name === properties.identifier) {
        this.provider = new EIP6963Web3Provider(detail.provider)
      }
    })

    // Request the provider
    window.dispatchEvent(new Event("eip6963:requestProvider"))
  }

  // ### Utils ###
  /**
   * Check the current chain ID against the expected chain ID
   * If the chain ID is not as expected, switch to the expected chain ID
   * If the chain ID is not added to the network list, add the chain to provider
   */
  async switchOrAddChain(provider: EIP6963Web3Provider, chainInfo: Web3ChainData) {
    const currentChainId = await provider.request({ method: "eth_chainId" })
    const expectedChainId = chainInfo.chainId

    if (currentChainId !== expectedChainId) {
      // Try switching to Expected chain
      try {
        await provider.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: expectedChainId }],
        })
      } catch (switchError: IError) {
        // If the chain is not available, add it
        if (switchError.code === 4902) {
          try {
            await provider.request({
              method: "wallet_addEthereumChain",
              params: [expectedChainId],
            })
          } catch {
            throw new Errors.WalletConnectorError(`Failed to add ${chainInfo.chainName} network`, this.name)
          }
        } else {
          throw new Errors.WalletConnectorError(`Failed to switch to ${chainInfo.chainName} network`, this.name)
        }
      }
    }
  }

  // ### Functions ###
  async connect(): Promise<void> {
    if (!this.provider) {
      throw new Errors.WalletConnectorError("Provider not available", this.name)
    }

    try {
      // Step 1: Switch to the expected chain
      await this.switchOrAddChain(this.provider, kiichainMetadata)

      // Step 2: Request accounts
      await this.provider.send("eth_requestAccounts", [])

      // Step 3: Obtain the signer
      const signer = await this.provider.getSigner()

      // Step 4: Get the signer's address
      this.address = signer.address as `0x${string}`

      this.isConnected = true
    } catch {
      throw new Errors.WalletConnectorError("Failed to connect", this.name)
    }
  }

  async disconnect(): Promise<void> {
    if (!this.provider) {
      throw new Errors.WalletConnectorError("Provider not available", this.name)
    }

    try {
      this.isConnected = false
      await this.provider.send("wallet_requestPermissions", [{ eth_accounts: {} }])
    } catch {
      throw new Errors.WalletConnectorError("Failed to disconnect", this.name)
    }
  }

  async getProvider(): Promise<EIP6963.Provider> {
    if (!this.provider) {
      throw new Errors.WalletConnectorError("Provider not available", this.name)
    }

    return this.provider
  }
}

export default EIP6963Provider
