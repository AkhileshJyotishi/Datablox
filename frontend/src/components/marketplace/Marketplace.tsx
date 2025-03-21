import React from "react"

// import { InfiniteMovingCards } from '../infinite-cards'
import dynamic from "next/dynamic"
import Link from "next/link"

import DataPacketSkeleton from "@/app/search/skeleton"

import { datasets } from "@/constants/dataset"
import realtime from "@/constants/realtime"

import RecentlyPublished from "./RecentlyPublished"
import Search from "./search-bar"
import TopPublishers from "./TopPublishers"
// import BannerImage from '../ui/banner-image'

const InfiniteMovingCards = dynamic(() => import("../infinite-cards"), {
  ssr: false,
  loading: () => <DataPacketSkeleton />,
})

export default function Marketplace() {
  const tags = [
    "AI",
    "machine-learning",
    "deep-learning",
    "computer-vision",
    "natural-language-processing",
    "financial-data",
    "blockchain",
    "cryptocurrency",
    "healthcare",
    "medical-imaging",
    "speech-recognition",
    "autonomous-vehicles",
  ]

  return (
    <div className="relative max-w-7xl">
      <div className="relative flex justify-center overflow-hidden">
        <div className="relative z-50 mb-3 mt-10 select-none">
          <div className="mt-8 flex flex-col items-center justify-center gap-3 py-10 text-gray-200">
            <div className="text-6xl font-bold">AI Data Market</div>
            <div className="text-2xl">
              A next-gen marketplace to discover, publish, and trade AI-verified datasets securely on the Sonic Network.
            </div>
          </div>
          <div className="mt-12">
            <Search />
          </div>
          <div className="mx-auto mt-4 flex max-w-5xl flex-wrap justify-center gap-2 p-2">
            {<TagComp tags={tags} />}
          </div>
          <div className="mt-24">
            <p className="my-2 text-2xl font-extrabold text-gray-400">Realtime Datasets</p>
            <InfiniteMovingCards
              items={realtime}
              direction="right"
              speed="slow"
              realtime={true}
            />
          </div>
          <div className="mt-24">
            <p className="my-2 text-2xl font-extrabold text-gray-400">Trending Datasets</p>
            <InfiniteMovingCards
              items={datasets}
              direction="left"
              speed="slow"
            />
          </div>

          <div className="flex flex-col gap-10">
            <TopPublishers />
            <RecentlyPublished />
          </div>
        </div>
      </div>
    </div>
  )
}

export function TagComp({ tags }: { tags: string[] }) {
  if (typeof tags === "string") {
    tags = JSON.parse(tags)
  }
  console.log(tags)
  return (
    <>
      {tags.map((tag: any, index: number) => {
        return (
          <Link
            href={`/search?query=${encodeURIComponent(tag)}`}
            className="cursor-pointer items-center justify-center border border-[#303030] px-3 text-gray-400 hover:text-[#ff4092]"
            key={index}
          >
            {tag}
          </Link>
        )
      })}
    </>
  )
}
