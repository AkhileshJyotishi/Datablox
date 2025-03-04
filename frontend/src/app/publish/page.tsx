"use client"
import React, { useMemo, useState } from "react"

import dynamic from "next/dynamic"

import { MdCheck } from "react-icons/md"

import { SkeletonLoader } from "@/data"

import MetadataSkeleton from "@/components/publish-page/meta-skeleton"

//   export default SkeletonLoader;

// const PublishPage = dynamic(() => import("@/components/publish-page/PublishPage"), {
//   ssr: false,
//   loading: () => <SkeletonLoader />,
// })
const Pricing = dynamic(() => import("@/components/publish-page/Pricing"), {
  ssr: false,
  loading: () => <SkeletonLoader />,
})
// const Preview = dynamic(() => import("@/components/publish-page/Preview"), {
//   ssr: false,
//   loading: () => <SkeletonLoader />,
// })
const Metadata = dynamic(() => import("@/components/publish-page/Metadata"), {
  ssr: false,
  loading: () => <MetadataSkeleton />,
})
const Access = dynamic(() => import("@/components/publish-page/Access"), {
  ssr: false,
  loading: () => <SkeletonLoader />,
})

type TabButtonProps = {
  tab: number
  selected: boolean
  buttonName: string
  isCompleted: boolean
  setTabNo: React.Dispatch<React.SetStateAction<number>>
}

const TabButton: React.FC<TabButtonProps> = ({ tab, selected, buttonName, isCompleted, setTabNo }) => (
  <button
    className={`flex w-fit items-center gap-3 rounded-md py-2 text-xl text-zinc-200`}
    onClick={() => setTabNo(tab)}
  >
    <div
      className={`flex h-[28px] w-[28px] items-center justify-center rounded-full border p-0 text-sm ${selected ? (isCompleted ? "bg-white text-green-700" : "bg-white text-zinc-600") : isCompleted ? "bg-green-700 text-white" : "text-white"} border-gray-200`}
    >
      {isCompleted ? <MdCheck className="text-lg font-bold" /> : tab}
    </div>
    <div className="text-zinc-200">{buttonName}</div>
  </button>
)

export default function Page() {
  const [tabNo, setTabNo] = useState<number>(1)
  const [isTabCompleted, setIsTabCompleted] = useState<boolean[]>([false, false, false, false, false])
  const [userData, setUserData] = useState<Record<string, any>>({})

  const TabForm = useMemo(
    () => [
      {
        tabNo: 1,
        element: <Metadata {...{ userData, setUserData, tabNo, setTabNo, setIsTabCompleted }} />,
        name: "Metadata",
      },
      {
        tabNo: 2,
        element: <Pricing {...{ userData, setUserData, tabNo, setTabNo, setIsTabCompleted }} />,
        name: "Pricing",
      },
      {
        tabNo: 3,
        element: <Access {...{ userData, setUserData, tabNo, setTabNo, setIsTabCompleted }} />,
        name: "Submit",
      },
      // {
      //   tabNo: 4,
      //   element: <Preview {...{ userData, setUserData, tabNo, setTabNo, setIsTabCompleted }} />,
      //   name: "Preview",
      // },
      // {
      //   tabNo: 5,
      //   element: <PublishPage {...{ userData, setUserData, tabNo, setTabNo, setIsTabCompleted }} />,
      //   name: "Submit",
      // },
    ],
    [userData, tabNo, setUserData, setTabNo, setIsTabCompleted]
  )

  return (
    <div className="min-w-[40rem] max-w-7xl border border-zinc-700 backdrop-blur-lg md:min-w-[80rem]">
      <div className="flex items-center justify-center border-b border-zinc-700 px-20 py-5">
        {TabForm.map((elem, ind) => (
          <div
            key={ind}
            className={`flex items-center justify-start ${elem.tabNo !== 3 && "w-full"}`}
          >
            <TabButton
              buttonName={elem.name}
              selected={elem.tabNo === tabNo}
              isCompleted={isTabCompleted[elem.tabNo]}
              tab={elem.tabNo}
              setTabNo={setTabNo}
            />
            {elem.tabNo !== 3 && <div className="mx-3 h-0 w-full border border-t border-zinc-700"></div>}
          </div>
        ))}
      </div>

      {TabForm.find((tab) => tab.tabNo === tabNo)?.element}
    </div>
  )
}
