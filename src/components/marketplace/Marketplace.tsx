import React from 'react'
import MarketHeader from './MarketHeader'
import Markethero from './Markethero'
import YourBookMark from './YourBookMark'
import MostSales from './MostSales'
import RecentlyPublished from './RecentlyPublished'
import TopTagsBySales from './TopTagsBySales'
import TopPublishers from './TopPublishers'
import AllData from './AllDatasets'

export default function Marketplace() {
  return (
    <div className='bg-[#0a0a0a] mb-20'>
      <MarketHeader />
      <Markethero />
      <div className='px-[10%] flex flex-col gap-10'>
        <YourBookMark />
        <MostSales />
        <TopPublishers />
        <TopTagsBySales />
        <RecentlyPublished />
        <AllData/>
      </div>
    </div>
  )
}
