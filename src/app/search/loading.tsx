import React from 'react'
import DataPacketSkeleton from './skeleton'

const loading = () => {
  return (
    <div className='grid grid-cols-1 lg:grid-cols-6 mt-12 xl:border rounded-md dark:border-neutral-800'>
        {
            Array.from({length: 10}, (_, index) => (
                <DataPacketSkeleton key={index}/>
            ))
        }
      
    </div>
  )
}

export default loading
