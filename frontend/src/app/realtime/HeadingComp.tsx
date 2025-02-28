"use client"
import { motion } from "framer-motion"
import { Download } from "lucide-react"
import { FaRegFileAlt } from "react-icons/fa"

import DataPacket from "@/components/marketplace/DataPacket"
import { RequestDataset } from "@/components/RequestDataset"
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
  console.log("this is dataset ", dataset)
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className=""
    >
      <div className="mb-12 flex justify-between rounded-xl border border-white/20 p-6 backdrop-blur-sm">
        <div>
          <h1 className="mb-2 text-3xl font-bold text-white">Sonic Realtime Datasets</h1>
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
        <div className="flex items-center justify-center">
          <RequestDataset />
          {/* <button className="rounded-md bg-gradient-to-r from-[#d93678] to-[#e94c8e] px-6 py-2 font-bold text-white transition-all duration-300 hover:from-[#b92e66] hover:to-[#d63f7c] active:from-[#a02858] active:to-[#bf356b]">
            Request New Dataset
          </button> */}
        </div>
      </div>
      <div className="mx-auto mb-7 mt-7 grid grid-cols-3 gap-4">
        {dataset.map((data: any, index: number) => {
          if (data.length == 0) return <></>
          return (
            <DataPacket
              key={index}
              data={data}
              realtime={true}
            />
          )
        })}
      </div>
    </motion.div>
  )
}
