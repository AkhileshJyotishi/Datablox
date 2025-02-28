"use client"

import React, { useEffect, useState } from "react"

import { WagmiProvider } from "@/lib"

import { AuthProvider } from "./auth"
import { ModalProvider } from "./modal"

interface ProvidersProps {
  children: React.ReactNode
}

const Providers: React.FC<ProvidersProps> = ({ children }) => {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <WagmiProvider>{children}</WagmiProvider>
  }

  return (
    <WagmiProvider>
      <ModalProvider>
        <AuthProvider>
          <>{children}</>
        </AuthProvider>
      </ModalProvider>
    </WagmiProvider>
  )
}

export default Providers
