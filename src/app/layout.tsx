import React from "react"

import { Toaster } from "sonner"

import "@/styles/globals.css"
import { Provider } from "@/providers"
import MarketHeader from "@/components/marketplace/MarketHeader"
import { FloatingNav } from "@/components/floating-navbar"
import { navItems } from "@/data"
import { SparklesCore } from "@/components/sparkles"
import { FloatingPaper } from "@/components/floating-paper"

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
          <main className="bg-grid-white/[0.02] relative  min-h-screen">
            <div className="h-full w-full absolute inset-0 z-0">
              <SparklesCore
                id="tsparticlesfullpage"
                background="transparent"
                minSize={0.6}
                maxSize={1.4}
                particleDensity={100}
                className="w-full h-full"
                particleColor="#FFFFFF"
              />
            </div>
            <div className="absolute inset-0 overflow-hidden">
              <FloatingPaper count={8} />
            </div>
            <div className="relative z-10">
              <FloatingNav navItems={navItems} />
              <div className=" relative min-h-[calc(100vh-100px)] flex items-center flex-col  ">
                {children}
              </div>

            </div>
          </main>
        </Provider>
      </body>
    </html>
  )
}

export default RootLayout
