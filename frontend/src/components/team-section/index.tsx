import Image from "next/image"
import Link from "next/link"

import { BsTwitterX } from "react-icons/bs"
import { FaGithub, FaLinkedin } from "react-icons/fa"
import { IoMdContact } from "react-icons/io"
const teamMembers = [
  {
    name: "Umesh Singh Verma",
    role: "AI Engineer",
    bio: "Designed and integrated AI agents to automate data structuring and insights.",
    image: "https://static-00.iconduck.com/assets.00/avatar-default-icon-988x1024-zsfboql5.png",
    social: {
      twitter: "#",
      linkedin: "#",
      github: "#",
    },
  },
  {
    name: "Akhilesh Jyotishi",
    role: "Full Stack Developer",
    bio: "Developed key frontend components and built the backend to power the platform.",
    image: "https://static-00.iconduck.com/assets.00/avatar-default-icon-988x1024-zsfboql5.png",
    social: {
      twitter: "#",
      linkedin: "#",
      github: "#",
    },
  },
  {
    name: "Disha Dwivedi",
    role: "Blockchain Developer",
    bio: "Developed and deployed secure smart contracts for NFT-based data transactions.",
    image: "https://static-00.iconduck.com/assets.00/avatar-default-icon-988x1024-zsfboql5.png",
    social: {
      twitter: "#",
      linkedin: "#",
      github: "#",
    },
  },
  {
    name: "Ankit Yadav",
    role: "Frontend Developer",
    bio: "Built the core UI and seamlessly integrated backend APIs for a smooth user experience.",
    image: "https://static-00.iconduck.com/assets.00/avatar-default-icon-988x1024-zsfboql5.png",
    social: {
      twitter: "#",
      linkedin: "#",
      github: "#",
    },
  },
  {
    name: "Shubham Roy",
    role: "Manager",
    bio: "Supervised development, Bug reporting and crafted detailed project documentation.",
    image: "https://static-00.iconduck.com/assets.00/avatar-default-icon-988x1024-zsfboql5.png",
    social: {
      twitter: "#",
      linkedin: "#",
      github: "#",
    },
  },
]

export default function TeamSection() {
  return (
    <section className="mb-10 px-4 py-8 md:px-8 lg:px-16">
      <div className="mx-auto max-w-[85vw]">
        <div className="mb-12 space-y-4 rounded-3xl border border-[#303030] py-6 pl-6 backdrop-blur-lg">
          <h2 className="text-4xl font-bold text-white md:text-4xl">Meet our team members</h2>
          <p className="max-w-2xl text-gray-400">
            Our talented team brings diverse expertise and passion to every project. We're dedicated to delivering
            exceptional results for our clients.
          </p>
          <div className="flex flex-wrap gap-4 pt-2">
            <button className="flex items-center justify-center rounded-md bg-purple-600 px-8 py-3 text-white hover:bg-purple-700">
              <IoMdContact className="mr-2 h-5 w-5" />
              Contact Us
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="flex cursor-pointer flex-col items-center rounded-lg border border-[#303030] p-6 backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:bg-zinc-900 hover:shadow-lg hover:shadow-purple-900/20"
            >
              <div className="relative mb-4 h-40 w-40 overflow-hidden rounded-full border-2 border-purple-600">
                <Image
                  src={member.image || "/placeholder.svg"}
                  alt={member.name}
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="text-xl font-bold text-white">{member.name}</h3>
              <p className="mb-2 mt-2 text-base font-semibold text-purple-500">{member.role}</p>
              <p className="mb-4 text-center text-sm text-gray-300">{member.bio}</p>
              <div className="mt-auto flex space-x-3 pt-2">
                <Link
                  href={member.social.twitter}
                  className="text-gray-400 transition-colors hover:text-purple-700"
                >
                  <BsTwitterX size={20} />
                  <span className="sr-only">Twitter</span>
                </Link>
                <Link
                  href={member.social.linkedin}
                  className="text-gray-400 transition-colors hover:text-purple-700"
                >
                  <FaLinkedin size={23} />
                  <span className="sr-only">LinkedIn</span>
                </Link>
                <Link
                  href={member.social.github}
                  className="text-gray-400 transition-colors hover:text-purple-700"
                >
                  <FaGithub size={24} />
                  <span className="sr-only">GitHub</span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
