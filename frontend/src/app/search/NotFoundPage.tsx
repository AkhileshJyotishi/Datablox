"use client"
import React from "react"
import { motion } from "framer-motion"

const NotFoundPage = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
    >
      <div className="mt-36 text-5xl font-extrabold text-white/80">Not found any related dataset...</div>
    </motion.div>
  )
}

export default NotFoundPage
