// components/Footer.tsx
import React from "react"
type FooterProps = {
  footerLogo: {
    src: string
    alt: string
    text: string
    href: string
  }
  footerLinks: {
    href: string
    label: string
  }[]
  footerText: {
    year: number
    trademark: string
    href: string
  }
}

const Footer: React.FC<FooterProps> = ({ footerLogo, footerLinks, footerText }) => {
  return (
    <footer className="bg-secondary shadow">
      <div className="mx-auto w-full max-w-screen-xl p-4 md:py-8">
        <div className="sm:flex sm:items-center sm:justify-between">
          <a
            href={footerLogo.href}
            className="mb-4 flex items-center space-x-3 sm:mb-0 rtl:space-x-reverse"
          >
            <img
              src={"/logo-white.svg"}
              className="w-20"
              alt={footerLogo.alt}
            />
            {/* <span className="self-center whitespace-nowrap text-2xl font-semibold dark:text-white">
              {footerLogo.text}
            </span> */}
          </a>
          <ul className="mb-6 flex flex-wrap items-center text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
            {footerLinks.map((link, index) => (
              <li key={index}>
                <a
                  href={link.href}
                  className="me-4 hover:underline md:me-6"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto lg:my-8 dark:border-gray-700" />
        <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">
          © {footerText.year}{" "}
          <a
            href={footerText.href}
            className="hover:underline"
          >
            {footerText.trademark}
          </a>
          . All Rights Reserved.
        </span>
      </div>
    </footer>
  )
}

export default Footer
