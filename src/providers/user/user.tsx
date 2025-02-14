"use client"
import React, { useState } from "react"

interface IUserContext {
  user: ITemporaryVariable | null
}

type IUserProvider = IProvider

const defaultValues: IUserContext = {
  user: null,
}

const Context = React.createContext<IUserContext>(defaultValues)

const UserProvider: React.FC<IUserProvider> = ({ children }) => {
  const [user] = useState<ITemporaryVariable | null>(null)

  return <Context.Provider value={{ user }}>{children}</Context.Provider>
}

const useUser = () => {
  const c = React.useContext(Context)

  if (c === undefined) {
    throw new Error("useUser must be used within a UserProvider")
  }

  return c
}

export { UserProvider, useUser }
