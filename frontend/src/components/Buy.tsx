"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { useWriteContract, useWaitForTransactionReceipt, useAccount, useReadContract, useClient } from "wagmi"
import confetti from "canvas-confetti"
import { addDays, format } from "date-fns"
import { AnimatePresence, motion } from "framer-motion"
import { wagmiContractConfigOwner } from "@/services/contract"
import { readContracts } from "@wagmi/core"
import { config } from "@/config"
import { parseEther } from "viem"

import {
  Award,
  BarChart3,
  Calendar,
  CheckCircle2,
  Clock,
  Database,
  Download,
  Shield,
  Tag,
  TrendingUp,
  Twitter,
  X,
} from "lucide-react"
import { createPortal } from "react-dom"

import { ScratchToReveal } from "./Celebration.tsx/ScratchToReveal"

// Define the type for our NFT data
type DataNFT = {
  operator: string
  owner: string
  chain: string
  title: string
  description: string
  price: string
  sales: string
  id: number
  IPFS: string
  tags: string[]
  author: string
  created_at: string
  sampleData: any
}

type BuyDataProps = {
  nftData: DataNFT
  ipfs: string
  title: string
  price: number
  tokenId: number
  duration: number
  pageName?: string
  onClose?: () => void
}

export default function BuyData({ nftData, ipfs, title, price, tokenId, duration, pageName, onClose }: BuyDataProps) {
  const [purchaseState, setPurchaseState] = useState<"idle" | "processing" | "success" | "failure">("idle")
  const [showModal, setShowModal] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [revealComplete, setRevealComplete] = useState(false)
  const confettiActive = useRef(true)
  const modalRef = useRef<HTMLDivElement>(null)

  // Calculate subscription end date (duration in days)
  const subscriptionEndDate = addDays(new Date(), duration)

  // Format the subscription end date
  const formattedEndDate = format(subscriptionEndDate, "MMMM dd, yyyy")

  // Steps for the reveal animation
  const steps = [
    { name: "Initializing", delay: 1000 },
    { name: "Verifying Purchase", delay: 1500 },
    { name: "Preparing Dataset", delay: 1500 },
    { name: "Finalizing Access", delay: 1000 },
  ]

  const { data: hash, writeContract } = useWriteContract()
  const { address } = useAccount()
  const [own, setOwn] = useState("")
  const downloadFile = async (ipfsUrl: string, title: string) => {
    try {
      const response = await fetch(ipfsUrl)
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = `${title}.csv`
      document.body.appendChild(a)
      a.click()
      a.remove()
      window.URL.revokeObjectURL(url)
    } catch (error) {
      console.error("Error downloading the file:", error)
    }
  }
  const getDatasetUri = async () => {
    if (address) {
      console.log("I came here")
      const val = await readContracts(config, {
        contracts: [
          {
            ...wagmiContractConfigOwner,
            functionName: "getDatasetUri",
            args: [BigInt(tokenId), address],
          },
        ],
      })
      console.log("finding val ", val)
      setOwn(val[0].status)
    }
  }
  const buyData = async () => {
    console.log("hello")
    const val = await writeContract({
      ...wagmiContractConfigOwner,
      functionName: "buyPartialOwnership",
      args: [BigInt(tokenId), BigInt(duration)],
      value: parseEther(price.toString()),
    })
    console.log(val)
  }
  const { isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash })

  useEffect(() => {
    console.log("isConfirmed", isConfirmed)
    if (address) {
      if (isConfirmed) {
        handlePurchase()
        setOwn("success")
      } else {
        setOwn("failure")
      }
    }
  }, [isConfirmed, address])

  // Handle purchase button click
  const handlePurchase = () => {
    setPurchaseState("processing")

    // Simulate contract interaction
    setTimeout(() => {
      setPurchaseState("success")
      setShowModal(true)
      animateSteps()
      launchConfetti()
    }, 2000)
  }

  // Animate through the steps
  const animateSteps = () => {
    let totalDelay = 0

    steps.forEach((step, index) => {
      totalDelay += step.delay
      setTimeout(() => {
        setCurrentStep(index + 1)
        if (index === steps.length - 1) {
          setTimeout(() => {
            setRevealComplete(true)
          }, 1000)
        }
      }, totalDelay)
    })
  }

  // Launch confetti animation
  const launchConfetti = () => {
    const end = Date.now() + 5 * 1000
    const colors = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6"]

    const frame = () => {
      if (!confettiActive.current || Date.now() > end) return

      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.5 },
        colors,
        shapes: ["circle", "square"],
        scalar: 1.2,
      })

      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.5 },
        colors,
        shapes: ["circle", "square"],
        scalar: 1.2,
      })

      requestAnimationFrame(frame)
    }

    frame()
  }

  // Close the modal
  const closeModal = useCallback(() => {
    confettiActive.current = false
    setShowModal(false)
    setCurrentStep(0)
    setRevealComplete(false)
    if (onClose) onClose()
  }, [onClose])

  // Handle click outside to close
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        closeModal()
      }
    }

    if (showModal) {
      document.addEventListener("mousedown", handleClickOutside)
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [showModal, closeModal])

  // Clean up confetti on unmount
  useEffect(() => {
    return () => {
      confettiActive.current = false
    }
  }, [])

  // Render the purchase button or download button based on state
  const renderActionButton = () => {
    if (purchaseState === "success") {
      return (
        <button
          onClick={() => downloadFile(ipfs, title)}
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-emerald-500 to-teal-500 px-6 py-3 font-bold text-white shadow-lg transition-all duration-300 hover:from-emerald-600 hover:to-teal-600 hover:shadow-xl"
        >
          <Download className="h-5 w-5" />
          Download Dataset
        </button>
      )
    }

    return (
      <button
        onClick={buyData}
        disabled={purchaseState === "processing"}
        className={`w-full rounded-lg bg-gradient-to-r from-blue-500 to-indigo-600 px-6 py-3 font-bold text-white shadow-lg transition-all duration-300 hover:from-blue-600 hover:to-indigo-700 hover:shadow-xl ${
          purchaseState === "processing" ? "cursor-not-allowed opacity-70" : ""
        }`}
      >
        {purchaseState === "processing" ? (
          <div className="flex items-center justify-center gap-2">
            <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
            <span>{pageName === "realtime" ? "Subscribing..." : "Purchasing..."}</span>
          </div>
        ) : (
          <span>{pageName === "realtime" ? "Subscribe Now" : "Buy Now"}</span>
        )}
      </button>
    )
  }

  // Render the modal content
  const renderModalContent = () => {
    return createPortal(
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
          >
            <motion.div
              ref={modalRef}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative max-h-[90vh] w-full max-w-3xl overflow-auto rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 p-1 shadow-2xl"
            >
              {/* Glowing border effect */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-50 blur-sm"></div>

              {/* Content container */}
              <div className="relative rounded-xl bg-slate-900 p-6 text-white">
                {/* Close button */}
                <button
                  onClick={closeModal}
                  className="absolute right-4 top-4 rounded-full bg-slate-800 p-1.5 text-slate-400 transition-colors hover:bg-slate-700 hover:text-white"
                >
                  <X className="h-5 w-5" />
                </button>

                {!revealComplete ? (
                  <div className="flex flex-col items-center justify-center py-12">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1, rotate: 360 }}
                      transition={{ type: "spring", damping: 10, stiffness: 100 }}
                      className="mb-8 flex h-32 w-32 items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 p-1"
                    >
                      <div className="flex h-full w-full items-center justify-center rounded-full bg-slate-900">
                        <Database className="h-16 w-16 text-blue-400" />
                      </div>
                    </motion.div>

                    <h2 className="mb-8 text-center text-3xl font-bold">
                      {currentStep < steps.length ? "Preparing Your Data NFT" : "Data NFT Ready!"}
                    </h2>

                    <div className="mb-8 w-full max-w-md">
                      {steps.map((step, index) => (
                        <div
                          key={index}
                          className="mb-4 flex items-center"
                        >
                          <div
                            className={`mr-3 flex h-8 w-8 items-center justify-center rounded-full ${
                              currentStep > index
                                ? "bg-green-500"
                                : currentStep === index
                                  ? "animate-pulse bg-blue-500"
                                  : "bg-slate-700"
                            }`}
                          >
                            {currentStep > index ? (
                              <CheckCircle2 className="h-5 w-5 text-white" />
                            ) : (
                              <span className="text-sm text-white">{index + 1}</span>
                            )}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <span className={`font-medium ${currentStep >= index ? "text-white" : "text-slate-400"}`}>
                                {step.name}
                              </span>
                              {currentStep === index && (
                                <span className="ml-2 text-xs text-blue-400">Processing...</span>
                              )}
                            </div>
                            {currentStep > index && (
                              <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: "100%" }}
                                className="mt-1 h-1 rounded bg-green-500"
                              />
                            )}
                            {currentStep === index && (
                              <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: ["0%", "100%"] }}
                                transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}
                                className="mt-1 h-1 rounded bg-blue-500"
                              />
                            )}
                          </div>
                        </div>
                      ))}
                    </div>

                    {currentStep >= steps.length && (
                      <motion.button
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        onClick={() => setRevealComplete(true)}
                        className="rounded-lg bg-gradient-to-r from-blue-500 to-indigo-600 px-8 py-3 font-bold text-white shadow-lg transition-all duration-300 hover:from-blue-600 hover:to-indigo-700 hover:shadow-xl"
                      >
                        Reveal Your Data NFT
                      </motion.button>
                    )}
                  </div>
                ) : (
                  <div className="grid gap-8 md:grid-cols-2">
                    {/* Left column - NFT visualization */}
                    <div className="flex flex-col items-center justify-center">
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2, type: "spring" }}
                        className="relative mb-6 overflow-hidden rounded-xl border-2 border-blue-500/30 bg-gradient-to-br from-slate-800 to-slate-900 shadow-xl"
                      >
                        {/* NFT visualization */}
                        <ScratchToReveal
                          width={335}
                          height={300}
                          className="overflow-hidden rounded-md shadow-sm"
                        >
                          <div className="relative aspect-square w-full overflow-hidden">
                            {/* Background pattern */}
                            {/* <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.15)_0,rgba(59,130,246,0)_70%)]"></div> */}

                            {/* Twitter logo */}
                            <motion.div
                              initial={{ opacity: 0, scale: 0 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: 0.5, type: "spring" }}
                              className="absolute -translate-x-1/2 -translate-y-1/2"
                            >
                              <img
                                src="https://nftevening.com/wp-content/uploads/2022/04/Project-PXN-NFT-collection.png.webp"
                                alt="Reveal"
                                className="flex h-full w-full items-center justify-center text-lg font-semibold text-black"
                              />
                            </motion.div>

                            {/* Data visualization elements */}

                            {/* NFT ID and chain */}
                            <div className="absolute left-3 top-3 rounded-md bg-slate-800/80 px-2 py-1 text-xs font-medium backdrop-blur-sm">
                              ID: #{tokenId} • {nftData.chain}
                            </div>
                          </div>
                        </ScratchToReveal>

                        {/* NFT footer */}
                        <div className="bg-slate-800 p-4">
                          <h3 className="mb-1 text-sm font-semibold text-blue-400">
                            {pageName === "realtime" ? "Real-time Subscription" : "Data NFT"}
                          </h3>
                          <p className="text-xs text-slate-300">
                            {nftData.title.length > 60 ? nftData.title.substring(0, 60) + "..." : nftData.title}
                          </p>
                        </div>
                      </motion.div>

                      {/* Price and sales info */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1 }}
                        className="flex w-full max-w-xs items-center justify-between rounded-lg bg-slate-800 p-4"
                      >
                        <div>
                          <p className="text-xs text-slate-400">Price</p>
                          <p className="text-xl font-bold text-white">{price} SONIC</p>
                        </div>
                        <div className="text-right">
                          <p className="text-xs text-slate-400">Total Sales</p>
                          <p className="text-xl font-bold text-white">{nftData.sales}</p>
                        </div>
                      </motion.div>
                    </div>

                    {/* Right column - NFT details */}
                    <div className="flex flex-col">
                      <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 }}
                      >
                        <h2 className="mb-2 text-2xl font-bold text-white">Congratulations!</h2>
                        <p className="mb-6 text-slate-300">
                          You've successfully {pageName === "realtime" ? "subscribed to" : "purchased"} this valuable
                          dataset.
                        </p>

                        {/* Subscription info */}
                        <div className="mb-6 rounded-lg bg-blue-900/20 p-4">
                          <h3 className="mb-2 flex items-center gap-2 font-semibold text-blue-400">
                            <Clock className="h-4 w-4" />
                            {pageName === "realtime" ? "Subscription Details" : "Access Details"}
                          </h3>
                          <div className="grid gap-2 text-sm">
                            <div className="flex items-center justify-between">
                              <span className="text-slate-300">Start Date:</span>
                              <span className="font-medium text-white">{format(new Date(), "MMMM dd, yyyy")}</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-slate-300">End Date:</span>
                              <span className="font-medium text-white">{formattedEndDate}</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-slate-300">Duration:</span>
                              <span className="font-medium text-white">{duration} days</span>
                            </div>
                          </div>
                        </div>

                        {/* Dataset details */}
                        <div className="mb-6">
                          <h3 className="mb-2 flex items-center gap-2 font-semibold text-blue-400">
                            <Database className="h-4 w-4" />
                            Dataset Information
                          </h3>
                          <div className="grid gap-2 text-sm">
                            <div className="flex items-start gap-2">
                              <Calendar className="mt-0.5 h-4 w-4 flex-shrink-0 text-slate-400" />
                              <span className="text-slate-300">
                                Created on {format(new Date(nftData.created_at), "MMMM dd, yyyy")}
                              </span>
                            </div>
                            <div className="flex items-start gap-2">
                              <Award className="mt-0.5 h-4 w-4 flex-shrink-0 text-slate-400" />
                              <span className="text-slate-300">Published by {nftData.author}</span>
                            </div>
                            <div className="flex items-start gap-2">
                              <Shield className="mt-0.5 h-4 w-4 flex-shrink-0 text-slate-400" />
                              <span className="text-slate-300">Operated by {nftData.operator}</span>
                            </div>
                          </div>
                        </div>

                        {/* Tags */}
                        <div className="mb-6">
                          <h3 className="mb-2 flex items-center gap-2 font-semibold text-blue-400">
                            <Tag className="h-4 w-4" />
                            Tags
                          </h3>
                          <div className="flex flex-wrap gap-2">
                            {nftData.tags.slice(0, 6).map((tag, index) => (
                              <span
                                key={index}
                                className="rounded-full bg-slate-800 px-2.5 py-1 text-xs font-medium text-slate-300"
                              >
                                {tag}
                              </span>
                            ))}
                            {nftData.tags.length > 6 && (
                              <span className="rounded-full bg-slate-800 px-2.5 py-1 text-xs font-medium text-slate-300">
                                +{nftData.tags.length - 6} more
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Action buttons */}
                        <div className="mt-auto grid gap-3">
                          <button
                            onClick={closeModal}
                            className="w-full rounded-lg bg-gradient-to-r from-emerald-500 to-teal-500 px-6 py-3 font-bold text-white shadow-lg transition-all duration-300 hover:from-emerald-600 hover:to-teal-600 hover:shadow-xl"
                          >
                            <div className="flex items-center justify-center gap-2">
                              <Download className="h-5 w-5" />
                              Download Dataset
                            </div>
                          </button>
                          <button
                            onClick={closeModal}
                            className="w-full rounded-lg border border-slate-700 bg-slate-800 px-6 py-3 font-medium text-slate-300 transition-colors hover:bg-slate-700 hover:text-white"
                          >
                            Close
                          </button>
                        </div>
                      </motion.div>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>,
      document.body
    )
  }

  if (own == "") {
    return <></>
  }

  return (
    <div className="w-full">
      <div className="mb-4">{renderActionButton()}</div>

      <div className="mx-auto max-w-md text-center text-xs text-slate-400">
        {purchaseState !== "success" && (
          <p>
            {pageName === "realtime"
              ? `Subscribe to access real-time data for ${duration} days. Renews on ${formattedEndDate}.`
              : `Purchase this dataset once for permanent access. Includes ${duration} days of updates.`}
          </p>
        )}
      </div>

      {renderModalContent() as React.ReactNode}
    </div>
  )
}
