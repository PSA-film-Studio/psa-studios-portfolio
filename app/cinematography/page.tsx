"use client"

import { motion } from "framer-motion"
import Navigation from "@/components/navigation"
import Image from "next/image"
import { useInView } from "framer-motion"
import { useRef, useState, useEffect } from "react"
import { X, ChevronLeft, ChevronRight, ExternalLink } from "lucide-react"
import { sendToWhatsApp } from "@/lib/whatsapp"

interface MediaItem {
  id: string
  type: "image" | "video" | "external-link"
  title: string
  description: string
  src: string
  thumbnail?: string
  category: "cinematography" | "video-editing" | "social-media"
  layout: {
    colSpan: string
    rowSpan: string
    aspectRatio: string
  }
  isExternal?: boolean
  externalUrl?: string
  sourceType?: "file" | "url"
}

export default function CinematographyPage() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null)
  const [galleryItems, setGalleryItems] = useState<MediaItem[]>([])
  const [isLoading, setIsLoading] = useState(true)

  // Load gallery items from localStorage
  useEffect(() => {
    const loadMediaItems = () => {
      try {
        const savedMedia = localStorage.getItem("psaStudiosMedia")
        console.log("🔍 Raw localStorage data:", savedMedia)

        if (savedMedia) {
          const allMedia = JSON.parse(savedMedia)
          console.log("📦 Parsed media items:", allMedia)
          console.log("📊 Total items found:", allMedia.length)

          // Log each item to see what we're working with
          allMedia.forEach((item: any, index: number) => {
            console.log(`📋 Item ${index + 1}:`, {
              id: item.id,
              title: item.title,
              category: item.category,
              type: item.type,
              src: item.src?.substring(0, 100) + "...",
            })
          })

          const cinematographyItems = allMedia.filter((item: any) => {
            const isMatch = item.category === "cinematography"
            console.log(`🎬 Item "${item.title}" - Category: "${item.category}" - Match: ${isMatch}`)
            return isMatch
          })

          console.log("🎯 Cinematography items found:", cinematographyItems.length)
          console.log("🎯 Cinematography items:", cinematographyItems)

          // Ensure all items have proper structure
          const itemsWithLayout = cinematographyItems.map((item: any, index: number) => {
            const processedItem = {
              ...item,
              layout: item.layout || {
                colSpan: "md:col-span-1",
                rowSpan: "md:row-span-1",
                aspectRatio: item.type === "video" ? "aspect-video" : "aspect-square",
              },
            }
            console.log(`✅ Processed item ${index + 1}:`, processedItem)
            return processedItem
          })

          setGalleryItems(itemsWithLayout)
          console.log("🎉 Gallery items set:", itemsWithLayout.length)
        } else {
          console.log("❌ No saved media found, using defaults")
          // Default items if no saved data
          const defaultItems = [
            {
              id: "default-1",
              type: "image",
              title: "Cinematic Portrait",
              description: "Dramatic lighting cinematography",
              src: "/placeholder.svg?height=400&width=600",
              category: "cinematography",
              layout: { colSpan: "md:col-span-2", rowSpan: "md:row-span-2", aspectRatio: "aspect-[16/10]" },
            },
            {
              id: "default-2",
              type: "image",
              title: "Moody Interior",
              description: "Atmospheric interior shot",
              src: "/placeholder.svg?height=400&width=600",
              category: "cinematography",
              layout: { colSpan: "md:col-span-1", rowSpan: "md:row-span-1", aspectRatio: "aspect-square" },
            },
          ]
          setGalleryItems(defaultItems)
          console.log("🔄 Set default items:", defaultItems.length)
        }
      } catch (error) {
        console.error("💥 Error loading media:", error)
        setGalleryItems([])
      } finally {
        setIsLoading(false)
        console.log("⏰ Loading complete")
      }
    }

    // Load immediately
    loadMediaItems()

    // Listen for storage changes (when admin panel updates data)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "psaStudiosMedia") {
        console.log("Storage changed, reloading media")
        loadMediaItems()
      }
    }

    // Listen for custom events (for same-tab updates)
    const handleCustomStorageChange = () => {
      console.log("Custom storage event, reloading media")
      loadMediaItems()
    }

    window.addEventListener("storage", handleStorageChange)
    window.addEventListener("localStorageUpdate", handleCustomStorageChange)

    return () => {
      window.removeEventListener("storage", handleStorageChange)
      window.removeEventListener("localStorageUpdate", handleCustomStorageChange)
    }
  }, [])

  // Filter only images for lightbox navigation
  const imageItems = galleryItems.filter((item) => item.type === "image")

  const handleImageClick = (index: number) => {
    const item = galleryItems[index]
    if ((item.type === "external-link" || item.type === "video") && item.externalUrl) {
      window.open(item.externalUrl, "_blank")
    } else if (item.type === "image") {
      const imageIndex = imageItems.findIndex((imgItem) => imgItem.id === item.id)
      setSelectedImageIndex(imageIndex)
    }
  }

  const closeLightbox = () => {
    setSelectedImageIndex(null)
  }

  const goToPrevious = () => {
    if (selectedImageIndex !== null) {
      setSelectedImageIndex(selectedImageIndex > 0 ? selectedImageIndex - 1 : imageItems.length - 1)
    }
  }

  const goToNext = () => {
    if (selectedImageIndex !== null) {
      setSelectedImageIndex(selectedImageIndex < imageItems.length - 1 ? selectedImageIndex + 1 : 0)
    }
  }

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedImageIndex !== null) {
        if (e.key === "ArrowLeft") {
          goToPrevious()
        } else if (e.key === "ArrowRight") {
          goToNext()
        } else if (e.key === "Escape") {
          closeLightbox()
        }
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [selectedImageIndex])

  if (isLoading) {
    return (
      <div className="min-h-screen text-[#FFFFFF] flex items-center justify-center" style={{ background: "#000000" }}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p>Loading gallery...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen text-[#FFFFFF]" style={{ background: "#000000" }}>
      <Navigation />

      <main className="pt-24 pb-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 px-6"
        >
          <h1 className="text-4xl md:text-6xl font-black text-[#FFFFFF] mb-6 tracking-tight">CINEMATOGRAPHY</h1>
          <p className="text-lg text-[#C0C0C0] max-w-2xl mx-auto font-serif font-medium leading-relaxed">
            Capturing moments through the lens of creativity and technical excellence. Our cinematography brings stories
            to life with stunning visuals.
          </p>
        </motion.div>

        {/* Enhanced Debug Info */}
        <div className="max-w-7xl mx-auto px-6 mb-8">
          <div className="bg-white/5 p-4 rounded-lg text-sm text-white/70 space-y-2">
            <p>🎬 Gallery Items: {galleryItems.length} | Cinematography items loaded from localStorage</p>
            <p>
              📊 Raw localStorage check: {localStorage.getItem("psaStudiosMedia") ? "✅ Data exists" : "❌ No data"}
            </p>
            {galleryItems.length > 0 && (
              <div className="mt-2 space-y-1">
                <p>📋 Items: {galleryItems.map((item) => item.title).join(", ")}</p>
                <div className="space-y-1">
                  {galleryItems.map((item, i) => (
                    <p key={i} className="text-xs">
                      🖼️ {i + 1}. "{item.title}" - {item.type} - {item.src.substring(0, 80)}...
                    </p>
                  ))}
                </div>
              </div>
            )}
            {galleryItems.length === 0 && (
              <p className="text-yellow-400">⚠️ No items found - check console for debugging info</p>
            )}
          </div>
        </div>

        {/* Gallery Grid */}
        <div ref={ref} className="max-w-7xl mx-auto px-6">
          {galleryItems.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 auto-rows-[200px] gap-4 md:gap-6">
              {galleryItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 40 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className={`group relative overflow-hidden rounded-lg ${
                    index % 5 === 0
                      ? "md:col-span-2 lg:col-span-3 md:row-span-2"
                      : index % 3 === 0
                        ? "md:col-span-2 lg:col-span-2"
                        : "md:col-span-1 lg:col-span-1"
                  }`}
                >
                  {item.type === "image" ? (
                    <div
                      className="relative w-full h-full min-h-[200px] overflow-hidden bg-[#C0C0C0]/10 border border-[#C0C0C0]/30 shadow-lg cursor-pointer"
                      onClick={() => handleImageClick(index)}
                    >
                      <Image
                        src={item.src || "/placeholder.svg?height=400&width=600"}
                        alt={item.description}
                        fill
                        className="object-cover transition-all duration-700 group-hover:scale-105 group-hover:brightness-110"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        priority={index < 4}
                        onLoad={() => console.log("Image loaded successfully:", item.src)}
                        onError={(e) => {
                          console.error("Image failed to load:", item.src)
                          const target = e.target as HTMLImageElement
                          target.src = "/placeholder.svg?height=400&width=600"
                        }}
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-700" />
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="bg-[#FFFFFF]/90 text-[#000000] px-4 py-2 rounded-full text-sm font-medium">
                          Click to view
                        </div>
                      </div>
                    </div>
                  ) : item.type === "video" ? (
                    <div
                      className={`relative ${item.layout?.aspectRatio || "aspect-video"} overflow-hidden bg-[#C0C0C0]/10 border border-[#C0C0C0]/30 shadow-lg`}
                    >
                      <video
                        poster={item.thumbnail}
                        controls
                        className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
                        preload="metadata"
                      >
                        <source src={item.src} type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-700 pointer-events-none" />
                    </div>
                  ) : (
                    <div
                      className={`relative ${item.layout?.aspectRatio || "aspect-video"} overflow-hidden bg-[#C0C0C0]/10 border border-[#C0C0C0]/30 shadow-lg cursor-pointer`}
                      onClick={() => handleImageClick(index)}
                    >
                      <Image
                        src={item.thumbnail || "/placeholder.svg"}
                        alt={item.description}
                        fill
                        className="object-cover transition-all duration-700 group-hover:scale-105 group-hover:brightness-110"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-700" />
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="bg-[#FFFFFF]/90 text-[#000000] px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2">
                          <ExternalLink className="w-4 h-4" />
                          Open Link
                        </div>
                      </div>
                      <div className="absolute top-4 right-4">
                        <ExternalLink className="w-5 h-5 text-white/80" />
                      </div>
                    </div>
                  )}

                  {/* Item Info Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <h3 className="text-white font-bold text-sm mb-1">{item.title}</h3>
                    <p className="text-white/80 text-xs">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-white/60">
              <p className="text-lg mb-4">No cinematography items found.</p>
              <p className="text-sm">Add some media items from the admin panel to see them here.</p>
            </div>
          )}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mt-24 px-6"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-[#FFFFFF] mb-6">Ready to bring your vision to life?</h2>
          <p className="text-[#C0C0C0] mb-8 max-w-xl mx-auto font-serif font-medium">
            Let's collaborate to create stunning cinematography that tells your story with impact and artistry.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() =>
              sendToWhatsApp("Hi! I'm interested in your cinematography services. I'd like to discuss my project.")
            }
            className="bg-[#C0C0C0] text-[#000000] px-8 py-3 rounded-full font-bold hover:bg-[#FFFFFF] transition-colors duration-200 shadow-lg"
          >
            Start Your Project
          </motion.button>
        </motion.div>
      </main>

      {/* Lightbox Modal with Navigation */}
      {selectedImageIndex !== null && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4"
          onClick={closeLightbox}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="relative max-w-4xl max-h-[90vh] w-full h-full"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={imageItems[selectedImageIndex]?.src || "/placeholder.svg"}
              alt={imageItems[selectedImageIndex]?.description || "Cinematography image"}
              fill
              className="object-contain"
            />

            {/* Close Button */}
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 bg-[#FFFFFF]/20 hover:bg-[#FFFFFF]/30 text-[#FFFFFF] p-2 rounded-full transition-colors duration-200 z-10"
            >
              <X size={24} />
            </button>

            {/* Previous Button */}
            {imageItems.length > 1 && (
              <button
                onClick={goToPrevious}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-[#FFFFFF]/20 hover:bg-[#FFFFFF]/30 text-[#FFFFFF] p-3 rounded-full transition-colors duration-200 z-10"
              >
                <ChevronLeft size={28} />
              </button>
            )}

            {/* Next Button */}
            {imageItems.length > 1 && (
              <button
                onClick={goToNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-[#FFFFFF]/20 hover:bg-[#FFFFFF]/30 text-[#FFFFFF] p-3 rounded-full transition-colors duration-200 z-10"
              >
                <ChevronRight size={28} />
              </button>
            )}

            {/* Image Counter */}
            {imageItems.length > 1 && (
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-[#FFFFFF]/20 text-[#FFFFFF] px-4 py-2 rounded-full text-sm">
                {selectedImageIndex + 1} of {imageItems.length}
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </div>
  )
}
