import React from "react"
import { FaArrowDown } from "react-icons/fa6"
import { PiLineVerticalLight } from "react-icons/pi"
import Table from "./table"
interface MetadataProps {
  // owner: string;
  description: string
  tags: string[]
  created_at: string
}

export default function Metadata({ created_at, description, tags }: MetadataProps) {
  const SampleData = [
    {
      srNo: "1",
      feature1: "asfa",
      feature2: "dfkdfalj",
      feature3: "askdasj",
      // feature4: "dfkdfalj",
      // feature5: "dfkdfalj",
      // feature6: "dfkdfalj",
      // feature7: "dfkdfalj",
      // feature8: "dfkdfalj",
      // feature9: "dfkdfalj",
    },
  ]
  const tableHeaders = Object.keys(SampleData[0])

  function timeAgo(timestamp: string): string {
    const now = new Date()
    const past = new Date(timestamp)
    const seconds = Math.floor((now.getTime() - past.getTime()) / 1000)

    if (seconds < 60) return `${seconds} seconds ago`
    const minutes = Math.floor(seconds / 60)
    if (minutes < 60) return `${minutes} minutes ago`
    const hours = Math.floor(minutes / 60)
    if (hours < 24) return `${hours} hours ago`
    const days = Math.floor(hours / 24)
    if (days < 30) return `${days} days ago`
    const months = Math.floor(days / 30)
    if (months < 12) return `${months} months ago`
    const years = Math.floor(months / 12)

    return `${years} years ago`
  }

  return (
    <div className="w-full">
      <h2 className="mb-6 flex font-mono text-lg text-zinc-700">
        <FaArrowDown className="ml-2 mt-2" />
        <PiLineVerticalLight className="mr-1 mt-1 text-2xl" />
        <div className="mt-1">DATASET</div>
        <PiLineVerticalLight className="mr-1 mt-1 text-2xl" />
        <div className="mt-1">Published {timeAgo(created_at)}</div>
      </h2>
      <div className="mb-4 px-4">
        <h3 className="mb-2 text-2xl font-semibold text-zinc-300">Description</h3>
        <p className="text-lg italic text-white/75">{description}</p>
      </div>
      <div className="px-4">
        <h3 className="mt-2 text-2xl font-semibold text-zinc-300">Tags</h3>
        <div className="mt-3 flex flex-wrap gap-2">
          <Tags tags={tags} />
        </div>
      </div>
      <div className="mt-6 px-4">
        <h3 className="mb-2 text-2xl font-semibold text-zinc-300">Sample Data</h3>
        <Table SampleData={SampleData} />
      </div>
    </div>
  )
}

function Tags({ tags }: { tags: any }) {
  // const tags = [
  //     "defi",
  //     "orderbook",
  //     "desights",
  //     "gitcoin-grant-protocol",

  // ];
  tags = JSON.parse(tags)
  console.log(tags)

  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((tag: any, index: number) => {
        return (
          <div
            className="cursor-pointer items-center justify-center border border-[#303030] px-3 text-gray-400 hover:text-[#ff4092]"
            key={index}
          >
            {tag}
          </div>
        )
      })}
    </div>
  )
}
