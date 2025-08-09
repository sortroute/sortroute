import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import SiteHeader from "@/components/SiteHeader"
import SiteFooter from "@/components/SiteFooter"

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] })
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Sortroute",
  description: "Curated tools, templates, and workflows.",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} bg-neutral-100 text-neutral-900`}>
        <SiteHeader />
        <main className="mx-auto max-w-6xl px-4 py-12">{children}</main>
        <SiteFooter />
      </body>
    </html>
  )
}