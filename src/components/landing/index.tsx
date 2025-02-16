import React from 'react'
import limg from "@/assets/home/left.png"
import rimg from "@/assets/home/right.png"
import { HeroHighlight } from '../ui/hero-highlight'
import { TypewriterEffect } from '../typewriter'
import { BentoGrid, BentoGridItem } from "@/components/bento-grid";
import { FaCopy, FaFileAlt, FaPenNib, FaColumns, FaArrowUp, FaBox, FaCompass } from "react-icons/fa";

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
    <>
      <HeroHighlight>
        <img className='absolute  right-2/3 w-[1200px] h-auto -bottom-6 rotate-180 ' src={limg.src} />
        <img className='absolute  -left-1/2 md:left-[62%] w-[1600px] h-auto -top-14   ' src={rimg.src} />
        <TypewriterEffect words={words} />


      </HeroHighlight>
      <HeroHighlight>
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

      </HeroHighlight>


    </>
  )
}

export default page

