import React, { useState } from "react"

import { LiaEthereum } from "react-icons/lia"

import SonicLogo from "@/assets/publish-page/sonicLogo.svg"
import Header from "@/components/landing-page/Header"
import MarketHeader from "@/components/marketplace/MarketHeader"
// ${selected ? "bg-blue-500 text-white" : "bg-gray-700 text-gray-300"}
//  ${isCompleted ? "border-2 border-green-400" : ""}`

const Layout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <>
      <section className="relative mb-10 mt-12">
        <h1 className="mb-2 mt-14 flex items-center text-center text-6xl font-bold text-zinc-200">
          <span className="pb-2"> Publish into </span>
          <span className="scale-90 px-2">
            {/* <LiaEthereum className="mt-1"/>  */}
            <SonicLogo />
          </span>
        </h1>
        <h1 className="mb-6 mt-5 w-4/5 text-xl text-zinc-300">
          Highlight the important features of your dataset or algorithm to make it more discoverable and catch the
          interest of data consumers.
        </h1>
        <div className="mt-16 min-h-10">{children}</div>
      </section>
    </>
  )
}

export default Layout
