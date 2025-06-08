"use client"

import { motion } from "framer-motion"
import Navigation from "@/components/navigation"
import { sendToWhatsApp } from "@/lib/whatsapp"

export default function VideoEditingComingSoonPage() {
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
