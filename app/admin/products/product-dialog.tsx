"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MultiSelect } from "./multi-select"
import Image from "next/image"

type Product = {
  id: string
  name: string
  description: string
  price: number
  categories: string[]
  sizes: string[]
  school: string
  image: string
}

type ProductDialogProps = {
  isOpen: boolean
  onClose: () => void
  onSave: (product: Omit<Product, "id"> | Product) => void
  title: string
  product?: Product | null
}

const categoryOptions = [
  "Oberteile",
  "Unterteile",
  "Schuhe",
  "Accessoires",
  "Kochbekleidung",
  "Sportbekleidung",
  "Schreibwaren",
]

const sizeOptions = [
  "XS",
  "S",
  "M",
  "L",
  "XL",
  "XXL",
  "One Size",
  "36",
  "37",
  "38",
  "39",
  "40",
  "41",
  "42",
  "43",
  "44",
  "45",
]

export function ProductDialog({ isOpen, onClose, onSave, title, product }: ProductDialogProps) {
  const [formData, setFormData] = useState<Omit<Product, "id">>({
    name: "",
    description: "",
    price: 0,
    categories: [],
    sizes: [],
    school: "",
    image: "",
  })

  useEffect(() => {
    if (product) {
      setFormData(product)
    } else {
      setFormData({
        name: "",
        description: "",
        price: 0,
        categories: [],
        sizes: [],
        school: "",
        image: "",
      })
    }
  }, [product])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: name === "price" ? Number.parseFloat(value) : value }))
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setFormData((prev) => ({ ...prev, image: reader.result as string }))
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(product ? { ...formData, id: product.id } : formData)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-black">{title}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <Label htmlFor="name" className="text-black">
                Name
              </Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="border-brand"
              />
            </div>
            <div className="col-span-2">
              <Label htmlFor="description" className="text-black">
                Beschreibung
              </Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                className="border-brand"
              />
            </div>
            <div>
              <Label htmlFor="price" className="text-black">
                Preis
              </Label>
              <Input
                id="price"
                name="price"
                type="number"
                step="0.01"
                value={formData.price}
                onChange={handleChange}
                required
                className="border-brand"
              />
            </div>
            <div>
              <Label htmlFor="school" className="text-black">
                Schule
              </Label>
              <Select
                name="school"
                value={formData.school}
                onValueChange={(value) => setFormData((prev) => ({ ...prev, school: value }))}
                className="border-brand"
              >
                <SelectTrigger className="border-brand">
                  <SelectValue placeholder="Wähle eine Schule" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="HLW Auhof">HLW Auhof</SelectItem>
                  <SelectItem value="HLW Perg">HLW Perg</SelectItem>
                  <SelectItem value="HBLW Wels">HBLW Wels</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="col-span-2">
              <Label htmlFor="categories" className="text-black">
                Kategorien
              </Label>
              <MultiSelect
                options={categoryOptions}
                selected={formData.categories}
                onChange={(selected) => setFormData((prev) => ({ ...prev, categories: selected }))}
                placeholder="Kategorien auswählen"
              />
            </div>
            <div className="col-span-2">
              <Label htmlFor="sizes" className="text-black">
                Größen
              </Label>
              <MultiSelect
                options={sizeOptions}
                selected={formData.sizes}
                onChange={(selected) => setFormData((prev) => ({ ...prev, sizes: selected }))}
                placeholder="Größen auswählen"
              />
            </div>
            <div className="col-span-2">
              <Label htmlFor="image" className="text-black">
                Bild
              </Label>
              <Input
                id="image"
                name="image"
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="border-brand"
              />
              {formData.image && (
                <div className="mt-2">
                  <Image
                    src={formData.image || "/placeholder.svg"}
                    alt="Product preview"
                    width={100}
                    height={100}
                    className="object-cover rounded border-2 border-gray-300"
                  />
                </div>
              )}
            </div>
          </div>
          <div className="flex justify-end space-x-2">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="border-brand text-black hover:bg-brand/10"
            >
              Abbrechen
            </Button>
            <Button type="submit" className="bg-brand hover:bg-brand/90 text-white">
              Speichern
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

