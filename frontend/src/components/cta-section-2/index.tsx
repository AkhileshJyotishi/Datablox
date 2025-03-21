import React from "react"

interface BentoGridItemProps {
  title: string
  description: string
  header: React.ReactNode
  icon: React.ReactNode
  className?: string
}

export const BentoGridItem: React.FC<BentoGridItemProps> = ({ title, description, header, icon, className = "" }) => {
  return (
    <div className={`rounded-xl bg-white p-4 shadow-md dark:bg-neutral-900 ${className}`}>
      <div className="flex items-center space-x-3">
        {icon}
        <h3 className="text-lg font-semibold">{title}</h3>
      </div>
      <div className="mt-2">{header}</div>
      <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-300">{description}</p>
    </div>
  )
}
