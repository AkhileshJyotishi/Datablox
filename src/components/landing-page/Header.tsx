import React from 'react';

const LaunchAppButton: React.FC = () => {
  return (
    <button className="flex gap-2.5 items-start self-stretch px-6 py-4 my-auto text-base font-semibold leading-none text-black bg-amber-300 rounded-3xl shadow-[0px_-2px_15px_rgba(255,200,87,0.2)] max-md:px-5">
      <span>Launch App</span>
      <img
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/1fecd18ee61450e18f599ad31e41a075246dce5f90cd2dd0bd638b7d76c20fdf?placeholderIfAbsent=true&apiKey=07f14cec19eb463e992759b459380087"
        alt=""
        className="object-contain shrink-0 w-4 aspect-square"
      />
    </button>
  );
};


interface NavigationItemProps {
  text: string;
  link: string;
}

const NavigationItem: React.FC<NavigationItemProps> = ({ text, link }) => {
  return (
    <a href={link} className="gap-10 w-auto text-center whitespace-nowrap">
      {text}
    </a>
  );
};


interface NavigationBarProps {
  logoSrc: string;
  navItems: Array<{ text: string; link: string }>;
}

const NavigationBar: React.FC<NavigationBarProps> = ({ logoSrc, navItems }) => {
  return (
    <nav className="flex flex-wrap gap-10 items-center justify-between px-10 py-5">
      {/* <img src={logoSrc} alt="Company Logo" className="flex shrink-0 self-stretch my-auto h-[39px] w-[155px]" /> */}
      <span className='font-bold text-2xl'>Ocean Data</span>

      <div className="flex flex-wrap gap-10 items-start self-stretch my-auto text-md text-white min-w-[240px] max-md:max-w-full">
        {navItems.map((item, index) => (
          <NavigationItem key={index} text={item.text} link={item.link} />
        ))}
      </div>
      <LaunchAppButton />
    </nav>
  );
};


export default function Header() {
  const navItems = [
    { text: 'Home', link: '/' },
    { text: 'Eco System', link: '/ecosystem' },
    { text: 'About Us', link: '/about' },
    { text: 'News', link: '/news' },
    { text: 'Contacts', link: '/contacts' },
    { text: 'Winners', link: '/winners' },
  ];
  return (
    <div className='text-white'>
      <NavigationBar
        logoSrc="/path/to/logo.png"
        navItems={navItems}
      />

    </div>
  )
}
