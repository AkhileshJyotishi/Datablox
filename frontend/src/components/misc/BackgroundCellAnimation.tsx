"use client"
import React, { useEffect, useRef, useState } from "react"
import { motion, useAnimation } from "framer-motion"
import { cn } from "@/lib/utils"

/**
 * Cell Component
 *
 * Represents a single cell in the grid. This component uses the `useAnimation`
 * hook at the top level, ensuring the hook rules are followed.
 */
type CellProps = {
  rowIdx: number
  colIdx: number
  clickedCell: [number, number] | null
  onClick: () => void
  cellClassName?: string
}

const Cell = ({ rowIdx, colIdx, clickedCell, onClick, cellClassName }: CellProps) => {
  const controls = useAnimation()

  useEffect(() => {
    if (clickedCell) {
      const distance = Math.sqrt(Math.pow(clickedCell[0] - rowIdx, 2) + Math.pow(clickedCell[1] - colIdx, 2))
      controls.start({
        opacity: [0, 1 - distance * 0.1, 0],
        transition: { duration: distance * 0.2 },
      })
    }
  }, [clickedCell, controls, rowIdx, colIdx])

  return (
    <div
      className={cn("border-b border-l border-neutral-800 bg-transparent", cellClassName)}
      onClick={onClick}
    >
      <motion.div
        initial={{ opacity: 0 }}
        whileHover={{ opacity: [0, 1, 0.5] }}
        transition={{ duration: 0.5, ease: "backOut" }}
        animate={controls}
        className="h-12 w-12 bg-[rgba(0,255,255,0.3)]"
      />
    </div>
  )
}

/**
 * Pattern Component
 *
 * Renders the grid by mapping through a matrix. Each cell is rendered using the Cell component.
 */
const Pattern = ({ className, cellClassName }: { className?: string; cellClassName?: string }) => {
  const gridSize = 100
  // Create a matrix (2D array) for the grid
  const matrix = Array.from({ length: gridSize }, (_, i) => Array.from({ length: gridSize }, (_, j) => [i, j]))

  const [clickedCell, setClickedCell] = useState<[number, number] | null>(null)

  return (
    <div className={cn("relative z-30 flex flex-row", className)}>
      {matrix.map((row, rowIdx) => (
        <div
          key={`matrix-row-${rowIdx}`}
          className="relative z-20 flex flex-col border-b"
        >
          {row.map((_, colIdx) => (
            <Cell
              key={`matrix-col-${colIdx}`}
              rowIdx={rowIdx}
              colIdx={colIdx}
              clickedCell={clickedCell}
              cellClassName={cellClassName}
              onClick={() => setClickedCell([rowIdx, colIdx])}
            />
          ))}
        </div>
      ))}
    </div>
  )
}

/**
 * BackgroundCellCore Component
 *
 * This component sets up the mouse move handler to control the position of a radial mask,
 * and renders two Pattern components—one masked and one with reduced opacity.
 */
export const BackgroundCellCore = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const ref = useRef<HTMLDivElement>(null)

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect()
      setMousePosition({
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
      })
    }
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
            maskImage: `radial-gradient(${size / 4}px circle at center, white, transparent)`,
            WebkitMaskImage: `radial-gradient(${size / 4}px circle at center, white, transparent)`,
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

export default BackgroundCellCore
