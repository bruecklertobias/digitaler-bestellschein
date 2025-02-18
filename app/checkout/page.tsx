"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"
import { ChevronLeft, ShoppingBag } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"

export default function CheckoutPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    name: "",
    parentName: "",
    phoneNumber: "",
    birthDate: "",
    street: "",
    postalCode: "",
    city: "",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the data to your backend
    console.log("Form submitted:", formData)
    toast({
      title: "Vorbestellung erfolgreich",
      description: "Ihre Vorbestellung wurde erfolgreich aufgenommen.",
    })
    // Redirect to a confirmation page or back to the product page
    router.push("/confirmation")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#e8f0f2] via-[#d1e3e7] to-[#bbd6dc] py-12">
      <div className="container mx-auto px-4">
        <Button variant="ghost" onClick={() => router.back()} className="mb-6 text-brand hover:text-brand/80">
          <ChevronLeft className="mr-2 h-4 w-4" />
          Zurück zum Warenkorb
        </Button>
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-brand flex items-center">
              <ShoppingBag className="mr-2 h-8 w-8" />
              Vorbestellung abschließen
            </CardTitle>
            <CardDescription>Bitte füllen Sie alle Felder aus, um Ihre Vorbestellung aufzugeben.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name des Schülers</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      placeholder="Max Mustermann"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="parentName">Name eines Elternteils</Label>
                    <Input
                      id="parentName"
                      name="parentName"
                      value={formData.parentName}
                      onChange={handleInputChange}
                      required
                      placeholder="Maria Mustermann"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="phoneNumber">Telefonnummer</Label>
                    <Input
                      id="phoneNumber"
                      name="phoneNumber"
                      type="tel"
                      value={formData.phoneNumber}
                      onChange={handleInputChange}
                      required
                      placeholder="+43 123 456789"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="birthDate">Geburtsdatum</Label>
                    <Input
                      id="birthDate"
                      name="birthDate"
                      type="date"
                      value={formData.birthDate}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="street">Straße und Hausnummer</Label>
                  <Input
                    id="street"
                    name="street"
                    value={formData.street}
                    onChange={handleInputChange}
                    required
                    placeholder="Musterstraße 123"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="postalCode">Postleitzahl</Label>
                    <Input
                      id="postalCode"
                      name="postalCode"
                      value={formData.postalCode}
                      onChange={handleInputChange}
                      required
                      placeholder="1234"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="city">Stadt</Label>
                    <Input
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      required
                      placeholder="Wien"
                    />
                  </div>
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter>
            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-brand to-brand/80 hover:from-brand/90 hover:to-brand/70 text-white transition-all duration-300"
              onClick={handleSubmit}
            >
              Vorbestellung aufgeben
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

