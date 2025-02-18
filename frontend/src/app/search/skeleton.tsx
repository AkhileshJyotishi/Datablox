import { HiDownload } from "react-icons/hi"
import React from "react"

const DataPacketSkeleton: React.FC = () => {
  return (
    <div className="relative h-full animate-pulse overflow-hidden rounded-3xl border border-[#303030] p-6 backdrop-blur-sm">
      <div className="flex items-center text-white">
        <span className="px-2">
          <HiDownload className="opacity-50" />
        </span>
        <span className="h-4 w-12 rounded border border-b-0 border-t-0 border-[#303030] bg-gray-700 px-3 text-xs"></span>
        <span className="h-4 w-16 rounded border border-b-0 border-t-0 border-[#303030] bg-gray-700 px-3 text-xs"></span>
        <span className="h-4 w-10 rounded bg-gray-700 px-3 text-xs"></span>
      </div>
      <div className="mt-3 h-5 w-4/5 rounded bg-gray-700 px-2 text-xl font-extrabold text-white"></div>
      <div className="mt-2 h-4 w-3/5 rounded bg-gray-700 px-2 text-base text-gray-400"></div>
      <div className="my-2 flex-grow overflow-hidden px-2 text-sm text-gray-400">
        <div className="mb-1 h-3 w-full rounded bg-gray-700"></div>
        <div className="h-3 w-5/6 rounded bg-gray-700"></div>
      </div>
      <div className="mt-2 h-4 w-12 rounded bg-gray-700 px-2 text-base text-gray-200"></div>
      <span className="mx-2 text-sm">mOcean</span>
      <div className="my-2 mt-auto flex gap-1 px-2 text-lg text-gray-400">
        <div className="h-5 w-8 rounded bg-gray-700"></div>
        <span>sales</span>
      </div>
    </div>
  )
}

export default DataPacketSkeleton
