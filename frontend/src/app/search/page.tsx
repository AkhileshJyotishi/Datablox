import React from "react"

import axios from "axios"
import DataPacketGrid from "./GridComponent"
import NotFoundPage from "./NotFoundPage"

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

export default async function Page({ searchParams }: { searchParams: { query?: string } }) {
  const query = searchParams?.query || ""
  let metadatas: Metadata[] = []

  try {
    const RelevantTags = await axios.post(`${process.env.NEXT_PUBLIC_FRONTEND_URL}/api/get-search-results`, {
      searchQuery: query,
    })
    metadatas = RelevantTags.data.metadatas as Metadata[]
    console.log(metadatas)
  } catch (error) {
    console.error("Error fetching metadata:", error)
  }

  return (
    <div>
      {metadatas.length > 0 ? (
        <DataPacketGrid
          dataset={metadatas}
          query={query}
        />
      ) : (
        <NotFoundPage />
      )}
    </div>
  )
}
