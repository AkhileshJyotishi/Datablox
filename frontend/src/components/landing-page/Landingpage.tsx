import React from "react"

import Features from "./Features"
import Footer from "./Footer"
import Header from "./Header"
import HeroSection from "./HeroSection"
import JoiningPage from "./JoiningPage"
import Section1 from "./Section1"

export default function Landingpage() {
  return (
    <div className="bg-[#130E1C]">
      <Header />
      <HeroSection />
      <Features />
      <JoiningPage />
      <Footer />
    </div>
  )
}
