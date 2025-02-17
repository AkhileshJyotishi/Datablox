import { HiDownload } from "react-icons/hi";
import React from "react";
import { Grid } from "../nft-card-grid";

interface DataPacketProps {
    data: {
        operator: string;
        chain: string;
        Heading: string;
        address: string;
        description: string;
        price: string;
        sales: string;
    };
}


{/* <div className=" bg-[#141414] text-gray-400 p-5  rounded-md transition-transform duration-200 hover:-translate-y-1 cursor-pointer  flex flex-col"> */}
{/* <div className="flex items-center"> */}


const DataPacket: React.FC<DataPacketProps> = ({ data }) => {
    return (
        <div className="border  border-[#303030] relative bg-transparent p-6 rounded-3xl overflow-hidden ">
            
            <div className="flex items-center text-white">
                <span className="px-2">
                    <HiDownload />
                </span>
                <span className="border text-xs border-[#303030] border-t-0 border-b-0 px-3">
                    DATASET
                </span>
                <span className="border text-xs border-[#303030] border-t-0 border-b-0 px-3">
                    {data.operator}
                </span>
                <span className="text-xs px-3">{data.chain}</span>
            </div>
            <div className="text-xl text-white font-extrabold mt-3 px-2">
                {data.Heading}
            </div>
            <div className="text-base text-gray-400 mt-2 px-2">{data.address}</div>
            <div className="text-sm text-gray-400 my-2 px-2 flex-grow overflow-hidden">
                {data.description}
            </div>
            <div className="text-base text-gray-200  mt-2 px-2">
                <span className="font-bold">{data.price}</span>
                {data.price!="Free" && <span className="mx-2 text-sm">mOcean</span>}
            </div>
            <div className="text-lg text-gray-400 my-2 px-2 flex gap-1 mt-auto">
                <span className="font-bold">{data.sales}</span>
                <span>sales</span>
            </div>


            <Grid size={20} />
        </div>
    );
}

export default DataPacket;
