export interface Movie {
  id: number
  title: string
  poster: string
  backdrop?: string
  rating: number
  year: number
  duration?: string
  genres?: string[]
  synopsis?: string
  media_type?: "movie" | "tv"
  slug?: string
}

export interface MovieDetail extends Movie {
  backdrop: string
  duration: string
  genres: string[]
  synopsis: string
  media_type: "movie" | "tv"
  slug: string
}

export interface TVSeason {
  season_number: number
  name: string
  episode_count: number
  air_date: string | null
}

export interface TVEpisode {
  id: number
  episode_number: number
  name: string
  overview: string
  runtime: number | null
  still_path: string | null
  air_date: string | null
}

export function createSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
}

// These are not used in the main app flow but are imported by unused components
export function getAllMovies(): Movie[] {
  console.warn("getAllMovies() is deprecated. Use the /api/movies endpoint instead.")
  return []
}

export function getMoviesBySection(section: "trending" | "popular" | "new"): Movie[] {
  console.warn("getMoviesBySection() is deprecated. Use the /api/movies endpoint instead.")
  return []
}

export function getMovieById(id: string): Movie | undefined {
  console.warn("getMovieById() is deprecated. Use the /api/movies/[id] endpoint instead.")
  return undefined
}
