import WalletConnector from "./interface"
import metadata from "./metadata"
import EIP6963Provider from "./provider"

const constructWalletConnector = () => {
  const walletConnectors: WalletConnector[] = []

  for (const wallet of metadata) {
    if (wallet.constructor !== undefined) {
      walletConnectors.push(new EIP6963Provider(wallet))
    }
  }

  return walletConnectors
}

export default constructWalletConnector
