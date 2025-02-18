import React from "react"

const LaunchAppButton: React.FC = () => {
  return (
    <button className="my-auto flex items-start gap-2.5 self-stretch rounded-3xl bg-amber-300 px-6 py-4 text-base font-semibold leading-none text-black shadow-[0px_-2px_15px_rgba(255,200,87,0.2)] max-md:px-5">
      <span>Launch App</span>
      <img
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/1fecd18ee61450e18f599ad31e41a075246dce5f90cd2dd0bd638b7d76c20fdf?placeholderIfAbsent=true&apiKey=07f14cec19eb463e992759b459380087"
        alt=""
        className="aspect-square w-4 shrink-0 object-contain"
      />
    </button>
  )
}

interface NavigationItemProps {
  text: string
  link: string
}

const NavigationItem: React.FC<NavigationItemProps> = ({ text, link }) => {
  return (
    <a
      href={link}
      className="w-auto gap-10 whitespace-nowrap text-center"
    >
      {text}
    </a>
  )
}

interface NavigationBarProps {
  logoSrc: string
  navItems: Array<{ text: string; link: string }>
}

const NavigationBar: React.FC<NavigationBarProps> = ({ logoSrc, navItems }) => {
  return (
    <nav className="flex flex-wrap items-center justify-between gap-10 px-10 py-5">
      {/* <img src={logoSrc} alt="Company Logo" className="flex shrink-0 self-stretch my-auto h-[39px] w-[155px]" /> */}
      <span className="text-2xl font-bold">Ocean Data</span>

      <div className="text-md my-auto flex min-w-[240px] flex-wrap items-start gap-10 self-stretch text-white max-md:max-w-full">
        {navItems.map((item, index) => (
          <NavigationItem
            key={index}
            text={item.text}
            link={item.link}
          />
        ))}
      </div>
      <LaunchAppButton />
    </nav>
  )
}

export default function Header() {
  const navItems = [
    { text: "Home", link: "/" },
    { text: "Eco System", link: "/ecosystem" },
    { text: "About Us", link: "/about" },
    { text: "News", link: "/news" },
    { text: "Contacts", link: "/contacts" },
    { text: "Winners", link: "/winners" },
  ]
  return (
    <div className="text-white">
      <NavigationBar
        logoSrc="/path/to/logo.png"
        navItems={navItems}
      />
    </div>
  )
}
