import React from "react"

export default function Chatbot({ ipfs }: { ipfs: string }) {
  return (
    <div className="flex-grow border border-zinc-700 text-gray-400 backdrop-blur-xl">
      <div>Ask anything</div>
      <div className="h-[550px]"></div>
      <div></div>
    </div>
  )
}
