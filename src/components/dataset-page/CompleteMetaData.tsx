import React from 'react'
import Dataset from './dataset'
import RelatedDataset from './relatedDataset'
import Metadata from './metadata'
import Image from 'next/image'
import logo from "@/assets/dataset-page/img1.svg";

export default function CompleteMetaData({ metadata }: { metadata: any }) {
    return (
        <section className="min-h-screen px-36 mt-[10%]">
            <h1 className="text-zinc-300 font-semibold text-7xl mt-12 mb-6 text-center">
                {metadata?.title || "Untitled Dataset"}
            </h1>
            <div className="flex flex-row gap-8 py-3 justify-center">
                {/* Main Dataset Information */}
                <div className="w-2/3 h-full border border-zinc-700 pb-8 bg-[#141414] shadow-lg flex flex-col items-center justify-center">
                    <div className="border-b w-full h-full border-zinc-700 flex items-center justify-between">
                        <div className="border-r border-zinc-700">
                            <Image src={logo} width={70} height={70} alt="logo" />
                        </div>
                        <div className="text-white h-full w-full px-3">
                            Owned by <span className="text-sm text-[#ff4092]">{metadata?.author || "Unknown"}</span>
                        </div>
                    </div>
                    <Metadata
                        created_at={metadata?.created_at}
                        description={metadata?.description || "No description available"}
                        tags={JSON.parse(metadata?.tags) || []}
                    />
                </div>

                {/* Sidebar */}
                <div className="w-1/3 h-full bg-opacity-70 shadow-lg flex flex-col items-center justify-center">
                    <Dataset />
                    <RelatedDataset />
                </div>
            </div>
        </section>
    )
}
