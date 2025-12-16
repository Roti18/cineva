import { NextResponse } from "next/server"
import { createSlug } from "@/lib/movies"

const TMDB_ACCESS_TOKEN = process.env.TMDB_ACCESS_TOKEN || ""
const TMDB_BASE_URL = "https://api.themoviedb.org/3"
const TMDB_IMAGE_BASE_URL = "https://image.tmdb.org/t/p"

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const { searchParams } = new URL(request.url)
    const mediaType = searchParams.get("media_type") || "movie"

    if (!TMDB_ACCESS_TOKEN) {
      return NextResponse.json({ error: "TMDB access token not configured" }, { status: 500 })
    }

    const headers = {
      Authorization: `Bearer ${TMDB_ACCESS_TOKEN}`,
      "Content-Type": "application/json",
    }

    const endpoint = mediaType === "tv" ? "tv" : "movie"
    const response = await fetch(`${TMDB_BASE_URL}/${endpoint}/${id}?language=id-ID`, { headers })

    if (!response.ok) {
      return NextResponse.json({ error: "Failed to fetch content details" }, { status: response.status })
    }

    const content = await response.json()
    const title = content.title || content.name
    const releaseDate = content.release_date || content.first_air_date

    const transformedContent = {
      id: content.id,
      title: title,
      slug: createSlug(title),
      poster: content.poster_path ? `${TMDB_IMAGE_BASE_URL}/w500${content.poster_path}` : null,
      backdrop: content.backdrop_path ? `${TMDB_IMAGE_BASE_URL}/original${content.backdrop_path}` : null,
      rating: content.vote_average ? Math.round(content.vote_average * 10) / 10 : 0,
      year: releaseDate?.split("-")[0] || "N/A",
      synopsis: content.overview || "Tidak ada sinopsis tersedia.",
      genres: content.genres?.map((g: any) => g.name) || [],
      duration: content.runtime
        ? `${content.runtime} menit`
        : content.episode_run_time?.[0]
          ? `${content.episode_run_time[0]} menit`
          : "N/A",
      media_type: mediaType,
      seasons: mediaType === "tv" ? content.seasons?.filter((s: any) => s.season_number > 0) || [] : undefined,
      number_of_seasons: content.number_of_seasons,
      number_of_episodes: content.number_of_episodes,
    }

    return NextResponse.json({ content: transformedContent })
  } catch (error) {
    console.error("Error fetching content details:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
