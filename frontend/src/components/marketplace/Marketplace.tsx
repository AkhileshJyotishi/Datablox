import React from 'react'
import RecentlyPublished from './RecentlyPublished'
import TopPublishers from './TopPublishers'
import Search from './search-bar'
import { InfiniteMovingCards } from '../infinite-cards'
import { datasets } from '@/constants/dataset'
import Buy from '../Buy'
import BuyData from '../Buy'
 
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
  ]

  return (
    <div className="relative">
      <div className="relative flex justify-center overflow-hidden">
        <div className="relative z-50 mb-3 mt-10 select-none">
          <div className="mt-8 flex flex-col items-center justify-center gap-3 py-10 text-gray-200">
            <div className="text-6xl font-bold">AI Data Market</div>
            <BuyData title="string"  tokenId={2} duration={2}></BuyData>
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
            <p className="my-2 text-2xl font-extrabold text-gray-400">Trending Datasets</p>

            <InfiniteMovingCards
              items={datasets}
              direction="right"
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
  return (
    <>
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
    </>
  )
}
