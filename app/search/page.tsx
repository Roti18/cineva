import { Header } from "@/components/header"
import { SearchResults } from "@/components/search-results"

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; genre?: string; rating?: string }>
}) {
  const params = await searchParams
  const query = params.q || ""
  const genre = params.genre || ""
  const rating = params.rating || ""

  return (
    <main className="min-h-screen">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <SearchResults query={query} genre={genre} rating={rating} />
      </div>
    </main>
  )
}
