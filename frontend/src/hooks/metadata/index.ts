import { useEffect, useState } from "react"

import { MetadataErrors, MetadataState } from "@/interface/global"

export const useMetadata = (userData: any, setUserData: any) => {
  const [formData, setFormData] = useState<MetadataState>({
    title: "",
    description: "",
    author: "",
    tags: [],
  })

  const [errors, setErrors] = useState<MetadataErrors>({
    title: "",
    description: "",
    author: "",
  })

  useEffect(() => {
    setUserData((prev: any) => ({
      ...prev,
      metadata: formData,
    }))
  }, [formData, setUserData])

  useEffect(() => {
    if (formData.title === "" && userData?.metadata) {
      if (JSON.stringify(formData) !== JSON.stringify(userData.metadata)) {
        setFormData(userData.metadata)
      }
    }
  }, [userData])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })

    if (errors[name as keyof MetadataErrors]) {
      setErrors({ ...errors, [name]: "" })
    }
  }

  return { formData, setFormData, errors, setErrors, handleInputChange }
}
