import { defineChain } from "viem"

const sonicChain = defineChain({
  id: 57054,
  name: "Sonic Blaze Testnet",
  nativeCurrency: { name: "Sonic", symbol: "S", decimals: 18 },
  rpcUrls: {
    default: { 
      http: ["https://rpc.blaze.soniclabs.com"] 
    },
  },
  blockExplorers: {
    default: { name: "Sonic Explorer", url: "https://testnet.sonicscan.org" },
  },
  contracts: {},
})

export default sonicChain
