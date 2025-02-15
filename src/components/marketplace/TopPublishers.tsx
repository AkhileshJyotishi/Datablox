import React from 'react'
import avatar from '@/assets/avatar/avatar1.png'
export default function TopPublishers() {
    const publishers = [
        { avatar: "Avatar", address: "0xbEFb…e219", sales: 275 },
        { avatar: "Avatar", address: "0xd70B…90D8", sales: 264 },
        { avatar: "Avatar", address: "autobotocean.eth", sales: 222 },
        { avatar: "Avatar", address: "0x4Ab0…0f6a", sales: 186 },
        { avatar: "Avatar", address: "0x6fd7…F7b5", sales: 182 },
        { avatar: "Avatar", address: "0xF5dc…5497", sales: 161 },
        { avatar: "Avatar", address: "datachallenges.eth", sales: 153 },
        { avatar: "Avatar", address: "0x2321…2FE4", sales: 109 },
        { avatar: "Avatar", address: "0x43a3…5026", sales: 0 }
    ];

    return (
        <div className='w-[95%] mx-auto'>
            <p className='text-xl my-8 text-gray-400 font-bold'>Top Publishers</p>
            <div className='flex items-center gap-4 flex-wrap'>
                {publishers.map((publisher, index) => (
                    <div key={index} className="border border-[#303030] bg-[#141414] text-gray-400 p-5 w-[380px] rounded-md transition-transform duration-200 hover:-translate-y-1 cursor-pointer h-[80px] flex gap-3 items-center ">
                        <span className='text-gray-400 text-lg'>{index + 1}</span>
                        <div className='flex gap-3 items-center'>
                            <img src={avatar.src} className='rounded-full h-10' alt="" />
                            <div className='flex-col flex justify-center'>
                                <div className='text-white font-bold'>{publisher.address}</div>
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
