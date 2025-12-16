"use client"

const STORAGE_KEY = "cineva-history"

export function getHistory(): string[] {
  if (typeof window === "undefined") return []
  const stored = localStorage.getItem(STORAGE_KEY)
  return stored ? JSON.parse(stored) : []
}

export function addToHistory(movieId: string): void {
  const history = getHistory()

  // Remove if already exists
  const index = history.indexOf(movieId)
  if (index > -1) {
    history.splice(index, 1)
  }

  // Add to beginning
  history.unshift(movieId)

  // Keep only last 20
  const limited = history.slice(0, 20)

  localStorage.setItem(STORAGE_KEY, JSON.stringify(limited))
}
