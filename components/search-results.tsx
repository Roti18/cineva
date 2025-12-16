"use client"

import { useState, useMemo } from "react"
import { MovieCard } from "@/components/movie-card"
import { SearchBar } from "@/components/search-bar"
import { getAllMovies } from "@/lib/movies"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card } from "@/components/ui/card"

interface SearchResultsProps {
  query: string
  genre: string
  rating: string
}

export function SearchResults({ query, genre, rating }: SearchResultsProps) {
  const [selectedGenre, setSelectedGenre] = useState(genre)
  const [selectedRating, setSelectedRating] = useState(rating)

  const allMovies = getAllMovies()

  const filteredMovies = useMemo(() => {
    return allMovies.filter((movie) => {
      const matchesQuery = query ? movie.title.toLowerCase().includes(query.toLowerCase()) : true
      const matchesGenre = selectedGenre ? movie.genres.includes(selectedGenre) : true
      const matchesRating = selectedRating ? movie.rating >= Number.parseFloat(selectedRating) : true

      return matchesQuery && matchesGenre && matchesRating
    })
  }, [allMovies, query, selectedGenre, selectedRating])

  const genres = ["Action", "Drama", "Sci-Fi", "Thriller", "Romance", "Comedy", "Horror", "Adventure"]

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <h1 className="text-3xl font-bold">Jelajahi Film</h1>
        <SearchBar />

        <Card className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <label className="text-sm font-medium mb-2 block">Genre</label>
              <Select value={selectedGenre} onValueChange={setSelectedGenre}>
                <SelectTrigger>
                  <SelectValue placeholder="Semua Genre" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Semua Genre</SelectItem>
                  {genres.map((g) => (
                    <SelectItem key={g} value={g}>
                      {g}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex-1">
              <label className="text-sm font-medium mb-2 block">Rating Minimal</label>
              <Select value={selectedRating} onValueChange={setSelectedRating}>
                <SelectTrigger>
                  <SelectValue placeholder="Semua Rating" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Semua Rating</SelectItem>
                  <SelectItem value="9">9+ Luar Biasa</SelectItem>
                  <SelectItem value="8">8+ Sangat Bagus</SelectItem>
                  <SelectItem value="7">7+ Bagus</SelectItem>
                  <SelectItem value="6">6+ Cukup</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </Card>
      </div>

      <div>
        <p className="text-sm text-muted-foreground mb-4">Ditemukan {filteredMovies.length} film</p>
        {filteredMovies.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
            {filteredMovies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        ) : (
          <Card className="p-12 text-center">
            <p className="text-muted-foreground">Tidak ada film yang sesuai dengan pencarian Anda</p>
          </Card>
        )}
      </div>
    </div>
  )
}
