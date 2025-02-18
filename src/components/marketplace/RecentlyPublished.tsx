import React from 'react'
import DataPacket from './DataPacket'
import { datasets } from '@/constants/dataset'
export default function RecentlyPublished() {

    return (
        <div className='w-full mx-auto'>
            <p className='text-2xl my-8 text-gray-400 font-extrabold'>Recently Published</p>
            <div className="relative z-0 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  gap-10 md:gap-4 max-w-7xl mx-auto">
                {datasets.map((dataset, index) => (
                    <DataPacket key={index} data={dataset} />
                ))}
            </div>
        </div>
    )
}
