import React from 'react'
import RelatedDataPacket from './relatedDatasetCard'
import DataPacket from '../marketplace/DataPacket';
export default function RelatedDataset() {
  const relatedData = [
    {
      chain: "Polygon",
      operator: "Tasang-85",
      Heading: "Ocean CEX Aggregator:ETH/USDT",
      price: "Free",
      sales: "160",
    },
    {
      chain: "Polygon",
      operator: "Reclo-45",
      Heading: "Aggregated 1 hour OCEAN/USDT candles",
      price: "10",
      sales: "160",
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
