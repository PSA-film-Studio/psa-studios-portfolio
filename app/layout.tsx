import type React from "react"
import type { Metadata } from "next"
import { Montserrat, Roboto } from "next/font/google"
import "./globals.css"
import AdminLink from "@/components/admin-link"

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-montserrat",
})

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-roboto",
})

export const metadata: Metadata = {
  title: "PSA Studios - Visual Storytelling & Creative Solutions",
  description:
    "PSA Studios offers professional cinematography, video editing, and social media management services. Transform your vision into compelling visual stories.",
  generator: "v0.dev",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body
        className={`${montserrat.variable} ${roboto.variable} font-sans relative`}
        style={{ backgroundColor: "#000000" }}
      >
        <div className="noise-overlay"></div>
        {children}
        <AdminLink />
      </body>
    </html>
  )
}
