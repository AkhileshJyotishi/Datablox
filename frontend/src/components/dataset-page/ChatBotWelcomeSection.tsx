"use client"
import { motion } from "framer-motion"
import botAvatarUrl from "@/assets/avatar/floating-robot.png"
import Image from "next/image"

import React from "react"

const ChatBotWelcomeSection = () => {
  return (
    <motion.div
      className="relative mb-2 mt-2 h-20 w-20"
      animate={{ y: [0, -5, 0] }}
      transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
    >
      <Image
        src={botAvatarUrl}
        alt="Bot Avatar"
        className="h-20 w-20 rounded-full"
      />
    </motion.div>
  )
}

export default ChatBotWelcomeSection
