"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ShoppingCart, User, LogIn, ChevronDown } from "lucide-react"
import { Inter } from "next/font/google"

const inter = Inter({ subsets: ["latin"] })

const schools = [
  {
    name: "HLW Auhof",
    location: "Aubrunnerweg 4, 4040 Linz",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Logo_HLW%20Auhof-8XfCQ3jWGMlD1slw7Yp0Q3CLskOE92.png",
  },
  {
    name: "HLW Perg",
    location: "Machlandstraße 46, 4320 Perg",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/hlwperg-kaD4v3m4NiQ4sLzW3OBdrVFMLiwV9N.png",
  },
  {
    name: "HBLW Wels",
    location: "Wallerer Str. 32, 4600 Wels",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/HBLW%20Wels.jpg-ivNHVlMmLnZZy13hZyAfRwykczqaXw.jpeg",
  },
]

export default function LandingPage() {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Floating Navigation */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "bg-white shadow-md" : "bg-transparent"}`}
      >
        <div className="container mx-auto flex items-center justify-between py-4">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/hager_schiefer%20logo_Jubil%C3%A4um-jfNgVGeEQx2QGQKzGq9kVI1Xx5F1Lu.png"
            alt="Hager Schiefer Logo"
            width={120}
            height={48}
            className={`transition-opacity duration-300 ${isScrolled ? "opacity-100" : "opacity-0"}`}
          />
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" className="text-brand hover:bg-brand/10">
              <User className="mr-2 h-4 w-4" />
              Profil
            </Button>
            <Button variant="ghost" size="sm" className="text-brand hover:bg-brand/10">
              <LogIn className="mr-2 h-4 w-4" />
              Anmelden
            </Button>
            <Button variant="default" size="sm" className="bg-brand hover:bg-brand/90 text-white">
              <ShoppingCart className="mr-2 h-4 w-4" />
              Warenkorb
              <div className="ml-2 rounded-full bg-white px-2 py-0.5 text-xs font-semibold text-brand">0</div>
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header
        className={`relative bg-gradient-to-br from-[#e8f0f2] via-[#d1e3e7] to-[#bbd6dc] py-20 ${inter.className}`}
      >
        <div className="container mx-auto px-4">
          <div className="grid gap-8 md:grid-cols-2 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl font-bold tracking-tight md:text-5xl text-black">Digitaler Bestellschein</h1>
              <p className="text-xl text-black">
                Vorbestellen war noch nie so einfach deine Schulgarderobe goes digital!
              </p>
            </div>
            <div className="relative h-64 md:h-96">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/hager_schiefer%20logo_Jubil%C3%A4um-jfNgVGeEQx2QGQKzGq9kVI1Xx5F1Lu.png"
                alt="Hager Schiefer Logo"
                fill
                className="object-contain"
              />
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 flex justify-center">
          <ChevronDown className="h-12 w-12 animate-bounce text-brand opacity-50" />
        </div>
      </header>

      <main className="container mx-auto py-16 px-4">
        <h2 className="mb-12 text-3xl font-bold text-center text-brand">Wählen Sie Ihre Schule</h2>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {schools.map((school, index) => (
            <Card key={index} className="overflow-hidden transition-all hover:shadow-xl hover:scale-105">
              <CardContent className="p-6">
                <div className="relative h-40 w-full mb-4 bg-gray-50 rounded-lg">
                  <Image
                    src={school.image || "/placeholder.svg"}
                    alt={`${school.name} logo`}
                    fill
                    className="object-contain p-4"
                  />
                </div>
                <h3 className="mb-2 text-xl font-semibold text-brand">{school.name}</h3>
                <p className="text-sm text-muted-foreground mb-4">{school.location}</p>
                <Button variant="outline" className="w-full border-brand text-brand hover:bg-brand hover:text-white">
                  Auswählen
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>

      <footer className="bg-gray-100 py-8 mt-16">
        <div className="container mx-auto px-4 text-center text-sm text-gray-600">
          <p>&copy; 2025 Hager Schiefer. Alle Rechte vorbehalten.</p>
          <div className="mt-4 space-x-4">
            <a href="#" className="hover:text-brand">
              Datenschutz
            </a>
            <a href="#" className="hover:text-brand">
              AGB
            </a>
            <a href="#" className="hover:text-brand">
              Kontakt
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}

