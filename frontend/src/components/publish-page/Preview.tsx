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
    <div>
      <CompleteMetaData
        metadata={data}
        pageName="preview"
      />
      <div className="flex justify-center mb-6">
        <button
          onClick={()=>{
            setTabNo((prev:number) => prev + 1)
          }}
          className="rounded-md bg-gradient-to-r from-[#9e2750] to-[#b02d5b] px-8 py-2 font-sans text-lg font-semibold text-white transition-all duration-300 hover:from-[#8b2347] hover:to-[#9b284f] active:from-[#7d1f41] active:to-[#8f2449]"
        >
          Submit
        </button>
      </div>
    </div>
  )
}
