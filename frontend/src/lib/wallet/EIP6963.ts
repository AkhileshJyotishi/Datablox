import { ethers } from "ethers"

class EIP6963Web3Provider extends ethers.BrowserProvider implements EIP6963.Provider {
  async request(payload: { method: string; params?: unknown[] | object }): Promise<unknown> {
    const params = Array.isArray(payload.params) ? payload.params : payload.params ? Object.values(payload.params) : []
    return this.send(payload.method, params)
  }
}

export default EIP6963Web3Provider
