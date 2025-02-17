import { HiDownload } from "react-icons/hi";
import React from "react";

interface DataPacketProps {
    data: {
        chain:string;
        operator: string;
        Heading: string;
        price: string;
        sales: string;
        id:number;
    };
}
const RelatedDataPacket: React.FC<DataPacketProps> = ({ data }) => {
    return (
        <div className="border border-[#303030] bg-[#141414] text-gray-400 px-5 pt-5 pb-2 w-full rounded-md transition-transform duration-200 hover:-translate-y-1 cursor-pointer flex flex-col">
            <div className="flex items-center">
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
            <div className="text-lg text-white font-bold mt-3 px-2">
                {data.Heading}
            </div>
            <div className="text-sm text-gray-200  mt-2 px-2">
                <span className="font-bold">{data.price}</span>
                {data.price!="Free" && <span className="mx-2 text-sm">mOcean</span>}
            </div>
            <div className="text-[10px] text-gray-400 my-2 px-2 flex gap-1">
                <span className="font-bold">{data.sales}</span>
                <span>sales</span>
            </div>
        </div>
    );
}

export default RelatedDataPacket;
