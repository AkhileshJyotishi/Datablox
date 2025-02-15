import React from "react"

import { Metadata, NextPage } from "next"
import Landingpage from "@/components/landing-page/Landingpage"
// interface HomePageProps {}

export const metadata: Metadata = {
  title: "Home page",
  description: "Home page",
}

const HomePage: NextPage = () => {
  return <>
  <Landingpage/>
  </>
}

export default HomePage
