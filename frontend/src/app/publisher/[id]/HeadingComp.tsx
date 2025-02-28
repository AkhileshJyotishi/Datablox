"use client"
import { motion } from "framer-motion"
import { Download } from "lucide-react"
import { FaRegFileAlt } from "react-icons/fa"

import DataPacket from "@/components/marketplace/DataPacket"
export function Heading({
  address,
  datasetCount,
  totalSales,
  dataset,
}: {
  address: string
  datasetCount: number
  totalSales: string
  dataset: any
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className=""
    >
      <div className="mb-12 rounded-xl border border-white/20 p-6 backdrop-blur-sm">
        <h1 className="mb-2 text-3xl font-bold text-white">Publisher</h1>
        <p className="mb-4 text-gray-300">{address}</p>
        <div className="flex items-center space-x-6">
          <div className="flex items-center text-gray-300">
            <FaRegFileAlt className="mr-2 h-5 w-5 text-white" />
            <span>{datasetCount} Datasets</span>
          </div>
          <div className="flex items-center text-gray-300">
            <Download className="mr-2 h-5 w-5 text-white" />
            <span>{totalSales} Sales</span>
          </div>
        </div>
      </div>
      <div className="mx-auto mb-7 mt-7 grid grid-cols-3 gap-4">
        {dataset.map((data: any, index: number) => {
          if (data.length == 0) return <></>
          return (
            <DataPacket
              key={index}
              data={data[0]}
            />
          )
        })}
      </div>
    </motion.div>
  )
}
