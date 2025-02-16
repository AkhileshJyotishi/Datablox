export interface WalletUIProperties {
  icon: string
  displayName: string
  homePageUrl: string
}

export interface WalletMetadata {
  id: number
  name: string
  identifier: string // The EIP6963 provider key
  uiProperties: WalletUIProperties
}

const metadata: WalletMetadata[] = [
  {
    id: 0,
    name: "Metamask",
    identifier: "MetaMask",
    uiProperties: {
      icon: "https://superboard-dev.s3.ap-south-1.amazonaws.com/wallets/Metamaskkk.svg",
      displayName: "MetaMask",
      homePageUrl: "https://metamask.io",
    },
  },
  {
    id: 1,
    name: "Wallet Connect",
    identifier: "WalletConnect",
    uiProperties: {
      icon: "https://superboard-dev.s3.ap-south-1.amazonaws.com/wallets/walletconnectW.svg",
      displayName: "Wallet Connect",
      homePageUrl: "https://walletconnect.com/",
    },
  },
  {
    id: 2,
    name: "Trust Wallet",
    identifier: "Trust",
    uiProperties: {
      icon: "https://superboard-dev.s3.ap-south-1.amazonaws.com/wallets/Trust Wallet.svg",
      displayName: "Trust Wallet",
      homePageUrl: "https://www.trustwallet.com",
    },
  },
  {
    id: 3,
    name: "Coinbase Wallet",
    identifier: "Coinbase",
    uiProperties: {
      icon: "https://superboard-dev.s3.ap-south-1.amazonaws.com/wallets/Group 3586.png",
      displayName: "Coinbase Wallet",
      homePageUrl: "https://coinbase.com",
    },
  },
  {
    id: 4,
    name: "Rabby",
    identifier: "Rabby",
    uiProperties: {
      icon: "https://superboard-dev.s3.ap-south-1.amazonaws.com/wallets/4333333.png",
      displayName: "Rabby",
      homePageUrl: "https://rabby.io",
    },
  },
  {
    id: 5,
    name: "Zerion",
    identifier: "Zerion",
    uiProperties: {
      icon: "https://d21qizznq6l554.cloudfront.net/wallets/Zerionnn.svg",
      displayName: "Zerion",
      homePageUrl: "https://zerion.io",
    },
  },
]

export const kiichainMetadata: Web3ChainData = {
  chainId: "0xDEE6", // 123454321 in hex
  chainName: "Sonic Blaze Testnet",
  nativeCurrency: {
    name: "Sonic",
    symbol: "S", // Symbol of the native currency
    decimals: 18,
  },
  rpcUrls: ["https://rpc.blaze.soniclabs.com"],
  blockExplorerUrls: ["https://testnet.sonicscan.org"],
}

export default metadata
