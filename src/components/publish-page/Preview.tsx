"use client"
import React, { useEffect, useState } from "react"
import Image from "next/image"
import logo from "@/assets/dataset-page/img1.svg"
import Metadata from "../dataset-page/metadata"
import Dataset from "../dataset-page/dataset"
import RelatedDataset from "../dataset-page/relatedDataset"
export default function PublishPage({
  userData,
  setUserData,
  tabNo,
  setTabNo,
  setIsTabCompleted,
}: {
  userData: any
  setUserData: any
  tabNo: any
  setTabNo: any
  setIsTabCompleted: any
}) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setTabNo((prev: any) => {
      return prev + 1
    })
    setIsTabCompleted((prev: any) => {
      prev[tabNo] = true
      return prev
    })
  }
  const data = {
    dataName: "Demo",
    ownedBy: "Random User",
    tags: ["tag1", "tag2"],
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sed error nesciunt nobis accusantium ipsum eius reiciendis animi veniam iusto, quasi beatae eveniet labore velit molestias natus fugit pariatur adipisci assumenda saepe itaque. Cumque, hic veritatis eum consectetur harum reiciendis laudantium voluptate fugiat quo expedita cum magnam quibusdam? Quas aliquid pariatur rerum, quidem inventore culpa quae ab repellendus earum quasi voluptatum suscipit dolorum tenetur natus vel dolores in nemo ad ipsa ex reiciendis? Libero vel, atque nisi quia reiciendis nam iste est consectetur fuga quibusdam delectus, deserunt dicta id alias, in deleniti enim natus aliquam ratione odit placeat. Soluta, consectetur possimus.",
    fileUrl: "http://demourl.com",
  };
  const [selectTab, setSelectTab] = useState(1)
  return (
    <div className="mx-auto flex w-full items-center px-16 pb-3 pt-6 text-white">
      <div className="px-auto mb-10 mt-5 flex w-full flex-col items-center justify-center">
        <div className="flex flex-row justify-center  gap-8 py-3">
          <div className="flex h-full w-2/3 flex-col items-center justify-center border border-zinc-700 bg-[#141414]  pb-8 shadow-lg">
            <div className="flex h-full w-full items-center justify-between border-b border-zinc-700">
              <div className="border-r border-zinc-700">
                <Image
                  src={logo}
                  width={70}
                  height={70}
                  alt="logo"
                  // className='h-40'
                />
              </div>
              <div className="h-full w-full px-3 text-white">
                Owned by
                <span className="text-sm text-[#ff4092]"> {data.ownedBy}</span>
              </div>
            </div>
            <Metadata
              //   owner={data.ownedBy}
              description={data.description}
              tags={data.tags}
            />
          </div>
          <div className="flex h-full w-1/3 flex-col items-center justify-center bg-opacity-70 shadow-lg">
            <Dataset />
            <RelatedDataset />
          </div>
        </div>

        <div className="mt-5 flex justify-center">
          <button
            // type="submit"
            onClick={handleSubmit}
            className="rounded-md bg-gradient-to-r from-[#9e2750] to-[#b02d5b] px-8 py-2 font-sans text-lg font-semibold text-white transition-all duration-300 hover:from-[#8b2347] hover:to-[#9b284f] active:from-[#7d1f41] active:to-[#8f2449]"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  )
}
