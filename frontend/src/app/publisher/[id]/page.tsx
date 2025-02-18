import axios from "axios"
import DataPacket from "@/components/marketplace/DataPacket"
import { Heading } from "./HeadingComp"

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

export default async function PublisherPage() {
  let PublisherDataset: Metadata[] = []
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_FRONTEND_URL}/api/get-publisher-data?publisherAddress=0xA1B2C3D4E5F67890ABCDEF1234567890ABCDEF12`
    )
    PublisherDataset = response.data.metadatas
    // console.log("My data=", response.data.metadatas)
  } catch (error) {
    // console.error("Error fetching metadata:", error)
  }

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
