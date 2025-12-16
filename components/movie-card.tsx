"use client"

import { Star } from "lucide-react"
import Link from "next/link"
import { Card } from "@/components/ui/card"
import { createSlug } from "@/lib/movies"

interface Movie {
  id: number
  title: string
  poster: string
  rating: number
  year: number
  media_type?: "movie" | "tv"
}

interface MovieCardProps {
  movie: Movie
}

export function MovieCard({ movie }: MovieCardProps) {
  const slug = createSlug(movie.title)
  const mediaType = movie.media_type || "movie"

  return (
    <Link href={`/movies/${slug}?id=${movie.id}&type=${mediaType}`}>
      <Card className="group overflow-hidden border-0 bg-card transition-all hover:scale-105 hover:shadow-lg cursor-pointer">
        <div className="aspect-[2/3] relative overflow-hidden rounded-lg bg-muted">
          <img
            src={movie.poster || "/placeholder.svg"}
            alt={movie.title}
            className="h-full w-full object-cover transition-transform group-hover:scale-110"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
        <div className="p-3 space-y-1">
          <h3 className="font-semibold text-sm line-clamp-1">{movie.title}</h3>
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <Star className="h-3 w-3 fill-yellow-500 text-yellow-500" />
              <span className="font-medium">{movie.rating.toFixed(1)}</span>
            </div>
            <span>{movie.year}</span>
          </div>
        </div>
      </Card>
    </Link>
  )
}
