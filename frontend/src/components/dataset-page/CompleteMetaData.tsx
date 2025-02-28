'use client'
import React from "react"
import RelatedDataset from "./relatedDataset"
import Metadata from "./metadata"
import Image from "next/image"
import logo from "@/assets/dataset-page/img1.svg"
import clsx from "clsx"
import Chatbot from "./Chatbot"
import BannerImage from "../ui/banner-image"
import Dataset from "./dataset"
export default function CompleteMetaData({ metadata, pageName = "" }: { metadata: any; pageName?: string }) {
  console.log("metadata ", metadata);
  return (
    <section className={clsx("px-12 md:px-24  mt-4", pageName == "preview" ? "" : "min-h-[calc(100vh-1000px)]")}>
      <BannerImage bannerImage='' />
      <div className="relative -top-10 z-50">
        <h1 className="mb-6 max-w-5xl mx-auto text-center text-6xl font-semibold text-zinc-300">
          {metadata?.title || "Untitled Dataset"}
        </h1>
        <div className=" sm:grid sm:grid-cols-3 mx-auto justify-center gap-5 max-h-screen overflow-y-auto no-scrollbar">
          <div className={`${pageName !== "preview" ? "w-full" : "w-full"} flex flex-col col-span-2 justify-center gap-8 py-3`}>
            {/* Main Dataset Information */}
            <div className={`flex  h-full flex-col items-center justify-center border border-zinc-700 pb-8 shadow-lg backdrop-blur-sm`}>
              <div className="flex h-full w-full items-center border-b border-zinc-700">
                <div className="border-r border-zinc-700">
                  <Image
                    src={logo}
                    width={70}
                    height={70}
                    alt="logo"
                  />
                </div>
                <div className="px-3 text-white">
                  Owned by <span className="text-sm text-[#ff4092]">{metadata?.author || "Unknown"}</span>
                </div>
              </div>
              <Metadata
                created_at={metadata?.created_at}
                description={metadata?.description || "No description available"}
                tags={metadata?.tags || []}
                sampleData={metadata?.sampleData}
              />
              <Dataset metadata={metadata} pageName={pageName} />
            </div>

            {/* Sidebar */}
          </div>
          {pageName != "preview" && (
            <div className="py-3 max-h-[80vh] sticky top-10" style={{}}>
              <Chatbot ipfs={metadata.IPFS} />
            </div>
          )}
        </div>
        {pageName == "" && <RelatedDataset title={metadata.title} />}

      </div>

    </section>
  )
}
