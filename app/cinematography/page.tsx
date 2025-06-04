"use client"

import { motion } from "framer-motion"
import Navigation from "@/components/navigation"
import Image from "next/image"
import { useInView } from "framer-motion"
import { useRef, useState, useEffect } from "react"
import { X, ChevronLeft, ChevronRight, ExternalLink, Play } from "lucide-react"
import { sendToWhatsApp } from "@/lib/whatsapp"

interface MediaItem {
  id: string
  type: "image" | "video" | "url"
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
}

export default function CinematographyPage() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null)
  const [galleryItems, setGalleryItems] = useState<MediaItem[]>([])

  // Load gallery items from localStorage or use defaults
  useEffect(() => {
    const savedMedia = localStorage.getItem("psaStudiosMedia")
    if (savedMedia) {
      const allMedia = JSON.parse(savedMedia)
      const cinematographyItems = allMedia.filter((item: MediaItem) => item.category === "cinematography")
      setGalleryItems(cinematographyItems)
    } else {
      // Default items with your uploaded images
      setGalleryItems([
        {
          id: "1",
          type: "image",
          title: "Contemplative Moment",
          description: "Dramatic interior lighting with warm tones",
          src: "/images/cinematography/8_1.3.2-min.png",
          category: "cinematography",
          layout: { colSpan: "md:col-span-1", rowSpan: "md:row-span-1", aspectRatio: "aspect-[4/3]" },
        },
        {
          id: "2",
          type: "image",
          title: "Natural Portrait",
          description: "Atmospheric lighting and composition",
          src: "/images/cinematography/1_1.4.1-min.jpeg",
          category: "cinematography",
          layout: { colSpan: "md:col-span-1", rowSpan: "md:row-span-1", aspectRatio: "aspect-[4/3]" },
        },
        {
          id: "3",
          type: "image",
          title: "Upward Gaze",
          description: "Beautiful warm lighting and shadows",
          src: "/images/cinematography/1_1.3.1-min.png",
          category: "cinematography",
          layout: { colSpan: "md:col-span-1", rowSpan: "md:row-span-1", aspectRatio: "aspect-[4/3]" },
        },
        {
          id: "4",
          type: "image",
          title: "Urban Landscape",
          description: "Two subjects against industrial backdrop",
          src: "/images/cinematography/10_1.10.1-min.png",
          category: "cinematography",
          layout: { colSpan: "md:col-span-1", rowSpan: "md:row-span-1", aspectRatio: "aspect-[4/3]" },
        },
        {
          id: "5",
          type: "image",
          title: "Gentle Touch",
          description: "Artistic close-up with soft natural lighting",
          src: "/images/cinematography/9_1.2.4-min.png",
          category: "cinematography",
          layout: { colSpan: "md:col-span-1", rowSpan: "md:row-span-1", aspectRatio: "aspect-[4/3]" },
        },
        {
          id: "6",
          type: "image",
          title: "Solitary Journey",
          description: "Cinematic landscape with silhouetted figure",
          src: "/images/cinematography/Untitled_1.2.2.T.jpeg",
          category: "cinematography",
          layout: { colSpan: "md:col-span-1", rowSpan: "md:row-span-1", aspectRatio: "aspect-[4/3]" },
        },
        {
          id: "7",
          type: "image",
          title: "Musical Moment",
          description: "Dramatic piano scene with atmospheric lighting",
          src: "/images/cinematography/4_1.1.2.jpeg",
          category: "cinematography",
          layout: { colSpan: "md:col-span-1", rowSpan: "md:row-span-1", aspectRatio: "aspect-[4/3]" },
        },
        {
          id: "8",
          type: "image",
          title: "Peaceful Rest",
          description: "Natural outdoor portrait with artistic composition",
          src: "/images/cinematography/8_1.1.5-min.jpeg",
          category: "cinematography",
          layout: { colSpan: "md:col-span-1", rowSpan: "md:row-span-1", aspectRatio: "aspect-[4/3]" },
        },
        {
          id: "9",
          type: "image",
          title: "Shadow Play",
          description: "Moody interior with dramatic shadows",
          src: "/images/cinematography/6_1.5.2-min.jpeg",
          category: "cinematography",
          layout: { colSpan: "md:col-span-1", rowSpan: "md:row-span-1", aspectRatio: "aspect-[4/3]" },
        },
        {
          id: "10",
          type: "image",
          title: "Intimate Performance",
          description: "Warm, intimate piano scene with natural lighting",
          src: "/images/cinematography/3_1.12.1-min.jpeg",
          category: "cinematography",
          layout: { colSpan: "md:col-span-1", rowSpan: "md:row-span-1", aspectRatio: "aspect-[4/3]" },
        },
      ])
    }
  }, [])

  // Filter only images for lightbox navigation
  const imageItems = galleryItems.filter((item) => item.type === "image")

  const handleItemClick = (index: number) => {
    const item = galleryItems[index]
    if (item.type === "url" && item.externalUrl) {
      window.open(item.externalUrl, "_blank")
    } else if (item.type === "video") {
      // For videos, you could implement a video modal or just play inline
      // For now, we'll treat them like external links if they have a src
      if (item.src.startsWith("http")) {
        window.open(item.src, "_blank")
      }
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

  const getMediaIcon = (type: string) => {
    switch (type) {
      case "video":
        return <Play className="w-6 h-6" />
      case "url":
        return <ExternalLink className="w-6 h-6" />
      default:
        return null
    }
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

        {/* Gallery Grid - Uniform 3-column layout */}
        <div ref={ref} className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {galleryItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group relative overflow-hidden rounded-lg cursor-pointer"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-[#C0C0C0]/10 border border-[#C0C0C0]/30 shadow-lg">
                  {/* Media Content */}
                  {item.type === "image" ? (
                    <Image
                      src={item.src || "/placeholder.svg"}
                      alt={item.description}
                      fill
                      className="object-cover transition-all duration-700 group-hover:scale-105 group-hover:brightness-110"
                      onClick={() => handleItemClick(index)}
                    />
                  ) : item.type === "video" ? (
                    <>
                      <Image
                        src={item.thumbnail || "/placeholder.svg"}
                        alt={item.description}
                        fill
                        className="object-cover transition-all duration-700 group-hover:scale-105 group-hover:brightness-110"
                        onClick={() => handleItemClick(index)}
                      />
                      {/* Video Play Icon Overlay */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="bg-black/70 rounded-full p-4 group-hover:bg-black/80 transition-colors duration-300">
                          <Play className="w-8 h-8 text-white fill-white" />
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <Image
                        src={item.thumbnail || "/placeholder.svg"}
                        alt={item.description}
                        fill
                        className="object-cover transition-all duration-700 group-hover:scale-105 group-hover:brightness-110"
                        onClick={() => handleItemClick(index)}
                      />
                      {/* External Link Icon */}
                      <div className="absolute top-4 right-4">
                        <div className="bg-black/70 rounded-full p-2">
                          <ExternalLink className="w-5 h-5 text-white" />
                        </div>
                      </div>
                    </>
                  )}

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-700" />

                  {/* Hover Action Button */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="bg-[#FFFFFF]/90 text-[#000000] px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2">
                      {getMediaIcon(item.type)}
                      {item.type === "image" ? "View Image" : item.type === "video" ? "Play Video" : "Open Link"}
                    </div>
                  </div>

                  {/* Media Type Badge */}
                  <div className="absolute top-4 left-4">
                    <div className="bg-black/70 text-white px-2 py-1 rounded text-xs font-medium capitalize">
                      {item.type === "url" ? "External" : item.type}
                    </div>
                  </div>
                </div>

                {/* Item Info Overlay */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <h3 className="text-white font-bold text-sm mb-1 line-clamp-1">{item.title}</h3>
                  <p className="text-white/80 text-xs line-clamp-2">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Empty State */}
          {galleryItems.length === 0 && (
            <div className="text-center py-16">
              <div className="text-[#C0C0C0]/60 mb-4">
                <ExternalLink className="w-16 h-16 mx-auto mb-4" />
                <p className="text-lg">No cinematography items yet.</p>
                <p className="text-sm">Add some content through the studio management panel.</p>
              </div>
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
