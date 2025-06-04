"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"

import type { MediaItem } from "@/types"
import GalleryCard from "@/components/gallery/gallery-card"

const SocialMediaPage = () => {
  const [galleryItems, setGalleryItems] = useState<MediaItem[]>([])
  const { ref, inView: isInView } = useInView({ threshold: 0.2 })

  useEffect(() => {
    const savedMedia = localStorage.getItem("psaStudiosMedia")
    if (savedMedia) {
      try {
        const allMedia = JSON.parse(savedMedia)
        const socialMediaItems = allMedia.filter((item: MediaItem) => item.category === "social-media")
        setGalleryItems(socialMediaItems)
      } catch (error) {
        console.error("Error loading media:", error)
        // Fallback to default items
        setGalleryItems([
          {
            id: "1",
            type: "image",
            title: "Instagram Campaign",
            description: "Social media content creation",
            src: "/placeholder.svg?height=400&width=600",
            category: "social-media",
            layout: { colSpan: "md:col-span-1", rowSpan: "md:row-span-1", aspectRatio: "aspect-square" },
          },
          {
            id: "2",
            type: "video",
            title: "TikTok Content",
            description: "Viral social media video",
            src: "/placeholder.svg?height=400&width=600",
            thumbnail: "/placeholder.svg?height=400&width=600",
            category: "social-media",
            layout: { colSpan: "md:col-span-2", rowSpan: "md:row-span-1", aspectRatio: "aspect-video" },
          },
        ])
      }
    } else {
      // Default items if no saved data
      setGalleryItems([
        {
          id: "1",
          type: "image",
          title: "Instagram Campaign",
          description: "Social media content creation",
          src: "/placeholder.svg?height=400&width=600",
          category: "social-media",
          layout: { colSpan: "md:col-span-1", rowSpan: "md:row-span-1", aspectRatio: "aspect-square" },
        },
        {
          id: "2",
          type: "video",
          title: "TikTok Content",
          description: "Viral social media video",
          src: "/placeholder.svg?height=400&width=600",
          thumbnail: "/placeholder.svg?height=400&width=600",
          category: "social-media",
          layout: { colSpan: "md:col-span-2", rowSpan: "md:row-span-1", aspectRatio: "aspect-video" },
        },
      ])
    }

    // Add event listener for storage changes
    const handleStorageChange = () => {
      const savedMedia = localStorage.getItem("psaStudiosMedia")
      if (savedMedia) {
        try {
          const allMedia = JSON.parse(savedMedia)
          const socialMediaItems = allMedia.filter((item: MediaItem) => item.category === "social-media")
          setGalleryItems(socialMediaItems)
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
    <section className="relative overflow-hidden bg-white py-16 md:py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:max-w-none">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Social Media</h2>
            <p className="mt-4 text-gray-500">
              We create engaging social media content that connects with your audience and drives results.
            </p>
          </div>
          <div ref={ref} className="mt-10">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {galleryItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 40 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className={`group relative overflow-hidden rounded-lg ${item.layout?.colSpan || "md:col-span-1"} ${item.layout?.rowSpan || "md:row-span-1"}`}
                >
                  <GalleryCard item={item} />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default SocialMediaPage
