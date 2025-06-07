"use client"

import { motion } from "framer-motion"
import Navigation from "@/components/navigation"
import Image from "next/image"
import { Calendar, BarChart3, Camera, Bot } from "lucide-react"
import { useState, useEffect, type FormEvent } from "react"
import { sendFormToWhatsApp } from "@/lib/whatsapp"

export default function SocialMediaPage() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0)

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

  // 🎯 EASY TO EDIT: Replace these with your actual campaign images
  const portfolioHighlights = [
    {
      platform: "Instagram",
      campaign: "Fashion Brand Launch",
      metrics: "300% engagement increase",
      image: "/images/campaign-instagram.jpeg", // ← Replace with your image
    },
    {
      platform: "TikTok",
      campaign: "Viral Challenge",
      metrics: "2M+ views",
      image: "/images/campaign-tiktok.jpeg", // ← Replace with your image
    },
    {
      platform: "LinkedIn",
      campaign: "B2B Lead Generation",
      metrics: "150% lead increase",
      image: "/images/campaign-linkedin.jpeg", // ← Replace with your image
    },
    {
      platform: "YouTube",
      campaign: "Product Tutorial Series",
      metrics: "500K+ subscribers",
      image: "/images/campaign-youtube.jpeg", // ← Replace with your image
    },
  ]

  // Get testimonials from admin panel data
  const [testimonials, setTestimonials] = useState<any[]>([])

  useEffect(() => {
    const savedTestimonials = localStorage.getItem("psa-testimonials")
    if (savedTestimonials) {
      setTestimonials(JSON.parse(savedTestimonials))
    }
  }, [])

  // Update the currentTestimonial state to handle bounds checking
  useEffect(() => {
    if (testimonials.length > 0 && currentTestimonial >= testimonials.length) {
      setCurrentTestimonial(0)
    }
  }, [testimonials, currentTestimonial])

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
            <p className="text-lg text-[#C0C0C0] max-w-4xl mx-auto leading-relaxed font-sans font-medium">
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
            <p className="text-lg text-[#C0C0C0] max-w-2xl mx-auto font-sans font-medium">
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
                <p className="text-sm text-[#F8F8F8] font-sans font-medium leading-relaxed">{service.description}</p>
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
            <p className="text-lg text-[#C0C0C0] max-w-2xl mx-auto font-sans font-medium">
              Success stories from our recent social media campaigns across various platforms
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
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
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <div className="text-sm font-sans font-medium text-[#C0C0C0]">{highlight.platform}</div>
                    <div className="text-lg font-bold">{highlight.metrics}</div>
                  </div>
                </div>
                <h3 className="font-bold text-[#FFFFFF]">{highlight.campaign}</h3>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Testimonials */}
        <section className="max-w-4xl mx-auto px-6 mb-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-black text-[#FFFFFF] mb-6">Client Testimonials</h2>
          </motion.div>

          {testimonials.length > 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="retro-card p-12 text-center"
            >
              <div className="mb-8">
                <Image
                  src={testimonials[currentTestimonial]?.src || "/placeholder.svg"}
                  alt={testimonials[currentTestimonial]?.title || "Client"}
                  width={60}
                  height={60}
                  className="rounded-full mx-auto mb-6 border-2 border-[#C0C0C0]"
                />
                <blockquote className="text-lg text-[#C0C0C0] italic mb-6 font-sans font-medium">
                  "{testimonials[currentTestimonial]?.description}"
                </blockquote>
                <div className="font-bold text-[#FFFFFF]">{testimonials[currentTestimonial]?.title}</div>
                <div className="text-[#C0C0C0] text-sm font-sans">{testimonials[currentTestimonial]?.category}</div>
              </div>

              <div className="flex justify-center space-x-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentTestimonial(index)}
                    className={`w-3 h-3 rounded-full transition-colors duration-200 border border-[#C0C0C0] ${
                      index === currentTestimonial ? "bg-[#C0C0C0]" : "bg-transparent"
                    }`}
                  />
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="retro-card p-12 text-center"
            >
              <div className="text-[#C0C0C0] font-sans">
                <p className="text-lg mb-4">No testimonials available yet.</p>
                <p className="text-sm">
                  Add client testimonials from the admin panel to showcase your success stories.
                </p>
              </div>
            </motion.div>
          )}
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
              <p className="text-lg text-[#C0C0C0] font-sans font-medium">
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
