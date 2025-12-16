import { NextResponse } from "next/server"

const TMDB_ACCESS_TOKEN = process.env.TMDB_ACCESS_TOKEN || ""
const TMDB_BASE_URL = "https://api.themoviedb.org/3"
const TMDB_IMAGE_BASE_URL = "https://image.tmdb.org/t/p"

export async function GET(request: Request, { params }: { params: Promise<{ id: string; season_number: string }> }) {
  try {
    const { id, season_number } = await params

    if (!TMDB_ACCESS_TOKEN) {
      return NextResponse.json({ error: "TMDB access token not configured" }, { status: 500 })
    }

    const headers = {
      Authorization: `Bearer ${TMDB_ACCESS_TOKEN}`,
      "Content-Type": "application/json",
    }

    const response = await fetch(`${TMDB_BASE_URL}/tv/${id}/season/${season_number}?language=id-ID`, { headers })

    if (!response.ok) {
      return NextResponse.json({ error: "Failed to fetch season details" }, { status: response.status })
    }

    const season = await response.json()

    const transformedSeason = {
      season_number: season.season_number,
      name: season.name,
      overview: season.overview,
      air_date: season.air_date,
      episodes:
        season.episodes?.map((ep: any) => ({
          id: ep.id,
          episode_number: ep.episode_number,
          name: ep.name,
          overview: ep.overview,
          runtime: ep.runtime,
          still_path: ep.still_path ? `${TMDB_IMAGE_BASE_URL}/w500${ep.still_path}` : null,
          air_date: ep.air_date,
        })) || [],
    }

    return NextResponse.json({ season: transformedSeason })
  } catch (error) {
    console.error("Error fetching season details:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
