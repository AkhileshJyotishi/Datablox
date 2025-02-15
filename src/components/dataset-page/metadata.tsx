import React from 'react';
import { FaArrowDown } from "react-icons/fa6";
import { PiLineVerticalLight } from "react-icons/pi";
interface MetadataProps {
  // owner: string;
  description: string;
  tags: string[];
}

export default function Metadata({  description, tags }: MetadataProps) {
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
          {tags.map((tag, index) => (
            <span
              key={index}
              className="px-3 min-w-20 py-1 text-center border border-zinc-700 bg-opacity-80 text-white rounded-xl text-sm"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
