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
    "autonomous-vehicles"
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
        operator: "RANDOM-77",
        chain: "sonic",
        Heading: "Global Weather Data 2024",
        address: "0x5EB3a34e6003f7811d17f5b3925c42cdAe0A7c8e",
        description: "A dataset containing daily weather data (temperature, humidity, and precipitation) for major cities worldwide in 2024.",
        price: "199",
        sales: "0",
        id: 10
      },
      {
        operator: "RANDOM-85",
        chain: "sonic",
        Heading: "Global Energy Consumption Data (2024)",
        address: "0xA1B2C3D4E5F67890ABCDEF1234567890ABCDEF12",
        description: "A dataset containing detailed global energy consumption statistics for 2024, covering electricity, oil, gas, and renewable energy sources. This dataset is valuable for energy analysts, policy makers, and sustainability researchers.",
        price: "299",
        sales: "0",
        id: 11
      },
      {
        operator: "RANDOM-66",
        chain: "sonic",
        Heading: "Global Energy Consumption Data (2024)",
        address: "0xA1B2C3D4E5F67890ABCDEF1234567890ABCDEF12",
        description: "A dataset containing detailed global energy consumption statistics for 2024, covering electricity, oil, gas, and renewable energy sources. This dataset is valuable for energy analysts, policy makers, and sustainability researchers.",
        price: "299",
        sales: "0",
        id: 12
      },
      {
        operator: "RANDOM-79",
        chain: "sonic",
        Heading: "Carbon Emissions from Energy Use (2023)",
        address: "0xE5F6A7B8C9D01234EF5678901234EF56",
        description: "Data on carbon dioxide emissions from energy use globally, broken down by fuel type and country.  This dataset is crucial for climate change research and tracking progress towards emissions reduction targets.",
        price: "499",
        sales: "0",
        id: 13
      },
      {
        operator: "RANDOM-90",
        chain: "sonic",
        Heading: "US Electricity Consumption by Sector (2024)",
        address: "0xD4E5F6A7B8C90123DEF4567890123DEF45",
        description: "Detailed data on US electricity consumption, broken down by sector (residential, commercial, industrial, transportation).  Provides insights into electricity demand patterns and energy use across different sectors of the US economy.",
        price: "149",
        sales: "0",
        id: 14
      },
      {
        operator: "RANDOM-85",
        chain: "sonic",
        Heading: "Global Oil and Gas Reserves (2024)",
        address: "0xC3D4E5F6A7B89012CDEF3456789012CDEF34",
        description: "Data on global oil and gas reserves, including proven reserves, production rates, and reserve life. This dataset is essential for understanding the global energy landscape and assessing future energy supply.",
        price: "399",
        sales: "0",
        id: 15
      },
      {
        operator: "RANDOM-78",
        chain: "sonic",
        Heading: "Renewable Energy Production - Europe (2023)",
        address: "0xB2C3D4E5F6A78901BCDEF2345678901BCDEF23",
        description: "Data on renewable energy production in Europe for 2023, broken down by country and energy source (solar, wind, hydro, biomass).  Useful for tracking progress towards renewable energy targets and analyzing trends in the European energy sector.",
        price: "199",
        sales: "0",
        id: 16
      },
      {
        operator: "RANDOM-63",
        chain: "sonic",
        Heading: "Global Energy Consumption Data (2024)",
        address: "0xA1B2C3D4E5F67890ABCDEF1234567890ABCDEF12",
        description: "A dataset containing detailed global energy consumption statistics for 2024, covering electricity, oil, gas, and renewable energy sources. This dataset is valuable for energy analysts, policy makers, and sustainability researchers.",
        price: "299",
        sales: "0",
        id: 17
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
              <TagComp tags={tags}/>
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


export function TagComp({tags}:{tags:string[]}){
  return (
    <>
    {tags.map((tag:any, index:number) => {
      return (
        <div className='border border-[#303030] text-gray-400 items-center justify-center px-3 cursor-pointer hover:text-[#ff4092]' key={index}>
          {tag}
        </div>
      )
    })}
    </>
  )
}