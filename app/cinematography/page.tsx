"use client"

import type React from "react"

import { motion } from "framer-motion"
import Navigation from "@/components/navigation"
import Image from "next/image"
import { useInView } from "framer-motion"
import { useRef, useState, useEffect } from "react"
import { X, ChevronLeft, ChevronRight, Play, Film, Instagram } from "lucide-react"
import { sendToWhatsApp } from "@/lib/whatsapp"

interface MediaItem {
  id: string
  type: "image" | "video" | "url"
  title: string
  description: string
  src: string
  thumbnail?: string
  category: "cinematography" | "video-editing" | "social-media"
  section?: "social-media" | "films"
  layout: {
    colSpan: string
    rowSpan: string
    aspectRatio: string
  }
  isExternal?: boolean
  externalUrl?: string
  embedCode?: string
  videoId?: string
}

export default function CinematographyPage() {
  const socialMediaRef = useRef(null)
  const filmsRef = useRef(null)
  const isSocialMediaInView = useInView(socialMediaRef, { once: true, margin: "-100px" })
  const isFilmsInView = useInView(filmsRef, { once: true, margin: "-100px" })

  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null)
  const [selectedSection, setSelectedSection] = useState<"social-media" | "films" | null>(null)
  const [socialMediaItems, setSocialMediaItems] = useState<MediaItem[]>([])
  const [filmsItems, setFilmsItems] = useState<MediaItem[]>([])
  const [playingVideoId, setPlayingVideoId] = useState<string | null>(null)

  // Load gallery items from localStorage or use defaults
  useEffect(() => {
    const savedMedia = localStorage.getItem("psaStudiosMedia")
    if (savedMedia) {
      const allMedia = JSON.parse(savedMedia)
      const cinematographyItems = allMedia.filter((item: MediaItem) => item.category === "cinematography")

      // Split items by section
      const socialMedia = cinematographyItems.filter((item) => item.section === "social-media")
      const films = cinematographyItems.filter((item) => item.section === "films")

      setSocialMediaItems(socialMedia)
      setFilmsItems(films)
    } else {
      // Default social media items (videos with working Gumlet thumbnails)
      setSocialMediaItems([
        {
          id: "sm1",
          type: "video",
          title: "Beardo AD",
          description: "Engaging vertical content for social platforms",
          src: "https://play.gumlet.io/embed/68440cbd0f8d7a05184b35d8",
          thumbnail:
            "https://video.gumlet.io/68440ba3ed94500acc4296bd/68440cbd0f8d7a05184b35d8/thumbnail-1-0.png?v=1749291639000?v=1749294282512",
          videoId: "68440cbd0f8d7a05184b35d8",
          category: "cinematography",
          section: "social-media",
          layout: { colSpan: "md:col-span-1", rowSpan: "md:row-span-1", aspectRatio: "aspect-[9/16]" },
          embedCode: `<div style="position:relative;aspect-ratio:9/16;width:100%;height:100%;"><iframe loading="lazy" title="Gumlet video player" src="https://play.gumlet.io/embed/68440cbd0f8d7a05184b35d8?autoplay=true&muted=0&controls=1&start_high_res=true" style="border:none; position: absolute; top: 0; left: 0; height: 100%; width: 100%;" allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture; fullscreen;"></iframe></div>`,
        },
        {
          id: "sm2",
          type: "video",
          title: "Content Sample",
          description: "Dynamic storytelling in vertical format",
          src: "https://play.gumlet.io/embed/68440f430f8d7a05184b46d7",
          thumbnail:
            "https://video.gumlet.io/68440ba3ed94500acc4296bd/68440f430f8d7a05184b46d7/thumbnail-1-0.png?v=1749291071734?width=400&height=711",
          videoId: "68440f430f8d7a05184b46d7",
          category: "cinematography",
          section: "social-media",
          layout: { colSpan: "md:col-span-1", rowSpan: "md:row-span-1", aspectRatio: "aspect-[9/16]" },
          embedCode: `<div style="position:relative;aspect-ratio:9/16;width:100%;height:100%;"><iframe loading="lazy" title="Gumlet video player" src="https://play.gumlet.io/embed/68440f430f8d7a05184b46d7?autoplay=true&muted=0&controls=1&start_high_res=true" style="border:none; position: absolute; top: 0; left: 0; height: 100%; width: 100%;" allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture; fullscreen;"></iframe></div>`,
        },
        {
          id: "sm3",
          type: "video",
          title: "Promotional reel",
          description: "Creative visual content optimized for mobile",
          src: "https://play.gumlet.io/embed/684413f52ea48d13d45afb20",
          thumbnail:
            "https://video.gumlet.io/68440ba3ed94500acc4296bd/684413f52ea48d13d45afb20/thumbnail-1-0.png?v=1749292740497?width=400&height=711",
          videoId: "684413f52ea48d13d45afb20",
          category: "cinematography",
          section: "social-media",
          layout: { colSpan: "md:col-span-1", rowSpan: "md:row-span-1", aspectRatio: "aspect-[9/16]" },
          embedCode: `<div style="position:relative;aspect-ratio:9/16;width:100%;height:100%;"><iframe loading="lazy" title="Gumlet video player" src="https://play.gumlet.io/embed/684413f52ea48d13d45afb20?autoplay=true&muted=0&controls=1&start_high_res=true" style="border:none; position: absolute; top: 0; left: 0; height: 100%; width: 100%;" allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture; fullscreen;"></iframe></div>`,
        },
        {
          id: "sm4",
          type: "video",
          title: "Informative Videos",
          description: "Captivating short-form video content",
          src: "https://play.gumlet.io/embed/68440df82ea48d13d45ad190",
          thumbnail:
            "https://video.gumlet.io/68440ba3ed94500acc4296bd/68440df82ea48d13d45ad190/thumbnail-1-0.png?v=1749290722584?width=400&height=711",
          videoId: "68440df82ea48d13d45ad190",
          category: "cinematography",
          section: "social-media",
          layout: { colSpan: "md:col-span-1", rowSpan: "md:row-span-1", aspectRatio: "aspect-[9/16]" },
          embedCode: `<div style="position:relative;aspect-ratio:9/16;width:100%;height:100%;"><iframe loading="lazy" title="Gumlet video player" src="https://play.gumlet.io/embed/68440df82ea48d13d45ad190?autoplay=true&muted=0&controls=1&start_high_res=true" style="border:none; position: absolute; top: 0; left: 0; height: 100%; width: 100%;" allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture; fullscreen;"></iframe></div>`,
        },
      ])

      // Default films items (mix of images and videos with working Gumlet thumbnails)
      setFilmsItems([
        {
          id: "f1",
          type: "image",
          title: "Cinematic Landscape",
          description: "Atmospheric composition with natural elements",
          src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/First.png-OHRiW1SKMrcWdG2mVHCNjlezhHjOJp.jpeg",
          category: "cinematography",
          section: "films",
          layout: { colSpan: "md:col-span-1", rowSpan: "md:row-span-1", aspectRatio: "aspect-[16/9]" },
        },
        {
          id: "f2",
          type: "image",
          title: "Artistic Portrait",
          description: "Ground-level perspective with dramatic composition",
          src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Second.png-9KtsEfuzla5vsUXwAEfRQ4lmXXSxin.jpeg",
          category: "cinematography",
          section: "films",
          layout: { colSpan: "md:col-span-1", rowSpan: "md:row-span-1", aspectRatio: "aspect-[16/9]" },
        },
        {
          id: "f3",
          type: "video",
          title: "Film Project 1",
          description: "Professional cinematic storytelling",
          src: "https://play.gumlet.io/embed/684417cd2ea48d13d45b15b9",
          thumbnail:
            "https://video.gumlet.io/68440ba3ed94500acc4296bd/684417cd2ea48d13d45b15b9/thumbnail-1-0.png?v=1749293219611?width=800&height=450",
          videoId: "684417cd2ea48d13d45b15b9",
          category: "cinematography",
          section: "films",
          layout: { colSpan: "md:col-span-1", rowSpan: "md:row-span-1", aspectRatio: "aspect-[16/9]" },
          embedCode: `<div style="position:relative;aspect-ratio:16/9;width:100%;height:100%;"><iframe loading="lazy" title="Gumlet video player" src="https://play.gumlet.io/embed/684417cd2ea48d13d45b15b9?autoplay=true&muted=0&controls=1&start_high_res=true" style="border:none; position: absolute; top: 0; left: 0; height: 100%; width: 100%;" allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture; fullscreen;"></iframe></div>`,
        },
        {
          id: "f4",
          type: "image",
          title: "Piano Intimacy",
          description: "Intimate musical moment with atmospheric lighting",
          src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Third.png-1C7kKi6bKPKKgsolQNXoMQ0FkKK0wh.jpeg",
          category: "cinematography",
          section: "films",
          layout: { colSpan: "md:col-span-1", rowSpan: "md:row-span-1", aspectRatio: "aspect-[16/9]" },
        },
        {
          id: "f5",
          type: "image",
          title: "Contemplative Mood",
          description: "Moody portrait with warm lighting and shadows",
          src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Fourth.png-atNgazlc8N7I8pLRlD2IeDGteibZPa.jpeg",
          category: "cinematography",
          section: "films",
          layout: { colSpan: "md:col-span-1", rowSpan: "md:row-span-1", aspectRatio: "aspect-[16/9]" },
        },
        {
          id: "f6",
          type: "video",
          title: "Film Project 2",
          description: "Cinematic narrative with professional production value",
          src: "https://play.gumlet.io/embed/684417aaed94500acc42e9c3",
          thumbnail:
            "https://video.gumlet.io/68440ba3ed94500acc4296bd/684417aaed94500acc42e9c3/thumbnail-1-0.png?v=1749293213561?width=800&height=450",
          videoId: "684417aaed94500acc42e9c3",
          category: "cinematography",
          section: "films",
          layout: { colSpan: "md:col-span-1", rowSpan: "md:row-span-1", aspectRatio: "aspect-[16/9]" },
          embedCode: `<div style="position:relative;aspect-ratio:16/9;width:100%;height:100%;"><iframe loading="lazy" title="Gumlet video player" src="https://play.gumlet.io/embed/684417aaed94500acc42e9c3?autoplay=true&muted=0&controls=1&start_high_res=true" style="border:none; position: absolute; top: 0; left: 0; height: 100%; width: 100%;" allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture; fullscreen;"></iframe></div>`,
        },
        {
          id: "f7",
          type: "image",
          title: "Dramatic Expression",
          description: "Intense character portrait with cinematic lighting",
          src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Fifth.png-djsEoejfuGzfGaGpyPzXMNEZFGF9oX.jpeg",
          category: "cinematography",
          section: "films",
          layout: { colSpan: "md:col-span-1", rowSpan: "md:row-span-1", aspectRatio: "aspect-[16/9]" },
        },
        {
          id: "f8",
          type: "image",
          title: "Behind the Scenes",
          description: "Professional film production in classroom setting",
          src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Bts%201.jpg-mo3qL3Dh1BKTPSXLk1jDp9xkGgZ1Ur.jpeg",
          category: "cinematography",
          section: "films",
          layout: { colSpan: "md:col-span-1", rowSpan: "md:row-span-1", aspectRatio: "aspect-[16/9]" },
        },
        {
          id: "f9",
          type: "video",
          title: "Film Project 3",
          description: "Professional filmmaking with advanced cinematography",
          src: "https://play.gumlet.io/embed/68441be42ea48d13d45b487b",
          thumbnail:
            "https://video.gumlet.io/68440ba3ed94500acc4296bd/68441be42ea48d13d45b487b/thumbnail-1-0.png?v=1749294282512?width=800&height=450",
          videoId: "68441be42ea48d13d45b487b",
          category: "cinematography",
          section: "films",
          layout: { colSpan: "md:col-span-1", rowSpan: "md:row-span-1", aspectRatio: "aspect-[16/9]" },
          embedCode: `<div style="position:relative;aspect-ratio:16/9;width:100%;height:100%;"><iframe loading="lazy" title="Gumlet video player" src="https://play.gumlet.io/embed/68441be42ea48d13d45b487b?autoplay=true&muted=0&controls=1&start_high_res=true" style="border:none; position: absolute; top: 0; left: 0; height: 100%; width: 100%;" allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture; fullscreen;"></iframe></div>`,
        },
        {
          id: "f10",
          type: "image",
          title: "Studio Setup",
          description: "Behind-the-scenes professional lighting setup",
          src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/BTS%202.jpg-5aivZGVSYE2L77BXCg0wHAO5AhGrTN.jpeg",
          category: "cinematography",
          section: "films",
          layout: { colSpan: "md:col-span-1", rowSpan: "md:row-span-1", aspectRatio: "aspect-[16/9]" },
        },
        {
          id: "f11",
          type: "image",
          title: "Natural Beauty",
          description: "Serene landscape with cinematic composition",
          src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/sixth.jpg-40UCp0B2GGlWWdbHmzqZX0uhtcGIYX.jpeg",
          category: "cinematography",
          section: "films",
          layout: { colSpan: "md:col-span-1", rowSpan: "md:row-span-1", aspectRatio: "aspect-[16/9]" },
        },
        {
          id: "f12",
          type: "video",
          title: "Film Project 4",
          description: "Professional filmmaking with advanced cinematography",
          src: "https://play.gumlet.io/embed/6847f5fef923a3909d04d76b",
          thumbnail:
            "https://video.gumlet.io/68440ba3ed94500acc4296bd/6847f5fef923a3909d04d76b/thumbnail-1-0.png?v=1749546589533?width=800&height=450",
          videoId: "6847f5fef923a3909d04d76b",
          category: "cinematography",
          section: "films",
          layout: { colSpan: "md:col-span-1", rowSpan: "md:row-span-1", aspectRatio: "aspect-[16/9]" },
          embedCode: `<div style="position:relative;aspect-ratio:16/9;width:100%;height:100%;"><iframe loading="lazy" title="Gumlet video player" src="https://play.gumlet.io/embed/68441be42ea48d13d45b487b?autoplay=true&muted=0&controls=1&start_high_res=true" style="border:none; position: absolute; top: 0; left: 0; height: 100%; width: 100%;" allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture; fullscreen;"></iframe></div>`,
        },
      ])
    }
  }, [])

  const handleItemClick = (index: number, section: "social-media" | "films") => {
    console.log("Item clicked:", index, section) // Debug log
    setSelectedImageIndex(index)
    setSelectedSection(section)
  }

  const closeLightbox = () => {
    setSelectedImageIndex(null)
    setSelectedSection(null)
  }

  const goToPrevious = () => {
    if (selectedImageIndex !== null && selectedSection) {
      const sectionItems = selectedSection === "social-media" ? socialMediaItems : filmsItems
      setSelectedImageIndex(selectedImageIndex > 0 ? selectedImageIndex - 1 : sectionItems.length - 1)
    }
  }

  const goToNext = () => {
    if (selectedImageIndex !== null && selectedSection) {
      const sectionItems = selectedSection === "social-media" ? socialMediaItems : filmsItems
      setSelectedImageIndex(selectedImageIndex < sectionItems.length - 1 ? selectedImageIndex + 1 : 0)
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
  }, [selectedImageIndex, selectedSection])

  const handleSocialMediaVideoClick = (videoId: string) => {
    setPlayingVideoId(playingVideoId === videoId ? null : videoId)
  }

  // Render gallery grid for a specific section
  const renderGalleryGrid = (
    items: MediaItem[],
    section: "social-media" | "films",
    ref: React.RefObject<HTMLDivElement>,
    isInView: boolean,
  ) => {
    return (
      <div ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {items.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`group relative overflow-hidden rounded-lg cursor-pointer ${
                section === "social-media" ? "flex justify-center" : ""
              }`}
              onClick={() => {
                if (section === "social-media" && item.type === "video") {
                  handleSocialMediaVideoClick(item.videoId || item.id)
                } else {
                  handleItemClick(index, section)
                }
              }}
            >
              <div
                className={`relative ${
                  section === "social-media" ? "aspect-[9/16] w-full max-w-[300px] mx-auto" : item.layout.aspectRatio
                } overflow-hidden bg-[#C0C0C0]/10 border border-[#C0C0C0]/30 shadow-lg`}
              >
                {/* Media Content */}
                {item.type === "video" ? (
                  <div className="w-full h-full relative">
                    {section === "social-media" && playingVideoId === (item.videoId || item.id) ? (
                      // Show video player for social media when playing
                      <div className="w-full h-full" dangerouslySetInnerHTML={{ __html: item.embedCode || "" }} />
                    ) : (
                      // Show thumbnail when not playing
                      <>
                        <Image
                          src={item.thumbnail || "/placeholder.svg?height=400&width=400"}
                          alt={item.description}
                          fill
                          className="object-cover transition-all duration-700 group-hover:scale-105 group-hover:brightness-110"
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          onError={(e) => {
                            console.log("Thumbnail failed to load:", item.thumbnail)
                            const target = e.target as HTMLImageElement
                            target.src = "/placeholder.svg?height=400&width=400"
                          }}
                        />
                        <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                          <div className="bg-white/90 rounded-full p-3 group-hover:bg-white group-hover:scale-110 transition-all duration-300">
                            <Play className="w-6 h-6 text-black ml-1" />
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                ) : (
                  <Image
                    src={item.src || "/placeholder.svg?height=400&width=400"}
                    alt={item.description}
                    fill
                    className="object-cover transition-all duration-700 group-hover:scale-105 group-hover:brightness-110"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                )}

                {/* Hover Overlay - only show when not playing video */}
                {!(
                  section === "social-media" &&
                  item.type === "video" &&
                  playingVideoId === (item.videoId || item.id)
                ) && (
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-700" />
                )}

                {/* Media Type Badge - only show when not playing video */}
                {!(
                  section === "social-media" &&
                  item.type === "video" &&
                  playingVideoId === (item.videoId || item.id)
                ) && (
                  <div className="absolute top-3 sm:top-4 left-3 sm:left-4">
                    <div className="bg-black/70 text-white px-2 py-1 rounded text-xs font-medium capitalize">
                      {item.type === "url" ? "External" : item.type}
                    </div>
                  </div>
                )}
              </div>

              {/* Item Info Overlay - only show when not playing video */}
              {!(
                section === "social-media" &&
                item.type === "video" &&
                playingVideoId === (item.videoId || item.id)
              ) && (
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent p-3 sm:p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <h3 className="text-white font-bold text-xs sm:text-sm mb-1 line-clamp-1">{item.title}</h3>
                  <p className="text-white/80 text-xs line-clamp-2">{item.description}</p>
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Empty State */}
        {items.length === 0 && (
          <div className="text-center py-12 sm:py-16">
            <div className="text-[#C0C0C0]/60 mb-4">
              {section === "social-media" ? (
                <Instagram className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-4" />
              ) : (
                <Film className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-4" />
              )}
              <p className="text-base sm:text-lg">
                No {section === "social-media" ? "social media" : "film"} content yet.
              </p>
              <p className="text-sm">Add some content through the studio management panel.</p>
            </div>
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="min-h-screen text-[#FFFFFF]" style={{ background: "#000000" }}>
      <Navigation />

      <main className="pt-16 sm:pt-20 md:pt-24 pb-8 sm:pb-12 md:pb-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8 sm:mb-12 md:mb-16 px-4 sm:px-6"
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-[#FFFFFF] mb-4 sm:mb-6 tracking-tight">
            CINEMATOGRAPHY
          </h1>
          <p className="text-sm sm:text-base lg:text-lg text-[#C0C0C0] max-w-2xl mx-auto font-serif font-medium leading-relaxed">
            Capturing moments through the lens of creativity and technical excellence. Our cinematography brings stories
            to life with stunning visuals.
          </p>
        </motion.div>

        {/* Social Media Section */}
        <section className="mb-16 sm:mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-8 sm:mb-10 px-4 sm:px-6"
          >
            <div className="inline-flex items-center justify-center gap-2 mb-3">
              <Instagram className="w-5 h-5 sm:w-6 sm:h-6 text-[#C0C0C0]" />
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#FFFFFF]">Social Media</h2>
            </div>
            <p className="text-sm sm:text-base text-[#C0C0C0] max-w-2xl mx-auto">
              Short-form content optimized for social platforms. Engaging visuals that capture attention in seconds.
            </p>
          </motion.div>

          {renderGalleryGrid(socialMediaItems, "social-media", socialMediaRef, isSocialMediaInView)}
        </section>

        {/* Films Section */}
        <section>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-8 sm:mb-10 px-4 sm:px-6"
          >
            <div className="inline-flex items-center justify-center gap-2 mb-3">
              <Film className="w-5 h-5 sm:w-6 sm:h-6 text-[#C0C0C0]" />
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#FFFFFF]">Films</h2>
            </div>
            <p className="text-sm sm:text-base text-[#C0C0C0] max-w-2xl mx-auto">
              Cinematic storytelling with depth and emotion. Professional films that leave a lasting impression.
            </p>
          </motion.div>

          {renderGalleryGrid(filmsItems, "films", filmsRef, isFilmsInView)}
        </section>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mt-16 sm:mt-20 md:mt-24 px-4 sm:px-6"
        >
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#FFFFFF] mb-4 sm:mb-6">
            Ready to bring your vision to life?
          </h2>
          <p className="text-sm sm:text-base text-[#C0C0C0] mb-6 sm:mb-8 max-w-xl mx-auto font-serif font-medium">
            Let's collaborate to create stunning cinematography that tells your story with impact and artistry.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() =>
              sendToWhatsApp("Hi! I'm interested in your cinematography services. I'd like to discuss my project.")
            }
            className="bg-[#C0C0C0] text-[#000000] px-6 sm:px-8 py-2.5 sm:py-3 rounded-full font-bold hover:bg-[#FFFFFF] transition-colors duration-200 shadow-lg text-sm sm:text-base"
          >
            Start Your Project
          </motion.button>
        </motion.div>
      </main>

      {/* Lightbox Modal with Navigation - exclude social media videos */}
      {selectedImageIndex !== null &&
        selectedSection &&
        !(
          selectedSection === "social-media" &&
          (() => {
            const sectionItems = selectedSection === "social-media" ? socialMediaItems : filmsItems
            const item = sectionItems[selectedImageIndex]
            return item?.type === "video"
          })()
        ) && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 flex items-center justify-center z-50 p-2 sm:p-4"
            onClick={closeLightbox}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative w-full h-full flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              {(() => {
                const sectionItems = selectedSection === "social-media" ? socialMediaItems : filmsItems
                const item = sectionItems[selectedImageIndex]

                if (item?.type === "image") {
                  return (
                    <div className="relative w-full h-full max-w-6xl max-h-[90vh]">
                      <Image
                        src={item.src || "/placeholder.svg"}
                        alt={item.description || "Media"}
                        fill
                        className="object-contain"
                        sizes="100vw"
                      />
                    </div>
                  )
                } else if (item?.type === "video") {
                  // Calculate container size based on section
                  const isVertical = selectedSection === "social-media"
                  const containerStyle = isVertical
                    ? {
                        width: "min(90vw, 400px)",
                        height: "min(90vh, 711px)", // 400 * 16/9 = 711
                        aspectRatio: "9/16",
                      }
                    : {
                        width: "min(90vw, 800px)",
                        height: "min(90vh, 450px)", // 800 * 9/16 = 450
                        aspectRatio: "16/9",
                      }

                  return (
                    <div className="relative bg-black rounded-lg overflow-hidden" style={containerStyle}>
                      <div className="w-full h-full" dangerouslySetInnerHTML={{ __html: item.embedCode || "" }} />
                    </div>
                  )
                }
                return null
              })()}

              {/* Close Button */}
              <button
                onClick={closeLightbox}
                className="absolute top-4 right-4 bg-white/20 hover:bg-white/30 text-white p-3 rounded-full transition-colors duration-200 z-20"
              >
                <X size={24} />
              </button>

              {/* Navigation Buttons */}
              {(() => {
                const sectionItems = selectedSection === "social-media" ? socialMediaItems : filmsItems
                return (
                  sectionItems.length > 1 && (
                    <>
                      <button
                        onClick={goToPrevious}
                        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-3 rounded-full transition-colors duration-200 z-20"
                      >
                        <ChevronLeft size={24} />
                      </button>
                      <button
                        onClick={goToNext}
                        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-3 rounded-full transition-colors duration-200 z-20"
                      >
                        <ChevronRight size={24} />
                      </button>
                    </>
                  )
                )
              })()}

              {/* Counter */}
              {(() => {
                const sectionItems = selectedSection === "social-media" ? socialMediaItems : filmsItems
                return (
                  sectionItems.length > 1 && (
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white/20 text-white px-4 py-2 rounded-full text-sm">
                      {selectedImageIndex + 1} of {sectionItems.length}
                    </div>
                  )
                )
              })()}

              {/* Section Badge */}
              <div className="absolute top-4 left-4 bg-white/20 text-white px-3 py-2 rounded-full text-sm flex items-center gap-2">
                {selectedSection === "social-media" ? (
                  <>
                    <Instagram size={16} />
                    <span>Social Media</span>
                  </>
                ) : (
                  <>
                    <Film size={16} />
                    <span>Films</span>
                  </>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
    </div>
  )
}
