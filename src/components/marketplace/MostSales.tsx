import React from 'react'
import DataPacket from './DataPacket'

export default function MostSales() {
    const datasets = [
        {
            operator: "TASANG-84",
            chain: "Polygon",
            Heading: "Ocean CEX Aggregator: ETH/USDT",
            address: "0xF5dc…5497",
            description: "This data feed returns ETH/USDT OHLC history: {open, high, low, close} over time, …",
            price: "Free",
            sales: "160",
        },
        {
            operator: "QUEFIS-86",
            chain: "Polygon",
            Heading: "ETH/USDT orderbook",
            address: "0x4Ab0…0f6a",
            description: "Real-time ETH/USDT orderbook. To take the bid orders, access data.bids array To take t…",
            price: "20,422",
            sales: "99",
        },
        {
            operator: "RECCLO-45",
            chain: "Polygon",
            Heading: "Aggregated 1 hour OCEAN/USDT candles",
            address: "0xd70B…90D8",
            description: "Real-time aggregated 1-hour OCEAN/USDT candles. Response type: content-json Resu…",
            price: "10",
            sales: "99",
        },
        {
            operator: "PERSEA-72",
            chain: "Polygon",
            Heading: "Aggregated 1 hour BTC/USDT candles",
            address: "0xd70B…90D8",
            description: "Real-time aggregated 1-hour BTC/USDT candles. Response type: content-json Resu…",
            price: "19,887",
            sales: "91",
        },
        {
            operator: "SAGANG-73",
            chain: "Polygon",
            Heading: "Aggregated 1 hour ETH/USDT candles",
            address: "0xd70B…90D8",
            description: "Real-time aggregated 1-hour ETH/USDT candles. Response type: content-json Resu…",
            price: "19,803",
            sales: "74",
        },
        {
            operator: "BOOTUN-98",
            chain: "Polygon",
            Heading: "unicef_fantom_grant_rounds",
            address: "0x6fd7…F7b5",
            description: "Directory of all grant applications and votes for the UNICEF and Fantom rounds",
            price: "Free",
            sales: "74",
        }
    ];

    return (
        <div className=' mx-auto'>
            <p className='text-xl my-8 text-gray-400 font-bold'>Most Sales</p>
            <div className='flex items-center justify-between gap-4 flex-wrap'>
                {datasets.map((dataset, index) => (
                    <DataPacket key={index} data={dataset} />
                ))}
            </div>
        </div>
    )
}
