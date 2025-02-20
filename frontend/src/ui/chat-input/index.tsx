"use client"

import { SendHorizontal } from "lucide-react"
import React, { useEffect, useRef } from "react"

interface ChatInputProps {
  onSubmit: (message: string) => void
  placeholder?: string
  disabled?: boolean
}

export function ChatInput({ onSubmit, placeholder = "Type a message...", disabled }: ChatInputProps) {
  const [input, setInput] = React.useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (input.trim()) {
      onSubmit(input)
      setInput("")
    }
  }
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);


  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "50px" // Reset height
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 180)}px` // Adjust height dynamically
    }
  }, [input])

  return (
    <form
      onSubmit={handleSubmit}
      className="relative px-2"
    >
      <div className="relative w-full">
        <textarea
          ref={textareaRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={placeholder}
          disabled={disabled}
          rows={1}
          className="w-full resize-none overflow-y-auto rounded-lg border border-[#303030] bg-transparent px-4 py-3 text-white placeholder-zinc-400 backdrop-blur-sm focus:outline-none focus:ring-1 focus:ring-[#9e2750]"
          style={{ minHeight: "60px", maxHeight: "180px" }}
          onInput={() => {
            if((!textareaRef) || (!textareaRef.current)) return;
            textareaRef.current.style.height = "50px" // Reset to prevent unnecessary growth
            textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 180)}px` // Adjust height dynamically
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault()
              handleSubmit(e)
            }
          }}
        />
      </div>
      {/* <div className="border-t border-zinc-700 p-4">
        <button className="flex w-full items-center gap-2 rounded-lg px-2 py-2 text-sm text-red-400 hover:bg-zinc-800">
          <LogOut className="h-4 w-4" />
          {!collapsed && <span>Sign Out</span>}
        </button>
      </div> */}
      <button
        type="submit"
        disabled={disabled || !input.trim()}
        className="absolute bottom-2.5 right-3 rounded-lg bg-red-600 p-3 text-white hover:bg-red-600 disabled:opacity-50"
      >
        <SendHorizontal className="h-5 w-5" />
      </button>
    </form>
  )
}
