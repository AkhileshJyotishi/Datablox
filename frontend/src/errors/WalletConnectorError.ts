class WalletConnectorError extends Error {
  message: string
  wallet: string

  constructor(message: string, wallet: string) {
    super(message)

    this.message = message
    this.wallet = wallet
  }
}

export default WalletConnectorError
