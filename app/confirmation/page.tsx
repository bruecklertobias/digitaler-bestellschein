"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Home, FileText } from "lucide-react"

export default function ConfirmationPage() {
  const router = useRouter()

  useEffect(() => {
    // This effect could be used to clear the cart or perform any other necessary cleanup
    // For now, it's just a placeholder
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#e8f0f2] via-[#d1e3e7] to-[#bbd6dc] py-12">
      <div className="container mx-auto px-4">
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-brand flex items-center justify-center">
              <CheckCircle className="mr-2 h-8 w-8 text-green-500" />
              Vorbestellung erfolgreich
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-6">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/hager_schiefer%20logo_mit%20Edelwei%C3%9F-7i9NdnPnzDYgTqJueUbgCG2WjByzQP.png"
              alt="Hager Schiefer Logo"
              width={200}
              height={80}
              className="mx-auto"
            />
            <p className="text-lg text-gray-700">
              Vielen Dank für Ihre Bestellung! Wir freuen uns, sie erhalten zu haben und bringen sie bequem zur Abholung
              in die Schule mit.
            </p>
            <div className="bg-gray-100 p-4 rounded-lg">
              <p className="text-sm text-gray-600">
                Eine Bestätigungs-E-Mail mit den Details Ihrer Bestellung wurde an die von Ihnen angegebene
                E-Mail-Adresse gesendet.
              </p>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Button
              onClick={() => router.push("/")}
              className="w-full sm:w-auto bg-gradient-to-r from-brand to-brand/80 hover:from-brand/90 hover:to-brand/70 text-white transition-all duration-300"
            >
              <Home className="mr-2 h-4 w-4" />
              Zur Startseite
            </Button>
            <Button
              onClick={() => router.push("/order-details")}
              variant="outline"
              className="w-full sm:w-auto border-brand text-brand hover:bg-brand hover:text-white transition-all duration-300"
            >
              <FileText className="mr-2 h-4 w-4" />
              Bestelldetails anzeigen
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

