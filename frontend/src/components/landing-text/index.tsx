"use client"
import React from "react"

import Link from "next/link"

import { motion } from "framer-motion"
import { FileText, Sparkles } from "lucide-react"

const index = () => {
  return (
    <>
      <div className="mx-auto max-w-4xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="mb-6 text-4xl font-bold text-white md:text-6xl lg:text-7xl">
            Transforming Data Markets with
            <span className="bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
              {" "}
              AI Power
            </span>
          </h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mx-auto mb-8 max-w-2xl text-xl text-gray-400"
        >
          Buy, sell, and monetize datasets seamlessly. AI-powered, blockchain-secured, and built for trust
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-col items-center justify-center gap-2 sm:flex-row"
        >
          <Link
            href={"/realtime"}
            className="flex items-center justify-center rounded-md bg-purple-600 px-8 py-3 text-white hover:bg-purple-700"
          >
            <Sparkles className="mr-2 h-5 w-5" />
            Subscribe to Live Data
          </Link>
          <Link
            href={"/marketplace"}
            className="flex rounded-md border-purple-500 bg-white px-8 py-3 text-black"
          >
            <FileText className="mr-2 h-5 w-5" />
            Explore Marketplace
          </Link>
        </motion.div>
      </div>
    </>
  )
}

export default index
