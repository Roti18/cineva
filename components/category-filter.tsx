"use client"

import { Button } from "@/components/ui/button"

interface CategoryFilterProps {
  selectedCategory: string | null
  onCategoryChange: (category: string | null) => void
}

const categories = [
  { id: "popular", label: "Popular", value: null },
  { id: "action", label: "Action", value: "action" },
  { id: "comedy", label: "Comedy", value: "comedy" },
  { id: "action-comedy", label: "Action Comedy", value: "action-comedy" },
  { id: "drama", label: "Drama", value: "drama" },
  { id: "horror", label: "Horror", value: "horror" },
]

export function CategoryFilter({ selectedCategory, onCategoryChange }: CategoryFilterProps) {
  return (
    <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
      {categories.map((category) => (
        <Button
          key={category.id}
          variant={selectedCategory === category.value ? "default" : "outline"}
          size="sm"
          onClick={() => onCategoryChange(category.value)}
          className="shrink-0"
        >
          {category.label}
        </Button>
      ))}
    </div>
  )
}
