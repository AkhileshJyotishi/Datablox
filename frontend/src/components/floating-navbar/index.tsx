"use client"

import React, { useState } from "react"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"

import { ConnectKitButton } from "connectkit"
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion"
import { CiSearch } from "react-icons/ci"

import FullDataBlox from "@/assets/logo/datablox_fulllogo"
import { cn } from "@/lib/utils"

import Chads from "../avatar"

export const FloatingNav = ({
  navItems,
  className,
  stagnant = false,
}: {
  navItems: {
    name: string
    link: string
    icon?: JSX.Element
  }[]
  stagnant?: boolean
  className?: string
}) => {
  const pathname = usePathname()
  const router = useRouter()
  const { scrollYProgress } = useScroll()

  const [query, setQuery] = useState("")
  const [visible, setVisible] = useState(true)

  useMotionValueEvent(scrollYProgress, "change", (current) => {
    if (!stagnant) {
      if (typeof current === "number") {
        const prev = scrollYProgress.getPrevious() ?? 0
        const direction = current - prev

        if (current < 0.005 || direction < 0) {
          setVisible(true)
        } else {
          setVisible(false)
        }
      }
    }
  })

  // Disable in certain pages
  if (pathname === "/dashboard") return null

  // Handle search input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value)
  }

  // Handle search submission
  const handleSearch = () => {
    if (!query.trim()) return
    router.push(`/search?query=${encodeURIComponent(query)}`)
  }

  // Handle Enter key press
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch()
    }
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        className={cn(
          "relative inset-x-0 z-10 mx-auto mt-8 flex max-w-[80%] items-center justify-between space-x-4 rounded-full border border-transparent bg-transparent py-2 pr-4 shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] dark:border-white/[0.2]",
          className
        )}
      >
        <div className="center w-[88%] gap-4">
          <Link
            href={"/"}
            className="relative flex items-center space-x-1 text-neutral-600 hover:text-neutral-500 dark:text-neutral-50 dark:hover:text-neutral-300"
          >
            <div className="scale-75">
              <FullDataBlox />
            </div>
          </Link>
          {navItems.map((navItem, idx) => (
            <Link
              key={`link-${idx}`}
              href={navItem.link}
              className="relative flex items-center space-x-1 text-neutral-600 hover:text-neutral-500 dark:text-neutral-50 dark:hover:text-neutral-300"
            >
              <div>
                <span className="block sm:hidden">{navItem.icon}</span>
                <span className="hidden text-lg font-bold sm:block">{navItem.name}</span>
              </div>
            </Link>
          ))}

          {/* Search Box */}
          <div className="ml-auto flex items-center rounded-2xl border border-[#303030] p-3 text-gray-400">
            <input
              type="text"
              className="bg-transparent outline-none"
              placeholder="Search..."
              value={query}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
            />
            <CiSearch
              size={20}
              onClick={handleSearch}
              className="cursor-pointer"
            />
          </div>
        </div>

        {/* Connect Wallet Button */}
        <ConnectKitButton.Custom>
          {({ isConnected, show, address }) =>
            !isConnected ? (
              <button
                onClick={show}
                className="relative w-fit rounded-full border border-neutral-200 px-4 py-3 text-sm font-medium text-black transition-colors duration-200 hover:bg-neutral-100 dark:border-white/[0.2] dark:text-white dark:hover:bg-neutral-800"
              >
                <span>Connect Wallet</span>
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
          }
        </ConnectKitButton.Custom>
      </motion.div>
    </AnimatePresence>
  )
}
