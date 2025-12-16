"use client"

import { Heart, Clock } from "lucide-react"
import { MovieCard } from "@/components/movie-card"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { getFavorites } from "@/lib/favorites"
import { getHistory } from "@/lib/history"
import { getMovieById } from "@/lib/movies"

export function UserProfile() {
  const favorites = getFavorites()
  const history = getHistory()

  const favoriteMovies = favorites.map((id) => getMovieById(id)).filter(Boolean)

  const historyMovies = history.map((id) => getMovieById(id)).filter(Boolean)

  return (
    <Tabs defaultValue="favorites" className="space-y-6">
      <TabsList className="grid w-full max-w-md grid-cols-2">
        <TabsTrigger value="favorites" className="gap-2">
          <Heart className="h-4 w-4" />
          Film Favorit
        </TabsTrigger>
        <TabsTrigger value="history" className="gap-2">
          <Clock className="h-4 w-4" />
          Riwayat
        </TabsTrigger>
      </TabsList>

      <TabsContent value="favorites" className="space-y-4">
        <h2 className="text-xl font-bold">Film Favorit ({favoriteMovies.length})</h2>
        {favoriteMovies.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
            {favoriteMovies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        ) : (
          <Card className="p-12 text-center">
            <p className="text-muted-foreground">Belum ada film favorit. Mulai tambahkan film favorit Anda!</p>
          </Card>
        )}
      </TabsContent>

      <TabsContent value="history" className="space-y-4">
        <h2 className="text-xl font-bold">Riwayat Tontonan ({historyMovies.length})</h2>
        {historyMovies.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
            {historyMovies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        ) : (
          <Card className="p-12 text-center">
            <p className="text-muted-foreground">Belum ada riwayat tontonan. Mulai tonton film favorit Anda!</p>
          </Card>
        )}
      </TabsContent>
    </Tabs>
  )
}
