import { createConfig,http } from '@wagmi/core'

import { sonicChain } from '../sonic'

export const config = createConfig({
  chains: [sonicChain],
  transports: {
    [sonicChain.id]: http(),
  },
})