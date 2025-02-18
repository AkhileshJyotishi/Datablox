"use client"

import React, { useEffect, useState } from "react"
import { TbReload } from "react-icons/tb"
import { FileUpload } from "../ui/file-upload"
import { pinata } from "@/utils/config"
import { toast } from "sonner"
import { useWriteContract, useWaitForTransactionReceipt } from "wagmi"
import { wagmiContractConfigOwner } from "@/services/contract"
import { getTransactionReceipt } from "@wagmi/core"
import { config } from "../../config/index"

interface AccessProps {
  userData: any
  setUserData: React.Dispatch<React.SetStateAction<any>>
  tabNo: number
  setTabNo: React.Dispatch<React.SetStateAction<number>>
  setIsTabCompleted: React.Dispatch<React.SetStateAction<boolean[]>>
}

interface Errors {
  providerUrl: string
  IPFS: string
  samplefile: string
  timeout: string
}

export default function Access({ userData, setUserData, tabNo, setTabNo, setIsTabCompleted }: AccessProps) {
  const [errors, setErrors] = useState<Errors>({
    providerUrl: "",
    IPFS: "",
    samplefile: "",
    timeout: "",
  })

  const [isUploading, setIsUploading] = useState(false)
  const [files, setFiles] = useState<File[]>([])
  const { data: hash, writeContractAsync } = useWriteContract()
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash })

  const changeParam = [
    "Contumacious Herring Token — CONHER-70",
    "Caustic Cuttlefish Token — CAUCUT-40",
    "Sagacious Nautilus Token — SAGNAU-82",
    "Adroit Shark Token — ADRSHA-23",
  ]
  
  const getRandomIntInclusive = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min
  const [changeParamNumber, setChangeParamNumber] = useState(getRandomIntInclusive(0, 3))

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    try {
      const { name, value } = e.target
      setUserData((prev: any) => ({
        ...prev,
        access: {
          ...prev.access,
          [name]: name === "timeout" ? Number(value) : value,
        },
      }))

      if (errors[name as keyof Errors]) {
        setErrors((prev) => ({ ...prev, [name]: "" }))
      }
    } catch (error) {
      console.error("Error handling input change:", error)
      toast("Error updating input field")
    }
  }

  const handleFileUpload = (uploadedFiles: File[]) => {
    try {
      setFiles(uploadedFiles)
      console.log("Selected files:", uploadedFiles)
    } catch (error) {
      console.error("Error handling file upload:", error)
      toast("Error selecting file")
    }
  }

  const uploadFileToIPFS = async () => {
    if (!files.length) return

    setIsUploading(true)
    try {
      const keyResponse = await fetch(`/api/files`)
      const keyData = await keyResponse.json()

      const uploadResult = await pinata.upload.file(files[0]).key(keyData.JWT)
      const ipfsUrl = await pinata.gateways.convert(uploadResult.IpfsHash)
      console.log("IPFS URL:", ipfsUrl)

      setUserData((prev: any) => ({
        ...prev,
        access: { ...prev.access, IPFS: ipfsUrl },
      }))
      toast("File successfully uploaded to IPFS")
    } catch (error) {
      console.error("Error uploading file to IPFS:", error)
      toast("Error uploading file to IPFS")
    } finally {
      setIsUploading(false)
    }
  }

  const [tokenVal, setTokenVal] = useState("")

  const createContract = async (uri: string, tokenName: string, tokenSymbol: string, price: number) => {
    try {
      const val = await writeContractAsync({
        ...wagmiContractConfigOwner,
        functionName: "mintDatasetToken",
        args: [BigInt(1000), uri, tokenName, tokenSymbol, BigInt(price)],
      })

      console.log(val)
      setTokenVal(val)

      if (isConfirmed) {
        const rec = await getTransactionReceipt(config, { hash: val })
        console.log(rec)
      }
      return val
    } catch (error) {
      console.error("Error creating contract:", error)
      toast("Error creating contract")
      return null
    }
  }

  async function getTokenData(val: any) {
    try {
      const rec = await getTransactionReceipt(config, { hash: val })
      const decimalNumber = parseInt(rec.logs[1].data, 18)
      console.log(decimalNumber)
      const ans = parseInt(rec.logs[1].data.slice(2, 66), 16)
      console.log(ans)
    } catch (error) {
      console.error("Error fetching token data:", error)
      toast("Error fetching token data")
    }
  }

  useEffect(() => {
    if (isConfirmed && tokenVal) {
      console.log(tokenVal)
      getTokenData(tokenVal)
    }
  }, [isConfirmed])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const newErrors: Errors = {
      providerUrl: "",
      IPFS: "",
      samplefile: "",
      timeout: "",
    }

    if (!userData?.access?.providerUrl.trim()) newErrors.providerUrl = "Provider URL is required."
    if (!userData?.access?.IPFS.trim()) newErrors.IPFS = "IPFS is required."
    if (!userData?.access?.samplefile?.trim()) newErrors.samplefile = "Sample file is required."
    if (!userData?.access?.timeout || userData?.access?.timeout <= 0)
      newErrors.timeout = "Timeout must be greater than 0."

    setErrors(newErrors)

    if (!newErrors.providerUrl && !newErrors.IPFS && !newErrors.samplefile && !newErrors.timeout) {
      try {
        const tokenId = await createContract(
          userData.access.IPFS,
          userData.metadata.title,
          userData.metadata.title.slice(0, 3).toUpperCase(),
          userData.access.price
        )

        if (tokenId) {
          userData.tokenId = tokenId
          console.log("Form submitted:", userData.access, tokenId)
          setTabNo((prev) => prev + 1)
          setIsTabCompleted((prev) => {
            const updated = [...prev]
            updated[tabNo] = true
            return updated
          })
        }
      } catch (error) {
        console.error("Error submitting form:", error)
        toast("Error submitting form")
      }
    }
  }

  return (
    <div className="mx-auto w-full px-32 py-6 text-white">
      {/* UI Code remains unchanged */}
    </div>
  )
}
