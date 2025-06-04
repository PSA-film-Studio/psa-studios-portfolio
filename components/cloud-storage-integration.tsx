"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { CloudIcon, Search, Check } from "lucide-react"
import Image from "next/image"

interface CloudStorageIntegrationProps {
  onMediaSelected: (url: string, type: "image" | "video") => void
}

export function CloudStorageIntegration({ onMediaSelected }: CloudStorageIntegrationProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [isSearching, setIsSearching] = useState(false)
  const [searchResults, setSearchResults] = useState<
    Array<{
      id: string
      url: string
      thumbnail: string
      title: string
      type: "image" | "video"
    }>
  >([])

  // This is a mock function - in a real app, you would connect to your cloud storage API
  const handleSearch = () => {
    if (!searchQuery.trim()) return

    setIsSearching(true)

    // Simulate API call with timeout
    setTimeout(() => {
      // Mock results - in a real app, these would come from your cloud storage
      const mockResults = [
        {
          id: "1",
          url: "https://images.unspl ash.com/photo-1518709268805-4e9042af2176",
          thumbnail: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=300",
          title: "Professional Portrait",
          type: "image" as const,
        },
        {
          id: "2",
          url: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d",
          thumbnail: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=300",
          title: "Video Production",
          type: "video" as const,
        },
        {
          id: "3",
          url: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4",
          thumbnail: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=300",
          title: "Creative Shot",
          type: "image" as const,
        },
      ].filter((item) => item.title.toLowerCase().includes(searchQuery.toLowerCase()))

      setSearchResults(mockResults)
      setIsSearching(false)
    }, 1000)
  }

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <Input
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search your cloud storage..."
          className="bg-white/10 border-white/20 text-white flex-1"
          onKeyPress={(e) => e.key === "Enter" && handleSearch()}
        />
        <Button onClick={handleSearch} disabled={isSearching} className="bg-white text-black hover:bg-white/90">
          {isSearching ? (
            <div className="w-4 h-4 border-2 border-black/20 border-t-black rounded-full animate-spin" />
          ) : (
            <Search className="w-4 h-4" />
          )}
        </Button>
      </div>

      {searchResults.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 max-h-60 overflow-y-auto">
          {searchResults.map((item) => (
            <div
              key={item.id}
              className="relative group cursor-pointer border border-white/20 rounded-lg overflow-hidden hover:border-white/40 transition-colors"
              onClick={() => onMediaSelected(item.url, item.type)}
            >
              <div className="aspect-video relative">
                <Image src={item.thumbnail || "/placeholder.svg"} alt={item.title} fill className="object-cover" />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                  <Check className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </div>
              <div className="p-2">
                <p className="text-xs text-white/80 truncate">{item.title}</p>
                <p className="text-xs text-white/60">{item.type}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {searchQuery && searchResults.length === 0 && !isSearching && (
        <div className="text-center py-8 text-white/60">
          <CloudIcon className="w-8 h-8 mx-auto mb-2" />
          <p>No results found for "{searchQuery}"</p>
        </div>
      )}

      <div className="text-xs text-white/60 bg-white/5 p-3 rounded-lg">
        <p className="font-medium mb-1">💡 Cloud Storage Integration</p>
        <p>This is a demo interface. To connect real cloud storage:</p>
        <ul className="list-disc list-inside mt-1 space-y-1">
          <li>Add your cloud storage API keys to environment variables</li>
          <li>Implement the actual search API calls</li>
          <li>Configure authentication for your storage provider</li>
        </ul>
      </div>
    </div>
  )
}
