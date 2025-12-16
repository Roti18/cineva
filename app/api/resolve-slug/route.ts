import { NextResponse } from "next/server"
import { createSlug } from "@/lib/movies"

const TMDB_ACCESS_TOKEN = process.env.TMDB_ACCESS_TOKEN || ""
const TMDB_BASE_URL = "https://api.themoviedb.org/3"

export async function GET(request: Request) {
  try {
    if (!TMDB_ACCESS_TOKEN) {
      return NextResponse.json({ error: "TMDB Access Token not configured" }, { status: 500 })
    }

    const { searchParams } = new URL(request.url)
    const slug = searchParams.get("slug")

    if (!slug) {
      return NextResponse.json({ error: "Slug is required" }, { status: 400 })
    }

    // Convert slug back to search query
    const searchQuery = slug.replace(/-/g, " ")

    const headers = {
      Authorization: `Bearer ${TMDB_ACCESS_TOKEN}`,
      "Content-Type": "application/json;charset=utf-8",
    }

    // Search for the movie/TV show
    const searchResponse = await fetch(
      `${TMDB_BASE_URL}/search/multi?query=${encodeURIComponent(searchQuery)}&language=id-ID&page=1`,
      { headers },
    )

    if (!searchResponse.ok) {
      return NextResponse.json({ error: "Failed to search" }, { status: searchResponse.status })
    }

    const searchData = await searchResponse.json()
    const results = searchData.results || []

    // Find the best match by comparing slugs
    for (const result of results) {
      const title = result.title || result.name
      if (!title) continue

      const resultSlug = createSlug(title)
      if (resultSlug === slug) {
        return NextResponse.json({
          id: result.id,
          media_type: result.media_type || "movie",
          title: title,
        })
      }
    }

    // If no exact match, return the first result
    if (results.length > 0) {
      const firstResult = results[0]
      return NextResponse.json({
        id: firstResult.id,
        media_type: firstResult.media_type || "movie",
        title: firstResult.title || firstResult.name,
      })
    }

    return NextResponse.json({ error: "Content not found" }, { status: 404 })
  } catch (error) {
    console.error("Error resolving slug:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
