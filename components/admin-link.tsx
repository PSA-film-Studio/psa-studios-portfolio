"use client"

import { useState } from "react"
import { Settings } from "lucide-react"
import Link from "next/link"

export default function AdminLink() {
  const [showAdmin, setShowAdmin] = useState(false)

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div
        className="bg-white/10 backdrop-blur-md p-3 rounded-full cursor-pointer hover:bg-white/20 transition-colors duration-200"
        onClick={() => setShowAdmin(!showAdmin)}
      >
        <Settings className="w-5 h-5 text-white" />
      </div>

      {showAdmin && (
        <div className="absolute bottom-16 right-0 bg-black/90 backdrop-blur-md border border-white/20 rounded-lg p-4 min-w-[200px]">
          <Link
            href="/admin"
            className="block text-white hover:text-gray-300 transition-colors duration-200 text-sm font-medium"
          >
            Admin Panel
          </Link>
        </div>
      )}
    </div>
  )
}
