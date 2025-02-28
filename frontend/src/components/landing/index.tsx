import React from "react"

import dynamic from "next/dynamic"

import { FaArrowUp, FaBox, FaColumns, FaCompass, FaCopy, FaFileAlt, FaPenNib } from "react-icons/fa"

import LandingText from "@/components/landing-text"
import { SkeletonLoader } from "@/data"

const Skeleton = () => (
  <div className="flex h-full min-h-[6rem] w-full flex-1 rounded-xl bg-gradient-to-br from-neutral-200 to-neutral-100 dark:from-neutral-900 dark:to-neutral-800"></div>
)

const RoboAnimation = dynamic(() => import("../robo-animation"), {
  ssr: false,
  loading: () => <SkeletonLoader />,
})

export const items = [
  {
    title: "The Dawn of Innovation",
    description: "Explore the birth of groundbreaking ideas and inventions.",
    header: <Skeleton />,
    icon: <FaCopy className="h-5 w-5 text-neutral-500" />,
  },
  {
    title: "The Digital Revolution",
    description: "Dive into the transformative power of technology.",
    header: <Skeleton />,
    icon: <FaFileAlt className="h-5 w-5 text-neutral-500" />,
  },
  {
    title: "The Art of Design",
    description: "Discover the beauty of thoughtful and functional design.",
    header: <Skeleton />,
    icon: <FaPenNib className="h-5 w-5 text-neutral-500" />,
  },
  {
    title: "The Power of Communication",
    description: "Understand the impact of effective communication in our lives.",
    header: <Skeleton />,
    icon: <FaColumns className="h-5 w-5 text-neutral-500" />,
  },
  {
    title: "The Pursuit of Knowledge",
    description: "Join the quest for understanding and enlightenment.",
    header: <Skeleton />,
    icon: <FaArrowUp className="h-5 w-5 text-neutral-500" />,
  },
  {
    title: "The Joy of Creation",
    description: "Experience the thrill of bringing ideas to life.",
    header: <Skeleton />,
    icon: <FaBox className="h-5 w-5 text-neutral-500" />,
  },
  {
    title: "The Spirit of Adventure",
    description: "Embark on exciting journeys and thrilling discoveries.",
    header: <Skeleton />,
    icon: <FaCompass className="h-5 w-5 text-neutral-500" />,
  },
]

const page = () => {
  return (
    <section className="container relative z-10 mx-auto flex min-h-[calc(100vh-100px)] items-center justify-center px-6 pb-14">
      <LandingText />
      <div className="absolute bottom-0 right-0 h-96 w-96">
        <RoboAnimation />
      </div>
    </section>
  )
}

export default page
