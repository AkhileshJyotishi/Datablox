import React from "react"
import avatar from "@/assets/avatar/avatar1.png"
export default function TopPublishers() {
  const publishers = [
    { avatar: "Avatar", owner: "0xbEFb…e219", sales: 275 },
    { avatar: "Avatar", owner: "0xd70B…90D8", sales: 264 },
    { avatar: "Avatar", owner: "autobotocean.eth", sales: 222 },
    { avatar: "Avatar", owner: "0x4Ab0…0f6a", sales: 186 },
    { avatar: "Avatar", owner: "0x6fd7…F7b5", sales: 182 },
    { avatar: "Avatar", owner: "0xF5dc…5497", sales: 161 },
    { avatar: "Avatar", owner: "datachallenges.eth", sales: 153 },
    { avatar: "Avatar", owner: "0x2321…2FE4", sales: 109 },
    { avatar: "Avatar", owner: "0x43a3…5026", sales: 0 },
  ]

  return (
    <div className="mx-auto w-full">
      <p className="my-8 text-2xl font-extrabold text-gray-400">Top Publishers</p>
      {/* <div className='flex items-center gap-4 flex-wrap'> */}
      <div className="relative z-0 grid grid-cols-1 gap-4 md:grid-cols-3">
        {publishers.map((publisher, index) => (
          <div
            key={index}
            className="group/feature flex cursor-pointer items-center gap-3 rounded-md border border-[#303030] p-5 text-gray-400 transition-transform duration-200 hover:-translate-y-1"
          >
            {index < 4 && (
              <div className="-z-1 pointer-events-none absolute inset-0 h-full w-full bg-gradient-to-t from-neutral-100 to-transparent opacity-0 transition duration-200 group-hover/feature:opacity-100 dark:from-neutral-800" />
            )}
            {index >= 4 && (
              <div className="-z-1 pointer-events-none absolute inset-0 h-full w-full bg-gradient-to-b from-neutral-100 to-transparent opacity-0 transition duration-200 group-hover/feature:opacity-100 dark:from-neutral-800" />
            )}
            <div className="relative z-50 flex items-center gap-3">
              <img
                src={avatar.src}
                className="h-10 rounded-full"
                alt=""
              />
              <div className="flex flex-col justify-center">
                <div className="font-bold text-white">{publisher.owner}</div>
                <div>
                  <span className="font-bold text-white">{publisher.sales}</span>
                  <span className="ml-2">sales</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
