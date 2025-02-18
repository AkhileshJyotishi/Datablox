import React from "react"

const MetadataSkeleton = () => {
  return (
    <div className="mx-auto w-[80rem] animate-pulse px-16 py-6 text-white md:px-32">
      <div className="mb-10 mt-5 flex w-full items-center gap-10">
        <div className="flex flex-col">
          <div className="h-6 w-32 rounded bg-gray-700 text-xl font-bold"></div>
          <div className="mt-2 h-32 w-32 rounded bg-gray-700"></div>
        </div>
        <div className="w-full border border-zinc-700 px-6 py-2">
          <div className="mb-2 h-6 w-48 rounded bg-gray-700"></div>
          <div className="h-4 w-full rounded bg-gray-700"></div>
        </div>
      </div>
      <div className="flex flex-col gap-10">
        {/* Title Field */}
        <div>
          <div className="mb-2 h-6 w-20 rounded bg-gray-700"></div>
          <div className="h-10 w-full rounded bg-gray-700"></div>
        </div>
        {/* Description Field */}
        <div>
          <div className="mb-2 h-6 w-28 rounded bg-gray-700"></div>
          <div className="h-20 w-full rounded bg-gray-700"></div>
        </div>
        {/* Author Field */}
        <div>
          <div className="mb-2 h-6 w-20 rounded bg-gray-700"></div>
          <div className="h-10 w-full rounded bg-gray-700"></div>
        </div>
        {/* Tags Field */}
        <div>
          <div className="mb-2 h-6 w-16 rounded bg-gray-700"></div>
          <div className="h-10 w-full rounded bg-gray-700"></div>
        </div>
        {/* Submit Button */}
        <div className="flex justify-center">
          <div className="h-10 w-32 rounded bg-gray-700"></div>
        </div>
      </div>
    </div>
  )
}

export default MetadataSkeleton
