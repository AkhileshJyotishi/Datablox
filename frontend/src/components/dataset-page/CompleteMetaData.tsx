"use client"
import React from "react"

import Image from "next/image"

import clsx from "clsx"

import logo from "@/assets/dataset-page/img1.svg"

import BannerImage from "../ui/banner-image"

import Chatbot from "./Chatbot"
import Dataset from "./dataset"
import Metadata from "./metadata"
import RelatedDataset from "./relatedDataset"
export default function CompleteMetaData({ metadata, pageName = "" }: { metadata: any; pageName?: string }) {
  console.log("metadata ", metadata)
  return (
    <section className={clsx("mt-4 px-12 md:px-24", pageName == "preview" ? "" : "min-h-[calc(100vh-1000px)]")}>
      <BannerImage bannerImage="" />
      <div className="relative -top-10 z-50">
        <h1 className="mx-auto mb-6 max-w-5xl text-center text-5xl font-semibold text-zinc-300">
          {metadata?.title || "Untitled Dataset"}
        </h1>
        <div className="no-scrollbar mx-auto max-h-screen justify-center gap-5 overflow-y-auto sm:grid sm:grid-cols-3">
          <div
            className={`${pageName !== "preview" ? "w-full" : "w-full"} col-span-2 flex flex-col justify-center gap-8 py-3`}
          >
            {/* Main Dataset Information */}
            <div
              className={`flex h-full flex-col items-center justify-center border border-zinc-700 pb-8 shadow-lg backdrop-blur-sm`}
            >
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
              <Dataset
                metadata={metadata}
                pageName={pageName}
              />
            </div>

            {/* Sidebar */}
          </div>
          {pageName != "preview" && (
            <div
              className="sticky top-2 h-[82vh] py-3"
              style={{}}
            >
              <Chatbot ipfs={metadata.IPFS} />
            </div>
          )}
        </div>
        {/* {pageName == "" && <RelatedDataset title={metadata.title} />} */}
      </div>
    </section>
  )
}
