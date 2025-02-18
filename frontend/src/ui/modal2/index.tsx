import { Fragment } from "react"

import clsx from "clsx"

import { Dialog, Transition } from "@headlessui/react"

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
  className?: string
}

export default function Modal2({ isOpen, onClose, children, className }: ModalProps) {
  return (
    <Transition
      show={isOpen}
      as={Fragment}
    >
      <Dialog
        as="div"
        className="relative z-[5001]"
        onClose={onClose}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div
            className="fixed inset-0 bg-black/30"
            aria-hidden="true"
          />
          {/*<div className="fixed inset-0 bg-black/80 " />*/}
          {/*<Dialog.Overlay className="fixed inset-0 bg-[#00000080] " />*/}
        </Transition.Child>
        <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
          <Transition.Child
            as={Fragment}
            enter="transform ease-out duration-500"
            enterFrom="translate-y-4 opacity-0 sm:translate-y-0 sm:scale-95"
            enterTo="translate-y-0 opacity-100 sm:scale-100"
            leave="transform ease-in duration-200"
            leaveFrom="translate-y-0 opacity-100 sm:scale-100"
            leaveTo="translate-y-4 opacity-0 sm:translate-y-0 sm:scale-95"
          >
            <Dialog.Panel
              className={clsx(
                "no-scrollbar no-scroll relative h-[90dvh] overflow-y-scroll rounded-b-3xl rounded-t-3xl shadow-xl sm:w-[600px] sm:max-w-screen-sm",
                className
              )}
            >
              {children}
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  )
}
