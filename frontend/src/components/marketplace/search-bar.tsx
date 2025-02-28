"use client"
import React, { useState } from "react"

import { useRouter } from "next/navigation"

import { PlaceholdersAndVanishInput } from "../placeholder-search"

const Search = () => {
  const router = useRouter()
  const [query, setQuery] = useState("")

  const placeholders = [
    "Find AI training datasets for image recognition",
    "Looking for financial market trends? Try 'Stock Market Data'",
    "Search for medical imaging datasets (X-ray, MRI, CT scans)",
    "Explore NLP datasets for chatbot training",
    "Discover climate change datasets for research",
    "Find blockchain transaction datasets for analysis",
  ]

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value)
  }

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!query.trim()) return // Prevent empty queries
    router.push(`/search?query=${encodeURIComponent(query)}`)
    console.log("submitted:", query)
  }

  return (
    <>
      <PlaceholdersAndVanishInput
        placeholders={placeholders}
        onChange={handleChange}
        onSubmit={onSubmit}
      />
    </>
  )
}

export default Search
