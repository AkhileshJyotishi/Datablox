"use client"

import React, { useEffect, useState } from "react"

import { cn } from "@/lib/utils"

import DataPacket from "../marketplace/DataPacket"

export const MarqueePublisher = ({
  children,
  direction = "left",
  speed = "fast",
  pauseOnHover = true,
  className,
}: {
  children: React.ReactNode
  direction?: "left" | "right"
  speed?: "fast" | "normal" | "slow"
  pauseOnHover?: boolean
  className?: string
}) => {
  const containerRef = React.useRef<HTMLDivElement>(null)
  const scrollerRef = React.useRef<HTMLUListElement>(null)

  useEffect(() => {
    addAnimation()
  }, [])

  const [start, setStart] = useState(false)

  function addAnimation() {
    if (containerRef.current && scrollerRef.current) {
      const scrollerContent = Array.from(scrollerRef.current.children)

      scrollerContent.forEach((item) => {
        const duplicatedItem = item.cloneNode(true)
        if (scrollerRef.current) {
          scrollerRef.current.appendChild(duplicatedItem)
        }
      })

      getDirection()
      getSpeed()
      setStart(true)
    }
  }

  const getDirection = () => {
    if (containerRef.current) {
      containerRef.current.style.setProperty("--animation-direction", direction === "left" ? "forwards" : "reverse")
    }
  }

  const getSpeed = () => {
    if (containerRef.current) {
      const speedMap: Record<string, string> = {
        fast: "20s",
        normal: "40s",
        slow: "80s",
      }
      containerRef.current.style.setProperty("--animation-duration", speedMap[speed])
    }
  }

  return (
    <div
      ref={containerRef}
      className={cn(
        "scroller relative z-20 max-w-7xl overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]",
        className
      )}
    >
      <ul
        ref={scrollerRef}
        className={cn(
          "flex w-max min-w-full shrink-0 flex-nowrap gap-4 py-2",
          start && "animate-scroll",
          pauseOnHover && "hover:[animation-play-state:paused]"
        )}
      >
        {children}
      </ul>
    </div>
  )
}
