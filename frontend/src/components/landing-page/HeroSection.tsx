import React from "react"
import { DaoSection } from "./JoiningPage"
import LandingImage from "@/assets/landing-page/landingimage.png"
import { StaticImageData } from "next/image"
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
