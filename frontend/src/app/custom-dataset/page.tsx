"use client"

import * as React from "react"

import { ChatInput } from "@/ui/chat-input"
import { DatasetRecommendations } from "@/ui/dataset-recommendations"
import { Message } from "@/ui/message"
import { Sidebar } from "@/ui/sidebar"

const recommendations = [
  {
    title: "E-commerce Dataset",
    description: "Generate a dataset with customer transactions, products, and reviews",
    rows: 10000,
    features: ["customer_id", "product_id", "price", "rating", "review_text"],
  },
  {
    title: "Healthcare Records",
    description: "Create synthetic patient records with medical history and treatments",
    rows: 5000,
    features: ["patient_id", "age", "diagnosis", "treatment", "outcome"],
  },
  {
    title: "Financial Transactions",
    description: "Generate banking transaction data with various payment types",
    rows: 15000,
    features: ["transaction_id", "amount", "type", "date", "merchant"],
  },
]

export default function DatasetChatPage() {
  const [sidebarCollapsed, setSidebarCollapsed] = React.useState(false)
  const [messages, setMessages] = React.useState<
    Array<{
      role: "user" | "assistant"
      content: string
      timestamp?: string
    }>
  >([])

  const handleSendMessage = (content: string) => {
    // Add user message
    setMessages((prev) => [
      ...prev,
      {
        role: "user",
        content,
        timestamp: new Date().toLocaleTimeString(),
      },
    ])

    // Simulate AI response
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: `I'll help you generate a dataset with these specifications: ${content}`,
          timestamp: new Date().toLocaleTimeString(),
        },
      ])
    }, 1000)
  }

  const handleRecommendationSelect = (recommendation: (typeof recommendations)[0]) => {
    handleSendMessage(
      `Generate a ${recommendation.title.toLowerCase()} with ${recommendation.rows} rows including these features: ${recommendation.features.join(", ")}`
    )
  }

  return (
    <div className="mt-4 w-[80%]">
      <div className="flex h-[83vh] w-[100%] bg-transparent text-white">
        <Sidebar
          collapsed={sidebarCollapsed}
          onCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
        />

        <main className="flex flex-1 flex-col overflow-hidden">
          <div className="flex-1 overflow-auto p-6">
            {messages.length === 0 ? (
              <DatasetRecommendations
                recommendations={recommendations}
                onSelect={handleRecommendationSelect}
              />
            ) : (
              <div className="space-y-6">
                {messages.map((message, index) => (
                  <Message
                    key={index}
                    {...message}
                  />
                ))}
              </div>
            )}
          </div>

          <ChatInput
            onSubmit={handleSendMessage}
            placeholder="Describe the dataset you want to generate..."
          />
        </main>
      </div>
    </div>
  )
}
