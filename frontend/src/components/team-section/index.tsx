import Link from "next/link"
import Image from "next/image"
import { IoMdContact } from "react-icons/io";
import { FaLinkedin, FaGithub } from "react-icons/fa";
import { BsTwitterX } from "react-icons/bs";
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
    <section className="py-8 px-4 md:px-8 mb-10 lg:px-16">
      <div className="max-w-[85vw] mx-auto">
        <div className="mb-12 space-y-4 backdrop-blur-lg border border-[#303030] py-6 rounded-3xl pl-6">
          <h2 className="text-4xl md:text-4xl font-bold text-white">Meet our team members</h2>
          <p className="text-gray-400 max-w-2xl">
            Our talented team brings diverse expertise and passion to every project. We're dedicated to delivering
            exceptional results for our clients.
          </p>
          <div className="flex flex-wrap gap-4 pt-2">
          <button  className="flex items-center justify-center bg-purple-600 px-8 py-3 text-white hover:bg-purple-700 rounded-md">
            <IoMdContact className="mr-2 h-5 w-5" />
            Contact Us
          </button>
           
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="flex flex-col items-center border border-[#303030] backdrop-blur-sm rounded-lg p-6 transition-all duration-300 hover:bg-zinc-900 hover:scale-105 cursor-pointer hover:shadow-lg hover:shadow-purple-900/20"
            >
              <div className="relative w-40 h-40 mb-4 overflow-hidden rounded-full border-2 border-purple-600">
                <Image src={member.image || "/placeholder.svg"} alt={member.name} fill className="object-cover" />
              </div>
              <h3 className="text-xl font-bold text-white">{member.name}</h3>
              <p className="text-purple-500 text-base font-semibold mt-2 mb-2">{member.role}</p>
              <p className="text-gray-300 text-sm text-center mb-4">{member.bio}</p>
              <div className="flex space-x-3 mt-auto pt-2">
                <Link href={member.social.twitter} className="text-gray-400 hover:text-purple-700 transition-colors">
                  <BsTwitterX size={20} />
                  <span className="sr-only">Twitter</span>
                </Link>
                <Link href={member.social.linkedin} className="text-gray-400 hover:text-purple-700 transition-colors">
                  <FaLinkedin size={23} />
                  <span className="sr-only">LinkedIn</span>
                </Link>
                <Link href={member.social.github} className="text-gray-400 hover:text-purple-700  transition-colors">
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

