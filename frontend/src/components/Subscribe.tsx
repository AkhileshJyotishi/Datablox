"use client"
import React, { useEffect, useRef, useState } from "react"

import confetti from "canvas-confetti"
import { AnimatePresence, motion } from "framer-motion"
import { createPortal } from "react-dom"
import { toast } from "sonner"
import { parseEther } from "viem"
import { useAccount, useClient, useReadContract, useWaitForTransactionReceipt, useWriteContract } from "wagmi"

import { Button } from "@headlessui/react"
import { readContracts } from "@wagmi/core"

import { ScratchToReveal } from "@/components/Celebration.tsx/ScratchToReveal"
import { config } from "@/config"
import { wagmiContractConfigOwner } from "@/services/contract"

import DownloadButton from "./DownloadIPFS"

export default function Subscribe({
  title,
  ipfs,
  price,
  tokenId,
  duration,
  pageName,
}: {
  ipfs: string
  title: string
  price: number
  tokenId: number
  duration: number
  pageName?: string
}) {
  //contract write
  const { data: hash, writeContract } = useWriteContract()
  const { address } = useAccount()
  const [own, setOwn] = useState(false)

  const [showCard, setShowCard] = useState(false)
  const isActive = useRef(true)

  const handleClick = () => {
    // Reset the flag every time you open the card
    isActive.current = true
    setShowCard(true)
    launchConfetti()
    setOwn(true)
  }

  const closeOverlay = () => {
    // This will trigger the exit animation defined below.
    setShowCard(false)
    isActive.current = false
  }

  const launchConfetti = () => {
    const end = Date.now() + 3 * 1000
    // You can adjust these colors for dark mode if needed
    const colors = ["#a786ff", "#fd8bbc", "#eca184", "#f8deb1"]

    const frame = () => {
      if (!isActive.current || Date.now() > end) return

      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        startVelocity: 60,
        origin: { x: 0, y: 0.5 },
        colors,
      })
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        startVelocity: 60,
        origin: { x: 1, y: 0.5 },
        colors,
      })

      requestAnimationFrame(frame)
    }

    frame()
  }

  return (
    <div>
      <div className="flex flex-col items-center justify-center">
        {!own ? (
          <div className="flex flex-col items-center justify-center">
            <button
              className="rounded-md bg-gradient-to-r from-[#d93678] to-[#e94c8e] px-6 py-2 font-bold text-white transition-all duration-300 hover:from-[#b92e66] hover:to-[#d63f7c] active:from-[#a02858] active:to-[#bf356b]"
              onClick={handleClick}
            >
              Subscribe
            </button>
            <div className="mt-3 max-w-80 text-center text-xs text-gray-400">
              As Soon as you subscribe the service, the webhook url will be generated which will updated data on daily
              basis
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center">
            <button
              className="rounded-md bg-gradient-to-r from-[#d93678] to-[#e94c8e] px-6 py-2 font-bold text-white transition-all duration-300 hover:from-[#b92e66] hover:to-[#d63f7c] active:from-[#a02858] active:to-[#bf356b]"
              onClick={() => {
                navigator.clipboard
                  .writeText(ipfs + "&user=" + address)
                  .then(() => {
                    console.log("Text copied to clipboard")
                    toast("Url Copied Successfully")
                  })
                  .catch((err) => {
                    console.error("Failed to copy text: ", err)
                    toast("Error in copying Url")
                  })
              }}
            >
              Copy Webhook Url
            </button>
            <div className="mt-3 max-w-80 text-center text-xs text-gray-400">
              Use this url to fetch the realtime data relate to the topic
            </div>
          </div>
        )}
      </div>
      <div>
        {createPortal(
          <AnimatePresence>
            {showCard && (
              <motion.div
                key="overlay"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, transition: { duration: 0.2 } }}
                className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-md dark:bg-gray-900/40"
                onClick={closeOverlay} // Clicking outside closes the overlay
              >
                <motion.div
                  key="card"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.8, opacity: 0, transition: { duration: 0.2 } }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="relative flex w-[360px] flex-col items-center justify-center rounded-2xl bg-white p-4 shadow-xl dark:bg-gray-800"
                  onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the card
                >
                  <div>
                    <div>Purchase Successful</div>
                    <h2 className="mb-2 text-lg font-bold text-black dark:text-white">Scratch to Reveal</h2>
                  </div>

                  <ScratchToReveal
                    width={200}
                    height={200}
                    className="overflow-hidden rounded-md shadow-sm"
                  >
                    <img
                      src="https://nftevening.com/wp-content/uploads/2022/04/Project-PXN-NFT-collection.png.webp"
                      alt="Reveal"
                      className="flex h-full w-full items-center justify-center text-lg font-semibold text-black"
                    />
                  </ScratchToReveal>

                  <Button
                    className="mt-4 w-full"
                    onClick={() => alert("Downloading...")}
                  >
                    Download
                  </Button>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body
        )}
      </div>
    </div>
  )
}
