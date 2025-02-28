"use client"

import { motion } from "framer-motion"
import { Building2, Download } from "lucide-react"

export default function PublisherHeader({ publisher }: { publisher: any }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mb-12 rounded-xl border border-white/20 bg-white/10 p-6 backdrop-blur-md"
    >
      <h1 className="mb-2 text-3xl font-bold text-white">{publisher.name}</h1>
      <p className="mb-4 text-gray-300">{publisher.description}</p>
      <div className="flex items-center space-x-6">
        <div className="flex items-center text-[#ff4092]">
          <Building2 className="mr-2 h-5 w-5" />
          <span>{publisher.datasetCount} Datasets</span>
        </div>
        <div className="flex items-center text-[#ff4092]">
          <Download className="mr-2 h-5 w-5" />
          <span>{publisher.totalDownloads.toLocaleString()} Downloads</span>
        </div>
      </div>
    </motion.div>
  )
}
