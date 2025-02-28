import React from "react"

import { HiDownload } from "react-icons/hi"

interface DataPacketProps {
  data: {
    chain: string
    operator: string
    title: string
    price: string
    sales: string
    id: number
  }
}
const RelatedDataPacket: React.FC<DataPacketProps> = ({ data }) => {
  return (
    <div className="flex w-full cursor-pointer flex-col rounded-md border border-[#303030] bg-[#141414] px-5 pb-2 pt-5 text-gray-400 transition-transform duration-200 hover:-translate-y-1">
      <div className="flex items-center">
        <span className="px-2">
          <HiDownload />
        </span>
        <span className="border border-b-0 border-t-0 border-[#303030] px-3 text-xs">DATASET</span>
        <span className="border border-b-0 border-t-0 border-[#303030] px-3 text-xs">{data.operator}</span>
        <span className="px-3 text-xs">{data.chain}</span>
      </div>
      <div className="mt-3 px-2 text-lg font-bold text-white">{data.title}</div>
      <div className="mt-2 px-2 text-sm text-gray-200">
        <span className="font-bold">{data.price}</span>
        {data.price != "Free" && <span className="mx-2 text-sm">mOcean</span>}
      </div>
      <div className="my-2 flex gap-1 px-2 text-[10px] text-gray-400">
        <span className="font-bold">{data.sales}</span>
        <span>sales</span>
      </div>
    </div>
  )
}

export default RelatedDataPacket
