import React from 'react'
import RelatedDataPacket from './relatedDatasetCard'
import DataPacket from '../marketplace/DataPacket';
export default function RelatedDataset({ relatedData }: { relatedData: any }) {
  // const relatedDatad = [
  //   {
  //     chain: "Sonic",
  //     id: 11,
  //     operator: "Reclo-45",
  //     Heading: "Global Energy Consumption Data (2024)",
  //     price: "10",
  //     sales: "299",
  //   },
  //   {
  //     chain: "Sonic",
  //     id: 13,
  //     operator: "TSANF-45",
  //     Heading: "Carbon Emissions from Energy Use (2023)",
  //     price: "499",
  //     sales: "299",
  //   },
  //   {
  //     chain: "Sonic",
  //     id: 13,
  //     operator: "TSANF-45",
  //     Heading: "Carbon Emissions from Energy Use (2023)",
  //     price: "499",
  //     sales: "299",
  //   },
  //   {
  //     chain: "Sonic",
  //     id: 13,
  //     operator: "TSANF-45",
  //     Heading: "Carbon Emissions from Energy Use (2023)",
  //     price: "499",
  //     sales: "299",
  //   },
  //   {
  //     chain: "Sonic",
  //     id: 13,
  //     operator: "TSANF-45",
  //     Heading: "Carbon Emissions from Energy Use (2023)",
  //     price: "499",
  //     sales: "299",
  //   },
  //   {
  //     chain: "Sonic",
  //     id: 13,
  //     operator: "TSANF-45",
  //     Heading: "Carbon Emissions from Energy Use (2023)",
  //     price: "499",
  //     sales: "299",
  //   },
  // ];
  return (
    <div className='w-full mx-auto'>
      <p className='text-2xl my-8 text-gray-400 font-extrabold'>Related Datasets</p>
      <div className="relative z-0 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  gap-10 md:gap-4 max-w-7xl mx-auto">
        {relatedData.map((data: any, index: any) => (
          <DataPacket key={index} data={data} />
        ))}
      </div>
    </div>
  )
}
