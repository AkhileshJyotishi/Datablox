import React from "react"
import DataPacketSkeleton from "./skeleton"

const loading = () => {
  return (
    <div className="mt-12 grid grid-cols-1 gap-4 rounded-md lg:grid-cols-6">
      {Array.from({ length: 10 }, (_, index) => (
        <DataPacketSkeleton key={index} />
      ))}
    </div>
  )
}

export default loading
