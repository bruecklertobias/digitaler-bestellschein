"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { ChevronLeft, User, LogOut, ShoppingCartIcon, ChevronUp, ZoomIn, CheckIcon } from "lucide-react"
import { Inter } from "next/font/google"
import { ShoppingCart, useCart } from "@/components/shopping-cart"
import { motion, AnimatePresence } from "framer-motion"

const inter = Inter({ subsets: ["latin"] })

// Sample product data
const products = {
  damen: [
    {
      id: 1,
      name: "Polo Shirt mit Logo",
      price: 29.99,
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/14665_Polo_M%C3%A4dchen_mit_Logo_und_Name-removebg-preview-riiAHvNtblpRFgpci3JQIalpvTNzIp.png",
      description: "Hochwertiges Polo-Shirt mit gesticktem Schullogo. Atmungsaktiv und pflegeleicht.",
      sizes: ["XS", "S", "M", "L", "XL"],
    },
    {
      id: 2,
      name: "Bistroschürze",
      price: 19.99,
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/13833_Bistrosch%C3%BCrze_M%C3%A4dchen_und_Burschen-removebg-preview-MjzwU0Y6mjOK7tmbwimJhBMvjLGAlW.png",
      description: "Professionelle Bistroschürze in hellgrün. Strapazierfähiges Material.",
      sizes: ["Universal"],
    },
  ],
  herren: [
    {
      id: 3,
      name: "Kochjacke mit Logo",
      price: 39.99,
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/111701_Kochjacke_Burschen_mit_Logo-removebg-preview-JvK8iMKzVzqXmIx4YIobGSRH69FIMC.png",
      description: "Professionelle Kochjacke aus hochwertigem Material mit gesticktem Logo.",
      sizes: ["S", "M", "L", "XL", "XXL"],
    },
    {
      id: 4,
      name: "Kochmütze",
      price: 14.99,
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/8606_Kochm%C3%BCtze_Burschen_und_M%C3%A4dchen-removebg-preview-fkUD0HRUbx1YDNHNYUaQ597rKRAb04.png",
      description: "Klassische Kochmütze in Weiß. Verstellbar und atmungsaktiv.",
      sizes: ["Universal"],
    },
    {
      id: 5,
      name: "Küchenschuhe",
      price: 49.99,
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/25784_Schuh_K%C3%BCche_Burschen_und_M%C3%A4dchen-removebg-preview-ROwAy7WorPwp3o5vdeZoLOj7HCedz0.png",
      description: "Rutschfeste Arbeitsschuhe für die Küche. Bequem und sicher.",
      sizes: ["36", "37", "38", "39", "40", "41", "42", "43", "44", "45"],
    },
  ],
}

const schools = {
  "hlw-auhof": {
    name: "HLW Auhof",
    logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Logo_HLW%20Auhof-8XfCQ3jWGMlD1slw7Yp0Q3CLskOE92.png",
  },
  "hlw-perg": {
    name: "HLW Perg",
    logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/hlwperg-kaD4v3m4NiQ4sLzW3OBdrVFMLiwV9N.png",
  },
  "hblw-wels": {
    name: "HBLW Wels",
    logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/HBLW%20Wels.jpg-ivNHVlMmLnZZy13hZyAfRwykczqaXw.jpeg",
  },
}

