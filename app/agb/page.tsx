"use client"

import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChevronLeft, Book, FileText, Scale, Truck, CreditCard } from "lucide-react"
import { useEffect } from "react"

export default function AGBPage() {
  const router = useRouter()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const sections = [
    {
      title: "Geltungsbereich",
      icon: <Book className="h-6 w-6 text-white" />,
      content:
        "Diese Allgemeinen Geschäftsbedingungen gelten für alle Bestellungen und Lieferungen zwischen der Hager Schiefer GmbH (nachfolgend 'Anbieter') und dem Kunden (nachfolgend 'Kunde').",
    },
    {
      title: "Vertragsschluss",
      icon: <FileText className="h-6 w-6 text-white" />,
      content:
        "Die Darstellung der Produkte im Online-Shop stellt kein rechtlich bindendes Angebot, sondern einen unverbindlichen Online-Katalog dar. Durch Anklicken des Buttons 'Kaufen' geben Sie eine verbindliche Bestellung der im Warenkorb enthaltenen Waren ab.",
    },
    {
      title: "Preise und Zahlungsbedingungen",
      icon: <CreditCard className="h-6 w-6 text-white" />,
      content:
        "Alle Preise verstehen sich in Euro inklusive der gesetzlichen Mehrwertsteuer. Die Zahlung erfolgt per Vorkasse, Kreditkarte oder PayPal.",
    },
    {
      title: "Lieferung",
      icon: <Truck className="h-6 w-6 text-white" />,
      content:
        "Die Lieferung erfolgt innerhalb Österreichs. Die Lieferzeit beträgt in der Regel 3-5 Werktage ab Zahlungseingang.",
    },
    {
      title: "Widerrufsrecht",
      icon: <Scale className="h-6 w-6 text-white" />,
      content:
        "Sie haben das Recht, binnen vierzehn Tagen ohne Angabe von Gründen diesen Vertrag zu widerrufen. Die Widerrufsfrist beträgt vierzehn Tage ab dem Tag, an dem Sie oder ein von Ihnen benannter Dritter, der nicht der Beförderer ist, die Waren in Besitz genommen haben bzw. hat.",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#e8f0f2] via-[#d1e3e7] to-[#bbd6dc] py-12">
      <div className="container mx-auto px-4">
        <Button variant="ghost" onClick={() => router.push("/")} className="mb-6 text-brand hover:text-brand/80">
          <ChevronLeft className="mr-2 h-4 w-4" />
          Zurück zur Startseite
        </Button>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <Card className="w-full bg-white/90 backdrop-blur-sm shadow-lg rounded-xl overflow-hidden">
            <CardHeader className="bg-brand text-white">
              <CardTitle className="text-2xl md:text-3xl font-bold">Allgemeine Geschäftsbedingungen</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-6">
                {sections.map((section, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Card className="bg-white shadow-md hover:shadow-lg transition-shadow duration-300">
                      <CardHeader className="bg-brand/10 flex flex-row items-center space-x-4 p-4">
                        <div className="bg-brand rounded-full p-2">{section.icon}</div>
                        <CardTitle className="text-xl font-semibold text-brand">{section.title}</CardTitle>
                      </CardHeader>
                      <CardContent className="p-4">
                        <p className="text-gray-700">{section.content}</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-8"
        >
          <Card className="bg-white/90 backdrop-blur-sm shadow-lg rounded-xl overflow-hidden">
            <CardContent className="p-6">
              <p className="text-gray-700 text-center">
                Für weitere Informationen oder Fragen zu unseren AGB kontaktieren Sie uns bitte unter{" "}
                <a href="mailto:office@hager-schiefer.at" className="text-brand hover:underline">
                  office@hager-schiefer.at
                </a>{" "}
                oder telefonisch unter{" "}
                <a href="tel:+43732330030" className="text-brand hover:underline">
                  0732 330030-0
                </a>
                .
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}

