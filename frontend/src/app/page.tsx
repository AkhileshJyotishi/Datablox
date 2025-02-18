import React from "react"

import { Metadata, NextPage } from "next"

import limg from "@/assets/home/left.png"
import rimg from "@/assets/home/right.png"
import Hero from "@/components/landing"

import { FaCopy, FaFileAlt, FaPenNib, FaColumns, FaArrowUp, FaBox, FaCompass } from "react-icons/fa"
import { FeaturesSectionDemo } from "@/components/bento-grid"

// interface HomePageProps {}

export const metadata: Metadata = {
  title: "Home page",
  description: "Home page",
}

const Skeleton = () => (
  <div className="flex h-full min-h-[6rem] w-full flex-1 rounded-xl bg-gradient-to-br from-neutral-200 to-neutral-100 dark:from-neutral-900 dark:to-neutral-800"></div>
)
// export const items = [
//   {
//     title: "The Dawn of Innovation",
//     description: "Explore the birth of groundbreaking ideas and inventions.",
//     header: <Skeleton />,
//     icon: <FaCopy className="h-5 w-5 text-neutral-500" />,
//   },
//   {
//     title: "The Digital Revolution",
//     description: "Dive into the transformative power of technology.",
//     header: <Skeleton />,
//     icon: <FaFileAlt className="h-5 w-5 text-neutral-500" />,
//   },
//   {
//     title: "The Art of Design",
//     description: "Discover the beauty of thoughtful and functional design.",
//     header: <Skeleton />,
//     icon: <FaPenNib className="h-5 w-5 text-neutral-500" />,
//   },
//   {
//     title: "The Power of Communication",
//     description: "Understand the impact of effective communication in our lives.",
//     header: <Skeleton />,
//     icon: <FaColumns className="h-5 w-5 text-neutral-500" />,
//   },
//   {
//     title: "The Pursuit of Knowledge",
//     description: "Join the quest for understanding and enlightenment.",
//     header: <Skeleton />,
//     icon: <FaArrowUp className="h-5 w-5 text-neutral-500" />,
//   },
//   {
//     title: "The Joy of Creation",
//     description: "Experience the thrill of bringing ideas to life.",
//     header: <Skeleton />,
//     icon: <FaBox className="h-5 w-5 text-neutral-500" />,
//   },
//   {
//     title: "The Spirit of Adventure",
//     description: "Embark on exciting journeys and thrilling discoveries.",
//     header: <Skeleton />,
//     icon: <FaCompass className="h-5 w-5 text-neutral-500" />,
//   },
// ];

const HomePage: NextPage = () => {
  return (
    <>
      <img
        className="absolute -left-[450px] top-[480px] z-10 h-auto w-[1200px] -rotate-90"
        src={limg.src}
      />
      <img
        className="absolute -left-1/2 -top-28 h-auto w-[1600px] md:left-[62%]"
        src={rimg.src}
      />

      <Hero />

      <div className="relative z-[50] text-white">
        <FeaturesSectionDemo />
      </div>
    </>
  )
}

export default HomePage
