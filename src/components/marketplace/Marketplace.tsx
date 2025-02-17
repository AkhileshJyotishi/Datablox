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
    <div className='relative'>
      <div className="relative flex justify-center overflow-hidden  ">
        <div className=" relative z-50 mt-28 mb-3 select-none">
          <Markethero />
          <div className='px-4 md:px-10 flex flex-col gap-10'>
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
