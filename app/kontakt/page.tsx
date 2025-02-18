"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ChevronLeft, Mail, Phone, MapPin, Send, Clock, User, MessageSquare } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

export default function KontaktPage() {
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Formular gesendet:", formData)
    toast({
      title: "Nachricht gesendet",
      description: "Vielen Dank für Ihre Nachricht. Wir werden uns bald bei Ihnen melden.",
    })
    setFormData({ name: "", email: "", message: "" })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#e8f0f2] via-[#d1e3e7] to-[#bbd6dc] py-12">
      <div className="container mx-auto px-4">
        <Button variant="ghost" onClick={() => router.push("/")} className="mb-6 text-brand hover:text-brand/80">
          <ChevronLeft className="mr-2 h-4 w-4" />
          Zurück zur Startseite
        </Button>

        <div className="flex flex-col md:grid md:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="order-1 md:order-2"
          >
            <Card className="w-full bg-white/90 backdrop-blur-sm shadow-lg rounded-xl overflow-hidden flex flex-col h-full">
              <CardHeader className="bg-brand text-white">
                <CardTitle className="text-2xl md:text-3xl font-bold">Kontaktinformationen</CardTitle>
              </CardHeader>
              <CardContent className="p-6 flex flex-col flex-grow justify-between">
                <motion.div
                  className="flex flex-col space-y-4 md:space-y-6 lg:space-y-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="bg-white rounded-lg shadow-md p-4 flex items-center space-x-4 transition-all duration-300 hover:shadow-xl hover:scale-105 hover:bg-brand/5">
                    <div className="bg-brand rounded-full p-3">
                      <Mail className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">E-Mail</p>
                      <a href="mailto:office@hager-schiefer.at" className="text-brand hover:underline">
                        office@hager-schiefer.at
                      </a>
                    </div>
                  </div>
                  <div className="bg-white rounded-lg shadow-md p-4 flex items-center space-x-4 transition-all duration-300 hover:shadow-xl hover:scale-105 hover:bg-brand/5">
                    <div className="bg-brand rounded-full p-3">
                      <Phone className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Telefon</p>
                      <a href="tel:0732330030-0" className="text-brand hover:underline">
                        0732 330030-0
                      </a>
                    </div>
                  </div>
                  <div className="bg-white rounded-lg shadow-md p-4 flex items-center space-x-4 transition-all duration-300 hover:shadow-xl hover:scale-105 hover:bg-brand/5 mb-8">
                    <div className="bg-brand rounded-full p-3">
                      <MapPin className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Adresse</p>
                      <p className="text-gray-800">Nelkenweg 2, 4062 Kirchberg-Thening</p>
                    </div>
                  </div>
                </motion.div>
                <div className="mt-8">
                  <h3 className="text-xl font-semibold text-brand mb-4 flex items-center">
                    <Clock className="h-5 w-5 mr-2" />
                    Öffnungszeiten
                  </h3>
                  <div className="bg-white rounded-lg shadow-md p-4 space-y-2 transition-all duration-300 hover:shadow-xl hover:scale-105 hover:bg-brand/5">
                    <p className="flex justify-between">
                      <span className="font-medium md:hidden">MO - DO:</span>
                      <span className="font-medium hidden md:inline">Montag - Donnerstag:</span>
                      <span>08:00 - 16:30 Uhr</span>
                    </p>
                    <p className="flex justify-between">
                      <span className="font-medium md:hidden">FR:</span>
                      <span className="font-medium hidden md:inline">Freitag:</span>
                      <span>08:00 - 15:00 Uhr</span>
                    </p>
                    <p className="text-sm text-gray-600 mt-2">oder gegen Terminvereinbarung</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="order-2 md:order-1"
          >
            <Card className="w-full bg-white/90 backdrop-blur-sm shadow-lg rounded-xl overflow-hidden flex flex-col h-full">
              <CardHeader className="bg-brand text-white">
                <CardTitle className="text-2xl md:text-3xl font-bold">Kontaktieren Sie uns</CardTitle>
              </CardHeader>
              <CardContent className="p-6 flex flex-col flex-grow justify-between">
                <form onSubmit={handleSubmit} className="space-y-4 flex-grow flex flex-col">
                  <div className="space-y-4 flex-grow">
                    <div className="bg-white rounded-lg shadow-md p-4 flex flex-col space-y-2 transition-all duration-300 hover:shadow-xl hover:scale-105 hover:bg-brand/5">
                      <div className="flex items-center space-x-4">
                        <div className="bg-brand rounded-full p-3">
                          <User className="h-6 w-6 text-white" />
                        </div>
                        <div className="flex-grow">
                          <Label htmlFor="name" className="text-sm font-medium text-gray-700">
                            Name
                          </Label>
                          <Input
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            required
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-brand focus:border-brand text-base"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="bg-white rounded-lg shadow-md p-4 flex flex-col space-y-2 transition-all duration-300 hover:shadow-xl hover:scale-105 hover:bg-brand/5">
                      <div className="flex items-center space-x-4">
                        <div className="bg-brand rounded-full p-3">
                          <Mail className="h-6 w-6 text-white" />
                        </div>
                        <div className="flex-grow">
                          <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                            E-Mail
                          </Label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-brand focus:border-brand text-base"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="bg-white rounded-lg shadow-md p-4 flex flex-col space-y-2 transition-all duration-300 hover:shadow-xl hover:scale-105 hover:bg-brand/5 mb-4">
                      <div className="flex items-start space-x-4">
                        <div className="bg-brand rounded-full p-3">
                          <MessageSquare className="h-6 w-6 text-white" />
                        </div>
                        <div className="flex-grow">
                          <Label htmlFor="message" className="text-sm font-medium text-gray-700">
                            Nachricht
                          </Label>
                          <Textarea
                            id="message"
                            name="message"
                            value={formData.message}
                            onChange={handleInputChange}
                            required
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-brand focus:border-brand text-base min-h-[150px]"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <Button
                    type="submit"
                    className="w-full bg-brand hover:bg-brand/90 text-white transition-all duration-300 hover:shadow-md hover:scale-105 mt-auto py-2 text-lg font-medium rounded-md"
                  >
                    <Send className="mr-2 h-5 w-5" />
                    Nachricht senden
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="order-3 md:col-span-2"
          >
            <Card className="w-full bg-white/90 backdrop-blur-sm shadow-lg rounded-xl overflow-hidden">
              <CardHeader className="bg-brand text-white">
                <CardTitle className="text-2xl md:text-3xl font-bold">Unser Standort</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="aspect-w-16 aspect-h-9">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2654.4080744307113!2d14.170100715771484!3d48.29346037923151!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4773f9f0c0a1a6d9%3A0x3a4b7f7b5d1c9f0a!2sNelkenweg%202%2C%204062%20Kirchberg-Thening%2C%20Austria!5e0!3m2!1sen!2sus!4v1625000000000!5m2!1sen!2sus"
                    width="100%"
                    height="450"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

