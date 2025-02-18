"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ChevronLeft, Printer } from "lucide-react"

// This is a mock order. In a real application, you would fetch this data from your backend.
const mockOrder = {
  orderNumber: "VO-2023-001",
  items: [
    { id: 1, name: "Polo Shirt mit Logo", size: "M", quantity: 2, price: 29.99 },
    { id: 2, name: "Kochjacke mit Logo", size: "L", quantity: 1, price: 39.99 },
  ],
  total: 99.97,
  orderDate: "2023-06-15",
}

export default function OrderDetailsPage() {
  const router = useRouter()
  const [order, setOrder] = useState(mockOrder)

  useEffect(() => {
    // In a real application, you would fetch the order details here
    // For now, we're using the mock data
    setOrder(mockOrder)
  }, [])

  const handlePrint = () => {
    window.print()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#e8f0f2] via-[#d1e3e7] to-[#bbd6dc] py-12">
      <div className="container mx-auto px-4">
        <Button variant="ghost" onClick={() => router.back()} className="mb-6 text-brand hover:text-brand/80">
          <ChevronLeft className="mr-2 h-4 w-4" />
          Zurück
        </Button>
        <Card className="max-w-4xl mx-auto">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-3xl font-bold text-brand">Bestelldetails</CardTitle>
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/hager_schiefer%20logo_mit%20Edelwei%C3%9F-7i9NdnPnzDYgTqJueUbgCG2WjByzQP.png"
              alt="Hager Schiefer Logo"
              width={120}
              height={48}
            />
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex justify-between">
              <div>
                <p className="font-semibold">Bestellnummer:</p>
                <p>{order.orderNumber}</p>
              </div>
              <div>
                <p className="font-semibold">Bestelldatum:</p>
                <p>{order.orderDate}</p>
              </div>
            </div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Artikel</TableHead>
                  <TableHead>Größe</TableHead>
                  <TableHead>Menge</TableHead>
                  <TableHead className="text-right">Preis</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {order.items.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>{item.size}</TableCell>
                    <TableCell>{item.quantity}</TableCell>
                    <TableCell className="text-right">€{(item.price * item.quantity).toFixed(2)}</TableCell>
                  </TableRow>
                ))}
                <TableRow>
                  <TableCell colSpan={3} className="font-semibold">
                    Gesamtsumme
                  </TableCell>
                  <TableCell className="text-right font-semibold">€{order.total.toFixed(2)}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
            <div className="bg-gray-100 p-4 rounded-lg">
              <p className="text-sm text-gray-600">
                Ihre Bestellung wird zur Abholung in Ihre Schule geliefert. Bitte bringen Sie diese Bestellbestätigung
                mit, wenn Sie Ihre Bestellung abholen.
              </p>
            </div>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button
              onClick={handlePrint}
              className="bg-gradient-to-r from-brand to-brand/80 hover:from-brand/90 hover:to-brand/70 text-white transition-all duration-300"
            >
              <Printer className="mr-2 h-4 w-4" />
              Bestellung drucken
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

