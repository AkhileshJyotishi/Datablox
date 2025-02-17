import React from "react"

const MetadataSkeleton = () => {
  return (
    <div className="w-[80rem] mx-auto  px-16 md:px-32 py-6 text-white animate-pulse">
      <div className="mb-10 mt-5 flex w-full items-center gap-10">
        <div className="flex flex-col">
          <div className="text-xl font-bold h-6 w-32 bg-gray-700 rounded"></div>
          <div className="mt-2 h-32 w-32 bg-gray-700 rounded"></div>
        </div>
        <div className="w-full border border-zinc-700 px-6 py-2">
          <div className="mb-2 h-6 w-48 bg-gray-700 rounded"></div>
          <div className="h-4 w-full bg-gray-700 rounded"></div>
        </div>
      </div>
      <div className="flex flex-col gap-10">
        {/* Title Field */}
        <div>
          <div className="h-6 w-20 bg-gray-700 rounded mb-2"></div>
          <div className="h-10 w-full bg-gray-700 rounded"></div>
        </div>
        {/* Description Field */}
        <div>
          <div className="h-6 w-28 bg-gray-700 rounded mb-2"></div>
          <div className="h-20 w-full bg-gray-700 rounded"></div>
        </div>
        {/* Author Field */}
        <div>
          <div className="h-6 w-20 bg-gray-700 rounded mb-2"></div>
          <div className="h-10 w-full bg-gray-700 rounded"></div>
        </div>
        {/* Tags Field */}
        <div>
          <div className="h-6 w-16 bg-gray-700 rounded mb-2"></div>
          <div className="h-10 w-full bg-gray-700 rounded"></div>
        </div>
        {/* Submit Button */}
        <div className="flex justify-center">
          <div className="h-10 w-32 bg-gray-700 rounded"></div>
        </div>
      </div>
    </div>
  )
}

export default MetadataSkeleton
