import React from 'react'
import { FaLongArrowAltRight } from "react-icons/fa";

export default function AllData() {
    return (
        <button className="w-[95%] mx-auto flex items-center justify-start active:scale-95 transform-gpu transition-transform">
            <p className="text-xl text-[#ff4092] font-bold">All Datasets</p>
            <span className="mt-1 ml-1">
                <FaLongArrowAltRight color="#ff4092" />
            </span>
        </button>
    );
}
