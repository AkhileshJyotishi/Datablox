'use client'
import React, { useState, useRef, useEffect } from 'react'
import { SearchBox } from './searchBox'
import Avatar from '@/assets/avatar/floating-robot.png'
const placeholders = [
  "Find AI training datasets for image recognition",
  "Looking for financial market trends? Try 'Stock Market Data'",
  "Search for medical imaging datasets (X-ray, MRI, CT scans)",
  "Explore NLP datasets for chatbot training",
  "Discover climate change datasets for research",
  "Find blockchain transaction datasets for analysis",
]

// Dummy avatar for the bot
const botAvatarUrl = Avatar.src;

export default function Chatbot({ ipfs }: { ipfs: string }) {
  const [query, setQuery] = useState("")
  const [chat, setChat] = useState<[string, string][]>([
    ["bot", "What do you want to know about this dataset?"],
  ])

  const chatContainerRef = useRef<HTMLDivElement>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value)
  }

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!query.trim()) return

    const userMessage: [string, string] = ["user", query]

    const botResponse: [string, string] = ["bot", `Fetching details for: ${query}`]

    setChat(prevChat => [...prevChat, userMessage, botResponse])
    setQuery("") 
  }

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight
    }
  }, [chat])

  return (
    <div className='text-gray-400 flex-grow border-zinc-700 rounded-lg border backdrop-blur-xl h-full flex flex-col'>
      <div className='flex items-center py-4 px-5 text-white text-xl border-b rounded-lg border-zinc-700'>
        Ask Anything about Dataset
      </div>

      <div ref={chatContainerRef} className='flex-grow overflow-y-auto p-4 space-y-3'>
        {chat.map(([sender, message], index) => {
          if (sender === "bot") {
            return (
              <div key={index} className="flex items-start space-x-2">
                <img
                  src={botAvatarUrl}
                  alt="Bot Avatar"
                  className="w-10 h-10 rounded-full"
                />
                <div className="backdrop-blur-2xl bg-gray-900 text-gray-300 p-2 rounded-lg max-w-[60%]">
                  {message}
                </div>
              </div>
            )
          } else {
            return (
              <div key={index} className="flex justify-end">
                <div className="bg-blue-500 text-white p-2 rounded-lg max-w-[60%]">
                  {message}
                </div>
              </div>
            )
          }
        })}
      </div>

      <div>
        <SearchBox
          placeholders={placeholders}
          onChange={handleChange}
          onSubmit={onSubmit}
        />
      </div>
    </div>
  )
}
