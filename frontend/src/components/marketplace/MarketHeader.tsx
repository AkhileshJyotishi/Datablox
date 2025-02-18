"use client"
import Link from "next/link"
import React from "react"
import { CiSearch } from "react-icons/ci"
import { ConnectKitButton } from "connectkit"
import Chads from "../avatar"
export default function MarketHeader() {
  return (
    <div className="absolute z-50 flex w-[100vw] items-center justify-between px-10 py-10">
      <div className="text-md flex gap-8 font-bold uppercase text-gray-400">
        <Link href="/">Ocean Market</Link>
        <Link href="/publish">Publish</Link>
        <Link href="/profile">Profile</Link>
      </div>
      <div className="flex gap-10">
        <ConnectKitButton.Custom>
          {({ isConnected, show, address }) => {
            return !isConnected ? (
              <button
                onClick={show}
                className="relative rounded-full border border-neutral-200 px-4 py-2 text-sm font-medium text-black transition-colors duration-200 hover:bg-neutral-100 dark:border-white/[0.2] dark:text-white dark:hover:bg-neutral-800"
              >
                <span>Login</span>
                <span className="absolute inset-x-0 -bottom-px mx-auto h-px w-1/2 bg-gradient-to-r from-transparent via-blue-500 to-transparent" />
              </button>
            ) : (
              <div
                onClick={show}
                className="center cursor-pointer gap-2.5"
              >
                {address ? (
                  <Chads
                    className="h-8 w-8 min-w-[32px] rounded-full"
                    seed={address}
                  />
                ) : (
                  <Chads seed={"guest"} />
                )}
              </div>
            )
          }}
        </ConnectKitButton.Custom>
      </div>
    </div>
  )
}
