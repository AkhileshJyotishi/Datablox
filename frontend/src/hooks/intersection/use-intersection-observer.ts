"use client"

import { RefObject, useEffect, useMemo, useState } from "react"

const useIntersectionObserver = (ref: RefObject<Element>) => {
  const [isIntersecting, setIsIntersecting] = useState<boolean>(false)

  const observer = useMemo(() => new IntersectionObserver(([entry]) => setIsIntersecting(entry.isIntersecting)), [])

  useEffect(() => {
    if (ref.current) observer.observe(ref.current)

    return () => {
      observer.disconnect()
    }
  }, [ref, observer])

  return isIntersecting
}

export default useIntersectionObserver
