import React from "react"
import { FaLongArrowAltRight } from "react-icons/fa"

export default function AllData() {
  return (
    <button className="mx-auto flex w-[95%] items-center justify-start transition-transform active:scale-95">
      <p className="text-xl font-bold text-[#ff4092]">All Datasets</p>
      <span className="ml-1 mt-1">
        <FaLongArrowAltRight color="#ff4092" />
      </span>
    </button>
  )
}
