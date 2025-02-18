"use client"
import { motion } from "framer-motion"
import { Building2, Download } from "lucide-react"
import { datasets } from "@/constants/dataset"
import DataPacket from "@/components/marketplace/DataPacket"
import { FaRegFileAlt } from "react-icons/fa";
export default async function PublisherPage() {
  const data = {
    address: "3i0zx0qr90zdlk3q09zxjl",
    datasetCount: "12",
    totalSales: "200",
  }
  return (
    <div className="container relative z-10 mx-auto max-w-7xl px-4 py-16">
      <Heading
        address={data.address}
        datasetCount={data.datasetCount}
        totalSales={data.totalSales}
      />
      <div className="mx-auto mb-7 mt-7 grid grid-cols-3 gap-4">
        {datasets.map((data, index) => (
          <DataPacket
            key={index}
            data={data}
          />
        ))}
      </div>
    </div>
  )
}

function Heading({ address, datasetCount, totalSales }: { address: string; datasetCount: string; totalSales: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mb-12 rounded-xl border border-white/20  p-6 backdrop-blur-sm"
    >
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
    </motion.div>
  )
}
