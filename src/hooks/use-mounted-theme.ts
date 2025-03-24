"use client"

import { useEffect, useState } from "react"
import { useTheme } from "next-themes"

export function useMountedTheme() {
  const { theme, setTheme, systemTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return { theme, setTheme, systemTheme, mounted }
}
