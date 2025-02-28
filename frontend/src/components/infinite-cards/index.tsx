"use client"

import { cn } from "@/lib/utils"
import React, { useEffect, useState } from "react"
import DataPacket from "../marketplace/DataPacket"
import { RealTimeProps } from "@/constants/realtime"

 const InfiniteMovingCards = ({
  items,
  direction = "left",
  speed = "fast",
  pauseOnHover = true,
  className,
  realtime
}: {
  items: {
    operator: string
    chain: string
    title: string
    owner: string
    description: string
    price: string
    sales: string
    id: number
  }[]
  direction?: "left" | "right"
  speed?: "fast" | "normal" | "slow"
  pauseOnHover?: boolean
  className?: string
  realtime?:boolean
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
          "flex w-max min-w-full shrink-0 flex-nowrap gap-4 py-4",
          start && "animate-scroll",
          pauseOnHover && "hover:[animation-play-state:paused]"
        )}
      >
        {items.map((item, idx) => (
          <li
            key={idx}
            className="relative w-[450px] max-w-full flex-shrink-0 cursor-pointer"
          >
            <DataPacket data={item} realtime={realtime} />
          </li>
        ))}
      </ul>
    </div>
  )
}

export default InfiniteMovingCards