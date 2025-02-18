"use client"
import { createContext, Dispatch, SetStateAction, useContext, useState } from "react"

interface IModalContext {
  modalData: {
    isOpen: boolean
    onClick: () => void
    buttonText: string
    onClose: () => void
    content: JSX.Element
    title: JSX.Element
  }
  setmodalData: Dispatch<
    SetStateAction<{
      isOpen: boolean
      onClick: () => void
      buttonText: string
      onClose: () => void
      content: JSX.Element
      title: JSX.Element
    }>
  >
}
interface IModalProvider {
  children: React.ReactNode
}

const Context = createContext<IModalContext>({} as IModalContext)

const ModalProvider = ({ children }: IModalProvider) => {
  const [modalData, setmodalData] = useState({
    isOpen: false,
    buttonText: "",
    onClick: () => {},
    onClose: () => {},
    content: <></>,
    title: <></>,
  })

  return <Context.Provider value={{ modalData, setmodalData }}>{children}</Context.Provider>
}

const useModal = () => {
  const c = useContext(Context)

  if (c === undefined) {
    throw new Error("useUserContext must be used within a UserProvider")
  }

  return c
}
export { ModalProvider, useModal }
