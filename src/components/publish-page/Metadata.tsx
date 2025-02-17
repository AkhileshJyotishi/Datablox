"use client"
import React, { useEffect, useState } from "react"
import Image from "next/image"
import logo from "@/assets/dataset-page/img1.svg"
export default function Metadata({
  userData,
  setUserData,
  tabNo,
  setTabNo,
  setIsTabCompleted,
}: {
  userData: any
  setUserData: any
  tabNo: any
  setTabNo: any
  setIsTabCompleted: any
}) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    author: "",
    tags: [] as string[],
    tagInput: "",
  })
  useEffect(() => {
    // Whenever formData changes, update userData's 'access' property.
    setUserData((prev: any) => ({
      ...prev,
      metadata: formData,
    }))
  }, [formData, setUserData])

  useEffect(() => {
    // On mount or when userData changes,
    // if formData.validate is empty and userData.access exists,
    // initialize formData from userData.access.
    if (formData.title === "" && userData?.metadata) {
      // Only update if the data is different to avoid infinite loops.
      if (JSON.stringify(formData) !== JSON.stringify(userData.metadata)) {
        setFormData(userData.metadata)
      }
    }
  }, [userData])

  const [errors, setErrors] = useState({
    title: "",
    description: "",
    author: "",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })

    // Clear error when user starts typing
    if (errors[name as keyof typeof errors]) {
      setErrors({ ...errors, [name]: "" })
    }
  }

  const handleTagInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, tagInput: e.target.value })
  }

  const handleAddTag = () => {
    if (formData.tagInput.trim() !== "") {
      setFormData({
        ...formData,
        tags: [...formData.tags, formData.tagInput.trim()],
        tagInput: "",
      })
    }
  }

  const handleRemoveTag = (index: number) => {
    setFormData({
      ...formData,
      tags: formData.tags.filter((_, i) => i !== index),
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    let newErrors = { title: "", description: "", author: "" }

    if (!formData.title.trim()) newErrors.title = "Title is required."
    if (!formData.description.trim()) newErrors.description = "Description is required."
    if (!formData.author.trim()) newErrors.author = "Author is required."

    setErrors(newErrors)

    if (!newErrors.title && !newErrors.description && !newErrors.author) {
      console.log("Form submitted:", formData)
      setTabNo((prev: any) => {
        return prev + 1
      })
      setIsTabCompleted((prev: any) => {
        prev[tabNo] = true
        return prev
      })
    }
  }

  return (
    <div className="mx-auto w-full px-16 md:px-32 py-6 text-white">
      <div className="mb-10 mt-5 flex w-full items-center gap-10">
        <div className="flex flex-col">
          <div className="text-xl font-bold">
            Data NFT<span className="text-base text-zinc-400">*</span>
          </div>
          <div className=" ">
            <Image
              src={logo}
              width={130}
              height={130}
              alt="logo"
              // className='h-40'
            />
          </div>
        </div>
        <div className="w-full border border-zinc-700 px-6 py-2">
          <div className="mb-2 text-lg font-bold text-zinc-200">Sonic Data NFT — SONIC-NFT</div>
          <div className="text-zinc-300">
            This NFT represents a dataset asset in the Sonic AI-Powered Data Marketplace, ensuring secure and verifiable
            ownership.
          </div>
        </div>
      </div>
      <div className="space-y-10">
        {/* Title Field */}
        <div>
          <label className="mb-1 block text-lg font-bold">
            Title<span className="text-base text-gray-400">*</span>
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            className="w-full rounded-md border border-gray-600 bg-zinc-900 px-3 py-2 text-white focus:outline-none focus:ring-1 focus:ring-red-800"
          />
          {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title}</p>}
        </div>

        {/* Description Field */}
        <div>
          <label className="mb-1 block text-lg font-bold">
            Description<span className="text-base text-gray-400">*</span>
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            rows={3}
            className="w-full rounded-md border border-gray-600 bg-zinc-900 px-3 py-2 text-white focus:outline-none focus:ring-1 focus:ring-red-800"
          />
          {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description}</p>}
        </div>

        {/* Author Field */}
        <div>
          <label className="mb-1 block text-lg font-bold">
            Author<span className="text-base text-gray-400">*</span>
          </label>
          <input
            type="text"
            name="author"
            value={formData.author}
            onChange={handleInputChange}
            className="w-full rounded-md border border-gray-600 bg-zinc-900 px-3 py-2 text-white focus:outline-none focus:ring-1 focus:ring-red-800"
          />
          {errors.author && <p className="mt-1 text-sm text-red-600">{errors.author}</p>}
        </div>

        {/* Tags Input */}
        <div>
          <label className="mb-1 block text-lg font-bold">Tags</label>
          <div className="flex">
            <input
              type="text"
              value={formData.tagInput}
              onChange={handleTagInput}
              className="flex-1 rounded-md border border-gray-600 bg-zinc-900 px-3 py-2 text-white focus:outline-none focus:ring-1 focus:ring-red-800"
            />
            <button
              type="button"
              onClick={handleAddTag}
              className="ml-2 rounded-md bg-gradient-to-r from-[#9e2750] to-[#b02d5b] px-4 py-2 text-white transition-all duration-300 hover:from-[#8b2347] hover:to-[#9b284f] active:from-[#7d1f41] active:to-[#8f2449]"
            >
              Add
            </button>
          </div>
          <div className="mt-2 flex flex-wrap gap-2">
            {formData.tags.map((tag, index) => (
              <div
                key={index}
                className="flex items-center rounded-md bg-gray-600 px-3 py-1 text-sm"
              >
                {tag}
                <button
                  type="button"
                  onClick={() => handleRemoveTag(index)}
                  className="ml-2 text-red-600 hover:text-red-600"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-center">
          <button
            // type="submit"
            onClick={handleSubmit}
            className="rounded-md bg-gradient-to-r from-[#9e2750] to-[#b02d5b] px-8 py-2 font-sans text-lg font-semibold text-white transition-all duration-300 hover:from-[#8b2347] hover:to-[#9b284f] active:from-[#7d1f41] active:to-[#8f2449]"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  )
}
