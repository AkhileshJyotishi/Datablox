import React from "react"

import CompleteMetaData from "@/components/dataset-page/CompleteMetaData"
import realtime from "@/constants/realtime"

export default async function Page({ params }: { params: { id: string } }) {
  const datasetId = params.id
  const metadata = realtime[Number(datasetId)]
  return (
    <CompleteMetaData
      metadata={metadata}
      pageName="realtime"
    />
  )
}
