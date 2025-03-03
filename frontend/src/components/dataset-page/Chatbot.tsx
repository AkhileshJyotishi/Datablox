"use client"
import React, { useEffect, useRef, useState } from "react"

import axios from "axios"
import ReactMarkdown from "react-markdown"

import Avatar from "@/assets/avatar/floating-robot.png"

import { SearchBox } from "./searchBox"
import WelcomeSection from "./WelcomeSection"

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
  // const [chat, setChat] = useState<[string, string][]>([["bot", "What do you want to know about this dataset?"]])
  const [chat, setChat] = useState<[string, string][]>([])
  const [thinking, setThinking] = useState(false)

  const chatContainerRef = useRef<HTMLDivElement>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value)
  }

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>, directQuery="") => {
    e.preventDefault()
    // Prevent new submissions while waiting for a response
    console.log("here submitjkfsdjl")
    if (thinking) return
    if (directQuery=="" && !query.trim()) return

    // Immediately show the user's message
    let currentQuery;
    if(directQuery!=""){
      currentQuery=directQuery;
      const userMessage: [string, string] = ["user", directQuery]
      setChat((prevChat) => [...prevChat, userMessage])
    }
    else{
       currentQuery = query
      setQuery("")
    }

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
      <div className="flex items-center rounded-lg border-b text-center justify-center font-bold border-zinc-700 py-4 text-xl text-white">
        Verify Your Dataset First
      </div>

      <div
        ref={chatContainerRef}
        className="flex-grow space-y-3 overflow-y-auto p-2"
      >
        {chat.length>0 && chat.map(([sender, message], index) => {
          if (sender === "bot") {
            return (
              <div
                key={index}
                className="flex items-start space-x-1"
              >
                <img
                  src={botAvatarUrl}
                  alt="Bot Avatar"
                  className="h-8 w-8 mt-1 rounded-full"
                />
                <div className="max-w-[68%] rounded-lg bg-white/5 border border-[#303030] p-2 text-gray-300 backdrop-blur-2xl">
                  <ReactMarkdown className={""}>{message}</ReactMarkdown>
                </div>
              </div>
            )
          } else {
            return (
              <div
                key={index}
                className="flex justify-end"
              >
                <div className="max-w-[63%] rounded-lg bg-white/10 border border-[#303030] p-2 text-white">
                  <ReactMarkdown>{message}</ReactMarkdown>
                </div>
              </div>
            )
          }
        })}
        {
          chat.length==0 && (!thinking) && 
          <>
            {/* Display here initially */}
            <WelcomeSection  onSubmit={onSubmit}/>
          </>
        }
        {/* Display a thinking indicator if the bot is processing */}
        {thinking && (
          <div className="flex items-start space-x-2">
            <img
              src={botAvatarUrl}
              alt="Bot Avatar"
              className="h-10 w-10 rounded-full"
            />
            <div className="max-w-[60%] rounded-lg bg-white/5 p-2 border border-[#303030] text-gray-300 backdrop-blur-2xl">
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
