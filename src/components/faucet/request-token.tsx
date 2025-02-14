import React from "react"

import axios from "axios"
import { toast } from "sonner"

interface RequestTokenProps {
  address: `0x${string}`
}

const RequestToken: React.FC<RequestTokenProps> = ({ address }) => {
  const url = `https://faucet.kiivalidator.com/api/faucet?address=${address}&chainId=kiichain`

  return (
    <button
      className="transition-transfor mt-4 w-full transform rounded bg-gradient-to-r from-green-400 to-blue-500 px-4 py-2 font-bold text-white shadow-lg hover:from-green-500 hover:to-blue-600"
      onClick={() => {
        toast.info("Requesting airdrop...")
        axios
          .get(url)
          .then(() => {
            toast.success("Token request sent successfully")
          })
          .catch(() => {
            console.log("Error")
          })
      }}
    >
      Request Kii airdrop
    </button>
  )
}

export default RequestToken
