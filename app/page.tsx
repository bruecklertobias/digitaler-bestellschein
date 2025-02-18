"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { User, LogIn, ChevronDown, ShieldCheck } from "lucide-react"
import { Inter } from "next/font/google"
import { ShoppingCart as ShoppingCartComponent } from "@/components/shopping-cart"

const inter = Inter({ subsets: ["latin"] })

const schools = [
  {
    id: "hlw-auhof",
    name: "HLW Auhof",
    location: "Aubrunnerweg 4, 4040 Linz",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Logo_HLW%20Auhof-8XfCQ3jWGMlD1slw7Yp0Q3CLskOE92.png",
  },
  {
    id: "hlw-perg",
    name: "HLW Perg",
    location: "Machlandstraße 46, 4320 Perg",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/hlwperg-kaD4v3m4NiQ4sLzW3OBdrVFMLiwV9N.png",
  },
  {
    id: "hblw-wels",
    name: "HBLW Wels",
    location: "Wallerer Str. 32, 4600 Wels",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/HBLW%20Wels.jpg-ivNHVlMmLnZZy13hZyAfRwykczqaXw.jpeg",
  },
]

export default function LandingPage() {
  const router = useRouter()
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleSchoolSelect = (schoolId: string) => {
    router.push(`/schools/${schoolId}`)
  }

  const scrollToSchools = () => {
    const schoolsSection = document.getElementById("schools-section")
    if (schoolsSection) {
      schoolsSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Floating Navigation */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? "bg-white/80 backdrop-blur-md shadow-md" : "bg-transparent"
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-4">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/hager_schiefer%20logo_mit%20Edelwei%C3%9F-7i9NdnPnzDYgTqJueUbgCG2WjByzQP.png"
              alt="Hager Schiefer Logo"
              width={120}
              height={48}
              className={`transition-opacity duration-300 ${isScrolled ? "opacity-100" : "opacity-0"}`}
            />
            <div className="flex items-center space-x-2 md:space-x-4">
              <Button
                variant="ghost"
                size="sm"
                className="text-brand hover:bg-brand/10"
                onClick={() => router.push("/admin")}
              >
                <ShieldCheck className="h-4 w-4 md:mr-2" />
                <span className="hidden md:inline">Admin</span>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="text-brand hover:bg-brand/10"
                onClick={() => router.push("/profile")}
              >
                <User className="h-4 w-4 md:mr-2" />
                <span className="hidden md:inline">Profil</span>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="text-brand hover:bg-brand/10"
                onClick={() => router.push("/login")}
              >
                <LogIn className="h-4 w-4 md:mr-2" />
                <span className="hidden md:inline">Anmelden</span>
              </Button>
              <ShoppingCartComponent />
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header
        className={`relative bg-gradient-to-br from-[#e8f0f2] via-[#d1e3e7] to-[#bbd6dc] py-20 md:py-32 ${inter.className}`}
      >
        <div className="container mx-auto px-4">
          <div className="grid gap-8 md:grid-cols-2 items-center">
            <div className="space-y-6 text-center md:text-left">
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight lg:text-6xl text-brand">
                Digitaler
                <br />
                Bestellschein
              </h1>
              <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
                Vorbestellen war noch nie so einfach.
                <br className="md:hidden" />
                Deine Schulgarderobe goes digital!
              </p>
              <Button
                className="bg-brand hover:bg-brand/90 text-white text-lg px-6 py-3 md:px-8 md:py-6 rounded-full transition-all duration-300 ease-in-out transform hover:scale-105"
                onClick={scrollToSchools}
              >
                Jetzt bestellen
              </Button>
            </div>
            <div className="relative h-64 md:h-96 animate-float order-first md:order-last">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/hager_schiefer%20logo_Jubil%C3%A4um-YNDAViAhJDLtRKOlZS4a6lvfRCDycI.png"
                alt="Hager Schiefer 100 Jahre Logo"
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

      <main className="container mx-auto py-16 md:py-24 px-4" id="schools-section">
        <h2 className="mb-12 text-3xl md:text-4xl font-bold text-center text-brand">Wählen Sie Ihre Schule</h2>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {schools.map((school) => (
            <Card
              key={school.id}
              className="overflow-hidden transition-all duration-300 hover:shadow-2xl hover:scale-105 cursor-pointer bg-white/50 backdrop-blur-sm"
              onClick={() => handleSchoolSelect(school.id)}
            >
              <CardContent className="p-4 md:p-6">
                <div className="relative h-32 md:h-36 w-full mb-4 bg-gray-50 rounded-lg overflow-hidden">
                  <Image
                    src={school.image || "/placeholder.svg"}
                    alt={`${school.name} logo`}
                    fill
                    className="object-contain p-3 transition-transform duration-300 hover:scale-110"
                  />
                </div>
                <h3 className="mb-2 text-lg md:text-xl font-semibold text-brand">{school.name}</h3>
                <p className="text-sm text-gray-600 mb-4">{school.location}</p>
                <Button
                  variant="outline"
                  className="w-full border-brand text-brand hover:bg-brand hover:text-white transition-all duration-300"
                >
                  Auswählen
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  )
}

