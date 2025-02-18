"use client"

import { motion } from "framer-motion"
import { Building2, Download } from "lucide-react"

export default function PublisherHeader({ publisher }:{publisher:any}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mb-12 p-6 rounded-xl bg-white/10 backdrop-blur-md border border-white/20"
    >
      <h1 className="text-3xl font-bold text-white mb-2">{publisher.name}</h1>
      <p className="text-gray-300 mb-4">{publisher.description}</p>
      <div className="flex items-center space-x-6">
        <div className="flex items-center text-[#ff4092]">
          <Building2 className="w-5 h-5 mr-2" />
          <span>{publisher.datasetCount} Datasets</span>
        </div>
        <div className="flex items-center text-[#ff4092]">
          <Download className="w-5 h-5 mr-2" />
          <span>{publisher.totalDownloads.toLocaleString()} Downloads</span>
        </div>
      </div>
    </motion.div>
  )
}

