"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react"
import { Menu, X } from "lucide-react"

export default function Navigation() {
  const pathname = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const navItems = [
    { href: "/", label: "HOME" },
    { href: "/cinematography", label: "CINEMATOGRAPHY" },
    { href: "/video-editing-coming-soon", label: "VIDEO EDITING" },
    { href: "/social-media", label: "SOCIAL MEDIA" },
  ]

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
  }

  return (
    <>
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="fixed top-0 left-0 right-0 bg-black/90 backdrop-blur-md border-b border-[#C0C0C0] z-50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            <Link
              href="/"
              className="text-base sm:text-lg font-black text-[#FFFFFF] tracking-tight"
              onClick={closeMobileMenu}
            >
              PSA STUDIOS
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-6 lg:space-x-8">
              {navItems.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  className={`text-xs lg:text-sm font-bold transition-colors duration-200 tracking-tight ${
                    pathname === href ? "text-[#FFFFFF]" : "text-[#C0C0C0] hover:text-[#FFFFFF]"
                  }`}
                >
                  {label}
                </Link>
              ))}
            </div>

            {/* Mobile menu button */}
            <button
              className="md:hidden text-[#C0C0C0] hover:text-[#FFFFFF] transition-colors duration-200 p-2"
              onClick={toggleMobileMenu}
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed top-[60px] left-0 right-0 bg-black/95 backdrop-blur-md border-b border-[#C0C0C0]/30 z-40 md:hidden"
          >
            <div className="px-4 py-6 space-y-4">
              {navItems.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  className={`block text-sm font-bold transition-colors duration-200 tracking-tight py-2 ${
                    pathname === href ? "text-[#FFFFFF]" : "text-[#C0C0C0] hover:text-[#FFFFFF]"
                  }`}
                  onClick={closeMobileMenu}
                >
                  {label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-30 md:hidden"
            onClick={closeMobileMenu}
          />
        )}
      </AnimatePresence>
    </>
  )
}
