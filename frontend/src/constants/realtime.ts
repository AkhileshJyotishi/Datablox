import data from "@/data/utils"

export interface RealTimeProps {
  operator: string
  chain: string
  title: string
  owner: string
  description: string
  price: string
  sales: string
  id: number
  IPFS?: string
  tags?: string[]
  author: string
  created_at: string
}


const realtime: RealTimeProps[] = []
data.map((obj, key) => {
  const newObj = {
    operator: "Sonic-32" + key,
    owner: "0x5EB3a34e6003f7811d17f5b3925c42cdAe0A7c8e",
    chain: "SONIC",
    title: obj.title,
    description: obj.description,
    price: (5 + key).toString(),
    sales: (94 + key).toString(),
    id: key,
    IPFS: `${process.env.NEXT_PUBLIC_FRONTEND_URL}/api/get-realtime-data?id=${key}`,
    tags: obj.tags,
    author: "Sonic-realtime-service",
    created_at: new Date().toISOString(),
    samplefile: JSON.stringify(obj.data[0]),
  }
  realtime.push(newObj)
})
export default realtime
