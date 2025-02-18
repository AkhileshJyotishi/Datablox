"use client"

import React, { useState } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { ConnectKitButton } from "connectkit"
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion"

import { cn } from "@/lib/utils"
import Chads from "../avatar"
import { CiSearch } from "react-icons/ci"
import SonicLogo from "@/assets/publish-page/sonicLogo.svg"

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
          "relative z-10 inset-x-0 mt-8 mx-auto flex max-w-[80%] items-center justify-between space-x-4 rounded-full border border-transparent py-2 pr-4 shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] bg-transparent dark:border-white/[0.2]",
          className
        )}
      >
        <div className="center gap-4 w-[88%]">
          <Link href={"/"} className="relative flex items-center space-x-1 text-neutral-600 hover:text-neutral-500 dark:text-neutral-50 dark:hover:text-neutral-300">
            <div className="scale-75">
              <SonicLogo />
            </div>
          </Link>
          {navItems.map((navItem, idx) => (
            <Link key={`link-${idx}`} href={navItem.link} className="relative flex items-center space-x-1 text-neutral-600 hover:text-neutral-500 dark:text-neutral-50 dark:hover:text-neutral-300">
              <span className="block sm:hidden">{navItem.icon}</span>
              <span className="hidden text-lg font-bold sm:block">{navItem.name}</span>
            </Link>
          ))}
          
          {/* Search Box */}
          <div className="flex ml-auto text-gray-400 border border-[#303030] rounded-2xl p-3 items-center">
            <input 
              type="text" 
              className="bg-transparent outline-none" 
              placeholder="Search..." 
              value={query}
              onChange={handleChange} 
              onKeyDown={handleKeyDown}
            />
            <CiSearch size={20} onClick={handleSearch} className="cursor-pointer" />
          </div>
        </div>

        {/* Connect Wallet Button */}
        <ConnectKitButton.Custom>
          {({ isConnected, show, address }) => (
            !isConnected ? (
              <button
                onClick={show}
                className="relative rounded-full border w-fit border-neutral-200 px-4 py-3 text-sm font-medium text-black transition-colors duration-200 hover:bg-neutral-100 dark:border-white/[0.2] dark:text-white dark:hover:bg-neutral-800"
              >
                <span>Connect Wallet</span>
                <span className="absolute inset-x-0 -bottom-px mx-auto h-px w-1/2 bg-gradient-to-r from-transparent via-blue-500 to-transparent" />
              </button>
            ) : (
              <div onClick={show} className="center cursor-pointer gap-2.5">
                {address ? (
                  <Chads className="h-8 w-8 min-w-[32px] rounded-full" seed={address} />
                ) : (
                  <Chads seed={"guest"} />
                )}
              </div>
            )
          )}
        </ConnectKitButton.Custom>
      </motion.div>
    </AnimatePresence>
  )
}
