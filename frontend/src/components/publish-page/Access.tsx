"use client"

import React, { useEffect, useState } from "react"

import { TbReload } from "react-icons/tb"
import { toast } from "sonner"
import { useAccount, useWaitForTransactionReceipt, useWriteContract } from "wagmi"

import { getTransactionReceipt } from "@wagmi/core"

import { wagmiContractConfigOwner } from "@/services/contract"
import { pinata } from "@/utils/config"

import { config } from "../../config/index"
import { FileUpload } from "../ui/file-upload"
import axios from "axios"
import { useRouter } from "next/navigation"
import { AiOutlineLoading3Quarters } from "react-icons/ai"

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
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash });
  const [loading,setLoading] = useState(false);
  const {address} = useAccount();
  const router = useRouter();

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
    console.log("data ", uri, tokenName, tokenSymbol, price)
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
      const rec = await getTransactionReceipt(config, { hash: val });
      console.log(rec,"rec");
      const decimalNumber = parseInt(rec.logs[1].data, 18)
      console.log(decimalNumber)
      const ans = parseInt(rec.logs[1].data.slice(2, 66), 16);
      const tokenId = ans
      if (tokenId) {
        userData.tokenId = tokenId
        console.log("Form submitted:", userData.access, tokenId)
        setTabNo((prev) => prev + 1)
        setIsTabCompleted((prev) => {
          const updated = [...prev]
          updated[tabNo] = true
          return updated
        })
        handleFinalSubmit();
      }
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




  const handleFinalSubmit = async () => {
    if (!address) {
      toast("No Wallet Address fount", {
        description: "Kindly connect wallet first to publish the data",
      })
      return
    }
    try {
      //
      setLoading(true)
      const response = await axios.post("/api/postmetadata", {
        ...userData,
        owner: address,
        // tokenId:
      })
      if (response.status == 200) {
        setLoading(false)
        const metaDataId = response.data.metadataId
        router.push(`/dataset/${metaDataId}`)
      }
      console.log(response)
    } catch (error) {
      toast("Error in publishing dataset")
    } finally {
      setLoading(false)
    }
  }
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const newErrors: Errors = {
      providerUrl: "",
      IPFS: "",
      samplefile: "",
      timeout: "",
    }

    if (!userData?.access?.providerUrl?.trim()) newErrors.providerUrl = "Provider URL is required."
    if (!userData?.access?.IPFS?.trim()) newErrors.IPFS = "IPFS is required."
    if (!userData?.access?.samplefile?.trim()) newErrors.samplefile = "Sample file is required."
    if (!userData?.access?.timeout || userData?.access?.timeout <= 0)
      newErrors.timeout = "Timeout must be greater than 0."

    setErrors(newErrors)

    if (!newErrors.providerUrl && !newErrors.IPFS && !newErrors.samplefile && !newErrors.timeout) {
      try {
        setLoading(true);
        await createContract(
          userData.access.IPFS,
          userData.metadata.title,
          userData.metadata.title.slice(0, 3).toUpperCase(),
          userData.price
        )
      } catch (error) {
        console.error("Error submitting form:", error)
        toast("Error submitting form")
      }finally{
        setLoading(false);
      }
    }
  }

  return (
    <div className="mx-auto w-full px-32 py-6 text-white">
      <div className="mx-auto w-full px-24   py-6 text-white">
        {/* Data Token Header */}
        <div className="text-md font-bold">
          Data Token<span className="text-base text-zinc-400">*</span>
        </div>
        <div className="mb-10 mt-3 flex w-full items-center gap-10">
          <div className="flex flex-col">
            <div className="flex h-28 w-28 items-center justify-center rounded-full bg-black">
              <svg
                width="4em"
                height="4em"
                viewBox="0 0 394 399"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill="#e000cf"
                  d="M196.742 57.263c15.783 0 28.588-12.815 28.588-28.63C225.33 12.82 212.525 0 196.742 0c-15.798 0-28.603 12.82-28.603 28.632 0 15.816 12.805 28.631 28.603 28.631ZM29.167 213.019c11.694 0 21.16-9.492 21.16-21.193s-9.466-21.182-21.16-21.182c-11.684 0-21.16 9.481-21.16 21.182 0 11.701 9.476 21.193 21.16 21.193ZM365.451 213.019c11.678 0 21.155-9.492 21.155-21.193s-9.477-21.182-21.155-21.182c-11.689 0-21.166 9.481-21.166 21.182 0 11.701 9.477 21.193 21.166 21.193ZM218.467 275.433c0 11.699-9.476 21.19-21.158 21.19-11.687 0-21.163-9.491-21.163-21.19 0-11.7 9.476-21.185 21.163-21.185 11.682 0 21.158 9.485 21.158 21.185ZM112.662 255.393c11.693 0 21.163-9.491 21.163-21.187 0-11.706-9.47-21.187-21.163-21.187-11.687 0-21.158 9.481-21.158 21.187 0 11.696 9.471 21.187 21.158 21.187ZM301.965 234.206c0 11.696-9.476 21.187-21.158 21.187-11.693 0-21.163-9.491-21.163-21.187 0-11.706 9.47-21.187 21.163-21.187 11.682 0 21.158 9.481 21.158 21.187ZM29.175 270.282c7.894 0 14.29-6.418 14.29-14.311 0-7.913-6.396-14.321-14.29-14.321-7.905 0-14.306 6.408-14.306 14.321 0 7.893 6.401 14.311 14.306 14.311ZM379.743 255.971c0 7.893-6.405 14.311-14.297 14.311-7.898 0-14.298-6.418-14.298-14.311 0-7.913 6.4-14.321 14.298-14.321 7.892 0 14.297 6.408 14.297 14.321ZM197.312 355.031c7.884 0 14.292-6.418 14.292-14.326 0-7.903-6.408-14.305-14.292-14.305-7.89 0-14.303 6.402-14.303 14.305 0 7.908 6.413 14.326 14.303 14.326ZM126.962 298.346c0 7.905-6.399 14.31-14.292 14.31-7.898 0-14.303-6.405-14.303-14.31 0-7.911 6.405-14.321 14.303-14.321 7.893 0 14.292 6.41 14.292 14.321ZM280.812 312.656c7.881 0 14.29-6.405 14.29-14.31 0-7.911-6.409-14.321-14.29-14.321-7.902 0-14.305 6.41-14.305 14.321 0 7.905 6.403 14.31 14.305 14.31ZM36.602 306.35c0 4.119-3.327 7.452-7.432 7.452-4.111 0-7.438-3.333-7.438-7.452a7.434 7.434 0 0 1 7.438-7.437 7.433 7.433 0 0 1 7.432 7.437ZM365.448 313.802c4.098 0 7.432-3.333 7.432-7.452a7.438 7.438 0 0 0-7.432-7.437 7.432 7.432 0 0 0-7.437 7.437c0 4.119 3.324 7.452 7.437 7.452ZM204.741 391.102c0 4.112-3.334 7.449-7.432 7.449-4.108 0-7.437-3.337-7.437-7.449a7.435 7.435 0 1 1 14.869 0ZM112.662 356.176c4.106 0 7.438-3.337 7.438-7.444a7.439 7.439 0 0 0-7.438-7.444c-4.1 0-7.432 3.327-7.432 7.444 0 4.107 3.332 7.444 7.432 7.444ZM288.239 348.732c0 4.107-3.334 7.444-7.432 7.444a7.437 7.437 0 0 1-7.438-7.444 7.43 7.43 0 0 1 7.438-7.444c4.098 0 7.432 3.327 7.432 7.444ZM225.33 113.381c0 15.814-12.805 28.631-28.588 28.631-15.798 0-28.603-12.817-28.603-28.631 0-15.809 12.805-28.632 28.603-28.632 15.783 0 28.588 12.823 28.588 28.632ZM196.742 225.617c15.783 0 28.588-12.82 28.588-28.627 0-15.817-12.805-28.637-28.588-28.637-15.798 0-28.603 12.82-28.603 28.637 0 15.807 12.805 28.627 28.603 28.627ZM393.469 113.381c0 15.814-12.802 28.631-28.593 28.631-15.795 0-28.597-12.817-28.597-28.631 0-15.809 12.802-28.632 28.597-28.632 15.791 0 28.593 12.823 28.593 28.632ZM28.598 142.012c15.793 0 28.592-12.817 28.592-28.631 0-15.809-12.8-28.632-28.592-28.632C12.805 84.75 0 97.572 0 113.381c0 15.814 12.805 28.631 28.598 28.631ZM141.832 71.006c0 15.812-12.801 28.632-28.595 28.632-15.795 0-28.595-12.82-28.595-28.632 0-15.822 12.8-28.631 28.595-28.631 15.794 0 28.595 12.81 28.595 28.631ZM113.237 183.242c15.794 0 28.595-12.821 28.595-28.634 0-15.808-12.801-28.629-28.595-28.629-15.795 0-28.595 12.821-28.595 28.629 0 15.813 12.8 28.634 28.595 28.634ZM309.971 71.006c0 15.812-12.804 28.632-28.598 28.632-15.793 0-28.592-12.82-28.592-28.632 0-15.822 12.799-28.631 28.592-28.631 15.794 0 28.598 12.81 28.598 28.631ZM281.373 183.242c15.794 0 28.598-12.821 28.598-28.634 0-15.808-12.804-28.629-28.598-28.629-15.793 0-28.592 12.821-28.592 28.629 0 15.813 12.799 28.634 28.592 28.634Z"
                ></path>
              </svg>
            </div>
          </div>
          <div className="flex w-full items-center gap-2 border border-zinc-700 px-6 py-2">
            <div className="text-md font-bold text-zinc-200">{changeParam[changeParamNumber]}</div>
            <button onClick={() => setChangeParamNumber(getRandomIntInclusive(0, 3))}>
              <TbReload color="#ff4092" />
            </button>
          </div>
        </div>

        <div className="space-y-10">
          {/* Provider URL Field */}
          <div className="hidden">
            <label className="text-md font-bold">
              Provider URL
              <span className="text-base text-zinc-400">*</span>
            </label>
            <div className="mt-2 flex gap-2">
              <input
                type="text"
                name="providerUrl"
                value={"provider url"}
                onChange={handleInputChange}
                className="w-full  rounded-md border border-gray-600 bg-transparent px-3 py-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-red-800"
              />
              <button className="ml-2 rounded-md bg-gradient-to-r from-[#9e2750] to-[#b02d5b] px-4 py-2 text-sm font-bold uppercase text-white transition-all duration-300 hover:from-[#8b2347] hover:to-[#9b284f] active:from-[#7d1f41] active:to-[#8f2449]">
                Validate
              </button>
            </div>
            {errors.providerUrl && <p className="mt-1 text-sm text-red-600">{errors.providerUrl}</p>}
          </div>

          {/* IPFS File Field */}
          <div>
            <label className="text-md font-bold">
              IPFS File<span className="text-base text-zinc-400">*</span>
            </label>
            <div className="mx-auto min-h-96 w-full max-w-4xl rounded-lg border border-dashed border-gray-400 bg-white dark:border-gray-400 dark:bg-black">
              <FileUpload onChange={handleFileUpload} />
            </div>
            {files.length > 0 && (
              <div className="mt-4 flex justify-center">
                <button
                  onClick={uploadFileToIPFS}
                  disabled={isUploading}
                  className="flex items-center rounded-md bg-gradient-to-r from-[#9e2750] to-[#b02d5b] px-4 py-2 text-white transition-all duration-300 hover:from-[#8b2347] hover:to-[#9b284f]"
                >
                  {isUploading ? (
                    <>
                      <svg
                        className="mr-3 h-5 w-5 animate-spin text-white"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                        ></path>
                      </svg>
                      Uploading...
                    </>
                  ) : (
                    "Upload to IPFS"
                  )}
                </button>
              </div>
            )}
          </div>

          {/* Sample File Field */}
          <div>
            <label className="text-md font-bold">
              Sample Data<span className="text-base text-zinc-400">*</span>
            </label>
            <div className="mt-2 flex gap-2">
              <textarea
                name="samplefile"
                placeholder={JSON.stringify([
                  {
                    "srNo": "1",
                    "feature1": "asfa",
                    "feature2": "dfkdfalj",
                    "feature3": "askdasj"
                  }
                ])}
                value={userData?.access?.samplefile || ""}
                onChange={handleInputChange}
                
                className="w-full rounded-md border border-gray-600 bg-transparent min-h-28 px-3 py-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-red-800"
              />
            </div>
            {errors.samplefile && <p className="mt-1 text-sm text-red-600">{errors.samplefile}</p>}
          </div>

          {/* Timeout Field */}
          <div>
            <label className="text-md font-bold">
              Timeout in days<span className="text-base text-zinc-400">*</span>
            </label>
            <div className="mt-2 flex gap-2">
              <input
                type="number"
                name="timeout"
                placeholder="7 days"
                value={userData?.access?.timeout || 25}
                onChange={handleInputChange}
                className="w-full rounded-md border border-gray-600 bg-transparent px-3 py-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-red-800"
              />
            </div>
            {errors.timeout && <p className="mt-1 text-sm text-red-600">{errors.timeout}</p>}
          </div>

          {/* Submit Button */}
          <div className="flex justify-center">
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="rounded-md bg-gradient-to-r from-[#9e2750] to-[#b02d5b] px-8 py-2 font-sans text-lg font-semibold text-white transition-all duration-300 hover:from-[#8b2347] hover:to-[#9b284f] active:from-[#7d1f41] active:to-[#8f2449]"
            >
              {loading?<AiOutlineLoading3Quarters className="animate-spin font-bold"/>:"Submit"}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
