"use client"
import type { NextPage } from "next"
import React, { useEffect, useRef, useState } from "react"
import { motion, useAnimation } from "framer-motion"
import { cn } from "@/lib/utils"


export const BackgroundCellCore = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  const ref = useRef<any>(null)

  const handleMouseMove = (event: any) => {
    const rect = ref.current && ref.current.getBoundingClientRect()
    setMousePosition({
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    })
  }

  const size = 300
  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      className="absolute inset-0 h-full"
    >
      <div className="absolute inset-y-0 h-[20rem] overflow-hidden">
        <div className="pointer-events-none absolute -bottom-2 z-40 h-full w-full bg-[#0a0a0a] [mask-image:linear-gradient(to_bottom,transparent,black)]"></div>
        <div
          className="absolute inset-0 z-20 bg-transparent"
          style={{
            maskImage: `radial-gradient(
            ${size / 4}px circle at center,
           white, transparent
          )`,
            WebkitMaskImage: `radial-gradient(
          ${size / 4}px circle at center,
          white, transparent
        )`,
            WebkitMaskPosition: `${mousePosition.x - size / 2}px ${mousePosition.y - size / 2}px`,
            WebkitMaskSize: `${size}px`,
            maskSize: `${size}px`,
            pointerEvents: "none",
            maskRepeat: "no-repeat",
            WebkitMaskRepeat: "no-repeat",
          }}
        >
          <Pattern cellClassName="border-cyan-600 relative z-[100]" />
        </div>
        <Pattern
          className="opacity-[0.4]"
          cellClassName="border-neutral-800"
        />
      </div>
    </div>
  )
}

const Pattern = ({ className, cellClassName }: { className?: string; cellClassName?: string }) => {
  const x = new Array(100).fill(0)
  const y = new Array(100).fill(0)
  const matrix = x.map((_, i) => y.map((_, j) => [i, j]))
  const [clickedCell, setClickedCell] = useState<any>(null)

  return (
    <div className={cn("relative z-30 flex flex-row", className)}>
      {matrix.map((row, rowIdx) => (
        <div
          key={`matrix-row-${rowIdx}`}
          className="relative z-20 flex flex-col border-b"
        >
          {row.map((column, colIdx) => {
            const controls = useAnimation()

            useEffect(() => {
              if (clickedCell) {
                const distance = Math.sqrt(Math.pow(clickedCell[0] - rowIdx, 2) + Math.pow(clickedCell[1] - colIdx, 2))
                controls.start({
                  opacity: [0, 1 - distance * 0.1, 0],
                  transition: { duration: distance * 0.2 },
                })
              }
            }, [clickedCell])

            return (
              <div
                key={`matrix-col-${colIdx}`}
                className={cn("border-b border-l border-neutral-800 bg-transparent", cellClassName)}
                onClick={() => setClickedCell([rowIdx, colIdx])}
              >
                <motion.div
                  initial={{
                    opacity: 0,
                  }}
                  whileHover={{
                    opacity: [0, 1, 0.5],
                  }}
                  transition={{
                    duration: 0.5,
                    ease: "backOut",
                  }}
                  animate={controls}
                  className="h-12 w-12 bg-[rgba(0,255,255,0.3)]" // Cyan glow effect
                ></motion.div>
              </div>
            )
          })}
        </div>
      ))}
    </div>
  )
}