export default function ProductsPage() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  const params = useParams()
  const schoolId = params.schoolId as string
  const school = schools[schoolId as keyof typeof schools]
  const { addToCart } = useCart()
  const router = useRouter()

  const [selectedSizes, setSelectedSizes] = useState<{ [key: number]: string }>({})
  const [quantities, setQuantities] = useState<{ [key: number]: number }>({})
  const [showScrollTop, setShowScrollTop] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  if (!school) {
    return <div>School not found</div>
  }

  const handleAddToCart = (product: any) => {
    const size = selectedSizes[product.id] || product.sizes[0]
    const quantity = quantities[product.id] || 1
    addToCart({ ...product, size, quantity })
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <div className={`min-h-screen bg-gradient-to-br from-[#f0f4f5] via-[#e8f0f2] to-[#d1e3e7] ${inter.className}`}>
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-sm shadow-md">
        <div className="container mx-auto px-4">
          <div className="flex flex-col sm:flex-row items-center justify-between py-4 sm:py-6">
            <div className="flex items-center space-x-4 mb-4 sm:mb-0">
              <Link href="/">
                <Button variant="ghost" size="sm" className="text-brand hover:bg-brand/10">
                  <ChevronLeft className="mr-2 h-5 w-5" />
                  <span className="hidden sm:inline">Zurück</span>
                </Button>
              </Link>
              <div className="flex items-center space-x-2 sm:space-x-4">
                <Image
                  src={school.logo || "/placeholder.svg"}
                  alt={`${school.name} Logo`}
                  width={60}
                  height={60}
                  className="object-contain"
                />
                <h1 className="text-xl sm:text-2xl font-semibold text-brand">{school.name}</h1>
              </div>
            </div>
            <div className="flex items-center space-x-4 sm:space-x-6">
              <Button
                variant="ghost"
                size="sm"
                className="text-brand hover:bg-brand/10"
                onClick={() => router.push("/profile")}
              >
                <User className="h-4 w-4 sm:mr-2" />
                <span className="hidden sm:inline">Profil</span>
              </Button>
              <Button variant="ghost" size="sm" className="text-brand hover:bg-brand/10">
                <LogOut className="h-4 w-4 sm:mr-2" />
                <span className="hidden sm:inline">Abmelden</span>
              </Button>
              <ShoppingCart />
            </div>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="container mx-auto py-12 px-4">
        {/* Damen Section */}
        <section id="damen" className="mb-16">
          <h2 className="text-3xl font-bold text-brand mb-8 pb-2 border-b-2 border-brand">Damen</h2>
          <div className="grid gap-4 grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            <AnimatePresence>
              {products.damen.map((product) => (
                <ProductCard key={product.id} product={product} onAddToCart={handleAddToCart} />
              ))}
            </AnimatePresence>
          </div>
        </section>

        {/* Herren Section */}
        <section id="herren">
          <h2 className="text-3xl font-bold text-brand mb-8 pb-2 border-b-2 border-brand">Herren</h2>
          <div className="grid gap-4 grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            <AnimatePresence>
              {products.herren.map((product) => (
                <ProductCard key={product.id} product={product} onAddToCart={handleAddToCart} />
              ))}
            </AnimatePresence>
          </div>
        </section>
      </main>

      {/* Scroll to top button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-8 right-8 z-50"
          >
            <Button className="bg-brand hover:bg-brand/90 text-white rounded-full p-3" onClick={scrollToTop}>
              <ChevronUp className="h-6 w-6" />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function ProductCard({ product, onAddToCart }) {
  const [selectedSize, setSelectedSize] = useState(product.sizes[0])
  const [quantity, setQuantity] = useState(1)
  const [isZoomed, setIsZoomed] = useState(false)
  const [isAddedToCart, setIsAddedToCart] = useState(false)

  const handleAddToCart = () => {
    onAddToCart({ ...product, size: selectedSize, quantity })
    setIsAddedToCart(true)
    setTimeout(() => setIsAddedToCart(false), 2000)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <Card
        className={`overflow-hidden transition-all duration-300 hover:shadow-lg hover:scale-102 bg-white/95 backdrop-blur-sm h-[400px] flex flex-col relative ${
          isAddedToCart ? "ring-2 ring-green-500 ring-opacity-100" : ""
        }`}
      >
        <CardContent className="p-2 flex flex-col h-full space-y-2">
          <div className="relative h-40 w-full mb-3 bg-white rounded-lg overflow-hidden group">
            <Image
              src={product.image || "/placeholder.svg"}
              alt={product.name}
              fill
              className={`object-contain p-1 transition-all duration-300 ${
                isZoomed ? "scale-150" : "group-hover:scale-110"
              }`}
            />
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <Button
                variant="secondary"
                size="icon"
                className="bg-white/80 hover:bg-white w-8 h-8"
                onClick={() => setIsZoomed(!isZoomed)}
              >
                <ZoomIn className="h-3 w-3" />
              </Button>
            </div>
          </div>
          <h3 className="text-sm font-semibold text-brand mb-2 truncate">{product.name}</h3>
          <p className="text-base font-bold text-brand mb-2">€{product.price.toFixed(2)}</p>
          <p className="text-xs text-gray-600 mb-3 line-clamp-2">{product.description}</p>
          <div className="grid grid-cols-3 gap-2">
            <div className="col-span-2">
              <Select value={selectedSize} onValueChange={setSelectedSize}>
                <SelectTrigger className="w-full text-xs">
                  <SelectValue placeholder="Größe" />
                </SelectTrigger>
                <SelectContent>
                  {product.sizes.map((size) => (
                    <SelectItem key={size} value={size}>
                      {size}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Input
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(Number.parseInt(e.target.value))}
              className="w-full text-xs"
              placeholder="Menge"
            />
          </div>
          <AnimatePresence mode="wait">
            {isAddedToCart ? (
              <motion.div
                key="added"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="w-full bg-green-500 text-white text-sm py-2 rounded flex items-center justify-center"
              >
                <CheckIcon className="mr-2 h-4 w-4" />
                <span className="font-bold">Hinzugefügt</span>
              </motion.div>
            ) : (
              <motion.div key="add" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <Button
                  className="w-full bg-brand hover:bg-brand/90 text-white transition-all duration-300 ease-in-out transform hover:scale-102 text-sm py-2 sm:flex sm:items-center sm:justify-center"
                  onClick={handleAddToCart}
                >
                  <ShoppingCartIcon className="h-4 w-4 sm:mr-2" />
                  <span className="hidden sm:inline">In den Warenkorb</span>
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>
        {isAddedToCart && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            className="absolute top-2 right-2 bg-green-500 rounded-full p-1"
          >
            <CheckIcon className="h-4 w-4 text-white" />
          </motion.div>
        )}
      </Card>
    </motion.div>
  )
}

{
  /* Footer */
}
;<footer className="bg-white/90 backdrop-blur-sm py-8 sm:py-12 mt-16 sm:mt-24">
  <div className="container mx-auto px-4 text-center">
    <p className="text-sm sm:text-base text-gray-600 mb-4">&copy; 2025 Hager Schiefer. Alle Rechte vorbehalten.</p>
    <div className="space-x-4 sm:space-x-6">
      <Link href="/datenschutz" className="text-sm sm:text-base text-brand hover:underline transition-all duration-300">
        Datenschutz
      </Link>
      <Link href="/agb" className="text-sm sm:text-base text-brand hover:underline transition-all duration-300">
        AGB
      </Link>
      <Link href="/kontakt" className="text-sm sm:text-base text-brand hover:underline transition-all duration-300">
        Kontakt
      </Link>
    </div>
  </div>
</footer>

