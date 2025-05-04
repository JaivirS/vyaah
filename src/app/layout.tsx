import type React from "react"
import "./globals.css"
import { Playfair_Display, Dancing_Script } from "next/font/google"

// Elegant serif font for headings
const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-playfair",
})

// Script font for accents
const dancingScript = Dancing_Script({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-dancing-script",
})

export const metadata = {
  title: "Anhad & Varan Wedding",
  description: "Wedding seating arrangements",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${dancingScript.variable}`}>
      <body style={{ margin: 0, padding: 0, backgroundColor: "black" }}>{children}</body>
    </html>
  )
}
