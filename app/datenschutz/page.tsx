"use client"

import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChevronLeft, Shield, Eye, Database, Lock, Mail } from "lucide-react"
import { useEffect } from "react"

export default function DatenschutzPage() {
  const router = useRouter()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const sections = [
    {
      title: "Allgemeine Hinweise",
      icon: <Shield className="h-6 w-6 text-white" />,
      content:
        "Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten passiert, wenn Sie diese Website besuchen. Personenbezogene Daten sind alle Daten, mit denen Sie persönlich identifiziert werden können.",
    },
    {
      title: "Datenerfassung auf dieser Website",
      icon: <Eye className="h-6 w-6 text-white" />,
      content:
        "Die Datenverarbeitung auf dieser Website erfolgt durch den Websitebetreiber. Dessen Kontaktdaten können Sie dem Abschnitt 'Hinweis zur Verantwortlichen Stelle' in dieser Datenschutzerklärung entnehmen.",
    },
    {
      title: "Wie erfassen wir Ihre Daten?",
      icon: <Database className="h-6 w-6 text-white" />,
      content:
        "Ihre Daten werden zum einen dadurch erhoben, dass Sie uns diese mitteilen. Hierbei kann es sich z.B. um Daten handeln, die Sie in ein Kontaktformular eingeben. Andere Daten werden automatisch oder nach Ihrer Einwilligung beim Besuch der Website durch unsere IT-Systeme erfasst. Das sind vor allem technische Daten (z.B. Internetbrowser, Betriebssystem oder Uhrzeit des Seitenaufrufs).",
    },
    {
      title: "Wofür nutzen wir Ihre Daten?",
      icon: <Lock className="h-6 w-6 text-white" />,
      content:
        "Ein Teil der Daten wird erhoben, um eine fehlerfreie Bereitstellung der Website zu gewährleisten. Andere Daten können zur Analyse Ihres Nutzerverhaltens verwendet werden.",
    },
    {
      title: "Welche Rechte haben Sie bezüglich Ihrer Daten?",
      icon: <Mail className="h-6 w-6 text-white" />,
      content:
        "Sie haben jederzeit das Recht, unentgeltlich Auskunft über Herkunft, Empfänger und Zweck Ihrer gespeicherten personenbezogenen Daten zu erhalten. Sie haben außerdem ein Recht, die Berichtigung oder Löschung dieser Daten zu verlangen. Wenn Sie eine Einwilligung zur Datenverarbeitung erteilt haben, können Sie diese Einwilligung jederzeit für die Zukunft widerrufen. Außerdem haben Sie das Recht, unter bestimmten Umständen die Einschränkung der Verarbeitung Ihrer personenbezogenen Daten zu verlangen.",
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
              <CardTitle className="text-2xl md:text-3xl font-bold">Datenschutzerklärung</CardTitle>
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
                Für weitere Informationen oder Fragen zu unserem Datenschutz kontaktieren Sie uns bitte unter{" "}
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

