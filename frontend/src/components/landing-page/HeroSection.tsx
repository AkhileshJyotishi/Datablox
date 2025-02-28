import React from "react"

import { StaticImageData } from "next/image"

import LandingImage from "@/assets/landing-page/landingimage.png"

import { DaoSection } from "./JoiningPage"
export default function HeroSection() {
  return (
    <div>
      <DaoSection
        title="Embrace the Crypto Revolution"
        description="Power your Future with Blockchian"
        buttonText="Learn more"
        imageSrc={LandingImage}
        dir="left"
      />
    </div>
  )
}
