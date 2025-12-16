import { Header } from "@/components/header"
import { ContentDetail } from "@/components/content-detail"
import { notFound } from "next/navigation"

async function getContentBySlug(slug: string, id?: string, type?: string) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || (typeof window === "undefined" ? "http://localhost:3000" : "")

    // If ID is provided, fetch directly
    if (id && type) {
      const url = baseUrl ? `${baseUrl}/api/content/${id}?media_type=${type}` : `/api/content/${id}?media_type=${type}`

      const response = await fetch(url, { cache: "no-store" })

      if (!response.ok) {
        return null
      }

      const data = await response.json()
      return data.content
    }

    // Otherwise, resolve slug to ID first
    const resolveUrl = baseUrl ? `${baseUrl}/api/resolve-slug?slug=${slug}` : `/api/resolve-slug?slug=${slug}`

    const resolveResponse = await fetch(resolveUrl, { cache: "no-store" })

    if (!resolveResponse.ok) {
      return null
    }

    const { id: resolvedId, media_type } = await resolveResponse.json()

    const contentUrl = baseUrl
      ? `${baseUrl}/api/content/${resolvedId}?media_type=${media_type}`
      : `/api/content/${resolvedId}?media_type=${media_type}`

    const contentResponse = await fetch(contentUrl, { cache: "no-store" })

    if (!contentResponse.ok) {
      return null
    }

    const data = await contentResponse.json()
    return data.content
  } catch (error) {
    console.error("Error fetching content:", error)
    return null
  }
}

export default async function ContentPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ id?: string; type?: string }>
}) {
  const { slug } = await params
  const { id, type } = await searchParams
  const content = await getContentBySlug(slug, id, type)

  if (!content) {
    notFound()
  }

  return (
    <main className="min-h-screen">
      <Header />
      <ContentDetail content={content} />
    </main>
  )
}
