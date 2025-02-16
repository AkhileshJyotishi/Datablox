import { getDefaultConfig } from "connectkit"
import { createConfig, http } from "wagmi"

import { sonicChain } from "@/sonic"

const config = createConfig(
  getDefaultConfig({
    chains: [sonicChain],
    transports: {
      [sonicChain.id]: http(),
    },
    appName: "token-fusion",
    walletConnectProjectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID as string,
  })
)

export default config
