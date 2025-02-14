import { defineChain } from "viem"

const kiichain = defineChain({
  id: 123454321,
  name: "Kiichain Testnet",
  nativeCurrency: { name: "Ether", symbol: "kii", decimals: 18 },
  rpcUrls: {
    default: { http: ["https://a.sentry.testnet.kiivalidator.com:8645"] },
  },
  blockExplorers: {
    default: { name: "Kii Explorer", url: "https://app.kiichain.io/kiichain" },
  },
  contracts: {},
})

export default kiichain
