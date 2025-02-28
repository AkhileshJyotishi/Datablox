"use client"
import React, { useState } from "react"

import Image from "next/image"

import defaultbannerImage from "@/assets/images/default-image.jpg"

import Shimmer, { shimmer, toBase64 } from "./shimmer"

const BannerImage = ({ bannerImage, className }: { bannerImage: string | undefined; className?: string }) => {
  return (
    <div className={"group relative h-[15vh] w-full" + className}>
      <div className="relative h-[20vh] rounded-xl">
        <Image
          alt=""
          width={1500}
          height={800}
          loading="eager"
          className="absolute h-[18vh] w-full object-cover"
          src={bannerImage || defaultbannerImage}
          priority
          placeholder={`data:image/svg+xml;base64,${toBase64(shimmer(700, 475))}`}
        />

        <div className="absolute z-10 h-full w-full bg-gradient-to-b from-[#00000001] to-black"></div>
        {/* <div className="absolute z-10 w-full h-full bg-gradient-to-b from-[#00000001] to-black "></div> */}
        <div className="absolute z-10 h-full w-full bg-gradient-to-b from-[#00000001] to-black"></div>
      </div>
    </div>
  )
}

export default BannerImage
