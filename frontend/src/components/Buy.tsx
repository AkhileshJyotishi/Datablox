"use client"
import React from "react"
import DownloadButton from "./DownloadIPFS"

export default function Buy({ title, tokenId, duration }: { title: string; tokenId: number; duration: number }) {
  const Link = ""
  return (
    <div>
      <DownloadButton
        ipfsUrl={Link}
        title={title}
      />
    </div>
  )
}
