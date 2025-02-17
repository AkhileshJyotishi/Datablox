"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import logo from "@/assets/dataset-page/img1.svg"
import axios from "axios";
import { useAccount } from "wagmi";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
export default function PublishPage({ userData, setUserData, tabNo, setTabNo, setIsTabCompleted }: { userData: any, setUserData: any, tabNo: any, setTabNo: any, setIsTabCompleted: any }) {
    const { address } = useAccount();
    console.log(address);
    const router = useRouter();
    const [loading,setLoading]=useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!address) {
            toast("No Wallet Address fount", {
                description: "Kindly connect wallet first to publish the data",
            })
            return;
        }
        try {
            setLoading(true);
            const response = await axios.post('/api/postmetadata', {
                ...userData,
                owner: address
            })
            if (response.status == 200) {
                setLoading(false);
                const metaDataId = response.data.metadataId;
                router.push(`/dataset/${metaDataId}`);
            }
            console.log(response);
        } catch (error) {
            toast("Error in publishing dataset");
        }finally{
            setLoading(false);
        }
    };
    return (
        <div className="w-full flex items-center mx-auto pt-6 pb-3 px-32 text-white">
            <div className="mt-5 mb-10 px-auto flex flex-col items-center justify-center w-full ">
                <div className="py-5 text-lg border-b w-3/4 border-zinc-700">
                    <div className="flex items-center gap-3">
                        <div className="py-1 px-3 font-bold rounded-full border border-zinc-700 w-fit flex items-center text-sm gap-3">
                            1
                        </div>
                        <span className="font-extrabold"> Create Tokens & Pricing </span> <span className="px-2 h-fit py-[2px] bg-black border text-sm text-gray-400 border-zinc-700">1 Transaction </span>
                    </div>
                    <div className="text-lg px-3 mt-3 text-zinc-500">
                        The Data NFT representing your asset, the Datatokens defining access to it, and the pricing schema are all created in a single transaction.
                    </div>
                </div>
                <div className="py-8 text-lg border-b w-3/4 border-zinc-700">
                    <div className="flex items-center gap-3">
                        <div className="py-1 px-3 font-bold rounded-full border border-zinc-700 w-fit flex items-center text-sm gap-3">
                            2
                        </div>
                        <span className="font-extrabold"> Construct & Encrypt DDO </span>
                    </div>
                    <div className="text-lg px-3 mt-3 text-zinc-500">
                        Entered metadata is transformed into a structured document (DDO) where the file URLs, and the whole DDO itself are encrypted.
                    </div>
                </div>
                <div className="py-8 text-lg border-b w-3/4 border-zinc-700">
                    <div className="flex items-center gap-3">
                        <div className="py-1 px-3 font-bold rounded-full border border-zinc-700 w-fit flex items-center text-sm gap-3">
                            3
                        </div>
                        <span className="font-extrabold"> Publish DDO </span> <span className="px-2 h-fit py-[2px] bg-black border text-sm text-gray-400 border-zinc-700">1 Transaction </span>
                    </div>
                    <div className="text-lg px-3 mt-3 text-zinc-500">
                        The encrypted DDO is stored on-chain as part of the Data NFT. Indexers like Aquarius can decrypt the DDO for displaying purposes, but the file URLs can only be decrypted by exchanging the respective datatokens for this asset.
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
                        {loading? "Loading" : "Submit"}
                    </button>
                </div>
            </div>

        </div>
    );
}
