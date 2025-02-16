import Dataset from '@/components/dataset-page/dataset';
import Metadata from '@/components/dataset-page/metadata';
import Image from 'next/image';
import React from 'react';
import logo from "@/assets/dataset-page/img1.svg"
import RelatedDataset from '@/components/dataset-page/relatedDataset';
import Header from '@/components/landing-page/Header';

// bg color #141414
export default async function Page({
  params,
}: {
  params: Promise<{ datasetId: string }>;
}) {
  const datasetId = (await params).datasetId;
  const data = {
    dataName: "Demo",
    ownedBy: "Random User",
    tags: ["tag1", "tag2"],
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sed error nesciunt nobis accusantium ipsum eius reiciendis animi veniam iusto, quasi beatae eveniet labore velit molestias natus fugit pariatur adipisci assumenda saepe itaque. Cumque, hic veritatis eum consectetur harum reiciendis laudantium voluptate fugiat quo expedita cum magnam quibusdam? Quas aliquid pariatur rerum, quidem inventore culpa quae ab repellendus earum quasi voluptatum suscipit dolorum tenetur natus vel dolores in nemo ad ipsa ex reiciendis? Libero vel, atque nisi quia reiciendis nam iste est consectetur fuga quibusdam delectus, deserunt dicta id alias, in deleniti enim natus aliquam ratione odit placeat. Soluta, consectetur possimus.",
    fileUrl: "http://demourl.com",
  };

  return (
    <>
    <Header />    
    <section className="min-h-screen px-36 ">
        <h1 className="text-zinc-300 font-semibold text-7xl mt-12 mb-6 text-center">{data.dataName}</h1>
        <div className="flex flex-row gap-8 py-3 justify-center">

          <div className="w-2/3 h-full border border-zinc-700 pb-8 bg-[#141414]  shadow-lg flex flex-col items-center justify-center">
            <div className="border-b w-full h-full border-zinc-700 flex items-center justify-between">
                <div className="border-r border-zinc-700 ">
                    <Image
                        src={logo}
                        width={70}
                        height={70}
                        alt="logo"
                        // className='h-40'
                    />
                </div>
                <div className="text-white h-full w-full px-3">
                    Owned by 
                    <span className="text-sm   text-[#ff4092]"> {data.ownedBy}</span>
                </div>
            </div>
            <Metadata 
            //   owner={data.ownedBy} 
              description={data.description} 
              tags={data.tags} 
            />
          </div>
          <div className="w-1/3 h-full bg-opacity-70  shadow-lg flex flex-col items-center justify-center">
            <Dataset />
            <RelatedDataset/>
          </div>
        </div>
    </section>
    </>
  );
}
