import React from 'react'
import YourBookMark from './YourBookMark'
import MostSales from './MostSales'
import RecentlyPublished from './RecentlyPublished'
import TopTagsBySales from './TopTagsBySales'
import TopPublishers from './TopPublishers'
import AllData from './AllDatasets'
import { BackgroundCellCore } from '../misc/BackgroundCellAnimation'
import { PlaceholdersAndVanishInput } from '../placeholder-search'
import Search from './search-bar'
import { InfiniteMovingCards } from '../infinite-cards'

export default function Marketplace() {

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
    "ai"
  ];

  const testimonials = [
    {
      quote:
        "It was the best of times, it was the worst of times, it was the age of wisdom, it was the age of foolishness, it was the epoch of belief, it was the epoch of incredulity, it was the season of Light, it was the season of Darkness, it was the spring of hope, it was the winter of despair.",
      name: "Charles Dickens",
      title: "A Tale of Two Cities",
    },
    {
      quote:
        "To be, or not to be, that is the question: Whether 'tis nobler in the mind to suffer The slings and arrows of outrageous fortune, Or to take Arms against a Sea of troubles, And by opposing end them: to die, to sleep.",
      name: "William Shakespeare",
      title: "Hamlet",
    },
    {
      quote: "All that we see or seem is but a dream within a dream.",
      name: "Edgar Allan Poe",
      title: "A Dream Within a Dream",
    },
    {
      quote:
        "It is a truth universally acknowledged, that a single man in possession of a good fortune, must be in want of a wife.",
      name: "Jane Austen",
      title: "Pride and Prejudice",
    },
    {
      quote:
        "Call me Ishmael. Some years ago—never mind how long precisely—having little or no money in my purse, and nothing particular to interest me on shore, I thought I would sail about a little and see the watery part of the world.",
      name: "Herman Melville",
      title: "Moby-Dick",
    },
  ];
  const datasets = [
    {
      operator: "TASANG-84",
      chain: "Polygon",
      Heading: "Ocean CEX Aggregator: ETH/USDT",
      address: "0xF5dc…5497",
      description: "This data feed returns ETH/USDT OHLC history: {open, high, low, close} over time, …",
      price: "Free",
      sales: "160",
    },
    {
      operator: "QUEFIS-86",
      chain: "Polygon",
      Heading: "ETH/USDT orderbook",
      address: "0x4Ab0…0f6a",
      description: "Real-time ETH/USDT orderbook. To take the bid orders, access data.bids array To take t…",
      price: "20,422",
      sales: "99",
    },
    {
      operator: "RECCLO-45",
      chain: "Polygon",
      Heading: "Aggregated 1 hour OCEAN/USDT candles",
      address: "0xd70B…90D8",
      description: "Real-time aggregated 1-hour OCEAN/USDT candles. Response type: content-json Resu…",
      price: "10",
      sales: "99",
    },
    {
      operator: "PERSEA-72",
      chain: "Polygon",
      Heading: "Aggregated 1 hour BTC/USDT candles",
      address: "0xd70B…90D8",
      description: "Real-time aggregated 1-hour BTC/USDT candles. Response type: content-json Resu…",
      price: "19,887",
      sales: "91",
    },
    {
      operator: "SAGANG-73",
      chain: "Polygon",
      Heading: "Aggregated 1 hour ETH/USDT candles",
      address: "0xd70B…90D8",
      description: "Real-time aggregated 1-hour ETH/USDT candles. Response type: content-json Resu…",
      price: "19,803",
      sales: "74",
    },
    {
      operator: "BOOTUN-98",
      chain: "Polygon",
      Heading: "unicef_fantom_grant_rounds",
      address: "0x6fd7…F7b5",
      description: "Directory of all grant applications and votes for the UNICEF and Fantom rounds",
      price: "Free",
      sales: "74",
    }
  ];
  return (
    <div className='relative'>
      <div className="relative flex justify-center overflow-hidden  ">
        <div className=" relative z-50 mt-10 mb-3 select-none">
          <div className='flex flex-col items-center justify-center text-gray-200 gap-3 py-10 mt-8'>
            <div className='text-6xl font-bold' >
              AI Data Market
            </div>
            <div className='text-2xl'>
              A next-gen marketplace to discover, publish, and trade AI-verified datasets securely on the Sonic Network.
            </div>
          </div>
          <div className='mt-12'>

            <Search />
          </div>
          <div className='flex gap-2 flex-wrap mt-4 max-w-5xl justify-center p-2 mx-auto'>
            {
              tags.map((tag, index) => {
                return (
                  <div className='border border-[#303030] text-gray-400 items-center justify-center px-3 cursor-pointer hover:text-[#ff4092]' key={index}>
                    {tag}
                  </div>
                )
              })
            }
          </div>
          <div className='mt-24'>
            <p className='text-2xl my-2 text-gray-400 font-extrabold'>Trending Datasets</p>

            <InfiniteMovingCards
              items={datasets}
              direction="right"
              speed="slow"
            />
          </div>

          <div className='   flex flex-col gap-10'>
            <TopPublishers />
            <RecentlyPublished />
          </div>
        </div>
      </div>
    </div>
  )
}
