import { Button } from '@/ui/button';
import React from 'react';
import { FaFilePdf } from "react-icons/fa";
import { RiFileList3Line } from "react-icons/ri";
export default function Dataset() {
  const datasetSize = "1.2 MB"; // Dummy value—replace with real data if available.
  const price = "$10"
  return (
    <div className="w-full bg-[#141414] h-full border border-zinc-600">
        <div className="border-b w-full h-full px-6 border-zinc-700 flex gap-1 py-3 items-center">
                <div className="">
                    <FaFilePdf className="text-6xl text-[#8b98a9]" />
                </div>
                <div className="text-white h-full px-3">
                    <div className="text-sans text-lg font-normal">
                        Size <span className=" text-[#ff4092] text-md"> {datasetSize}</span>
                    </div>
                    <div className="text-sans text-lg font-normal">
                        Price <span className=" text-[#ff4092] text-md"> {price}</span>
                    </div>
                </div>
        </div>
        <div className="px-6 flex flex-col justify-center items-center py-5">
            <button className="px-6 font-bold py-2 bg-gradient-to-r from-[#d93678] to-[#e94c8e] text-white rounded-md 
              hover:from-[#b92e66] hover:to-[#d63f7c] 
              active:from-[#a02858] active:to-[#bf356b] 
                transition-all duration-300">
                BUY FOR 1 DAY
            </button>
            <div className="text-xs text-gray-500 mt-3">
            To access this dataset, you will purchase 1 Sonic and instantly return it to the publisher for verification.
            </div>
        </div>
        <div className="px-6 text-zinc-600 border-t border-zinc-700 flex flex-col justify-center items-center py-3">
            99 Sales
        </div>
    </div>
  );
}
