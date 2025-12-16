import { VideoPlayer } from "@/components/video-player"
import { notFound } from "next/navigation"

async function getMovieById(id: string) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || (typeof window === "undefined" ? "http://localhost:3000" : "")
    const url = baseUrl ? `${baseUrl}/api/movies/${id}` : `/api/movies/${id}`

    const response = await fetch(url, {
      cache: "no-store",
    })

    if (!response.ok) {
      return null
    }

    const data = await response.json()
    return data.movie
  } catch (error) {
    console.error("Error fetching movie:", error)
    return null
  }
}

export default async function PlayerPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const movie = await getMovieById(id)

  if (!movie) {
    notFound()
  }

  return (
    <main className="min-h-screen bg-black">
      <VideoPlayer movie={movie} />
    </main>
  )
}
