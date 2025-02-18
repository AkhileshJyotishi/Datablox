import React from 'react'
import DataPacket from './DataPacket'
import { datasets } from '@/constants/dataset'
export default function MostSales() {
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
