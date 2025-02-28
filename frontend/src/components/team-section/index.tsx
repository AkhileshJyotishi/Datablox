import Link from "next/link"
import Image from "next/image"
import { IoMdContact } from "react-icons/io";
import { FaLinkedin, FaGithub } from "react-icons/fa";
import { BsTwitterX } from "react-icons/bs";
const teamMembers = [
  {
    name: "Alex Morgan",
    role: "CEO",
    bio: "Visionary leader with 10+ years experience in tech innovation and business strategy",
    image: "https://static-00.iconduck.com/assets.00/avatar-default-icon-988x1024-zsfboql5.png",
    social: {
      twitter: "#",
      linkedin: "#",
      github: "#",
    },
  },
  {
    name: "Jamie Chen",
    role: "CTO",
    bio: "Full-stack developer passionate about creating elegant solutions to complex problems",
    image: "https://static-00.iconduck.com/assets.00/avatar-default-icon-988x1024-zsfboql5.png",
    social: {
      twitter: "#",
      linkedin: "#",
      github: "#",
    },
  },
  {
    name: "Sam Rivera",
    role: "Lead Designer",
    bio: "Creative mind with an eye for detail and a passion for user-centered design",
    image: "https://static-00.iconduck.com/assets.00/avatar-default-icon-988x1024-zsfboql5.png",
    social: {
      twitter: "#",
      linkedin: "#",
      github: "#",
    },
  },
  {
    name: "Taylor Kim",
    role: "Marketing Director",
    bio: "Strategic thinker with expertise in digital marketing and brand development",
    image: "https://static-00.iconduck.com/assets.00/avatar-default-icon-988x1024-zsfboql5.png",
    social: {
      twitter: "#",
      linkedin: "#",
      github: "#",
    },
  },
  {
    name: "Jordan Patel",
    role: "Product Manager",
    bio: "Detail-oriented problem solver focused on delivering exceptional user experiences",
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
              <p className="text-purple-500 text-base font-semibold mb-2">{member.role}</p>
              <p className="text-gray-400 text-sm text-center mb-4">{member.bio}</p>
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

