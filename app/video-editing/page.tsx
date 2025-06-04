"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"

interface MediaItem {
  id: string
  type: string
  title: string
  description: string
  src: string
  thumbnail: string
  category: string
  layout?: {
    colSpan: string
    rowSpan: string
    aspectRatio: string
  }
}

const VideoEditingPage = () => {
  const [galleryItems, setGalleryItems] = useState<MediaItem[]>([])
  const { ref, inView: isInView } = useInView({
    threshold: 0.2,
    triggerOnce: true,
  })

  useEffect(() => {
    const savedMedia = localStorage.getItem("psaStudiosMedia")
    if (savedMedia) {
      try {
        const allMedia = JSON.parse(savedMedia)
        const videoEditingItems = allMedia.filter((item: MediaItem) => item.category === "video-editing")
        setGalleryItems(videoEditingItems)
      } catch (error) {
        console.error("Error loading media:", error)
        // Fallback to default items
        setGalleryItems([
          {
            id: "1",
            type: "video",
            title: "Commercial Edit",
            description: "Professional commercial video editing",
            src: "/placeholder.svg?height=400&width=600",
            thumbnail: "/placeholder.svg?height=400&width=600",
            category: "video-editing",
            layout: { colSpan: "md:col-span-2", rowSpan: "md:row-span-2", aspectRatio: "aspect-video" },
          },
          {
            id: "2",
            type: "image",
            title: "Edit Timeline",
            description: "Behind the scenes editing process",
            src: "/placeholder.svg?height=400&width=600",
            category: "video-editing",
            layout: { colSpan: "md:col-span-1", rowSpan: "md:row-span-1", aspectRatio: "aspect-square" },
          },
        ])
      }
    } else {
      // Default items if no saved data
      setGalleryItems([
        {
          id: "1",
          type: "video",
          title: "Commercial Edit",
          description: "Professional commercial video editing",
          src: "/placeholder.svg?height=400&width=600",
          thumbnail: "/placeholder.svg?height=400&width=600",
          category: "video-editing",
          layout: { colSpan: "md:col-span-2", rowSpan: "md:row-span-2", aspectRatio: "aspect-video" },
        },
        {
          id: "2",
          type: "image",
          title: "Edit Timeline",
          description: "Behind the scenes editing process",
          src: "/placeholder.svg?height=400&width=600",
          category: "video-editing",
          layout: { colSpan: "md:col-span-1", rowSpan: "md:row-span-1", aspectRatio: "aspect-square" },
        },
      ])
    }

    // Add event listener for storage changes
    const handleStorageChange = () => {
      const savedMedia = localStorage.getItem("psaStudiosMedia")
      if (savedMedia) {
        try {
          const allMedia = JSON.parse(savedMedia)
          const videoEditingItems = allMedia.filter((item: MediaItem) => item.category === "video-editing")
          setGalleryItems(videoEditingItems)
        } catch (error) {
          console.error("Error loading updated media:", error)
        }
      }
    }

    window.addEventListener("storage", handleStorageChange)

    return () => {
      window.removeEventListener("storage", handleStorageChange)
    }
  }, [])

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-semibold text-gray-800 mb-8 text-center">Video Editing</h2>
        <div ref={ref} className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {galleryItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`group relative overflow-hidden rounded-lg ${item.layout?.colSpan || "md:col-span-1"} ${item.layout?.rowSpan || "md:row-span-1"}`}
            >
              <img
                src={item.src || "/placeholder.svg"}
                alt={item.title}
                className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="text-center">
                  <h3 className="text-lg font-semibold text-white">{item.title}</h3>
                  <p className="text-sm text-gray-300">{item.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default VideoEditingPage
