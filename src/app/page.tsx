import React from "react"

import { Metadata, NextPage } from "next"
import Section2 from "@/components/landing-page/section2"
// interface HomePageProps {}

export const metadata: Metadata = {
  title: "Home page",
  description: "Home page",
}

const HomePage: NextPage = () => {
  return <>
  <Section2/>
  </>
}

export default HomePage
