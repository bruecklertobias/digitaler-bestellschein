"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChevronLeft } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

export default function PasswordResetPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)

  const handlePasswordReset = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate an API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Here you would typically send the password reset request to your backend
    // and handle the response accordingly

    setIsLoading(false)
    toast({
      title: "Passwort-Reset angefordert",
      description:
        "Falls ein Konto mit dieser E-Mail-Adresse existiert, erhalten Sie in Kürze eine E-Mail mit weiteren Anweisungen.",
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#e8f0f2] via-[#d1e3e7] to-[#bbd6dc] py-12">
      <div className="container mx-auto px-4">
        <Button variant="ghost" onClick={() => router.push("/login")} className="mb-6 text-brand hover:text-brand/80">
          <ChevronLeft className="mr-2 h-4 w-4" />
          Zurück zur Anmeldung
        </Button>

        <Card className="max-w-md mx-auto">
          <CardHeader className="text-center">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/hager_schiefer%20logo_mit%20Edelwei%C3%9F-7i9NdnPnzDYgTqJueUbgCG2WjByzQP.png"
              alt="Hager Schiefer Logo"
              width={120}
              height={48}
              className="mx-auto mb-4"
            />
            <CardTitle className="text-2xl font-bold text-brand">Passwort zurücksetzen</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handlePasswordReset} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">E-Mail-Adresse</Label>
                <Input id="email" name="email" type="email" required />
              </div>
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-brand to-brand/80 hover:from-brand/90 hover:to-brand/70 text-white transition-all duration-300"
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="flex items-center justify-center">
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
                    Senden...
                  </span>
                ) : (
                  "Passwort-Reset anfordern"
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

