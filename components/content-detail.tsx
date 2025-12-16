"use client"

import { useState, useEffect } from "react"
import { Star, Play, Calendar, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { MovieDetail, TVSeason, TVEpisode } from "@/lib/movies"

interface ContentDetailProps {
  content: MovieDetail & {
    seasons?: TVSeason[]
    number_of_seasons?: number
    number_of_episodes?: number
  }
}

export function ContentDetail({ content }: ContentDetailProps) {
  const [selectedSeason, setSelectedSeason] = useState<number | null>(null)
  const [episodes, setEpisodes] = useState<TVEpisode[]>([])
  const [isLoadingEpisodes, setIsLoadingEpisodes] = useState(false)

  const isTV = content.media_type === "tv"
  const hasSeasons = isTV && content.seasons && content.seasons.length > 0

  // Auto-select first season for TV shows
  useEffect(() => {
    if (hasSeasons && !selectedSeason) {
      setSelectedSeason(content.seasons![0].season_number)
    }
  }, [hasSeasons, selectedSeason, content.seasons])

  // Fetch episodes when season is selected
  useEffect(() => {
    if (!selectedSeason || !isTV) return

    const fetchEpisodes = async () => {
      setIsLoadingEpisodes(true)
      try {
        const response = await fetch(`/api/tv/${content.id}/season/${selectedSeason}`)
        if (response.ok) {
          const data = await response.json()
          setEpisodes(data.season.episodes || [])
        }
      } catch (error) {
        console.error("Error fetching episodes:", error)
      } finally {
        setIsLoadingEpisodes(false)
      }
    }

    fetchEpisodes()
  }, [selectedSeason, content.id, isTV])

  return (
    <div className="relative">
      {/* Backdrop */}
      {content.backdrop && (
        <div className="absolute inset-x-0 top-0 h-[60vh] overflow-hidden">
          <img src={content.backdrop || "/placeholder.svg"} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-background/20 via-background/60 to-background" />
        </div>
      )}

      {/* Content */}
      <div className="relative container mx-auto px-4 pt-24 pb-12">
        <div className="grid md:grid-cols-[300px_1fr] gap-8 mb-12">
          {/* Poster */}
          <div className="mx-auto md:mx-0">
            <img
              src={content.poster || "/placeholder.svg"}
              alt={content.title}
              className="w-full rounded-lg shadow-2xl"
            />
          </div>

          {/* Details */}
          <div className="space-y-6">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4 text-balance">{content.title}</h1>
              <div className="flex flex-wrap items-center gap-4 text-muted-foreground mb-4">
                <div className="flex items-center gap-2">
                  <Star className="h-5 w-5 fill-yellow-500 text-yellow-500" />
                  <span className="text-lg font-semibold">{content.rating.toFixed(1)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  <span>{content.year}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  <span>{content.duration}</span>
                </div>
              </div>
              <div className="flex flex-wrap gap-2 mb-6">
                {content.genres.map((genre) => (
                  <span key={genre} className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
                    {genre}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-3">Sinopsis</h2>
              <p className="text-muted-foreground leading-relaxed text-pretty">{content.synopsis}</p>
            </div>

            {isTV && (
              <div>
                <p className="text-muted-foreground">
                  {content.number_of_seasons} Season • {content.number_of_episodes} Episode
                </p>
              </div>
            )}

            <Button size="lg" className="w-full md:w-auto">
              <Play className="mr-2 h-5 w-5" />
              Tonton Sekarang
            </Button>
          </div>
        </div>

        {/* TV Series: Season & Episodes */}
        {hasSeasons && (
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <h2 className="text-2xl font-bold">Episode</h2>
              <Select value={selectedSeason?.toString()} onValueChange={(val) => setSelectedSeason(Number(val))}>
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="Pilih Season" />
                </SelectTrigger>
                <SelectContent>
                  {content.seasons!.map((season) => (
                    <SelectItem key={season.season_number} value={season.season_number.toString()}>
                      {season.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {isLoadingEpisodes ? (
              <div className="grid gap-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className="h-32 bg-muted rounded-lg animate-pulse" />
                ))}
              </div>
            ) : (
              <div className="grid gap-4">
                {episodes.map((episode) => (
                  <Card key={episode.id} className="p-4 hover:bg-accent/5 transition-colors cursor-pointer">
                    <div className="flex gap-4">
                      {episode.still_path && (
                        <div className="w-40 h-24 rounded overflow-hidden flex-shrink-0 bg-muted">
                          <img
                            src={episode.still_path || "/placeholder.svg"}
                            alt={episode.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <h3 className="font-semibold">
                            {episode.episode_number}. {episode.name}
                          </h3>
                          {episode.runtime && (
                            <span className="text-sm text-muted-foreground whitespace-nowrap">{episode.runtime}m</span>
                          )}
                        </div>
                        {episode.overview && (
                          <p className="text-sm text-muted-foreground line-clamp-2">{episode.overview}</p>
                        )}
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
