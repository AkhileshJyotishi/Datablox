import { Avatar } from "../avatar"

interface MessageProps {
  content: string
  role: "user" | "assistant"
  timestamp?: string
}

export function Message({ content, role, timestamp }: MessageProps) {
  return (
    <div className={`flex gap-3 ${role === "user" ? "justify-end" : "justify-start"}`}>
      {role === "assistant" && <Avatar src="/ai-avatar.png" fallback="AI" className="bg-[#9e2750] text-white" />}

      <div
        className={`
        rounded-lg px-4 py-2 max-w-[80%]
        ${role === "user" ? "bg-[#9e2750] text-white" : "bg-zinc-800 text-zinc-100"}
      `}
      >
        {content}
        {timestamp && <div className="mt-1 text-xs opacity-70">{timestamp}</div>}
      </div>

      {role === "user" && <Avatar src="/user-avatar.png" fallback="ME" className="bg-zinc-700 text-white" />}
    </div>
  )
}

