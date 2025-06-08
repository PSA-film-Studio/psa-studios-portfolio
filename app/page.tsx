"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { Camera, Film, Share2 } from "lucide-react"

export default function HomePage() {
  const [animationPhase, setAnimationPhase] = useState(0)
  // 0 = initial full screen logo
  // 1 = logo scrolling up
  // 2 = flowchart appearing

  useEffect(() => {
    // Start scrolling animation after 2 seconds
    const scrollTimer = setTimeout(() => {
      setAnimationPhase(1)
    }, 2000)

    // Start flowchart animation after logo has scrolled
    const flowchartTimer = setTimeout(() => {
      setAnimationPhase(2)
    }, 2200)

    return () => {
      clearTimeout(scrollTimer)
      clearTimeout(flowchartTimer)
    }
  }, [])

  return (
    <div className="min-h-screen text-[#FFFFFF] overflow-hidden" style={{ background: "#000000" }}>
      {/* Full Screen PSA Studios */}
      <motion.div
        className="fixed inset-0 flex items-center justify-center z-10"
        animate={{
          y: animationPhase >= 1 ? "-100vh" : "0vh",
        }}
        transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <div className="text-center px-4">
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-[12rem] font-black text-[#FFFFFF] mb-6 bg-gradient-to-r from-[#FFFFFF] via-[#C0C0C0] to-[#FFFFFF] bg-clip-text tracking-tight leading-none"
          >
            PSA STUDIOS
          </motion.h1>
        </div>
      </motion.div>

      {/* Main Content that appears after scroll */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: animationPhase >= 1 ? 1 : 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8 relative"
      >
        <div className="w-full max-w-6xl relative">
          {/* Small PSA Studios at top */}
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: animationPhase >= 1 ? 1 : 0, y: animationPhase >= 1 ? 0 : -30 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="text-center mb-8 sm:mb-12"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-[#FFFFFF] tracking-tight">
              PSA STUDIOS
            </h2>
          </motion.div>

          {/* Flowchart that appears */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: animationPhase >= 2 ? 1 : 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative flex flex-col items-center"
          >
            {/* Central connecting line with glow effect - hidden on mobile */}
            <motion.div
              initial={{ height: 0 }}
              animate={{
                height: animationPhase >= 2 ? "80px" : 0,
              }}
              transition={{
                height: { duration: 0.8, delay: 0.5 },
              }}
              className="hidden md:block w-0.5 bg-gradient-to-b from-[#C0C0C0] to-[#C0C0C0]/70 rounded-full"
              style={{
                boxShadow: animationPhase >= 2 ? "0 0 8px 1px rgba(192, 192, 192, 0.4)" : "none",
              }}
            />

            {/* Horizontal divider - hidden on mobile */}
            <motion.div
              initial={{ width: 0 }}
              animate={{
                width: animationPhase >= 2 ? "720px" : 0,
              }}
              transition={{
                width: { duration: 0.7, delay: 1.0, ease: "easeInOut" },
              }}
              className="hidden md:block h-0.5 bg-gradient-to-r from-[#C0C0C0]/70 via-[#C0C0C0] to-[#C0C0C0]/70 relative rounded-full"
              style={{
                boxShadow: animationPhase >= 2 ? "0 0 8px 1px rgba(192, 192, 192, 0.4)" : "none",
              }}
            >
              {/* Three vertical lines */}
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{
                  height: animationPhase >= 2 ? "60px" : 0,
                  opacity: animationPhase >= 2 ? 1 : 0,
                }}
                transition={{
                  height: { duration: 0.5, delay: 1.7, ease: "easeOut" },
                  opacity: { duration: 0.5, delay: 1.7 },
                }}
                className="absolute left-0 top-0 w-0.5 bg-gradient-to-b from-[#C0C0C0] to-[#C0C0C0]/70 rounded-full"
                style={{
                  boxShadow: animationPhase >= 2 ? "0 0 8px 1px rgba(192, 192, 192, 0.4)" : "none",
                }}
              />

              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{
                  height: animationPhase >= 2 ? "60px" : 0,
                  opacity: animationPhase >= 2 ? 1 : 0,
                }}
                transition={{
                  height: { duration: 0.5, delay: 1.9, ease: "easeOut" },
                  opacity: { duration: 0.5, delay: 1.9 },
                }}
                className="absolute left-1/2 top-0 w-0.5 bg-gradient-to-b from-[#C0C0C0] to-[#C0C0C0]/50 transform -translate-x-1/2 rounded-full"
                style={{
                  boxShadow: animationPhase >= 2 ? "0 0 8px 1px rgba(192, 192, 192, 0.4)" : "none",
                }}
              />

              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{
                  height: animationPhase >= 2 ? "60px" : 0,
                  opacity: animationPhase >= 2 ? 1 : 0,
                }}
                transition={{
                  height: { duration: 0.5, delay: 2.1, ease: "easeOut" },
                  opacity: { duration: 0.5, delay: 2.1 },
                }}
                className="absolute right-0 top-0 w-0.5 bg-gradient-to-b from-[#C0C0C0] to-[#C0C0C0]/70 rounded-full"
                style={{
                  boxShadow: animationPhase >= 2 ? "0 0 8px 1px rgba(192, 192, 192, 0.4)" : "none",
                }}
              />
            </motion.div>

            {/* Service Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-12 w-full max-w-6xl mt-8 md:mt-20">
              {/* Cinematography with Background Image */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: animationPhase >= 2 ? 1 : 0, y: animationPhase >= 2 ? 0 : 40 }}
                transition={{ duration: 0.7, delay: 2.5 }}
                className="flex justify-center"
              >
                <Link href="/cinematography" className="group block w-full max-w-sm">
                  <motion.div
                    whileHover={{ y: -8, scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ duration: 0.3 }}
                    className="relative bg-[#C0C0C0]/10 backdrop-blur-sm border border-[#FFFFFF]/30 rounded-xl p-6 sm:p-8 hover:border-[#FFFFFF] hover:shadow-2xl transition-all duration-300 cursor-pointer text-center overflow-hidden"
                    style={{
                      boxShadow: "0 0 0 0 rgba(255, 255, 255, 0)",
                    }}
                    whileHover={{
                      boxShadow: "0 25px 50px -12px rgba(255, 255, 255, 0.2)",
                    }}
                  >
                    {/* Background Image */}
                    <div
                      className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-60 group-hover:opacity-70 transition-opacity duration-300"
                      style={{
                        backgroundImage: "url('/images/cinematography-bg.jpg')",
                        backgroundSize: "cover",
                      }}
                    />

                    {/* Dark overlay for better text readability */}
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors duration-300" />

                    {/* Content */}
                    <div className="relative z-10">
                      <Camera className="w-6 h-6 sm:w-8 sm:h-8 text-[#FFFFFF] mb-4 sm:mb-6 mx-auto drop-shadow-lg" />
                      <h3 className="text-lg sm:text-xl font-black text-[#FFFFFF] mb-3 sm:mb-4 tracking-tight drop-shadow-lg">
                        CINEMATOGRAPHY
                      </h3>
                      <p className="text-xs sm:text-sm text-[#C0C0C0] font-black font-medium drop-shadow-lg">
                        Professional Video Production
                      </p>
                    </div>
                  </motion.div>
                </Link>
              </motion.div>

              {/* Video Editing with Background Image */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: animationPhase >= 2 ? 1 : 0, y: animationPhase >= 2 ? 0 : 40 }}
                transition={{ duration: 0.7, delay: 2.6 }}
                className="flex justify-center"
              >
                <Link href="/video-editing" className="group block w-full max-w-sm">
                  <motion.div
                    whileHover={{ y: -8, scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ duration: 0.3 }}
                    className="relative bg-[#C0C0C0]/10 backdrop-blur-sm border border-[#FFFFFF]/30 rounded-xl p-6 sm:p-8 hover:border-[#FFFFFF] hover:shadow-2xl transition-all duration-300 cursor-pointer text-center overflow-hidden"
                    style={{
                      boxShadow: "0 0 0 0 rgba(255, 255, 255, 0)",
                    }}
                    whileHover={{
                      boxShadow: "0 25px 50px -12px rgba(255, 255, 255, 0.2)",
                    }}
                  >
                    {/* Background Image */}
                    <div
                      className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-60 group-hover:opacity-70 transition-opacity duration-300"
                      style={{
                        backgroundImage: "url('/images/video-editing-bg.jpg')",
                        backgroundSize: "cover",
                      }}
                    />

                    {/* Dark overlay for better text readability */}
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors duration-300" />

                    {/* Content */}
                    <div className="relative z-10">
                      <Film className="w-6 h-6 sm:w-8 sm:h-8 text-[#FFFFFF] mb-4 sm:mb-6 mx-auto drop-shadow-lg" />
                      <h3 className="text-lg sm:text-xl font-black text-[#FFFFFF] mb-3 sm:mb-4 tracking-tight drop-shadow-lg">
                        VIDEO EDITING
                      </h3>
                      <p className="text-xs sm:text-sm text-[#C0C0C0] font-black font-medium drop-shadow-lg">
                        Post-Production Excellence
                      </p>
                    </div>
                  </motion.div>
                </Link>
              </motion.div>

              {/* Social Media with Background Image */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: animationPhase >= 2 ? 1 : 0, y: animationPhase >= 2 ? 0 : 40 }}
                transition={{ duration: 0.7, delay: 2.7 }}
                className="flex justify-center sm:col-span-2 lg:col-span-1"
              >
                <Link href="/social-media" className="group block w-full max-w-sm">
                  <motion.div
                    whileHover={{ y: -8, scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ duration: 0.3 }}
                    className="relative bg-[#C0C0C0]/10 backdrop-blur-sm border border-[#FFFFFF]/30 rounded-xl p-6 sm:p-8 hover:border-[#FFFFFF] hover:shadow-2xl transition-all duration-300 cursor-pointer text-center overflow-hidden"
                    style={{
                      boxShadow: "0 0 0 0 rgba(255, 255, 255, 0)",
                    }}
                    whileHover={{
                      boxShadow: "0 25px 50px -12px rgba(255, 255, 255, 0.2)",
                    }}
                  >
                    {/* Background Image */}
                    <div
                      className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-60 group-hover:opacity-70 transition-opacity duration-300"
                      style={{
                        backgroundImage: "url('/images/social-media-bg-new.png')",
                        backgroundSize: "cover",
                      }}
                    />

                    {/* Dark overlay for better text readability */}
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors duration-300" />

                    {/* Content */}
                    <div className="relative z-10">
                      <Share2 className="w-6 h-6 sm:w-8 sm:h-8 text-[#FFFFFF] mb-4 sm:mb-6 mx-auto drop-shadow-lg" />
                      <h3 className="text-lg sm:text-xl font-black text-[#FFFFFF] mb-3 sm:mb-4 tracking-tight drop-shadow-lg">
                        SOCIAL MEDIA
                      </h3>
                      <p className="text-xs sm:text-sm text-[#C0C0C0] font-black font-medium drop-shadow-lg">
                        Strategic Content Creation
                      </p>
                    </div>
                  </motion.div>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}
