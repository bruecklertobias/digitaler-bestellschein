"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

type User = {
  id: string
  name: string
  email: string
  phoneNumber: string
  school: string
  role: "admin" | "user"
}

type UserDialogProps = {
  isOpen: boolean
  onClose: () => void
  onSave: (user: Omit<User, "id"> | User) => void
  title: string
  user?: User | null
}

export function UserDialog({ isOpen, onClose, onSave, title, user }: UserDialogProps) {
  const [formData, setFormData] = useState<Omit<User, "id">>({
    name: "",
    email: "",
    phoneNumber: "",
    school: "",
    role: "user",
  })

  useEffect(() => {
    if (user) {
      setFormData(user)
    } else {
      setFormData({
        name: "",
        email: "",
        phoneNumber: "",
        school: "",
        role: "user",
      })
    }
  }, [user])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(user ? { ...formData, id: user.id } : formData)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-black">{title}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
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
          <div className="space-y-2">
            <Label htmlFor="email" className="text-black">
              E-Mail
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="border-brand"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phoneNumber" className="text-black">
              Telefonnummer
            </Label>
            <Input
              id="phoneNumber"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              required
              className="border-brand"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="school" className="text-black">
              Schule
            </Label>
            <Select
              name="school"
              value={formData.school}
              onValueChange={(value) => setFormData((prev) => ({ ...prev, school: value }))}
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
          <div className="space-y-2">
            <Label htmlFor="role" className="text-black">
              Rolle
            </Label>
            <Select
              name="role"
              value={formData.role}
              onValueChange={(value) => setFormData((prev) => ({ ...prev, role: value as "admin" | "user" }))}
            >
              <SelectTrigger className="border-brand">
                <SelectValue placeholder="Wähle eine Rolle" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="admin">Administrator</SelectItem>
                <SelectItem value="user">Benutzer</SelectItem>
              </SelectContent>
            </Select>
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

