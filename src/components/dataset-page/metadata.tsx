import React from 'react';
import { FaArrowDown } from "react-icons/fa6";
import { PiLineVerticalLight } from "react-icons/pi";
import Table from './table';
interface MetadataProps {
  // owner: string;
  description: string;
  tags: string[];
}



export default function Metadata({  description, tags }: MetadataProps) {
  const SampleData = [
    {
      srNo:"1",
      feature1:"asfa",
      feature2: "dfkdfalj",
      feature3: "askdasj",
      // feature4: "dfkdfalj",
      // feature5: "dfkdfalj",
      // feature6: "dfkdfalj",
      // feature7: "dfkdfalj",
      // feature8: "dfkdfalj",
      // feature9: "dfkdfalj",
    },
    
  ]
  const tableHeaders = Object.keys(SampleData[0]);

  return (
    <div className="">
      <h2 className="text-lg font-mono text-zinc-700 mb-6 flex">
          <FaArrowDown className="mt-2 ml-2"/> 
          <PiLineVerticalLight  className="mt-1 mr-1 text-2xl"/> 
          <div className="mt-1">
            DATASET
          </div>
          <PiLineVerticalLight  className="mt-1 mr-1 text-2xl"/> 
          <div className="mt-1">
            Published 2 years ago
          </div>
      </h2>
      <div className="mb-4 px-4">
        <h3 className="text-xl font-semibold mb-2 text-zinc-300">Description</h3>
        <p className="text-zinc-400">{description}</p>
      </div>
      <div className='px-4'>
        <h3 className="text-xl font-semibold mt-2 text-zinc-300">Tags</h3>
        <div className="flex flex-wrap gap-2 mt-3">
          <Tags/>
        </div>
      </div>
      <div className='px-4 mt-6'>
        <h3 className="text-xl font-semibold text-zinc-300 mb-2">Sample Data</h3>
        <Table SampleData={SampleData}/>
      </div>
    </div>
  );
}



function Tags() {
    const tags = [
        "defi",
        "orderbook",
        "desights",
        "gitcoin-grant-protocol",
        
    ];

    return (
            <div className='flex gap-2 flex-wrap'>
                {
                    tags.map((tag,index)=>{
                        return(
                            <div className='border border-[#303030] text-gray-400 items-center justify-center px-3 cursor-pointer hover:text-[#ff4092]' key={index}>
                                {tag}
                            </div>
                        )
                    })
                }
            </div>
    )
}
