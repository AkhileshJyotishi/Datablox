import React from "react"
import NoDataFound from "./noDataFound"
import CompleteMetaData from "@/components/dataset-page/CompleteMetaData"

export default async function Page({ params }: { params: { datasetId: string } }) {
  const datasetId = params.datasetId

  let metadata = null

  try {
    const response = await fetch(`http://localhost:3000/api/getmetadata?metadataid=${datasetId}`)

    if (!response.ok) {
      console.error("Error fetching metadata:", response.statusText)
      return <NoDataFound />
    } else {
      const data = await response.json()
      if (!data.error) {
        metadata = data
      }
    }
  } catch (error) {
    console.error("Error fetching metadata:", error)
  }

  return (
    <CompleteMetaData
      metadata={metadata}
      // pageName="preview"
    />
  )
}
