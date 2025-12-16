"use client"

import { MovieCard } from "@/components/movie-card"
import { getMoviesBySection } from "@/lib/movies"

interface MovieGridProps {
  section: "trending" | "popular" | "new"
  title: string
}

export function MovieGrid({ section, title }: MovieGridProps) {
  const movies = getMoviesBySection(section)

  return (
    <section className="space-y-4">
      <h2 className="text-2xl font-bold">{title}</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </section>
  )
}
