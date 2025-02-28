import React from "react"

import dynamic from "next/dynamic"

import DataPacketSkeleton from "@/app/search/skeleton"

// import DataPacket from "./DataPacket"
import { datasets } from "@/constants/dataset"
const DataPacket = dynamic(() => import("./DataPacket"), {
  ssr: false,
  loading: () => <DataPacketSkeleton />,
})

export default function RecentlyPublished() {
  return (
    <div className="mx-auto w-full">
      <p className="my-8 text-2xl font-extrabold text-gray-400">Recently Published</p>
      <div className="relative z-0 mx-auto grid max-w-7xl grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-3 md:gap-4">
        {datasets.map((dataset, index) => (
          <DataPacket
            key={index}
            data={dataset}
          />
        ))}
      </div>
    </div>
  )
}
