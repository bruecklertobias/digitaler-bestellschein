"use client"

import { Inter } from "next/font/google"
import "./globals.css"
import { CartProvider } from "@/components/shopping-cart"
import type React from "react"
import Link from "next/link"
import Image from "next/image"

const inter = Inter({ subsets: ["latin"] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="de">
      <body className={inter.className}>
        <CartProvider>{children}</CartProvider>
        <footer className="bg-gray-100 py-8 mt-16">
          <div className="container mx-auto px-4 text-center">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/hager_schiefer%20logo_mit%20Edelwei%C3%9F-7i9NdnPnzDYgTqJueUbgCG2WjByzQP.png"
              alt="Hager Schiefer Logo"
              width={120}
              height={48}
              className="mx-auto mb-4"
            />
            <p className="text-gray-600 mb-4">&copy; 2025 Hager Schiefer. Alle Rechte vorbehalten.</p>
            <div className="space-x-4">
              <Link href="/datenschutz" className="text-brand hover:underline">
                Datenschutz
              </Link>
              <Link href="/agb" className="text-brand hover:underline">
                AGB
              </Link>
              <Link href="/kontakt" className="text-brand hover:underline">
                Kontakt
              </Link>
            </div>
          </div>
        </footer>
      </body>
    </html>
  )
}



import './globals.css'

export const metadata = {
      generator: 'v0.dev'
    };
