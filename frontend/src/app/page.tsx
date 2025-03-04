import React from "react"

import { Metadata, NextPage } from "next"

import limg from "@/assets/home/left.png"
import rimg from "@/assets/home/right.png"
import FeatureSection from "@/components/feature-section/feature-section"
import Hero from "@/components/landing"
import TeamSection from "@/components/team-section"

// interface HomePageProps {}

export const metadata: Metadata = {
  title: "DataBlox",
  description: "Home page",
}

const HomePage: NextPage = () => {
  return (
    <>
      <img
        className="absolute -left-[450px] top-[480px] z-10 h-auto w-[1200px] -rotate-90"
        src={limg.src}
      />
      <img
        className="absolute -left-1/2 -top-28 h-auto w-[1600px] md:left-[62%]"
        src={rimg.src}
      />
      <Hero />

      <div className="relative z-[50] mt-10 text-white">
        {/* <FeaturesSectionDemo /> */}
        {/* <FeatureSection/> */}
        <FeatureSection />
      </div>

      <TeamSection />
    </>
  )
}

export default HomePage
