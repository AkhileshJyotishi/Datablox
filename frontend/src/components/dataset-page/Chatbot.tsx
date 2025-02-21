'use client'
import React, { useState, useRef, useEffect } from 'react'
import { SearchBox } from './searchBox'
import Avatar from '@/assets/avatar/floating-robot.png'
import axios from 'axios'
import ReactMarkdown from "react-markdown";


const placeholders = [
  "Find AI training datasets for image recognition",
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
  const [thinking, setThinking] = useState(false)

  const chatContainerRef = useRef<HTMLDivElement>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value)
  }

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // Prevent new submissions while waiting for a response
    if (thinking) return
    if (!query.trim()) return

    // Immediately show the user's message
    const userMessage: [string, string] = ["user", query]
    setChat(prevChat => [...prevChat, userMessage])
    const currentQuery = query
    setQuery("")

    try {
      setThinking(true)
      console.log("this is the data ", currentQuery, ipfs);
      const response = await axios.post(`${process.env.NEXT_PUBLIC_FRONTEND_URL}/api/get-chat-result`, {
        userResponse: currentQuery,
        ipfsUrl: ipfs,
      })

      const aiResponse = response.data.aiResponse
      const botResponse: [string, string] = ["bot", aiResponse]
      setChat(prevChat => [...prevChat, botResponse])
    } catch (error: any) {
      console.error("Error fetching AI response:", error)
      let errorMessage = "Something went wrong. Please try again later."
      if (axios.isAxiosError(error)) {
        errorMessage = error.response?.data?.error || error.message
      }
      const botErrorResponse: [string, string] = ["bot", `Error: ${errorMessage}`]
      setChat(prevChat => [...prevChat, botErrorResponse])
    } finally {
      setThinking(false)
    }
  }

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight
    }
  }, [chat, thinking])

  return (
    <div className='text-gray-400 flex-grow border-zinc-700 rounded-lg border backdrop-blur-xl h-full flex flex-col w-[450px]'>
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
                  <ReactMarkdown>{message}</ReactMarkdown>
                </div>
              </div>
            )
          } else {
            return (
              <div key={index} className="flex justify-end">
                <div className="bg-blue-500 text-white p-2 rounded-lg max-w-[60%]">
                  <ReactMarkdown>{message}</ReactMarkdown>
                </div>
              </div>
            )
          }
        })}
        {/* Display a thinking indicator if the bot is processing */}
        {thinking && (
          <div className="flex items-start space-x-2">
            <img
              src={botAvatarUrl}
              alt="Bot Avatar"
              className="w-10 h-10 rounded-full"
            />
            <div className="backdrop-blur-2xl bg-gray-900 text-gray-300 p-2 rounded-lg max-w-[60%]">
              <em>Bot is thinking...</em>
            </div>
          </div>
        )}
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
