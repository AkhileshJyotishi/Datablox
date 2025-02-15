import React from "react"

import { Toaster } from "sonner"

import "@/styles/globals.css"
import { Provider } from "@/providers"

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode
}>) => {
  return (
    <html lang="en">
      <body className="min-h-screen bg-[#0a0a0a] px-2.5 font-satoshi sm:px-5">
        <Provider>
          <Toaster
            position="top-center"
            invert
          />
          {children}
        </Provider>
      </body>
    </html>
  )
}

export default RootLayout
