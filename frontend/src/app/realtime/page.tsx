import axios from "axios"
import DataPacket from "@/components/marketplace/DataPacket"
import { Heading } from "./HeadingComp"
import realtime, { RealTimeProps } from "@/constants/realtime"

interface Metadata {
  id: number
  operator: string
  chain: string
  title: string
  price: string
  sales: string
  address?: string
  description?: string
}

export default async function page() {
  let PublisherDataset: RealTimeProps[] = realtime;
  return (
      <>
    <div className="container relative z-10 mx-auto max-w-7xl px-4 py-16">
      {PublisherDataset.length > 0 && (
          <Heading
            address="0xA1B2C3D4E5F67890ABCDEF1234567890ABCDEF12"
            datasetCount={PublisherDataset.length}
            totalSales={
              PublisherDataset?.length
                ? PublisherDataset.reduce((acc, item) => acc + Number(item.sales || 0), 0).toString()
                : "0"
            }
            dataset={PublisherDataset}
          />
        )}
    </div>
        </>
  )
}
