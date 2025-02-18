import { HiDownload } from "react-icons/hi"
import React from "react"
import { Grid } from "../nft-card-grid"
import Link from "next/link"

interface DataPacketProps {
  data: {
    id: number
    operator: string
    chain: string
    title: string
    price: string
    sales: string
    owner?: string
    description?: string
  }
  isSearchPage?: boolean
}
// chain:string;
// operator: string;
// title: string;
// price: string;
// sales: string;

{
  /* <div className=" bg-[#141414] text-gray-400 p-5  rounded-md transition-transform duration-200 hover:-translate-y-1 cursor-pointer  flex flex-col"> */
}
{
  /* <div className="flex items-center"> */
}

const DataPacket: React.FC<DataPacketProps> = ({ data, isSearchPage = false }) => {
  return (
    <Link href={`${process.env.NEXT_PUBLIC_FRONTEND_URL}/dataset/${data.id}`}>
      <div
        className={`${isSearchPage ? "" : "border border-[#303030]"} relative h-full cursor-pointer overflow-hidden rounded-3xl bg-transparent p-6 backdrop-blur-sm`}
      >
        <div className="flex items-center text-white">
          <span className="px-2">
            <HiDownload />
          </span>
          <span className="border border-b-0 border-t-0 border-[#303030] px-3 text-xs">DATASET</span>
          {/* <span className="border text-xs border-[#303030] border-t-0 border-b-0 px-3">
                        {data.operator}
                    </span> */}
          <span className="px-3 text-xs uppercase">{data.chain || "Sonic"}</span>
        </div>
        <div
          className="mt-3 px-2 text-xl font-extrabold text-white"
          style={{
            display: "-webkit-box",
            WebkitLineClamp: 1,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {data.title}
        </div>
        <div className="mt-2 w-[200px] truncate px-2 text-base text-gray-400">{data.owner}</div>
        <div
          className="my-2 px-2 text-sm text-gray-400"
          style={{
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {data.description}
        </div>
        <div className="mt-2 px-2 text-base text-gray-200">
          <span className="font-bold">{data.price}</span>
          {data.price != "Free" && <span className="mx-2 text-sm">mSonic</span>}
        </div>
        <div className="my-2 mt-auto flex gap-1 px-2 text-lg text-gray-400">
          <span className="font-bold">{data.sales||0}</span>
          <span>sales</span>
        </div>

        <Grid size={20} />
      </div>
    </Link>
  )
}

export default DataPacket
