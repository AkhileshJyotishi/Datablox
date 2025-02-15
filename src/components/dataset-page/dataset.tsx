import { Button } from '@/ui/button';
import React from 'react';
import { FaFilePdf } from "react-icons/fa";
export default function Dataset() {
  const datasetSize = "1.2 MB"; // Dummy value—replace with real data if available.
  const price = "$10"
  return (
    <div className="w-full h-full ">
        <div className="border-b w-full h-full px-6 border-zinc-700 flex gap-1 py-3 items-center">
                <div className="">
                    <FaFilePdf className="text-6xl text-[#8b98a9]" />
                </div>
                <div className="text-white h-full px-3">
                    <div className="text-sans text-lg font-medium">
                        Size <span className=" text-[#ff4092] text-md"> {datasetSize}</span>
                    </div>
                    <div className="text-sans text-lg font-medium">
                        Price <span className=" text-[#ff4092] text-md"> {price}</span>
                    </div>
                </div>
        </div>
        <div className="px-6 py-3">
        <button className="px-6 py-2 bg-gradient-to-r from-[#d93678] to-[#e94c8e] text-white rounded-md 
          hover:from-[#b92e66] hover:to-[#d63f7c] 
          active:from-[#a02858] active:to-[#bf356b] 
            transition-all duration-300">
            Buy
        </button>
        </div>
    </div>
  );
}
