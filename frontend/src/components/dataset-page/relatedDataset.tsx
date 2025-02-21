import React from "react"
import RelatedDataPacket from "./relatedDatasetCard"
import DataPacket from "../marketplace/DataPacket"
import axios from "axios"
interface Metadata {
  id: number
  operator: string
  chain: string
  title: string
  price: string
  sales: string
  address?: string
  description?: string
}
export default async function RelatedDataset({title}:{title:string}) {
  const query = `Find datasets related to "${title}". Prioritize relevance based on similar topics, keywords, and usage. Ensure the datasets align with the context of "${title}" and are useful for users looking for related data.`

  let relatedData: Metadata[] = [] // ✅ Explicit type added

  try {
    const RelevantTags = await axios.post(`${process.env.NEXT_PUBLIC_FRONTEND_URL}/api/get-search-results`, {
      searchQuery: query,
    })
    relatedData = RelevantTags.data.metadatas as Metadata[] // ✅ Ensure TypeScript knows its type
  } catch (error) {
    console.error("Error fetching metadata:", error)
  }
  return (
    <div className="mx-auto w-full">
      <p className="my-8 pl-5 text-2xl font-extrabold text-gray-400">Related Datasets</p>
      <div className="relative z-0 mx-auto grid max-w-7xl grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-3 md:gap-4">
        {relatedData.map((data: any, index: any) => (
          <DataPacket
            key={index}
            data={data}
          />
        ))}
      </div>
    </div>
  )
}
