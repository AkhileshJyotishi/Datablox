import React from 'react'
import avatar from '@/assets/avatar/avatar1.png'
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
        { avatar: "Avatar", owner: "0x43a3…5026", sales: 0 }
    ];

    return (
        <div className='w-full mx-auto'>

            <p className='text-2xl my-8 text-gray-400 font-extrabold'>Top Publishers</p>
            {/* <div className='flex items-center gap-4 flex-wrap'> */}
            <div className="relative z-0 grid grid-cols-1 gap-4 md:grid-cols-3">

                {publishers.map((publisher, index) => (
                    <div key={index}
                        className="group/feature border border-[#303030]  text-gray-400 p-5  rounded-md transition-transform duration-200 hover:-translate-y-1 cursor-pointer  flex gap-3 items-center "

                    >
                        {index < 4 && (
                            <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-t from-neutral-100 dark:from-neutral-800 to-transparent pointer-events-none -z-1" />
                        )}
                        {index >= 4 && (
                            <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-b from-neutral-100 dark:from-neutral-800 to-transparent pointer-events-none -z-1" />
                        )}
                        <div className='flex gap-3 items-center z-50 relative'>
                            <img src={avatar.src} className='rounded-full h-10' alt="" />
                            <div className='flex-col flex justify-center'>
                                <div className='text-white font-bold'>{publisher.owner}</div>
                                <div>
                                    <span className='text-white font-bold'>{publisher.sales}</span>
                                    <span className='ml-2'>sales</span>
                                </div>
                            </div>
                        </div>

                    </div>
                ))}
            </div>
        </div>
    )
}
