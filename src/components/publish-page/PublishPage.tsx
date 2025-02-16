"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import logo from "@/assets/dataset-page/img1.svg"
export default function PublishPage({userData, setUserData,tabNo, setTabNo, setIsTabCompleted }: {userData:any, setUserData: any,tabNo:any,setTabNo:any,setIsTabCompleted:any }) 
{
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
    };
    return (
        <div className="w-full flex items-center mx-auto pt-6 pb-3 px-32 text-white">
            <div className="mt-5 mb-10 px-auto flex flex-col items-center justify-center w-full ">
               <div className="py-5 text-lg border-b w-3/4 border-zinc-700">
                    <div className="flex items-center gap-3">
                        <div className="py-1 px-3 font-bold rounded-full border border-zinc-700 w-fit flex items-center text-sm gap-3">
                            1
                        </div>
                        <span className="font-extrabold"> Generate Tokens & Set Pricing </span> <span className="px-2 h-fit py-[2px] bg-black border text-sm text-gray-400 border-zinc-700">1 Transaction </span>
                    </div>
                    <div className="text-lg px-3 mt-3 text-zinc-500">
                        A Data NFT is created to represent your dataset, along with Datatokens that control access and define pricing — all in a single transaction.
                    </div>
               </div>
               <div className="py-8 text-lg border-b w-3/4 border-zinc-700">
                    <div className="flex items-center gap-3">
                        <div className="py-1 px-3 font-bold rounded-full border border-zinc-700 w-fit flex items-center text-sm gap-3">
                            2
                        </div>
                        <span className="font-extrabold"> Process & Secure Metadata </span> 
                    </div>
                    <div className="text-lg px-3 mt-3 text-zinc-500">
                        Your dataset metadata is structured into a Decentralized Data Object (DDO). File URLs and sensitive details are encrypted for security.
                    </div>
               </div>
               <div className="py-8 text-lg border-b w-3/4 border-zinc-700">
                    <div className="flex items-center gap-3">
                        <div className="py-1 px-3 font-bold rounded-full border border-zinc-700 w-fit flex items-center text-sm gap-3">
                            3
                        </div>
                        <span className="font-extrabold">  Publish Securely  </span> <span className="px-2 h-fit py-[2px] bg-black border text-sm text-gray-400 border-zinc-700">1 Transaction </span>
                    </div>
                    <div className="text-lg px-3 mt-3 text-zinc-500">
                        The encrypted DDO is stored on-chain within the Data NFT. Indexers can decrypt metadata for display, but actual file access is only granted by exchanging Datatokens.
                    </div>
               </div>
               {/* Submit Button */}
               <div className="flex mt-9 justify-center">
                    <button
                        // type="submit"
                        onClick={handleSubmit}
                        className="py-2 px-8 font-sans font-semibold text-lg bg-gradient-to-r from-[#9e2750] to-[#b02d5b] text-white rounded-md 
                        hover:from-[#8b2347] hover:to-[#9b284f] 
                        active:from-[#7d1f41] active:to-[#8f2449] 
                        transition-all duration-300"
                    >
                        Submit
                    </button>
                </div>
            </div>
            
        </div>
    );
}
