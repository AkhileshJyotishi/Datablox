import React from "react"
import RelatedDataPacket from "./relatedDatasetCard"
import DataPacket from "../marketplace/DataPacket"
export default function RelatedDataset({ relatedData }: { relatedData: any }) {
  // const relatedDatad = [
  //   {
  //     chain: "Sonic",
  //     id: 11,
  //     operator: "Reclo-45",
  //     title: "Global Energy Consumption Data (2024)",
  //     price: "10",
  //     sales: "299",
  //   },
  //   {
  //     chain: "Sonic",
  //     id: 13,
  //     operator: "TSANF-45",
  //     title: "Carbon Emissions from Energy Use (2023)",
  //     price: "499",
  //     sales: "299",
  //   },
  //   {
  //     chain: "Sonic",
  //     id: 13,
  //     operator: "TSANF-45",
  //     title: "Carbon Emissions from Energy Use (2023)",
  //     price: "499",
  //     sales: "299",
  //   },
  //   {
  //     chain: "Sonic",
  //     id: 13,
  //     operator: "TSANF-45",
  //     title: "Carbon Emissions from Energy Use (2023)",
  //     price: "499",
  //     sales: "299",
  //   },
  //   {
  //     chain: "Sonic",
  //     id: 13,
  //     operator: "TSANF-45",
  //     title: "Carbon Emissions from Energy Use (2023)",
  //     price: "499",
  //     sales: "299",
  //   },
  //   {
  //     chain: "Sonic",
  //     id: 13,
  //     operator: "TSANF-45",
  //     title: "Carbon Emissions from Energy Use (2023)",
  //     price: "499",
  //     sales: "299",
  //   },
  // ];
  return (
    <div className="mx-auto w-full">
      <p className="my-8 text-2xl font-extrabold text-gray-400">Related Datasets</p>
      <div className="relative z-0 mx-auto grid max-w-7xl grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-3 md:gap-4">
        {relatedData.map((data: any, index: any) => (
          <DataPacket
            key={index}
            data={data}
          />
        ))}
      </div>
    </div>
  )
}
