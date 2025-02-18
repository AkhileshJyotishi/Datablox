import React from "react"
import Dataset from "./dataset"
import RelatedDataset from "./relatedDataset"
import Metadata from "./metadata"
import Image from "next/image"
import logo from "@/assets/dataset-page/img1.svg"
import clsx from "clsx"
import { datasets } from "@/constants/dataset"
import Chatbot from "./Chatbot"

export default function CompleteMetaData({ metadata, pageName = "preview" }: { metadata: any; pageName: string }) {
  return (
    <section className={clsx("px-12 md:px-36", pageName == "preview" ? "" : "min-h-screen")}>
      <h1 className="mb-6 mt-12 text-center text-7xl font-semibold text-zinc-300">
        {metadata?.title || "Untitled Dataset"}
      </h1>
      <div className="flex gap-5">
        <div className="flex flex-col justify-center gap-8 py-3">
          {/* Main Dataset Information */}
          <div className="flex h-full flex-col items-center justify-center border border-zinc-700 pb-8 shadow-lg backdrop-blur-sm">
            <div className="flex h-full w-full items-center justify-between border-b border-zinc-700">
              <div className="border-r border-zinc-700">
                <Image
                  src={logo}
                  width={70}
                  height={70}
                  alt="logo"
                />
              </div>
              <div className="h-full w-full px-3 text-white">
                Owned by <span className="text-sm text-[#ff4092]">{metadata?.author || "Unknown"}</span>
              </div>
            </div>
            <Metadata
              created_at={metadata?.created_at}
              description={metadata?.description || "No description available"}
              tags={metadata?.tags || []}
            />
          </div>

          {/* Sidebar */}
        </div>
        <div className="w-[80%] py-3">
          <Chatbot ipfs={metadata.ipfs} />
        </div>
      </div>
      <div className="flex h-full w-1/3 flex-col items-center justify-center bg-opacity-70 shadow-lg">
        <Dataset />
      </div>
      <RelatedDataset relatedData={datasets} />
    </section>
  )
}
