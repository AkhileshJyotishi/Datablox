import { AiFillHome, AiFillMessage, AiFillUsb } from "react-icons/ai"

export const navItems = [
  {
    name: "Home",
    link: "/",
    icon: <AiFillHome className="h-4 w-4 text-neutral-500 dark:text-white" />,
  },
  {
    name: "Publish",
    link: "/publish",
    icon: <AiFillHome className="h-4 w-4 text-neutral-500 dark:text-white" />,
  },
  {
    name: "Marketplace",
    link: "/marketplace",
    icon: <AiFillUsb className="h-4 w-4 text-neutral-500 dark:text-white" />,
  },
  {
    name: "Realtime Datasets",
    link: "/realtime",
    icon: <AiFillUsb className="h-4 w-4 text-neutral-500 dark:text-white" />,
  },
]

export const SkeletonLoader = () => {
  return (
    <section className="relative mb-10 mt-12 animate-pulse px-12">
      <h1 className="mb-2 mt-14 flex items-center text-center text-6xl font-bold text-zinc-700">
        <span className="h-10 w-48 rounded-md bg-gray-700 pb-2"></span>
        <span className="ml-2 h-10 w-12 scale-90 rounded-md bg-gray-700 px-2"></span>
      </h1>
      <h1 className="mb-6 mt-5 h-6 w-4/5 rounded-md bg-gray-700 text-xl text-zinc-600"></h1>
      <div className="mt-16 flex min-h-10 flex-col gap-4">
        <div className="h-24 w-full rounded-md bg-gray-700"></div>
        <div className="h-24 w-full rounded-md bg-gray-700"></div>
        <div className="h-24 w-full rounded-md bg-gray-700"></div>
      </div>
    </section>
  )
}
