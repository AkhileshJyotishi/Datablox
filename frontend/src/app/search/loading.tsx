import React from "react"
import DataPacketSkeleton from "./skeleton"

const loading = () => {
  return (
    <div className="mx-auto mb-7 mt-7 grid max-w-7xl grid-cols-3 gap-7">
      {Array.from({ length: 6 }, (_, index) => (
        <DataPacketSkeleton key={index} />
      ))}
    </div>
  )
}

export default loading
