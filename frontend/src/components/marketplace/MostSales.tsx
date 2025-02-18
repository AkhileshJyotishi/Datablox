import React from "react"
import DataPacket from "./DataPacket"
import { datasets } from "@/constants/dataset"
export default function MostSales() {
  return (
    <div className="mx-auto">
      <p className="my-8 text-xl font-bold text-gray-400">Most Sales</p>
      <div className="flex flex-wrap items-center justify-between gap-4">
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
