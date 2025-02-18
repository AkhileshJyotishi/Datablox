"use client"
import { useEffect, useState } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"

const ProblemStatements = () => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const data = []
  const router = useRouter()
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === data.length - 3 ? 0 : prev + 1))
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? data.length - 3 : prev - 1))
  }

  useEffect(() => {
    const interval = setInterval(nextSlide, 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="w-full bg-white px-4 py-8 md:py-12">
      {/* Header */}
      <div className="mx-auto max-w-7xl">
        <h2 className="mb-2 text-2xl font-bold text-orange-500 md:mb-4 md:text-3xl">PROBLEM STATEMENTS</h2>
        <p className="mb-6 text-sm text-gray-700 md:mb-8 md:text-base">
          Not just solving for yourself instead shaping a better world...
        </p>

        <div className="relative mb-8">
          <button
            onClick={prevSlide}
            className="absolute -left-4 top-1/2 z-10 hidden h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full border border-orange-200 bg-white hover:bg-orange-50 sm:flex"
          >
            ←
          </button>

          <div className="overflow-hidden sm:mx-8">
            <div
              className="flex transition-transform duration-300 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 33.333}%)` }}
            >
              {/* {problems.map((problem, index) => (
                                <div
                                    key={index}
                                    className="w-full md:w-1/2 lg:w-1/3 flex-shrink-0 px-2 md:px-4"
                                >
                                    <div className="border border-orange-200 bg-orange-50 rounded-lg shadow-sm h-full">
                                        <div className="p-4 md:p-6 lg:p-8">
                                            <div className="flex justify-center mb-4 md:mb-6">
                                                <Image src={problem.icon} height={200} width={200} alt="" className="w-16 h-16 md:w-20 md:h-20 rounded-full border-2 border-gray-300" />
                                            </div>
                                            <h3 className="text-lg md:text-xl font-bold text-center text-indigo-900 mb-2 md:mb-4">
                                                {problem.title}
                                            </h3>
                                            <p className="text-sm md:text-base text-center text-gray-700 leading-relaxed">
                                                {problem.description}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))} */}
              {/* TODO: */}
              {/* please create or add card here  */}
              {/* above in this file problems . length is defined  */}
            </div>
          </div>

          <button
            onClick={nextSlide}
            className="absolute -right-4 top-1/2 z-10 hidden h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full border border-orange-200 bg-white hover:bg-orange-50 sm:flex"
          >
            →
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProblemStatements
