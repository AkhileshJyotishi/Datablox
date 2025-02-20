'use client'
import React from "react"
import { FaFilePdf } from "react-icons/fa"
import BuyData from "../Buy"
import { useAccount } from "wagmi"
export default function Dataset({ metadata,pageName }: { metadata: any;pageName:any }) {
  const { address } = useAccount();
  console.log('this is metadata ', metadata)
  const datasetSize = "1.2 MB"
  const price = metadata.price;
  const sales = metadata.sales || 0;
  return (
    <div className="mt-8 px-4 justify-between flex w-full">
      <div className="flex">
        <div className="">
          <FaFilePdf className="text-[83px] text-[#8b98a9]" />
        </div>
        <div className="h-full px-3 text-white">
          <div className="text-sans text-lg font-normal">
            Size <span className="text-md text-[#ff4092]"> {datasetSize}</span>
          </div>
          <div className="text-sans text-lg font-normal">
            Price <span className="text-md text-[#ff4092]"> {price+" Sonic"}</span>
          </div>
          <div className="text-sans text-lg font-normal">
            Sales <span className="text-md text-[#ff4092]"> {metadata.sales || 0}</span>
          </div>
        </div>
      </div>
      {pageName!="preview" && address!=metadata.owner && <div className="flex flex-col items-center justify-center px-6">
        <BuyData ipfs={metadata.IPFS} title={metadata.title} price={metadata.price} tokenId={metadata.tokenId} duration={metadata.timeout} />
      </div>}
    </div>
  )
}
