"use client"
import Link from "next/link"

import { FileSpreadsheet, Inbox, LayoutDashboard, LogOut, Plus, Settings } from "lucide-react"

interface SidebarProps {
  collapsed?: boolean
  onCollapse?: () => void
}

export function Sidebar({ collapsed = false, onCollapse }: SidebarProps) {
  const menuItems = [
    { icon: Plus, label: "New Dataset", href: "/new" },
    { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
    { icon: Inbox, label: "My Datasets", href: "/datasets" },
    { icon: Settings, label: "Settings", href: "/settings" },
  ]

  return (
    <div
      className={`flex h-full flex-col rounded-xl border border-[#303030] bg-transparent text-white backdrop-blur-sm transition-all duration-300 ${
        collapsed ? "w-16" : "w-64"
      }`}
    >
      <div className="flex h-16 items-center border-b border-zinc-700 px-4">
        <button
          className="flex w-full items-center gap-2 rounded-lg px-2 py-1 hover:bg-zinc-800"
          onClick={onCollapse}
        >
          <FileSpreadsheet className="h-5 w-5 text-[#9e2750]" />
          {!collapsed && <span className="truncate font-bold">Dataset Generator</span>}
        </button>
      </div>

      <nav className="flex-1 space-y-1 p-4">
        {menuItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="flex items-center gap-2 rounded-lg px-2 py-2 text-sm text-zinc-300 hover:bg-zinc-800 hover:text-white"
          >
            <item.icon className="h-4 w-4" />
            {!collapsed && <span>{item.label}</span>}
          </Link>
        ))}
      </nav>

      <div className="border-t border-zinc-700 p-4">
        <button className="flex w-full items-center gap-2 rounded-lg px-2 py-2 text-sm text-red-400 hover:bg-zinc-800">
          <LogOut className="h-4 w-4" />
          {!collapsed && <span>Sign Out</span>}
        </button>
      </div>
    </div>
  )
}
