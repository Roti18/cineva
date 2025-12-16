"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Header } from "@/components/header";
import { MovieCard } from "@/components/movie-card";
import { CategoryFilter } from "@/components/category-filter";
import type { Movie } from "@/lib/movies";

type Mode = "explore" | "search" | "category";

export default function HomePage() {
  const [mode, setMode] = useState<Mode>("explore");
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [isFetchingMore, setIsFetchingMore] = useState(false);

  const observerTarget = useRef<HTMLDivElement>(null);

  const fetchMovies = useCallback(
    async (pageNum: number, append = false) => {
      try {
        if (append) {
          setIsFetchingMore(true);
        } else {
          setIsLoading(true);
        }
        setError(null);

        let url = "";

        if (mode === "explore") {
          url = `/api/movies?page=${pageNum}`;
        } else if (mode === "search") {
          if (!searchQuery.trim()) {
            setMovies([]);
            setIsLoading(false);
            return;
          }
          url = `/api/search?query=${encodeURIComponent(
            searchQuery
          )}&page=${pageNum}`;
        } else if (mode === "category") {
          const genreMap: Record<string, string> = {
            action: "28",
            comedy: "35",
            "action-comedy": "28,35",
            drama: "18",
            horror: "27",
          };
          const genreIds = selectedCategory ? genreMap[selectedCategory] : "";
          url = `/api/category?genres=${genreIds}&page=${pageNum}`;

          if (searchQuery.trim()) {
            url += `&query=${encodeURIComponent(searchQuery)}`;
          }
        }

        const response = await fetch(url);

        if (!response.ok) {
          throw new Error("Gagal mengambil data film");
        }

        const data = await response.json();

        if (!data.movies || data.movies.length === 0) {
          if (!append) {
            setError("Tidak ada film ditemukan");
          }
        }

        if (append) {
          setMovies((prev) => [...prev, ...(data.movies || [])]);
        } else {
          setMovies(data.movies || []);
        }

        setTotalPages(data.total_pages || 0);
      } catch (error) {
        console.error("Failed to fetch movies:", error);
        setError("Terjadi kesalahan saat memuat film. Silakan coba lagi.");
      } finally {
        setIsLoading(false);
        setIsFetchingMore(false);
      }
    },
    [mode, searchQuery, selectedCategory]
  );

  useEffect(() => {
    setPage(1);
    setMovies([]);
    fetchMovies(1, false);
  }, [mode, searchQuery, selectedCategory, fetchMovies]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (
          entries[0].isIntersecting &&
          !isFetchingMore &&
          !isLoading &&
          page < totalPages
        ) {
          const nextPage = page + 1;
          setPage(nextPage);
          fetchMovies(nextPage, true);
        }
      },
      { threshold: 0.1 }
    );

    const currentTarget = observerTarget.current;
    if (currentTarget) {
      observer.observe(currentTarget);
    }

    return () => {
      if (currentTarget) {
        observer.unobserve(currentTarget);
      }
    };
  }, [page, totalPages, isFetchingMore, isLoading, fetchMovies]);

  const handleSearch = useCallback(
    (query: string) => {
      setSearchQuery(query);
      if (query.trim()) {
        setMode("search");
      } else if (selectedCategory) {
        setMode("category");
      } else {
        setMode("explore");
      }
    },
    [selectedCategory]
  );

  const handleCategoryChange = useCallback(
    (category: string | null) => {
      setSelectedCategory(category);
      if (category) {
        setMode("category");
      } else if (searchQuery.trim()) {
        setMode("search");
      } else {
        setMode("explore");
      }
    },
    [searchQuery]
  );

  return (
    <div className="min-h-screen">
      <Header onSearch={handleSearch} />

      <main className="container mx-auto px-4 py-8">
        <CategoryFilter
          selectedCategory={selectedCategory}
          onCategoryChange={handleCategoryChange}
        />

        {error && (
          <div className="rounded-lg border border-destructive/50 bg-destructive/10 p-4 mb-6">
            <p className="text-sm text-destructive">{error}</p>
          </div>
        )}

        {isLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
            {Array.from({ length: 20 }).map((_, i) => (
              <div
                key={i}
                className="aspect-[2/3] bg-muted rounded-lg animate-pulse"
              />
            ))}
          </div>
        ) : (
          <>
            {(searchQuery || selectedCategory) && (
              <p className="text-muted-foreground mb-4">
                {movies.length} hasil
                {searchQuery && ` untuk "${searchQuery}"`}
                {selectedCategory && ` di kategori ${selectedCategory}`}
              </p>
            )}

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
              {movies.length > 0 ? (
                movies.map((movie, index) => (
                  <MovieCard key={`${movie.id}-${index}`} movie={movie} />
                ))
              ) : (
                <div className="col-span-full text-center py-12">
                  <p className="text-muted-foreground">
                    Tidak ada film ditemukan
                  </p>
                </div>
              )}
            </div>

            {isFetchingMore && (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6 mt-6">
                {Array.from({ length: 10 }).map((_, i) => (
                  <div
                    key={i}
                    className="aspect-[2/3] bg-muted rounded-lg animate-pulse"
                  />
                ))}
              </div>
            )}

            <div ref={observerTarget} className="h-10" />
          </>
        )}
      </main>
    </div>
  );
}
