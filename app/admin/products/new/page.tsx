"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function NewProduct() {
  const router = useRouter()
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    category: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setProduct((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (value: string) => {
    setProduct((prev) => ({ ...prev, category: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the data to your backend
    console.log("New product:", product)
    // Redirect back to the admin panel
    router.push("/admin")
  }

  return (
    <div className="container mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Neues Produkt hinzufügen</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Produktname</Label>
              <Input id="name" name="name" value={product.name} onChange={handleChange} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Beschreibung</Label>
              <Textarea
                id="description"
                name="description"
                value={product.description}
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="price">Preis (€)</Label>
              <Input
                id="price"
                name="price"
                type="number"
                step="0.01"
                value={product.price}
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="stock">Lagerbestand</Label>
              <Input id="stock" name="stock" type="number" value={product.stock} onChange={handleChange} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="category">Kategorie</Label>
              <Select onValueChange={handleSelectChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Wählen Sie eine Kategorie" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="shirts">Hemden</SelectItem>
                  <SelectItem value="pants">Hosen</SelectItem>
                  <SelectItem value="accessories">Accessoires</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex justify-end space-x-4">
              <Button type="button" variant="outline" onClick={() => router.push("/admin")}>
                Abbrechen
              </Button>
              <Button type="submit">Produkt hinzufügen</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

