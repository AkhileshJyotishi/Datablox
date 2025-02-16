import React from "react"

import { Toaster } from "sonner"

import "@/styles/globals.css"
import { Provider } from "@/providers"
import MarketHeader from "@/components/marketplace/MarketHeader"
import { FloatingNav } from "@/components/floating-navbar"
import { navItems } from "@/data"

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode
}>) => {
  return (
    <html lang="en">
      <body className="min-h-screen bg-black  font-satoshi  ">
        <Provider>
          <Toaster
            position="top-center"
            invert
          />
          <FloatingNav navItems={navItems}/>
          {/* <MarketHeader/> */}
          {children}
        </Provider>
      </body>
    </html>
  )
}

export default RootLayout
