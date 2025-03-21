"use client"
import React from "react"

import { FaFilePdf } from "react-icons/fa"
import { useAccount } from "wagmi"

import BuyData from "../Buy"
import Subscribe from "../Subscribe"

export default function Dataset({ metadata, pageName }: { metadata: any; pageName: any }) {
  const { address } = useAccount()
  const datasetSize = "1.2 MB"
  const price = metadata.price
  const sales = metadata.sales || 0
  return (
    <div className="mt-8 flex w-full justify-between px-4">
      <div className="flex">
        <div className="">
          <FaFilePdf className="text-[83px] text-[#8b98a9]" />
        </div>
        <div className="h-full px-3 text-white">
          <div className="text-sans text-lg font-normal">
            Size <span className="text-md text-[#ff4092]"> {datasetSize}</span>
          </div>
          <div className="text-sans text-lg font-normal">
            Price <span className="text-md text-[#ff4092]"> {price + " Sonic"}</span>
          </div>
          <div className="text-sans text-lg font-normal">
            Sales <span className="text-md text-[#ff4092]"> {metadata.sales || 0}</span>
          </div>
        </div>
      </div>
      {pageName == "" && address != metadata.owner && (
        <div className="flex flex-col items-center justify-center px-6">
          <BuyData
            nftData={metadata}
            ipfs={metadata.IPFS}
            title={metadata.title}
            price={metadata.price}
            tokenId={metadata.tokenId}
            duration={metadata.timeout}
          />
        </div>
      )}
      {pageName == "realtime" && address && address != metadata.owner && (
        <div className="flex flex-col items-center justify-center px-6">
          <BuyData
            nftData={metadata}
            ipfs={metadata.IPFS}
            title={metadata.title}
            price={5}
            tokenId={0}
            duration={30}
            pageName="realtime"
          />
        </div>
      )}
    </div>
  )
}
