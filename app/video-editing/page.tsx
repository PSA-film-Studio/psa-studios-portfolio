"use client"

import { motion } from "framer-motion"
import Navigation from "@/components/navigation"
import { Palette, Zap, Award, BookOpen, Cpu, Sparkles } from "lucide-react"
import { sendToWhatsApp } from "@/lib/whatsapp"
import { useState, useEffect } from "react"

interface Project {
  id: string
  title: string
  category: string
  description: string
  thumbnail: string
  url?: string
  isExternal?: boolean
}

export default function VideoEditingPage() {
  const [projects, setProjects] = useState<Project[]>([])

  useEffect(() => {
    const savedProjects = localStorage.getItem("psaStudiosProjects")
    if (savedProjects) {
      setProjects(JSON.parse(savedProjects))
    }
  }, [])

  const editingStyles = [
    {
      icon: Award,
      title: "Premium Quality",
      description: "Broadcast-quality output with attention to every detail and technical standard",
    },
    {
      icon: BookOpen,
      title: "Storytelling",
      description: "Expert narrative structure and emotional pacing to captivate your audience",
    },
    {
      icon: Zap,
      title: "Motion Graphics",
      description: "Dynamic animations and visual effects that bring your content to life",
    },
    {
      icon: Palette,
      title: "Color Grading",
      description: "Professional color correction and grading to enhance mood and visual consistency",
    },
    {
      icon: Cpu,
      title: "Generative AI",
      description: "Cutting-edge AI tools for enhanced creativity and efficient workflow optimization",
    },
    {
      icon: Sparkles,
      title: "Visual FX",
      description: "Professional visual effects and compositing for cinematic impact",
    },
  ]

  const handleProjectClick = (project: Project) => {
    if (project.url && project.isExternal) {
      window.open(project.url, "_blank")
    }
  }

  return (
    <div className="min-h-screen text-[#FFFFFF]" style={{ background: "#000000" }}>
      <Navigation />

      <main className="pt-24 pb-16">
        <section className="max-w-7xl mx-auto px-6 min-h-[80vh] flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-6xl font-black text-[#FFFFFF] mb-8 leading-tight tracking-tight">
              Video Editing
            </h1>
            <div className="retro-card p-12 max-w-2xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold text-[#FFFFFF] mb-6">Coming Soon</h2>
              <p className="text-lg text-[#C0C0C0] mb-8 font-sans font-medium leading-relaxed">
                We're working on something amazing for our video editing showcase. Stay tuned for updates!
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() =>
                  sendToWhatsApp(
                    "Hi! I'm interested in your video editing services. I'd like to discuss my project requirements.",
                  )
                }
                className="retro-button text-[#000000] px-8 py-3 font-bold"
              >
                Contact Us
              </motion.button>
            </div>
          </motion.div>
        </section>
      </main>
    </div>
  )
}
