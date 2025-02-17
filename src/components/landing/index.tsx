"use client"
import React from 'react'

import { motion } from "framer-motion"
import { FileText, Sparkles } from "lucide-react"

import { FaCopy, FaFileAlt, FaPenNib, FaColumns, FaArrowUp, FaBox, FaCompass } from "react-icons/fa";
import { RoboAnimation } from '../robo-animation';


const Skeleton = () => (
  <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-neutral-200 dark:from-neutral-900 dark:to-neutral-800 to-neutral-100"></div>
);

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
];



const page = () => {

  const words = [{ text: "AI" }, { text: "Agent" }, { text: "based" }, { text: "Data" }, { text: "nft" }, { text: "marketplace" }]
  return (
   
     
      <section className="container -mt-10 mx-auto px-6 relative z-10 flex justify-center items-center  min-h-[calc(100vh-100px)]">
        <div className="max-w-4xl mx-auto text-center ">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6">
            Transforming Data Markets with
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
                {" "}
                AI Power
              </span>
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-gray-400 text-xl mb-8 max-w-2xl mx-auto"
          >
            Buy, sell, and monetize datasets seamlessly. AI-powered, blockchain-secured, and built for trust
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <button  className="bg-purple-600 py-2 flex hover:bg-purple-700 text-white px-8">
              <FileText className="mr-2 h-5 w-5" />
              Upload Paper
            </button>
            <button   className="text-white py-2 flex border-purple-500 hover:bg-purple-500/20">
              <Sparkles className="mr-2 h-5 w-5" />
              See Examples
            </button>
          </motion.div>
        </div>
        <div className="absolute bottom-0 right-0 w-96 h-96 ">
        <RoboAnimation />
      </div>
      </section>
 
    




  )
}

export default page


{/* <TypewriterEffect words={words} /> */ }

{/* 
      <div className='relative   mx-auto mt-12 gap-4'>
        <div className="px-8">
          <h4 className="text-3xl lg:text-5xl lg:leading-tight max-w-5xl mx-auto text-center tracking-tight font-medium text-black dark:text-white">
            Packed with thousands of features
          </h4>

          <p className="text-sm lg:text-base  max-w-2xl  my-4 mx-auto text-neutral-500 text-center font-normal dark:text-neutral-300">
            From Image generation to video generation, Everything AI has APIs for
            literally everything. It can even create this website copy for you.
          </p>
        </div>
        <BentoGrid className=" mx-auto">
          {items.map((item, i) => (
            <BentoGridItem
              key={i}
              title={item.title}
              description={item.description}
              header={item.header}
              icon={item.icon}
              className={i === 3 || i === 6 ? "md:col-span-2" : ""}
            />
          ))}
        </BentoGrid>
      </div> 
      */}
