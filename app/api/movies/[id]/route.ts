import { NextResponse } from "next/server"

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const token = process.env.TMDB_ACCESS_TOKEN

    if (!token) {
      return NextResponse.json(
        {
          error: "TMDB access token not configured",
        },
        { status: 500 },
      )
    }

    const response = await fetch(`https://api.themoviedb.org/3/movie/${id}?language=id-ID`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })

    if (!response.ok) {
      const errorBody = await response.text()
      console.error("TMDB API request failed:", errorBody)
      return NextResponse.json(
        {
          error: "Failed to fetch movie details",
        },
        { status: response.status },
      )
    }

    const movie = await response.json()

    const transformedMovie = {
      id: movie.id,
      title: movie.title,
      poster: movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : null,
      backdrop: movie.backdrop_path ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}` : null,
      rating: movie.vote_average ? Math.round(movie.vote_average * 10) / 10 : 0,
      year: movie.release_date?.split("-")[0] || "N/A",
      synopsis: movie.overview || "Tidak ada sinopsis tersedia.",
      genres: movie.genres?.map((g: any) => g.name) || [],
      duration: movie.runtime ? `${movie.runtime} menit` : "N/A",
    }

    return NextResponse.json({ movie: transformedMovie })
  } catch (error) {
    console.error("Error fetching movie details:", error)
    return NextResponse.json(
      {
        error: "Internal server error",
      },
      { status: 500 },
    )
  }
}
