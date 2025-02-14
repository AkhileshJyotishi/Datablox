import { getDefaultConfig } from "connectkit"
import { createConfig, http } from "wagmi"

import { KiiChain } from "@/kiichain"

const config = createConfig(
  getDefaultConfig({
    chains: [KiiChain],
    transports: {
      [KiiChain.id]: http(),
    },
    appName: "Arc",
    walletConnectProjectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID as string,
  })
)

export default config
