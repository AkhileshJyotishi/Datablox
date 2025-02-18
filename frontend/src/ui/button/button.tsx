import React from "react"

const variants = {
  primary: "",
  secondary: "",
  link: "",
  pill: "",
  nav: "px-6 py-2 rounded-lg hover:opacity-90",
  outline:
    "shadow-[0_0_0_3px_#000000_inset] px-2 py-1 bg-black border border-black dark:border-white dark:text-white text-black rounded-lg  transform  transition duration-400",
  fill: "px-4 py-2 rounded-md border border-black bg-white text-black  hover:shadow-[4px_4px_0px_0px_rgba(0,0,0)] transition duration-200 font-bold",
}

interface ButtonProperties extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  title?: string
  textClassName?: string
  variant?: keyof typeof variants
}

const Button = ({
  title,
  onClick,
  className = "",
  disabled = false,
  textClassName = "",
  variant = "primary",
  children,
  type,
  style,
  ...properties
}: ButtonProperties) => {
  const BASE_CLASS = "transition-all"

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      style={style}
      className={`${BASE_CLASS} ${variant && variants[variant]} ${className}`}
      {...properties}
    >
      {children && children}
      {title && <div className={` ${textClassName}`}>{title}</div>}
    </button>
  )
}

export default Button
