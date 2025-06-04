"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"

export default function Navigation() {
  const pathname = usePathname()

  const navItems = [
    { href: "/", label: "HOME" },
    { href: "/cinematography", label: "CINEMATOGRAPHY" },
    { href: "/video-editing", label: "VIDEO EDITING" },
    { href: "/social-media", label: "SOCIAL MEDIA" },
  ]

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 left-0 right-0 bg-black/90 backdrop-blur-md border-b border-[#C0C0C0] z-50"
    >
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-lg font-black text-[#FFFFFF] tracking-tight">
            PSA STUDIOS
          </Link>

          <div className="hidden md:flex space-x-8">
            {navItems.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={`text-sm font-bold transition-colors duration-200 tracking-tight ${
                  pathname === href ? "text-[#FFFFFF]" : "text-[#C0C0C0] hover:text-[#FFFFFF]"
                }`}
              >
                {label}
              </Link>
            ))}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button className="text-[#C0C0C0] hover:text-[#FFFFFF] transition-colors duration-200">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </motion.nav>
  )
}
