import { Button } from "@/ui/button"
import React from "react"
import { FaFilePdf } from "react-icons/fa"
import { RiFileList3Line } from "react-icons/ri"
export default function Dataset() {
  const datasetSize = "1.2 MB" // Dummy value—replace with real data if available.
  const price = "$10"
  return (
    <div className="h-full w-full border border-zinc-600 backdrop-blur-sm">
      <div className="flex h-full w-full items-center gap-1 border-b border-zinc-700 px-6 py-3">
        <div className="">
          <FaFilePdf className="text-6xl text-[#8b98a9]" />
        </div>
        <div className="h-full px-3 text-white">
          <div className="text-sans text-lg font-normal">
            Size <span className="text-md text-[#ff4092]"> {datasetSize}</span>
          </div>
          <div className="text-sans text-lg font-normal">
            Price <span className="text-md text-[#ff4092]"> {price}</span>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center px-6 py-5">
        <button className="rounded-md bg-gradient-to-r from-[#d93678] to-[#e94c8e] px-6 py-2 font-bold text-white transition-all duration-300 hover:from-[#b92e66] hover:to-[#d63f7c] active:from-[#a02858] active:to-[#bf356b]">
          Get Dataset
        </button>
        <div className="mt-3 text-xs text-gray-500">
          To access this dataset, you will purchase 1 Sonic and instantly return it to the publisher for verification.
        </div>
      </div>
      <div className="flex flex-row items-center justify-center gap-2 border-t border-zinc-700 px-6 py-3 text-base text-white">
        <strong className="text-lg">99</strong> Sales
      </div>
    </div>
  )
}
