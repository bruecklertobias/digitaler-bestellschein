import type React from "react"
import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

type School = {
  id?: number
  name: string
  address: string
  image: string | null
}

type SchoolFormProps = {
  school?: School
  onSave: (school: School) => void
}

export default function SchoolForm({ school, onSave }: SchoolFormProps) {
  const [formData, setFormData] = useState<School>(
    school || {
      name: "",
      address: "",
      image: null,
    },
  )

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
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
    onSave(formData)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="image">Schulbild</Label>
        <Input
          id="image"
          name="image"
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="border-brand"
        />
      </div>
      {formData.image && (
        <div className="mt-2">
          <Image
            src={formData.image || "/placeholder.svg"}
            alt="Vorschau"
            width={100}
            height={100}
            className="object-cover rounded border-2 border-brand"
          />
        </div>
      )}
      <div className="space-y-2">
        <Label htmlFor="name">Schulname</Label>
        <Input id="name" name="name" value={formData.name} onChange={handleChange} required className="border-brand" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="address">Adresse</Label>
        <Input
          id="address"
          name="address"
          value={formData.address}
          onChange={handleChange}
          required
          className="border-brand"
        />
      </div>
      <Button type="submit" className="w-full bg-brand hover:bg-brand/90">
        Speichern
      </Button>
    </form>
  )
}

