import React from "react"

import Link from "next/link"

import axios from "axios"

import avatar from "@/assets/avatar/avatar1.png"

import { MarqueePublisher } from "./MarquePublisher"
export default async function TopPublishers() {
  let formattedData = []
  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_FRONTEND_URL}/api/get-publisher`);
    console.log("response ",response);
    const fetchedData = (response?.data.publisherData || []).slice(0, 10)
    formattedData = fetchedData
      .map((publisher: any) => ({
        id2: publisher.id,
        id: `${publisher.id.slice(0, 4)}...${publisher.id.slice(-4)}`, // ✅ Shortened ID format
        metaDataId: publisher.metaDataId,
      }))
      .sort((a: any, b: any) => b.metaDataId.length - a.metaDataId.length)
    console.log(fetchedData);
  } catch (error) {
    console.log("Error while fetching all the publisher")
  }
  // const publishers = [
  //   { avatar: "Avatar", owner: "0xbEFb…e219", sales: 275 },
  //   { avatar: "Avatar", owner: "0xd70B…90D8", sales: 264 },
  //   { avatar: "Avatar", owner: "autobotocean.eth", sales: 222 },
  //   { avatar: "Avatar", owner: "0x4Ab0…0f6a", sales: 186 },
  //   { avatar: "Avatar", owner: "0x6fd7…F7b5", sales: 182 },
  //   { avatar: "Avatar", owner: "0xF5dc…5497", sales: 161 },
  //   { avatar: "Avatar", owner: "datachallenges.eth", sales: 153 },
  //   { avatar: "Avatar", owner: "0x2321…2FE4", sales: 109 },
  //   { avatar: "Avatar", owner: "0x43a3…5026", sales: 0 },
  // ]

  return (
    <div className="mx-auto w-full">
      <p className="my-8 text-2xl font-extrabold text-gray-400">Top Publishers</p>
      {/* <div className='flex items-center gap-4 flex-wrap'> */}
      <div className="relative z-0">
        <MarqueePublisher
          speed="slow"
          direction="left"
        >
          {formattedData &&
            formattedData.length > 0 &&
            formattedData.map((publisher: any, index: number) => {
              if (index % 2 == 0) return <></>
              return (
                <Link
                  href={`/publisher/${publisher.id2}`}
                  key={index}
                  className="group/feature flex w-80 cursor-pointer items-center gap-3 rounded-md border border-[#303030] p-5 text-gray-400 transition-transform duration-200 hover:-translate-y-1"
                >
                  {index % 2 == 0 && (
                    <div className="-z-1 pointer-events-none absolute inset-0 h-full w-full bg-gradient-to-t from-neutral-100 to-transparent opacity-0 transition duration-200 group-hover/feature:opacity-100 dark:from-neutral-800" />
                  )}
                  {index % 2 == 1 && (
                    <div className="-z-1 pointer-events-none absolute inset-0 h-full w-full bg-gradient-to-b from-neutral-100 to-transparent opacity-0 transition duration-200 group-hover/feature:opacity-100 dark:from-neutral-800" />
                  )}
                  <div className="relative z-50 flex items-center gap-3">
                    <img
                      src={avatar.src}
                      className="h-10 rounded-full"
                      alt=""
                    />
                    <div className="flex flex-col justify-center">
                      <div className="font-bold text-white">{publisher.id}</div>
                      <div>
                        <span className="font-bold text-white">{publisher.metaDataId.length}</span>
                        <span className="ml-2">Datasets</span>
                      </div>
                    </div>
                  </div>
                </Link>
              )
            })}
        </MarqueePublisher>
        <MarqueePublisher
          direction="right"
          speed="slow"
        >
          {formattedData &&
            formattedData.length > 0 &&
            formattedData.map((publisher: any, index: number) => {
              if (index % 2 == 1) return <></>
              return (
                <Link
                  href={`/publisher/${publisher.id2}`}
                  key={index}
                  className="group/feature flex w-80 cursor-pointer items-center gap-3 rounded-md border border-[#303030] p-5 text-gray-400 transition-transform duration-200 hover:-translate-y-1"
                >
                  {index % 2 == 0 && (
                    <div className="-z-1 pointer-events-none absolute inset-0 h-full w-full bg-gradient-to-t from-neutral-100 to-transparent opacity-0 transition duration-200 group-hover/feature:opacity-100 dark:from-neutral-800" />
                  )}
                  {index % 2 == 1 && (
                    <div className="-z-1 pointer-events-none absolute inset-0 h-full w-full bg-gradient-to-b from-neutral-100 to-transparent opacity-0 transition duration-200 group-hover/feature:opacity-100 dark:from-neutral-800" />
                  )}
                  <div className="relative z-50 flex items-center gap-3">
                    <img
                      src={avatar.src}
                      className="h-10 rounded-full"
                      alt=""
                    />
                    <div className="flex flex-col justify-center">
                      <div className="font-bold text-white">{publisher.id}</div>
                      <div>
                        <span className="font-bold text-white">{publisher.metaDataId.length}</span>
                        <span className="ml-2">Datasets</span>
                      </div>
                    </div>
                  </div>
                </Link>
              )
            })}
        </MarqueePublisher>
      </div>
    </div>
  )
}
