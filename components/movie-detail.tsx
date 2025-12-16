"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Star, Clock, Heart, Play } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { toggleFavorite, isFavorite } from "@/lib/favorites"

interface Movie {
  id: number
  title: string
  poster: string | null
  backdrop: string | null
  rating: number
  year: string | number
  synopsis: string
  genres: string[]
  duration: string
}

interface MovieDetailProps {
  movie: Movie
}

export function MovieDetail({ movie }: MovieDetailProps) {
  const router = useRouter()
  const [favorite, setFavorite] = useState(isFavorite(String(movie.id)))

  const handleToggleFavorite = () => {
    toggleFavorite(String(movie.id))
    setFavorite(!favorite)
  }

  return (
    <div className="relative">
      {/* Hero Section */}
      <div className="relative h-[60vh] md:h-[70vh] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={movie.backdrop || movie.poster || "/placeholder.svg?height=1080&width=1920"}
            alt={movie.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 -mt-32 relative z-10">
        <div className="grid md:grid-cols-[300px_1fr] gap-8">
          {/* Poster */}
          <Card className="overflow-hidden border-2 shadow-xl hidden md:block">
            <img
              src={movie.poster || "/placeholder.svg?height=450&width=300"}
              alt={movie.title}
              className="w-full h-auto"
            />
          </Card>

          {/* Details */}
          <div className="space-y-6">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl font-bold text-balance">{movie.title}</h1>

              <div className="flex flex-wrap items-center gap-4 text-sm">
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                  <span className="font-bold">{movie.rating}</span>
                  <span className="text-muted-foreground">/10</span>
                </div>
                <div className="flex items-center gap-1 text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  <span>{movie.duration}</span>
                </div>
                <span className="text-muted-foreground">{movie.year}</span>
              </div>

              <div className="flex flex-wrap gap-2">
                {movie.genres.map((genre) => (
                  <Badge key={genre} variant="secondary">
                    {genre}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="flex gap-3">
              <Button size="lg" className="gap-2" onClick={() => router.push(`/player/${movie.id}`)}>
                <Play className="h-5 w-5" />
                Tonton Sekarang
              </Button>
              <Button
                size="lg"
                variant={favorite ? "default" : "outline"}
                className="gap-2"
                onClick={handleToggleFavorite}
              >
                <Heart className={`h-5 w-5 ${favorite ? "fill-current" : ""}`} />
                {favorite ? "Tersimpan" : "Favorit"}
              </Button>
            </div>

            <Card className="p-6 space-y-3">
              <h2 className="text-xl font-bold">Sinopsis</h2>
              <p className="text-muted-foreground leading-relaxed text-pretty">{movie.synopsis}</p>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
