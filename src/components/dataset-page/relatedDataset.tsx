import React from 'react'
import RelatedDataPacket from './relatedDatasetCard'
import DataPacket from '../marketplace/DataPacket';
export default function RelatedDataset() {
    const relatedData = [
        {
            chain:"Sonic",
            id:11,
            operator: "Reclo-45",
            Heading: "Global Energy Consumption Data (2024)",
            price: "10",
            sales: "299",
        },
        {
            chain:"Sonic",
            id:13,
            operator: "TSANF-45",
            Heading: "Carbon Emissions from Energy Use (2023)",
            price: "499",
            sales: "299",
        },
    ];
  return (
    <div className="w-full h-full mt-10">
      <h1 className="text-xl text-white px-1 font-bold mb-3">Related Datasets</h1>
      {
        relatedData.map((data, ind) =>
          <div className="mb-5 w-full" key={ind}>
            <DataPacket data={data} />
          </div>
        )
      }
    </div>
  )
}
