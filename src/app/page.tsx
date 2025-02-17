import React from "react"

import { Metadata, NextPage } from "next"
import Landingpage from "@/components/landing-page/Landingpage"
import Marketplace from "@/components/marketplace/Marketplace"
import Home from "@/components/landing"
// interface HomePageProps {}

export const metadata: Metadata = {
  title: "Home page",
  description: "Home page",
}

const HomePage: NextPage = () => {
  return <>
    <Home/>
  </>
}

export default HomePage
