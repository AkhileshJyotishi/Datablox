"use client"
import React from "react"

import { FaFilePdf } from "react-icons/fa"
import { useAccount } from "wagmi"

import BuyData from "../Buy"
import Subscribe from "../Subscribe"

const nftData = {
  operator: "Sonic-320",
  owner: "0x5EB3a34e6003f7811d17f5b3925c42cdAe0A7c8e",
  chain: "SONIC",
  title: "Influencer Impact on Real Madrid vs Man City: Twitter Fan & Analysis Dataset (2025-02-20)",
  description:
    "This dataset captures the impact of influencers and fan reactions on Twitter during the Real Madrid vs Man City match on February 20, 2025. It includes tweets from verified accounts, sports analysts, and regular fans, covering match updates, tactical analysis, and emotional responses. The data includes tweet metadata such as sentiment scores, engagement metrics (likes, retweets, replies), hashtags, and media attachments, making it valuable for social media analysis, sentiment tracking, and sports engagement research",
  price: "5",
  sales: "94",
  id: 0,
  IPFS: "http://localhost:3000/api/get-realtime-data?id=0",
  tags: [
    "Football",
    "Real Madrid",
    "Manchester City",
    "Twitter Analysis",
    "Sports Analytics",
    "Sentiment Analysis",
    "Influencer Impact",
    "Fan Reactions",
    "Social Media",
    "Match Updates",
  ],
  author: "Sonic-realtime-service",
  created_at: "2025-02-28T20:23:51.576Z",
  sampleData: {
    id: "2900012345678901234",
    edit_history_tweet_ids: ["2900012345678901234"],
    created_at: "2025-02-20T18:45:00.000Z",
    text: "What a performance! Real Madrid is dominating Man City right now. Incredible goals and flawless teamwork! #RMvMC #HalaMadrid",
    language: "en",
    author_id: "100001",
    author_name: "RealMadridOfficial",
    author_username: "RealMadrid",
    verified: true,
    follower_count: 35000000,
    influencer_flag: true,
    hashtags: ["RMvMC", "HalaMadrid"],
    mentions: [],
    attachments: { media_urls: [] },
    retweet_count: 5000,
    like_count: 12000,
    reply_count: 800,
    quote_count: 300,
    match_id: "RMvMC_2025Feb20",
    match_details: "Real Madrid vs Man City, Real Madrid leading 2-0, 60th minute",
    sentiment_score: 0.92,
    topic_label: "match_update",
  },
}
export default function Dataset({ metadata, pageName }: { metadata: any; pageName: any }) {
  const { address } = useAccount()
  const datasetSize = "1.2 MB"
  const price = metadata.price
  const sales = metadata.sales || 0
  return (
    <div className="mt-8 flex w-full justify-between px-4">
      <div className="flex">
        <div className="">
          <FaFilePdf className="text-[83px] text-[#8b98a9]" />
        </div>
        <div className="h-full px-3 text-white">
          <div className="text-sans text-lg font-normal">
            Size <span className="text-md text-[#ff4092]"> {datasetSize}</span>
          </div>
          <div className="text-sans text-lg font-normal">
            Price <span className="text-md text-[#ff4092]"> {price + " Sonic"}</span>
          </div>
          <div className="text-sans text-lg font-normal">
            Sales <span className="text-md text-[#ff4092]"> {metadata.sales || 0}</span>
          </div>
        </div>
      </div>
      {pageName == "" && address != metadata.owner && (
        <div className="flex flex-col items-center justify-center px-6">
          <BuyData
            nftData={nftData}
            ipfs="http://localhost:3000/api/get-realtime-data?id=0"
            title={nftData.title}
            price={5}
            tokenId={0}
            duration={30}
            pageName="realtime"
          />
          {/* <BuyData ipfs={metadata.IPFS} title={metadata.title} price={metadata.price} tokenId={metadata.tokenId} duration={metadata.timeout} /> */}
        </div>
      )}
      {pageName == "realtime" && address && address != metadata.owner && (
        <div className="flex flex-col items-center justify-center px-6">
          <BuyData
            nftData={nftData}
            ipfs="http://localhost:3000/api/get-realtime-data?id=0"
            title={nftData.title}
            price={5}
            tokenId={0}
            duration={30}
            pageName="realtime"
          />
          {/* <Subscribe ipfs={metadata.IPFS} title={metadata.title} price={metadata.price} tokenId={metadata.tokenId} duration={metadata.timeout}/> */}
        </div>
      )}
    </div>
  )
}
