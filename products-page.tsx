"use client"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { ChevronLeft, ShoppingCart, User, LogOut } from "lucide-react"
import { Inter } from "next/font/google"

const inter = Inter({ subsets: ["latin"] })

// Sample product data
const products = {
  damen: [
    {
      id: 1,
      name: "Polo Shirt mit Logo",
      price: "29.99",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/14665_Polo_M%C3%A4dchen_mit_Logo_und_Name-removebg-preview-riiAHvNtblpRFgpci3JQIalpvTNzIp.png",
      description: "Hochwertiges Polo-Shirt mit gesticktem Schullogo. Atmungsaktiv und pflegeleicht.",
      sizes: ["XS", "S", "M", "L", "XL"],
    },
    {
      id: 2,
      name: "Bistroschürze",
      price: "19.99",
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
      price: "39.99",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/111701_Kochjacke_Burschen_mit_Logo-removebg-preview-JvK8iMKzVzqXmIx4YIobGSRH69FIMC.png",
      description: "Professionelle Kochjacke aus hochwertigem Material mit gesticktem Logo.",
      sizes: ["S", "M", "L", "XL", "XXL"],
    },
    {
      id: 4,
      name: "Kochmütze",
      price: "14.99",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/8606_Kochm%C3%BCtze_Burschen_und_M%C3%A4dchen-removebg-preview-fkUD0HRUbx1YDNHNYUaQ597rKRAb04.png",
      description: "Klassische Kochmütze in Weiß. Verstellbar und atmungsaktiv.",
      sizes: ["Universal"],
    },
    {
      id: 5,
      name: "Küchenschuhe",
      price: "49.99",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/25784_Schuh_K%C3%BCche_Burschen_und_M%C3%A4dchen-removebg-preview-ROwAy7WorPwp3o5vdeZoLOj7HCedz0.png",
      description: "Rutschfeste Arbeitsschuhe für die Küche. Bequem und sicher.",
      sizes: ["36", "37", "38", "39", "40", "41", "42", "43", "44", "45"],
    },
  ],
}

export default function ProductsPage() {
  return (
    <div className={`min-h-screen bg-gray-50 ${inter.className}`}>
      {/* Header with school info and navigation */}
      <header className="bg-gradient-to-br from-[#e8f0f2] via-[#d1e3e7] to-[#bbd6dc]">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center space-x-4">
              <Link href="/">
                <Button variant="ghost" size="sm" className="text-brand hover:bg-brand/10">
                  <ChevronLeft className="mr-2 h-4 w-4" />
                  Zurück
                </Button>
              </Link>
              <div className="flex items-center space-x-4">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Logo_HLW%20Auhof-8XfCQ3jWGMlD1slw7Yp0Q3CLskOE92.png"
                  alt="School Logo"
                  width={60}
                  height={60}
                  className="object-contain"
                />
                <h1 className="text-xl font-semibold text-brand">HLW Auhof</h1>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" className="text-brand hover:bg-brand/10">
                <User className="mr-2 h-4 w-4" />
                Profil
              </Button>
              <Button variant="ghost" size="sm" className="text-brand hover:bg-brand/10">
                <LogOut className="mr-2 h-4 w-4" />
                Abmelden
              </Button>
              <Button variant="default" size="sm" className="bg-brand hover:bg-brand/90 text-white">
                <ShoppingCart className="mr-2 h-4 w-4" />
                Warenkorb
                <div className="ml-2 rounded-full bg-white px-2 py-0.5 text-xs font-semibold text-brand">0</div>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto py-8 px-4">
        {/* Damen Section */}
        <section className="mb-12">
          <h2 className="mb-6 text-2xl font-bold text-brand">Damen</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {products.damen.map((product) => (
              <Card key={product.id} className="overflow-hidden">
                <CardContent className="p-6">
                  <div className="relative h-64 w-full mb-4 bg-white rounded-lg">
                    <Image
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      fill
                      className="object-contain p-4"
                    />
                  </div>
                  <h3 className="text-xl font-semibold text-brand mb-2">{product.name}</h3>
                  <p className="text-2xl font-bold text-brand mb-4">€{product.price}</p>
                  <p className="text-sm text-gray-600 mb-4">{product.description}</p>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-4">
                      <Select>
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Größe wählen" />
                        </SelectTrigger>
                        <SelectContent>
                          {product.sizes.map((size) => (
                            <SelectItem key={size} value={size}>
                              {size}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <Input type="number" min="1" defaultValue="1" className="w-24" placeholder="Menge" />
                    </div>
                    <Button className="w-full bg-brand hover:bg-brand/90">
                      <ShoppingCart className="mr-2 h-4 w-4" />
                      In den Warenkorb
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Herren Section */}
        <section>
          <h2 className="mb-6 text-2xl font-bold text-brand">Herren</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {products.herren.map((product) => (
              <Card key={product.id} className="overflow-hidden">
                <CardContent className="p-6">
                  <div className="relative h-64 w-full mb-4 bg-white rounded-lg">
                    <Image
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      fill
                      className="object-contain p-4"
                    />
                  </div>
                  <h3 className="text-xl font-semibold text-brand mb-2">{product.name}</h3>
                  <p className="text-2xl font-bold text-brand mb-4">€{product.price}</p>
                  <p className="text-sm text-gray-600 mb-4">{product.description}</p>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-4">
                      <Select>
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Größe wählen" />
                        </SelectTrigger>
                        <SelectContent>
                          {product.sizes.map((size) => (
                            <SelectItem key={size} value={size}>
                              {size}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <Input type="number" min="1" defaultValue="1" className="w-24" placeholder="Menge" />
                    </div>
                    <Button className="w-full bg-brand hover:bg-brand/90">
                      <ShoppingCart className="mr-2 h-4 w-4" />
                      In den Warenkorb
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}

