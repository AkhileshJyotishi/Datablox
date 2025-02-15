import React from 'react';
import Image from 'next/image';
import Img from "@/assets/landing-page/Layer_2.png"
export default function Section2() {
  return (
    <div className="w-screen h-screen max-h-screen bg-[#130E1C] flex items-center justify-center px-8">
      <div className="flex flex-row justify-between px-4 bg-red-950 items-center h-full gap-x-10 max-w-8xl w-full">
        <div className="flex items-center h-2/3  bg-yellow-200 justify-center">
          <Image
            src={Img}
            alt="Staking"
            width={1000}
            height={1000}
            className="w-full  max-w-lg rounded-lg shadow-lg"
          />
        </div>
        
        {/* Text Section */}
        <div className="flex flex-col justify-center bg-red-300 text-white">
          <h2 className="text-4xl font-bold mb-4">Staking</h2>
          <p className="text-lg">
            Maximize the potential of your cryptocurrencies by staking them on our secure and reliable platform.
          </p>
        </div>
      </div>
    </div>
  );
}
