"use client"
import React, { useEffect, useState } from "react"
import Image from "next/image"
import logo from "@/assets/dataset-page/img1.svg"
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
      return prev + 1;
    })
    setIsTabCompleted((prev: any) => {
      prev[tabNo] = true;
      return prev;
    })
  }
  const [price, setPrice] = useState(199);
  const [selectTab, setSelectTab] = useState(1);
  useEffect(() => {
    setUserData((prev: any) => ({
      ...prev,
      price: price,
    }));
  }, [price, setUserData]);

  useEffect(() => {
    if (price === 199 && userData?.price) {
      setPrice(userData.price);
    }
  }, [userData]);
  return (
    <div className="mx-auto flex w-full items-center px-32 pb-3 pt-6 text-white">
      <div className="px-auto mb-10 mt-5 flex w-full flex-col items-center justify-center">
        <div className="flex w-4/5 items-center justify-center border-b border-zinc-700 py-5 text-lg">
          <button
            className={`flex w-32 items-center justify-center gap-3 border border-zinc-700 py-2 font-bold ${selectTab == 1 ? "bg-white text-black" : "bg-black text-white"}`}
            onClick={() => setSelectTab(1)}
          >
            <div className={`h-5 w-5 rounded-full ${selectTab == 1 ? "border-[6px] border-[#b02d5b] bg-white" : "border border-zinc-700 bg-zinc-900"} `}>
            </div>
            FIXED
          </button>
          <button
            onClick={() => setSelectTab(2)}
            className={`flex w-32 items-center justify-center gap-3 border-zinc-700 py-2 font-bold  ${selectTab == 2 ? "bg-white text-black" : "bg-black text-white"}`}
          >
            <div className={`h-5 w-5 rounded-full  ${selectTab == 2 ? "border-[6px] border-[#b02d5b] bg-white" : "border border-zinc-700 bg-zinc-900"}`}></div>
            FREE
          </button>
          {/* <button className="">Free</button> */}
        </div>
        <div className="flex w-4/5 items-center border-zinc-700 py-5 text-lg">
          {selectTab == 1 ? <Tab1 price={price} setPrice={setPrice} /> : <Tab2 />}
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
const Tab1 = ({ price, setPrice }: { price: number, setPrice: any }) => {
  const [isChecked, setIsChecked] = useState(false)

  return (
    <div className="mt-4 w-full">
      <div className="text-base text-zinc-400">
        Set your price for accessing this dataset. The datatoken for this dataset will be worth the entered amount of
        the selected base token.
      </div>
      <div className="mb-6 mt-6">
        <div className="text-base font-bold">Price</div>
        <div className="font-base mt-1 flex w-full items-center justify-center border border-gray-400 bg-transparent px-3 py-6 font-bold text-zinc-300">
          <button
            className={`flex w-32 items-center justify-center gap-2 border border-zinc-600 bg-none py-2 font-bold text-white`}
          >
            SONIC
          </button>
          <input
            type="number"
            value={price}
            onChange={(e) => {
              setPrice(e.target.value)
            }}
            className={`flex w-32 items-center focus:outline-none px-2 justify-center gap-2 border border-zinc-600 bg-black/35 py-2  text-white`}
          />
        </div>
      </div>
    </div>
  )
}

const Tab2 = () => {
  const [isChecked, setIsChecked] = useState(false)

  return (
    <div className="mt-4 w-full">
      <div className="text-base text-zinc-400">
        Set your dataset as free. The datatoken for this dataset will be given for free via creating a faucet.
      </div>
      <div className="mt-5">
        <div className="text-base font-bold">Price</div>
        <div
          className="font-base mt-3 flex w-full cursor-pointer items-center gap-3 border border-zinc-700 bg-zinc-800 px-3 py-3 font-bold text-zinc-100"
          onClick={() => setIsChecked(!isChecked)}
        >
          <input
            type="checkbox"
            checked={isChecked}
            onChange={() => setIsChecked(!isChecked)}
            className={`h-5 w-5 cursor-pointer border-2 border-[#b02d5b] ${isChecked ? "bg-[#b02d5b]" : "bg-zinc-700"}`}
          />
          <span>I want this asset to be free. I understand network fees are still to be paid.</span>
        </div>
      </div>
    </div>
  )
}
