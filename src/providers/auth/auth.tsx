"use client"
import React, { useState } from "react"

import Cookies from "js-cookie"

import { constructWalletConnector, EIP6963Provider, WalletConnector } from "@/lib"

interface IAuthContext {
  walletConnectors: WalletConnector[]
  handleConnectCancellation: (wallet: WalletConnector) => Promise<boolean>
  clearSession: (wallet: WalletConnector) => Promise<boolean>
  login: (wallet: EIP6963Provider) => Promise<void>
}

const AuthContext = React.createContext<IAuthContext>({} as IAuthContext)

export const AuthProvider: IProvider = ({ children }: IProvider) => {
  const [walletConnectors, setWalletConnectors] = useState<WalletConnector[]>([])

  // ### Effects ###
  React.useEffect(() => {
    const wc = constructWalletConnector()

    wc.forEach((wallet) => {
      console.log("WC checking: ", wallet)
    })

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    setWalletConnectors((_) => [...wc])

    return () => {
      // TODO: Delete session
    }
  }, [])

  // ### Functions ###
  const handleConnectCancellation = async (wallet: WalletConnector) => {
    try {
      console.log("Disconnecting wallet", wallet)

      const walletConnector = walletConnectors.find((w) => w.name === wallet.name)
      console.log("Connector ", walletConnector)

      if (typeof walletConnector === "undefined") {
        return false
      }

      clearSession(wallet)
      await walletConnector.disconnect()

      return true
    } catch (e: IError) {
      console.log("Disconnection Error", e.message)
      return false
    }
  }

  const clearSession = async (wallet: WalletConnector) => {
    try {
      console.log("Clearing wallet session", wallet)

      const walletConnector = walletConnectors.find((w) => w.name === wallet.name)
      console.log("Connector ", walletConnector)

      if (typeof walletConnector === "undefined") {
        return false
      }

      await walletConnector.disconnect()

      return true
    } catch (e: IError) {
      console.log("Disconnection Error", e.message)
      return false
    }
  }

  const connectToWallet = async (wallet: WalletConnector) => {
    try {
      if (!wallet) {
        throw new Error("Wallet not found")
      }

      console.log("Connecting to wallet", wallet)

      await wallet.connect()

      return true
    } catch (e: IError) {
      console.log("Message", e.message)

      if (e.message === "NOT_SUPPORTED") {
        console.log("Wallet not supported")
        return false
      }

      console.log("Error connecting wallet: ", e.message)
    }
  }

  const verifyAddress = async (wallet: WalletConnector) => {
    // TODO: Prove ownership of the address using signature
    console.log("Verifying address: ", wallet)
    // const data = await wallet.signature()

    try {
      // TODO: Generate token by verifying the signature in backend
      const token = "auth_token"

      return token
    } catch (e: IError) {
      console.log("Error verifying address: ", e.message)
    }
  }

  const handleLogin = async (wallet: EIP6963Provider) => {
    try {
      const walletConnector = walletConnectors.find((w) => w.name === wallet.name)
      console.log("WalletConnector: ", walletConnector)

      if (typeof walletConnector !== "undefined") {
        await connectToWallet(walletConnector)

        if (walletConnector.isConnected) {
          const token = await verifyAddress(walletConnector)
          if (token) {
            console.log("Auth Token", token)

            Cookies.set("auth-token", token)
          }
        }
      }
    } catch (error: IError) {
      console.log("Error in handleLogin", error?.message)
    }
  }

  return (
    <AuthContext.Provider
      value={{
        walletConnectors,
        handleConnectCancellation,
        clearSession,
        login: handleLogin,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = React.useContext(AuthContext)

  if (context === undefined) {
    throw new Error("useAuth must be used within a AuthProvider")
  }

  return context
}
