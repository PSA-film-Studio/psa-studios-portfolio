"use client"

import { motion } from "framer-motion"
import Navigation from "@/components/navigation"
import Image from "next/image"
import { Calendar, BarChart3, Camera, Bot, ExternalLink } from "lucide-react"
import { useState, useEffect, type FormEvent } from "react"
import { sendFormToWhatsApp } from "@/lib/whatsapp"

export default function SocialMediaPage() {
  const [currentPage, setCurrentPage] = useState(0)
  const [autoRotate, setAutoRotate] = useState(true)

  const services = [
    {
      icon: Bot,
      title: "AI Clone",
      description: "AI-powered content generation and automated engagement strategies",
    },
    {
      icon: Camera,
      title: "Content Creation",
      description: "High-quality photos, videos, and graphics tailored for each platform",
    },
    {
      icon: Calendar,
      title: "Posting Schedules",
      description: "Strategic content calendar and automated posting for optimal engagement",
    },
    {
      icon: BarChart3,
      title: "Analytics & Insights",
      description: "Detailed performance tracking and data-driven optimization strategies",
    },
  ]

  // 🎯 Campaign images that match the actual campaign types
  const portfolioHighlights = [
    {
      platform: "Instagram",
      campaign: "Page management",
      metrics: "25 Million+ views",
      image: "/images/campaign-page-management.png", // ✅ Using the uploaded image
    },
    {
      platform: "Instagram",
      campaign: "Content Creation",
      metrics: "Created high-performing content and UGC Ad",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Beige%20Aesthetic%20Minimalist%20Autumn%20Moodboard%20Photo%20Collage%20Instagram%20Post%20%283%29-uD8hmifn3nJap7kyrz5mdq6sP2Hvve.png",
    },
    {
      platform: "Youtube",
      campaign: "SEO Optimization",
      metrics: "50% increase in views",
      image: "https://images.unsplash.com/photo-1611162616475-46b635cb6868?q=80&w=1000&auto=format&fit=crop", // Updated YouTube analytics image
    },
  ]

  // 🎯 Instagram pages handled with direct blob URLs for profile pictures
  const pagesHandled = [
    {
      profileImage:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/sambhav-pfp.jpg-x9Ps6JKCYyZKp8SwKGMiRb8gaqVbJt.jpeg", // ✅ Direct blob URL for Sambhav
      handle: "@sambhav_jain_rsj",
      url: "https://www.instagram.com/sambhav_jain_rsj?igsh=dzNsNGV2NmZlYnR0",
      platform: "Instagram",
      followers: "139K Followers",
      description:
        "Created high-performing content and promotional videos. Developed brand voice and visual identity across all posts.",
      achievements: ["300% reach increase", "Brand identity development", "Massive follower increase"],
    },
    {
      profileImage:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/samyak-pfp.jpg-FuUcSvS2f4Eb2WcAlh69ahcLCdKqsK.jpeg", // ✅ Direct blob URL for Samyak
      handle: "@modisamyak",
      url: "https://www.instagram.com/modisamyak?igsh=MTQ4OGx6cHg2eXkycw==",
      platform: "Instagram",
      followers: "12.2K Followers",
      description:
        "Managed complete content strategy and posting schedule. Achieved 200% engagement growth and 5K new followers in 3 months.",
      achievements: ["200% engagement increase", "5K new followers", "Viral content creation"],
    },
    {
      profileImage:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/rishabh-pfp.jpg-e37uzGau42zcNSMlKoRuWCiKx2Os1X.jpeg", // ✅ Direct blob URL for Rishabh
      handle: "@rsj_rishabh_jain",
      url: "https://www.instagram.com/rsj_rishabh_jain?igsh=ZmptZms1YjhnMjJl",
      platform: "Instagram",
      followers: "115K Followers",
      description:
        "Created high-performing content and promotional videos. Developed brand voice and visual identity across all posts.",
      achievements: ["250% reach increase", "Brand identity development", "Massive follower increase"],
    },
    {
      profileImage:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/drsomani-pfp.jpg-cNl3ZDfNTnd2tg73y7yfMMiGrom0FU.jpeg", // ✅ Direct blob URL for Dr Somani
      handle: "@mindfulmovement_drsomani",
      url: "https://www.instagram.com/mindfulmovement_drsomani?igsh=ZG95enVxY2NwMm5h",
      platform: "Instagram",
      followers: "800K+ Views",
      description:
        "Specialized healthcare content strategy with educational posts and patient testimonials. Built trust and authority in holistic medicine.",
      achievements: ["200% increase in patient inquiries", "Educational content series"],
    },
  ]

  // Auto-rotate Instagram pages every 3 seconds
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null

    if (autoRotate) {
      interval = setInterval(() => {
        setCurrentPage((prev) => (prev + 1) % pagesHandled.length)
      }, 3000) // Change every 3 seconds
    }

    // Pause auto-rotation when user hovers over the card
    const handleMouseEnter = () => setAutoRotate(false)
    const handleMouseLeave = () => setAutoRotate(true)

    const card = document.getElementById("instagram-card")
    if (card) {
      card.addEventListener("mouseenter", handleMouseEnter)
      card.addEventListener("mouseleave", handleMouseLeave)
    }

    // Clean up interval and event listeners when component unmounts
    return () => {
      if (interval) clearInterval(interval)
      if (card) {
        card.removeEventListener("mouseenter", handleMouseEnter)
        card.removeEventListener("mouseleave", handleMouseLeave)
      }
    }
  }, [autoRotate, pagesHandled.length])

  // Update the currentPage state to handle bounds checking
  useEffect(() => {
    if (pagesHandled.length > 0 && currentPage >= pagesHandled.length) {
      setCurrentPage(0)
    }
  }, [pagesHandled, currentPage])

  const handlePageClick = (url: string) => {
    window.open(url, "_blank", "noopener,noreferrer")
  }

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)

    const data = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      company: formData.get("company") as string,
      services: formData.get("services") as string,
      message: formData.get("message") as string,
    }

    sendFormToWhatsApp(data)
  }

  return (
    <div className="min-h-screen text-[#FFFFFF]" style={{ background: "#000000" }}>
      <Navigation />

      <main className="pt-24 pb-16">
        {/* Hero Section */}
        <section className="max-w-7xl mx-auto px-6 mb-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-6xl font-black text-[#FFFFFF] mb-8 tracking-tight">
              SOCIAL MEDIA MANAGEMENT
            </h1>
            <h2 className="text-2xl md:text-3xl font-bold text-[#C0C0C0] mb-8 tracking-tight">
              Content Creation and Strategy
            </h2>
            <p className="text-lg text-[#C0C0C0] max-w-4xl mx-auto leading-relaxed font-serif font-medium">
              We help brands build meaningful connections with their audience through strategic social media management,
              creative content creation, and data-driven growth strategies. From concept to execution, we handle every
              aspect of your social media presence to ensure maximum impact and engagement.
            </p>
          </motion.div>
        </section>

        {/* Services Grid */}
        <section className="max-w-7xl mx-auto px-6 mb-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-black text-[#FFFFFF] mb-6">Key Services</h2>
            <p className="text-lg text-[#C0C0C0] max-w-2xl mx-auto font-serif font-medium">
              Comprehensive social media solutions to grow your brand and engage your audience
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center p-6"
              >
                <service.icon className="w-12 h-12 text-[#FFFFFF] mx-auto mb-6" />
                <h3 className="text-lg font-bold text-[#FFFFFF] mb-3">{service.title}</h3>
                <p className="text-sm text-[#C0C0C0] font-serif font-medium leading-relaxed">{service.description}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Portfolio Highlights */}
        <section className="max-w-7xl mx-auto px-6 mb-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-black text-[#FFFFFF] mb-6">Campaign Highlights</h2>
            <p className="text-lg text-[#C0C0C0] max-w-2xl mx-auto font-serif font-medium">
              Success stories from our recent social media campaigns across various platforms
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {portfolioHighlights.map((highlight, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group"
              >
                <div className="relative aspect-square overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all duration-500 mb-4 retro-card">
                  <Image
                    src={highlight.image || "/placeholder.svg"}
                    alt={highlight.campaign}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  {/* Black filter overlay - stronger for the first image */}
                  <div
                    className={`absolute inset-0 w-full h-full ${
                      index === 0
                        ? "bg-black/60"
                        : index === 2
                          ? "bg-black/40"
                          : "bg-gradient-to-t from-black/80 to-transparent"
                    }`}
                  />
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <div className="text-sm font-serif font-medium text-[#C0C0C0]">{highlight.platform}</div>
                    <div className="text-lg font-bold">{highlight.metrics}</div>
                  </div>
                </div>
                <h3 className="font-bold text-[#FFFFFF]">{highlight.campaign}</h3>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Pages Handled */}
        <section className="max-w-4xl mx-auto px-6 mb-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-black text-[#FFFFFF] mb-6">Pages Handled</h2>
            <p className="text-lg text-[#C0C0C0] font-serif font-medium">
              Instagram accounts we've successfully managed and grown - click to visit
            </p>
          </motion.div>

          <motion.div
            id="instagram-card"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="retro-card p-12 text-center cursor-pointer hover:scale-105 transition-transform duration-300"
            onClick={() => handlePageClick(pagesHandled[currentPage]?.url)}
          >
            <div className="mb-8">
              <div className="relative inline-block">
                <Image
                  src={pagesHandled[currentPage]?.profileImage || "/placeholder.svg?height=80&width=80"}
                  alt={pagesHandled[currentPage]?.handle || "Instagram Page"}
                  width={80}
                  height={80}
                  className="rounded-full mx-auto mb-6 border-2 border-[#C0C0C0] object-cover"
                  onError={(e) => {
                    // Fallback to placeholder if profile pic fails to load
                    e.currentTarget.src = "/placeholder.svg?height=80&width=80"
                  }}
                />
                <ExternalLink className="absolute -top-2 -right-2 w-6 h-6 text-[#C0C0C0] bg-black rounded-full p-1 border border-[#C0C0C0]" />
              </div>

              <div className="mb-4">
                <motion.div
                  key={pagesHandled[currentPage]?.handle}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="text-2xl font-bold text-[#FFFFFF] mb-2 hover:text-[#C0C0C0] transition-colors"
                >
                  {pagesHandled[currentPage]?.handle}
                </motion.div>
                <div className="text-[#C0C0C0] text-sm font-serif mb-2">{pagesHandled[currentPage]?.platform}</div>
                <div className="text-lg font-bold text-[#FFFFFF] mb-4">{pagesHandled[currentPage]?.followers}</div>
              </div>

              <motion.p
                key={`desc-${currentPage}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="text-lg text-[#C0C0C0] mb-6 font-serif font-medium leading-relaxed"
              >
                {pagesHandled[currentPage]?.description}
              </motion.p>

              <div className="flex flex-wrap justify-center gap-2 mb-6">
                {pagesHandled[currentPage]?.achievements.map((achievement, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-[#C0C0C0]/20 text-[#C0C0C0] text-sm rounded-full border border-[#C0C0C0]/30"
                  >
                    {achievement}
                  </span>
                ))}
              </div>

              <div className="text-sm text-[#C0C0C0] font-serif opacity-75">Click to visit Instagram page</div>
            </div>

            <div className="flex justify-center space-x-2">
              {pagesHandled.map((_, index) => (
                <button
                  key={index}
                  onClick={(e) => {
                    e.stopPropagation()
                    setCurrentPage(index)
                    setAutoRotate(false) // Stop auto-rotation when manually selecting
                    setTimeout(() => setAutoRotate(true), 10000) // Resume after 10 seconds
                  }}
                  className={`w-3 h-3 rounded-full transition-colors duration-200 border border-[#C0C0C0] ${
                    index === currentPage ? "bg-[#C0C0C0]" : "bg-transparent"
                  }`}
                />
              ))}
            </div>
          </motion.div>
        </section>

        {/* Contact Form */}
        <section className="max-w-4xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="retro-card p-12"
          >
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-black text-[#FFFFFF] mb-4">
                Ready to Grow Your Social Presence?
              </h2>
              <p className="text-lg text-[#C0C0C0] font-serif font-medium">
                Let's discuss your social media goals and create a strategy that delivers results
              </p>
            </div>

            <form className="space-y-8" onSubmit={handleFormSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <label htmlFor="name" className="block text-sm font-bold text-[#FFFFFF] mb-3">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="w-full px-4 py-4 border-2 border-[#C0C0C0]/30 bg-[#C0C0C0]/10 text-[#FFFFFF] rounded-xl focus:ring-2 focus:ring-[#C0C0C0] focus:border-[#C0C0C0] font-medium shadow-sm retro-card"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-bold text-[#FFFFFF] mb-3">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="w-full px-4 py-4 border-2 border-[#C0C0C0]/30 bg-[#C0C0C0]/10 text-[#FFFFFF] rounded-xl focus:ring-2 focus:ring-[#C0C0C0] focus:border-[#C0C0C0] font-medium shadow-sm retro-card"
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="company" className="block text-sm font-bold text-[#FFFFFF] mb-3">
                  Company/Brand
                </label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  className="w-full px-4 py-4 border-2 border-[#C0C0C0]/30 bg-[#C0C0C0]/10 text-[#FFFFFF] rounded-xl focus:ring-2 focus:ring-[#C0C0C0] focus:border-[#C0C0C0] font-medium shadow-sm retro-card"
                  placeholder="Your company name"
                />
              </div>

              <div>
                <label htmlFor="services" className="block text-sm font-bold text-[#FFFFFF] mb-3">
                  Services Interested In
                </label>
                <select
                  id="services"
                  name="services"
                  className="w-full px-4 py-4 border-2 border-[#C0C0C0]/50 bg-[#1a1a1a] text-[#FFFFFF] rounded-xl focus:ring-2 focus:ring-[#C0C0C0] focus:border-[#C0C0C0] font-medium shadow-sm retro-card appearance-none cursor-pointer"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%23FFFFFF' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`,
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "right 1rem center",
                    backgroundSize: "16px 16px",
                  }}
                >
                  <option value="" style={{ backgroundColor: "#1a1a1a", color: "#FFFFFF" }}>
                    Select a service
                  </option>
                  <option value="content-creation" style={{ backgroundColor: "#1a1a1a", color: "#FFFFFF" }}>
                    Content Creation
                  </option>
                  <option value="social-management" style={{ backgroundColor: "#1a1a1a", color: "#FFFFFF" }}>
                    Social Media Management
                  </option>
                  <option value="paid-advertising" style={{ backgroundColor: "#1a1a1a", color: "#FFFFFF" }}>
                    Paid Advertising
                  </option>
                  <option value="strategy-consulting" style={{ backgroundColor: "#1a1a1a", color: "#FFFFFF" }}>
                    Strategy Consulting
                  </option>
                  <option value="full-service" style={{ backgroundColor: "#1a1a1a", color: "#FFFFFF" }}>
                    Full-Service Package
                  </option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-bold text-[#FFFFFF] mb-3">
                  Project Details
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  className="w-full px-4 py-4 border-2 border-[#C0C0C0]/30 bg-[#C0C0C0]/10 text-[#FFFFFF] rounded-xl focus:ring-2 focus:ring-[#C0C0C0] focus:border-[#C0C0C0] font-medium shadow-sm retro-card"
                  placeholder="Tell us about your project, goals, and timeline..."
                ></textarea>
              </div>

              <div className="text-center">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  className="retro-button text-[#000000] px-12 py-4 font-bold"
                >
                  Send Inquiry
                </motion.button>
              </div>
            </form>
          </motion.div>
        </section>
      </main>
    </div>
  )
}
