import React from 'react'

export default function TopTagsBySales() {
    const tags = [
        "defi",
        "orderbook",
        "desights",
        "gitcoin-grant-protocol",
        "fdd",
        "odc",
        "bounty",
        "dimitra",
        "grant-applications",
        "data",
        "AI",
        "data-challenge",
        "trade",
        "financial",
        "gitcoin",
        "fantom",
        "health",
        "grant-votes",
        "unicef",
        "ai"
    ];

    return (
        <div className='w-[95%] mx-auto'>
            <p className='text-xl my-8 text-gray-400 font-bold'>Top Tags By Sales</p>
            <div className='flex gap-2 flex-wrap'>
                {
                    tags.map((tag,index)=>{
                        return(
                            <div className='border border-[#303030] text-gray-400 items-center justify-center px-3 cursor-pointer hover:text-[#ff4092]' key={index}>
                                {tag}
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}
