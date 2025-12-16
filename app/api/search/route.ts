import { NextResponse } from "next/server"

const TMDB_ACCESS_TOKEN = process.env.TMDB_ACCESS_TOKEN || ""
const TMDB_BASE_URL = "https://api.themoviedb.org/3"
const TMDB_IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500"

interface TMDBMovie {
  id: number
  title: string
  poster_path: string | null
  vote_average: number
  release_date: string
}

interface TMDBResponse {
  results: TMDBMovie[]
  page: number
  total_pages: number
  total_results: number
}

export async function GET(request: Request) {
  try {
    if (!TMDB_ACCESS_TOKEN) {
      return NextResponse.json(
        {
          movies: [],
          page: 1,
          total_pages: 0,
          error: "TMDB Access Token not configured",
        },
        { status: 500 },
      )
    }

    const { searchParams } = new URL(request.url)
    const query = searchParams.get("query") || ""
    const page = Number.parseInt(searchParams.get("page") || "1")

    if (!query.trim()) {
      return NextResponse.json({
        movies: [],
        page: 1,
        total_pages: 0,
      })
    }

    const headers = {
      Authorization: `Bearer ${TMDB_ACCESS_TOKEN}`,
      "Content-Type": "application/json;charset=utf-8",
    }

    const response = await fetch(
      `${TMDB_BASE_URL}/search/movie?query=${encodeURIComponent(query)}&language=id-ID&page=${page}`,
      { headers },
    )

    if (!response.ok) {
      const errorBody = await response.text()
      console.error("TMDB search API request failed:", errorBody)
      return NextResponse.json(
        {
          movies: [],
          page: 1,
          total_pages: 0,
          error: "Failed to search movies",
        },
        { status: response.status },
      )
    }

    const data: TMDBResponse = await response.json()

    const movies = (data.results || [])
      .filter((movie) => movie.poster_path)
      .map((movie) => ({
        id: movie.id,
        title: movie.title,
        poster: `${TMDB_IMAGE_BASE_URL}${movie.poster_path}`,
        rating: Math.round(movie.vote_average * 10) / 10,
        year: movie.release_date ? new Date(movie.release_date).getFullYear() : 0,
      }))

    return NextResponse.json({
      movies,
      page: data.page,
      total_pages: data.total_pages,
    })
  } catch (error) {
    console.error("Error searching movies:", error)
    return NextResponse.json(
      {
        movies: [],
        page: 1,
        total_pages: 0,
        error: "Internal server error",
      },
      { status: 500 },
    )
  }
}
