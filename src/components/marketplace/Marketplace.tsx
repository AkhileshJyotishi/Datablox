import React from 'react'
import MarketHeader from './MarketHeader'
import Markethero from './Markethero'
import YourBookMark from './YourBookMark'
import MostSales from './MostSales'
import RecentlyPublished from './RecentlyPublished'
import TopTagsBySales from './TopTagsBySales'
import TopPublishers from './TopPublishers'
import AllData from './AllDatasets'
import { BackgroundCellCore } from '../misc/BackgroundCellAnimation' 

export default function Marketplace() {
  return (
    <div className='bg-[#0a0a0a] my-4 relative'>
      <div className="relative flex justify-center overflow-hidden bg-[#0a0a0a] ">
        <BackgroundCellCore />
        <div className="pointer-events-none relative z-50 mt-16 mb-3 select-none">
          <Markethero />
          <div className='px-[10%] flex flex-col gap-10'>
            <YourBookMark />
            <TopPublishers />
            <TopTagsBySales />
            <RecentlyPublished />
            <AllData/>
          </div>
        </div>
      </div>
    </div>
  )
}
