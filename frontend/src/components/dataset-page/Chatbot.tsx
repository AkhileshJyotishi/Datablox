"use client"
import React, { useEffect, useRef, useState } from "react"

import axios from "axios"
import ReactMarkdown from "react-markdown"

import Avatar from "@/assets/avatar/floating-robot.png"

import { SearchBox } from "./searchBox"

const placeholders = [
  "Find AI training datasets for image recognition",
  "Explore NLP datasets for chatbot training",
  "Discover climate change datasets for research",
  "Find blockchain transaction datasets for analysis",
]

// Dummy avatar for the bot
const botAvatarUrl = Avatar.src

export default function Chatbot({ ipfs }: { ipfs: string }) {
  const [query, setQuery] = useState("")
  const [chat, setChat] = useState<[string, string][]>([["bot", "What do you want to know about this dataset?"]])
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
    setChat((prevChat) => [...prevChat, userMessage])
    const currentQuery = query
    setQuery("")

    try {
      setThinking(true)
      console.log("this is the data ", currentQuery, ipfs)
      const response = await axios.post(`${process.env.NEXT_PUBLIC_FRONTEND_URL}/api/get-chat-result`, {
        userResponse: currentQuery,
        ipfsUrl: ipfs,
      })

      const aiResponse = response.data.aiResponse
      const botResponse: [string, string] = ["bot", aiResponse]
      setChat((prevChat) => [...prevChat, botResponse])
    } catch (error: any) {
      console.error("Error fetching AI response:", error)
      let errorMessage = "Something went wrong. Please try again later."
      if (axios.isAxiosError(error)) {
        errorMessage = error.response?.data?.error || error.message
      }
      const botErrorResponse: [string, string] = ["bot", `Error: ${errorMessage}`]
      setChat((prevChat) => [...prevChat, botErrorResponse])
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
    <div className="flex h-full flex-grow flex-col rounded-lg border border-zinc-700 text-gray-400 backdrop-blur-xl">
      <div className="flex items-center rounded-lg border-b border-zinc-700 px-5 py-4 text-xl text-white">
        Ask Anything about Dataset
      </div>

      <div
        ref={chatContainerRef}
        className="flex-grow space-y-3 overflow-y-auto p-4"
      >
        {chat.map(([sender, message], index) => {
          if (sender === "bot") {
            return (
              <div
                key={index}
                className="flex items-start space-x-2"
              >
                <img
                  src={botAvatarUrl}
                  alt="Bot Avatar"
                  className="h-10 w-10 rounded-full"
                />
                <div className="max-w-[60%] rounded-lg bg-gray-900 p-2 text-gray-300 backdrop-blur-2xl">
                  <ReactMarkdown>{message}</ReactMarkdown>
                </div>
              </div>
            )
          } else {
            return (
              <div
                key={index}
                className="flex justify-end"
              >
                <div className="max-w-[60%] rounded-lg bg-blue-500 p-2 text-white">
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
              className="h-10 w-10 rounded-full"
            />
            <div className="max-w-[60%] rounded-lg bg-gray-900 p-2 text-gray-300 backdrop-blur-2xl">
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
