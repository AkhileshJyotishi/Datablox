// "use client"
import React from "react"

import CompleteMetaData from "../dataset-page/CompleteMetaData"
export default function PublishPage({
  userData,
  setUserData,
  tabNo,
  setTabNo,
  setIsTabCompleted,
}: {
  userData: any
  setUserData: any
  tabNo: any
  setTabNo: any
  setIsTabCompleted: any
}) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setTabNo((prev: any) => {
      return prev + 1
    })
    setIsTabCompleted((prev: any) => {
      prev[tabNo] = true
      return prev
    })
  }
  const data = {
    title: userData?.metadata?.title || "Sample Dataset",
    created_at: new Date().toISOString(), // e.g., "2025-02-17T07:10:24.118Z"
    description: userData?.metadata?.description || "This is a sample dataset description.",
    author: userData?.metadata?.author || "John Doe",
    tags: JSON.stringify(userData?.metadata?.tags) || JSON.stringify(["science", "AI", "machine learning"]),
    providerUrl: userData?.access?.providerUrl || "https://provider-example.com",
    IPFS: userData?.access?.IPFS || "QmT5NvUtoM5nWFfrQdVrF7C6d6Xv1bNsbG1",
    samplefile: userData?.access?.samplefile || "https://provider-example.com/sample-file.csv",
    timeout: userData?.access?.timeout || 60, // Default timeout in seconds
    price: userData?.price || "199.99",
    owner: userData?.owner || "0x0000000000000000000000000000000000000000",
  }

  return (
    <CompleteMetaData
      metadata={data}
      pageName="preview"
    />
  )
}
