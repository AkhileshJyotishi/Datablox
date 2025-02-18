import React from "react"

export default function TopTagsBySales() {
  const tags = [
    "defi",
    "orderbook",
    "desights",
    "gitcoin-grant-protocol",
    "fdd",
    "odc",
    "bounty",
    "dimitra",
    "grant-applications",
    "data",
    "AI",
    "data-challenge",
    "trade",
    "financial",
    "gitcoin",
    "fantom",
    "health",
    "grant-votes",
    "unicef",
    "ai",
  ]

  return (
    <div className="mx-auto w-[95%]">
      <p className="my-8 text-xl font-bold text-gray-400">Top Tags By Sales</p>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag, index) => {
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
    </div>
  )
}
