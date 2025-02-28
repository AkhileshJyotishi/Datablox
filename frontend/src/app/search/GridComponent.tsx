import React from "react"

import DataPacket from "@/components/marketplace/DataPacket"
import { TagComp } from "@/components/marketplace/Marketplace"
import Search from "@/components/marketplace/search-bar"
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid"
import { SparklesPreview } from "@/components/ui/SparkleCore"

interface DataPacketGridProps {
  dataset: {
    id: number
    operator: string
    chain: string
    title: string
    price: string
    sales: string
    address?: string
    description?: string
  }[]
  query: string
}

const DataPacketGrid: React.FC<DataPacketGridProps> = ({ dataset, query }) => {
  const tags = [
    "AI",
    "machine-learning",
    "deep-learning",
    "computer-vision",
    "natural-language-processing",
    "financial-data",
    "blockchain",
    "cryptocurrency",
    "healthcare",
    "medical-imaging",
    "speech-recognition",
    "autonomous-vehicles",
  ]
  return (
    <div>
      {/* <Search />
      <div className="mx-auto mt-3 flex max-w-5xl flex-wrap justify-center gap-2 p-2">
        <TagComp tags={tags} />
      </div> */}
      {/* <SparklesPreview/> */}
      <div className="mt-10 flex flex-col gap-x-10 text-4xl text-white/80">
        <div className="mt-2 text-3xl font-semibold text-white">🔍 Here's what we found for</div>

        {/* User's Query */}
        <div className="mt-2 w-[85%] pl-12 text-2xl font-bold text-gray-300"> "{query}"</div>
      </div>
      <div className="mx-auto mb-7 mt-7 grid max-w-7xl grid-cols-3 gap-4">
        {dataset.map((data, index) => (
          <DataPacket
            key={index}
            data={data}
          />
        ))}
      </div>
    </div>
  )
}

export default DataPacketGrid
