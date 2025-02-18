"use client"

import type React from "react"
import { useEffect } from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ChevronLeft, Edit, Save, Key } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

// Mock user data
const mockUser = {
  name: "Max Mustermann",
  email: "max.mustermann@example.com",
  phone: "+43 123 456789",
  school: "HLW Auhof",
  schoolLogo:
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Logo_HLW%20Auhof-8XfCQ3jWGMlD1slw7Yp0Q3CLskOE92.png",
}

// Mock order history
const mockOrderHistory = [
  { id: "VO-2023-001", date: "2023-06-15", total: 99.97, status: "Abgeholt" },
  { id: "VO-2023-002", date: "2023-07-01", total: 149.95, status: "In Bearbeitung" },
]

export default function ProfilePage() {
  const router = useRouter()
  const { toast } = useToast()
  const [user, setUser] = useState(mockUser)
  const [isEditing, setIsEditing] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setUser((prevUser) => ({ ...prevUser, [name]: value }))
  }

  const handleSave = async () => {
    setIsLoading(true)
    // Simulate an API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
    // Here you would typically send the updated user data to your backend
    console.log("Updated user data:", {
      name: user.name,
      email: user.email,
      phone: user.phone,
    })
    setIsLoading(false)
    setIsEditing(false)
    toast({
      title: "Profil aktualisiert",
      description: "Ihre Änderungen wurden erfolgreich gespeichert.",
    })
  }

  const handlePasswordChange = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const currentPassword = formData.get("currentPassword") as string
    const newPassword = formData.get("newPassword") as string
    const confirmPassword = formData.get("confirmPassword") as string

    if (newPassword !== confirmPassword) {
      toast({
        title: "Fehler",
        description: "Die neuen Passwörter stimmen nicht überein.",
        variant: "destructive",
      })
      return
    }

    // Here you would typically send the password change request to your backend
    console.log("Password change requested", { currentPassword, newPassword })
    // Reset the form
    e.currentTarget.reset()
    toast({
      title: "Passwort geändert",
      description: "Ihr Passwort wurde erfolgreich aktualisiert.",
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#e8f0f2] via-[#d1e3e7] to-[#bbd6dc] py-12">
      <div className="container mx-auto px-4">
        <Button variant="ghost" onClick={() => router.push("/")} className="mb-6 text-brand hover:text-brand/80">
          <ChevronLeft className="mr-2 h-4 w-4" />
          Zurück zur Startseite
        </Button>

        <div className="grid gap-6 md:grid-cols-2 grid-cols-1">
          <Card className="md:col-span-2 w-full">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-xl md:text-2xl font-bold text-brand">Mein Profil</CardTitle>
              <div className="flex items-center space-x-3">
                <Image
                  src={user.schoolLogo || "/placeholder.svg"}
                  alt={`${user.school} Logo`}
                  width={60}
                  height={60}
                  className="object-contain"
                />
                <span className="text-lg font-medium text-gray-600">{user.school}</span>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <form className="space-y-4">
                  <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-sm md:text-base">
                        Name
                      </Label>
                      <Input
                        id="name"
                        name="name"
                        value={user.name}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-sm md:text-base">
                        E-Mail
                      </Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={user.email}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone" className="text-sm md:text-base">
                        Telefonnummer
                      </Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={user.phone}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                      />
                    </div>
                    <div className="flex items-end">
                      {isEditing ? (
                        <div className="flex space-x-2 w-full">
                          <Button
                            onClick={handleSave}
                            className="flex-1 bg-gradient-to-r from-brand to-brand/80 hover:from-brand/90 hover:to-brand/70 text-white transition-all duration-300"
                            disabled={isLoading}
                          >
                            {isLoading ? (
                              <span className="flex items-center">
                                <svg
                                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                >
                                  <circle
                                    className="opacity-25"
                                    cx="12"
                                    cy="12"
                                    r="10"
                                    stroke="currentColor"
                                    strokeWidth="4"
                                  ></circle>
                                  <path
                                    className="opacity-75"
                                    fill="currentColor"
                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                  ></path>
                                </svg>
                                Speichern...
                              </span>
                            ) : (
                              <>
                                <Save className="mr-2 h-4 w-4" />
                                Speichern
                              </>
                            )}
                          </Button>
                          <Button
                            onClick={() => setIsEditing(false)}
                            variant="outline"
                            className="flex-1 border-brand text-brand hover:bg-brand hover:text-white transition-all duration-300"
                          >
                            Abbrechen
                          </Button>
                        </div>
                      ) : (
                        <Button
                          onClick={() => setIsEditing(true)}
                          className="w-full bg-gradient-to-r from-brand to-brand/80 hover:from-brand/90 hover:to-brand/70 text-white transition-all duration-300"
                        >
                          <Edit className="mr-2 h-4 w-4" />
                          Profil bearbeiten
                        </Button>
                      )}
                    </div>
                  </div>
                </form>
                <div className="border-t border-gray-200 pt-4">
                  <h3 className="text-xl md:text-2xl font-bold text-brand mb-4">Passwort ändern</h3>
                  <form onSubmit={handlePasswordChange} className="space-y-4" id="passwordForm">
                    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="newPassword" className="text-sm md:text-base">
                          Neues Passwort
                        </Label>
                        <Input id="newPassword" name="newPassword" type="password" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="currentPassword" className="text-sm md:text-base">
                          Aktuelles Passwort
                        </Label>
                        <Input id="currentPassword" name="currentPassword" type="password" required />
                      </div>
                    </div>
                    <div className="grid gap-4 sm:grid-cols-2 items-end">
                      <div className="space-y-2">
                        <Label htmlFor="confirmPassword" className="text-sm md:text-base">
                          Neues Passwort bestätigen
                        </Label>
                        <Input id="confirmPassword" name="confirmPassword" type="password" required />
                      </div>
                      <Button
                        type="submit"
                        className="bg-gradient-to-r from-brand to-brand/80 hover:from-brand/90 hover:to-brand/70 text-white transition-all duration-300"
                      >
                        <Key className="mr-2 h-4 w-4" />
                        Passwort ändern
                      </Button>
                    </div>
                  </form>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="md:col-span-2 w-full">
            <CardHeader>
              <CardTitle className="text-xl md:text-2xl font-bold text-brand">Bestellverlauf</CardTitle>
            </CardHeader>
            <CardContent>
              <Table className="w-full text-sm md:text-base">
                <TableHeader>
                  <TableRow>
                    <TableHead>Bestellnummer</TableHead>
                    <TableHead>Datum</TableHead>
                    <TableHead>Gesamtbetrag</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockOrderHistory.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell>{order.id}</TableCell>
                      <TableCell>{order.date}</TableCell>
                      <TableCell>€{order.total.toFixed(2)}</TableCell>
                      <TableCell>{order.status}</TableCell>
                      <TableCell>
                        <Button
                          variant="link"
                          onClick={() => router.push(`/order-details?id=${order.id}`)}
                          className="text-brand hover:text-brand/80"
                        >
                          Details
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

