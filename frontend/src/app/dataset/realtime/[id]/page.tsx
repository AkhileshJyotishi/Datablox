import React from "react"
import CompleteMetaData from "@/components/dataset-page/CompleteMetaData"
import NoDataFound from "../../[datasetId]/noDataFound"
import realtime from "@/constants/realtime"

export default async function Page({ params }: { params: { id: string } }) {
  const datasetId = params.id
  let metadata = realtime[Number(datasetId)];
  return (
    <CompleteMetaData
      metadata={metadata}
      pageName="realtime"
    />
  )
}
