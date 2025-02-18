import { HiDownload } from "react-icons/hi";
import React from "react";

const DataPacketSkeleton: React.FC = () => {
    return (
        <div className="border border-[#303030] relative backdrop-blur-sm p-6 rounded-3xl overflow-hidden h-full animate-pulse">
            <div className="flex items-center text-white">
                <span className="px-2">
                    <HiDownload className="opacity-50" />
                </span>
                <span className="border text-xs border-[#303030] border-t-0 border-b-0 px-3 bg-gray-700 w-12 h-4 rounded"></span>
                <span className="border text-xs border-[#303030] border-t-0 border-b-0 px-3 bg-gray-700 w-16 h-4 rounded"></span>
                <span className="text-xs px-3 bg-gray-700 w-10 h-4 rounded"></span>
            </div>
            <div className="text-xl text-white font-extrabold mt-3 px-2 bg-gray-700 w-4/5 h-5 rounded"></div>
            <div className="text-base text-gray-400 mt-2 px-2 bg-gray-700 w-3/5 h-4 rounded"></div>
            <div className="text-sm text-gray-400 my-2 px-2 flex-grow overflow-hidden">
                <div className="bg-gray-700 w-full h-3 rounded mb-1"></div>
                <div className="bg-gray-700 w-5/6 h-3 rounded"></div>
            </div>
            <div className="text-base text-gray-200 mt-2 px-2 bg-gray-700 w-12 h-4 rounded"></div>
            <span className="mx-2 text-sm">mOcean</span>
            <div className="text-lg text-gray-400 my-2 px-2 flex gap-1 mt-auto">
                <div className="bg-gray-700 w-8 h-5 rounded"></div>
                <span>sales</span>
            </div>
        </div>
    );
};

export default DataPacketSkeleton;