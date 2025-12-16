"use client"

const STORAGE_KEY = "cineva-favorites"

export function getFavorites(): string[] {
  if (typeof window === "undefined") return []
  const stored = localStorage.getItem(STORAGE_KEY)
  return stored ? JSON.parse(stored) : []
}

export function isFavorite(movieId: string): boolean {
  return getFavorites().includes(movieId)
}

export function toggleFavorite(movieId: string): void {
  const favorites = getFavorites()
  const index = favorites.indexOf(movieId)

  if (index > -1) {
    favorites.splice(index, 1)
  } else {
    favorites.push(movieId)
  }

  localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites))
}
