"use client"

import { useState, useMemo, useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { ChevronLeft, User, LogOut, PlusCircle, Pencil, Trash2, ArrowUp, ArrowDown, Search } from "lucide-react"
import SchoolForm from "@/components/SchoolForm"
import MasterDataContent from "@/components/MasterDataContent"
import OrdersContent from "@/components/OrdersContent"
import ProductsPage from "./products/page"
import UsersPage from "./users/page"

const mockSchools = [
  {
    id: 1,
    image: "/placeholder.svg?height=50&width=50",
    name: "HLW Auhof",
    address: "Aubrunnerweg 4, 4040 Linz",
  },
  {
    id: 2,
    image: "/placeholder.svg?height=50&width=50",
    name: "HLW Perg",
    address: "Machlandstraße 48, 4320 Perg",
  },
  {
    id: 3,
    image: "/placeholder.svg?height=50&width=50",
    name: "HBLW Wels",
    address: "Wallerer Straße 32, 4600 Wels",
  },
]

export default function AdminPanel() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("schools")
  const [schoolSearchQuery, setSchoolSearchQuery] = useState("")
  const [schoolSortConfig, setSchoolSortConfig] = useState({ key: null, direction: "ascending" })
  const [isSchoolDialogOpen, setIsSchoolDialogOpen] = useState(false)
  const [editingSchool, setEditingSchool] = useState(null)
  const [isDeleteSchoolDialogOpen, setIsDeleteSchoolDialogOpen] = useState(false)
  const [selectedSchoolToDelete, setSelectedSchoolToDelete] = useState(null)
  const [schools, setSchools] = useState(mockSchools)

  const handleEditSchool = (school) => {
    setEditingSchool(school)
    setIsSchoolDialogOpen(true)
  }

  const handleDeleteSchool = (school) => {
    setSelectedSchoolToDelete(school)
    setIsDeleteSchoolDialogOpen(true)
  }

  const confirmDeleteSchool = () => {
    setSchools(schools.filter((school) => school.id !== selectedSchoolToDelete.id))
    setIsDeleteSchoolDialogOpen(false)
  }

  const handleSaveSchool = (school) => {
    if (editingSchool) {
      setSchools(schools.map((s) => (s.id === editingSchool.id ? { ...school, id: editingSchool.id } : s)))
    } else {
      setSchools([...schools, { ...school, id: Math.max(...schools.map((s) => s.id)) + 1 }])
    }
    setIsSchoolDialogOpen(false)
    setEditingSchool(null)
  }

  const requestSchoolSort = (key) => {
    let direction = "ascending"
    if (schoolSortConfig.key === key && schoolSortConfig.direction === "ascending") {
      direction = "descending"
    }
    setSchoolSortConfig({ key, direction })
  }

  const sortedSchools = useMemo(() => {
    const sortableSchools = [...schools]
    if (schoolSortConfig.key !== null) {
      sortableSchools.sort((a, b) => {
        if (a[schoolSortConfig.key] < b[schoolSortConfig.key]) {
          return schoolSortConfig.direction === "ascending" ? -1 : 1
        }
        if (a[schoolSortConfig.key] > b[schoolSortConfig.key]) {
          return schoolSortConfig.direction === "ascending" ? 1 : -1
        }
        return 0
      })
    }
    return sortableSchools
  }, [schools, schoolSortConfig])

  const filteredSchools = useMemo(() => {
    return sortedSchools.filter((school) =>
      Object.values(school).some((value) => value.toString().toLowerCase().includes(schoolSearchQuery.toLowerCase())),
    )
  }, [sortedSchools, schoolSearchQuery])

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#e8f0f2] via-[#d1e3e7] to-[#bbd6dc]">
      <nav className="bg-white/80 backdrop-blur-sm shadow-md">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-6">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                className="text-brand hover:bg-brand/10"
                onClick={() => router.push("/")}
              >
                <ChevronLeft className="mr-2 h-5 w-5" />
                <span className="font-semibold">Zurück zur Startseite</span>
              </Button>
            </div>
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                className="text-brand hover:bg-brand/10"
                onClick={() => router.push("/profile")}
              >
                <User className="mr-2 h-4 w-4" />
                <span className="font-semibold">Profil</span>
              </Button>
              <Button variant="ghost" size="sm" className="text-brand hover:bg-brand/10">
                <LogOut className="mr-2 h-4 w-4" />
                <span className="font-semibold">Abmelden</span>
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <main className="container mx-auto py-12 px-4">
        <Card className="bg-white/90 backdrop-blur-sm shadow-lg">
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-brand">Administration</CardTitle>
            <CardDescription className="text-lg text-brand/80">
              Verwalten Sie Ihre digitale Bestellplattform
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-5 mb-8">
                <TabsTrigger
                  value="products"
                  className="text-brand data-[state=active]:bg-brand data-[state=active]:text-white hover:bg-brand/10"
                >
                  Produkte
                </TabsTrigger>
                <TabsTrigger
                  value="orders"
                  className="text-brand data-[state=active]:bg-brand data-[state=active]:text-white hover:bg-brand/10"
                >
                  Bestellungen
                </TabsTrigger>
                <TabsTrigger
                  value="schools"
                  className="text-brand data-[state=active]:bg-brand data-[state=active]:text-white hover:bg-brand/10"
                >
                  Schulen
                </TabsTrigger>
                <TabsTrigger
                  value="users"
                  className="text-brand data-[state=active]:bg-brand data-[state=active]:text-white hover:bg-brand/10"
                >
                  Benutzer
                </TabsTrigger>
                <TabsTrigger
                  value="masterdata"
                  className="text-brand data-[state=active]:bg-brand data-[state=active]:text-white hover:bg-brand/10"
                >
                  Stammdaten
                </TabsTrigger>
              </TabsList>
              <TabsContent value="products">
                <ProductsPage />
              </TabsContent>
              <TabsContent value="orders">
                <OrdersContent />
              </TabsContent>
              <TabsContent value="schools">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-3xl font-bold text-brand">Schulen verwalten</h2>
                  <div className="flex items-center space-x-4">
                    <div className="relative w-64">
                      <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                      <Input
                        type="text"
                        placeholder="Schulen durchsuchen..."
                        value={schoolSearchQuery}
                        onChange={(e) => setSchoolSearchQuery(e.target.value)}
                        className="pl-8 pr-4 py-2 placeholder:text-gray-400"
                      />
                    </div>
                    <Dialog open={isSchoolDialogOpen} onOpenChange={setIsSchoolDialogOpen}>
                      <DialogTrigger asChild>
                        <Button
                          onClick={() => setEditingSchool(null)}
                          className="bg-brand hover:bg-brand/90 text-white"
                        >
                          <PlusCircle className="mr-2 h-4 w-4" /> Neue Schule
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[600px]">
                        <DialogHeader>
                          <DialogTitle>{editingSchool ? "Schule bearbeiten" : "Neue Schule hinzufügen"}</DialogTitle>
                        </DialogHeader>
                        <SchoolForm school={editingSchool} onSave={handleSaveSchool} />
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="text-brand">Bild</TableHead>
                        <TableHead className="cursor-pointer text-brand" onClick={() => requestSchoolSort("name")}>
                          Name{" "}
                          {schoolSortConfig.key === "name" &&
                            (schoolSortConfig.direction === "ascending" ? (
                              <ArrowUp className="inline ml-2 h-4 w-4" />
                            ) : (
                              <ArrowDown className="inline ml-2 h-4 w-4" />
                            ))}
                        </TableHead>
                        <TableHead className="cursor-pointer text-brand" onClick={() => requestSchoolSort("address")}>
                          Adresse{" "}
                          {schoolSortConfig.key === "address" &&
                            (schoolSortConfig.direction === "ascending" ? (
                              <ArrowUp className="inline ml-2 h-4 w-4" />
                            ) : (
                              <ArrowDown className="inline ml-2 h-4 w-4" />
                            ))}
                        </TableHead>
                        <TableHead className="text-brand">Aktionen</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredSchools.map((school) => (
                        <TableRow key={school.id}>
                          <TableCell>
                            <Image
                              src={school.image || "/placeholder.svg"}
                              alt={school.name}
                              width={50}
                              height={50}
                              className="object-cover rounded"
                            />
                          </TableCell>
                          <TableCell>{school.name}</TableCell>
                          <TableCell>{school.address}</TableCell>
                          <TableCell>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleEditSchool(school)}
                              className="text-brand hover:bg-brand/10"
                            >
                              <Pencil className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDeleteSchool(school)}
                              className="text-red-500 hover:bg-red-500/10"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>
              <TabsContent value="users">
                <UsersPage />
              </TabsContent>
              <TabsContent value="masterdata">
                <MasterDataContent />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </main>

      <AlertDialog open={isDeleteSchoolDialogOpen} onOpenChange={setIsDeleteSchoolDialogOpen}>
        <AlertDialogContent className="bg-white border-2 border-brand">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-2xl font-bold text-black">Sind Sie sicher?</AlertDialogTitle>
            <AlertDialogDescription className="text-gray-600">
              Diese Aktion kann nicht rückgängig gemacht werden. Dies wird die Schule dauerhaft aus unserer Datenbank
              löschen.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="border-gray-300 text-black hover:bg-gray-100 hover:border-gray-400">
              Abbrechen
            </AlertDialogCancel>
            <AlertDialogAction onClick={confirmDeleteSchool} className="bg-red-500 hover:bg-red-600 text-white">
              Löschen
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

