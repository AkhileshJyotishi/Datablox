"use client"
import React, { useEffect, useState } from "react"
import axios from "axios"
import { useAccount } from "wagmi"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
export default function PublishPage({
  userData,
  setUserData,
  tabNo,
  setTabNo,
  setIsTabCompleted,
}: {
  userData: any
  setUserData: any
  tabNo: any
  setTabNo: any
  setIsTabCompleted: any
}) {
  const { address } = useAccount()
  console.log(address)
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!address) {
      toast("No Wallet Address fount", {
        description: "Kindly connect wallet first to publish the data",
      })
      return
    }
    try {
      //
      setLoading(true)
      const response = await axios.post("/api/postmetadata", {
        ...userData,
        owner: address,
        // tokenId:
      })
      if (response.status == 200) {
        setLoading(false)
        const metaDataId = response.data.metadataId
        router.push(`/dataset/${metaDataId}`)
      }
      console.log(response)
    } catch (error) {
      toast("Error in publishing dataset")
    } finally {
      setLoading(false)
    }
  }
  return (
    <div className="mx-auto flex w-full items-center px-32 pb-3 pt-6 text-white">
      <div className="px-auto mb-10 mt-5 flex w-full flex-col items-center justify-center">
        <div className="w-3/4 border-b border-zinc-700 py-5 text-lg">
          <div className="flex items-center gap-3">
            <div className="flex w-fit items-center gap-3 rounded-full border border-zinc-700 px-3 py-1 text-sm font-bold">
              1
            </div>
            <span className="font-extrabold"> Generate Tokens & Set Pricing </span>{" "}
            <span className="h-fit border border-zinc-700 bg-black px-2 py-[2px] text-sm text-gray-400">
              1 Transaction{" "}
            </span>
          </div>
          <div className="mt-3 px-3 text-lg text-zinc-500">
            A Data NFT is created to represent your dataset, along with Datatokens that control access and define
            pricing — all in a single transaction.
          </div>
        </div>
        <div className="w-3/4 border-b border-zinc-700 py-8 text-lg">
          <div className="flex items-center gap-3">
            <div className="flex w-fit items-center gap-3 rounded-full border border-zinc-700 px-3 py-1 text-sm font-bold">
              2
            </div>
            <span className="font-extrabold"> Process & Secure Metadata </span>
          </div>
          <div className="mt-3 px-3 text-lg text-zinc-500">
            Your dataset metadata is structured into a Decentralized Data Object (DDO). File URLs and sensitive details
            are encrypted for security.
          </div>
        </div>
        <div className="w-3/4 border-b border-zinc-700 py-8 text-lg">
          <div className="flex items-center gap-3">
            <div className="flex w-fit items-center gap-3 rounded-full border border-zinc-700 px-3 py-1 text-sm font-bold">
              3
            </div>
            <span className="font-extrabold"> Publish Securely </span>{" "}
            <span className="h-fit border border-zinc-700 bg-black px-2 py-[2px] text-sm text-gray-400">
              1 Transaction{" "}
            </span>
          </div>
          <div className="mt-3 px-3 text-lg text-zinc-500">
            The encrypted DDO is stored on-chain within the Data NFT. Indexers can decrypt metadata for display, but
            actual file access is only granted by exchanging Datatokens.
          </div>
        </div>
        {/* Submit Button */}
        <div className="mt-9 flex justify-center">
          <button
            // type="submit"
            onClick={handleSubmit}
            className="rounded-md bg-gradient-to-r from-[#9e2750] to-[#b02d5b] px-8 py-2 font-sans text-lg font-semibold text-white transition-all duration-300 hover:from-[#8b2347] hover:to-[#9b284f] active:from-[#7d1f41] active:to-[#8f2449]"
          >
            {loading ? "Loading" : "Submit"}
          </button>
        </div>
      </div>
    </div>
  )
}
