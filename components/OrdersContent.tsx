"use client"

import { useState, useMemo } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableRow, TableHeader } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowUp, ArrowDown, Search, Eye, Pencil, Trash2 } from "lucide-react"
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
import type React from "react"

type Product = {
  id: number
  name: string
  category: string
  size: string
  quantity: number
  price: number
  image: string
}

type Order = {
  id: number
  customerName: string
  parentName: string
  phoneNumber: string
  birthDate: string
  street: string
  city: string
  postalCode: string
  school: string
  orderDate: string
  totalAmount: number
  status: "Neu" | "In Bearbeitung" | "Versandt" | "Abgeschlossen"
  products: Product[]
}

const mockOrders: Order[] = [
  {
    id: 1,
    customerName: "Max Mustermann",
    parentName: "Maria Mustermann",
    phoneNumber: "+43 123 456789",
    birthDate: "2005-05-15",
    street: "Musterstraße 1",
    city: "Linz",
    postalCode: "4020",
    school: "HLW Auhof",
    orderDate: "2023-06-15",
    totalAmount: 150.99,
    status: "Neu",
    products: [
      {
        id: 1,
        name: "T-Shirt",
        category: "Oberteile",
        size: "M",
        quantity: 2,
        price: 29.99,
        image: "/placeholder.svg?height=100&width=100",
      },
      {
        id: 2,
        name: "Hose",
        category: "Unterteile",
        size: "L",
        quantity: 1,
        price: 49.99,
        image: "/placeholder.svg?height=100&width=100",
      },
    ],
  },
  {
    id: 2,
    customerName: "Anna Schmidt",
    parentName: "Thomas Schmidt",
    phoneNumber: "+43 987 654321",
    birthDate: "2006-08-22",
    street: "Hauptplatz 5",
    city: "Perg",
    postalCode: "4320",
    school: "HLW Perg",
    orderDate: "2023-06-14",
    totalAmount: 89.5,
    status: "In Bearbeitung",
    products: [
      {
        id: 3,
        name: "Kleid",
        category: "Kleider",
        size: "S",
        quantity: 1,
        price: 89.5,
        image: "/placeholder.svg?height=100&width=100",
      },
    ],
  },
  {
    id: 3,
    customerName: "Lisa Huber",
    parentName: "Michael Huber",
    phoneNumber: "+43 676 1234567",
    birthDate: "2004-11-30",
    street: "Schulstraße 10",
    city: "Wels",
    postalCode: "4600",
    school: "HBLW Wels",
    orderDate: "2023-06-13",
    totalAmount: 210.75,
    status: "Versandt",
    products: [
      {
        id: 4,
        name: "Jacke",
        category: "Oberteile",
        size: "L",
        quantity: 1,
        price: 129.99,
        image: "/placeholder.svg?height=100&width=100",
      },
      {
        id: 5,
        name: "Schuhe",
        category: "Schuhe",
        size: "39",
        quantity: 1,
        price: 80.76,
        image: "/placeholder.svg?height=100&width=100",
      },
    ],
  },
  {
    id: 4,
    customerName: "Thomas Bauer",
    parentName: "Sabine Bauer",
    phoneNumber: "+43 660 9876543",
    birthDate: "2007-02-18",
    street: "Linzerstraße 20",
    city: "Linz",
    postalCode: "4020",
    school: "HLW Auhof",
    orderDate: "2023-06-12",
    totalAmount: 75.25,
    status: "Abgeschlossen",
    products: [
      {
        id: 6,
        name: "Hemd",
        category: "Oberteile",
        size: "M",
        quantity: 1,
        price: 45.5,
        image: "/placeholder.svg?height=100&width=100",
      },
      {
        id: 7,
        name: "Krawatte",
        category: "Accessoires",
        size: "Universal",
        quantity: 1,
        price: 29.75,
        image: "/placeholder.svg?height=100&width=100",
      },
    ],
  },
]

export default function OrdersContent() {
  const [activeTab, setActiveTab] = useState("bestellliste")
  const [orders, setOrders] = useState<Order[]>(mockOrders)
  const [searchQuery, setSearchQuery] = useState("")
  const [sortConfig, setSortConfig] = useState<{ key: keyof Order; direction: "ascending" | "descending" } | null>(null)
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
  const [isOrderOverviewOpen, setIsOrderOverviewOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [schoolFilter, setSchoolFilter] = useState<string>("all")

  const requestSort = (key: keyof Order) => {
    let direction: "ascending" | "descending" = "ascending"
    if (sortConfig && sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending"
    }
    setSortConfig({ key, direction })
  }

  const sortedOrders = useMemo(() => {
    const sortableOrders = [...orders]
    if (sortConfig !== null) {
      sortableOrders.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? -1 : 1
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? 1 : -1
        }
        return 0
      })
    }
    return sortableOrders
  }, [orders, sortConfig])

  const filteredOrders = useMemo(() => {
    return sortedOrders.filter(
      (order) =>
        (schoolFilter === "all" || order.school === schoolFilter) &&
        Object.values(order).some(
          (value) => typeof value === "string" && value.toLowerCase().includes(searchQuery.toLowerCase()),
        ),
    )
  }, [sortedOrders, searchQuery, schoolFilter])

  const handleStatusChange = (orderId: number, newStatus: Order["status"]) => {
    setOrders(orders.map((order) => (order.id === orderId ? { ...order, status: newStatus } : order)))
  }

  const handleViewDetails = (order: Order) => {
    setSelectedOrder(order)
    setIsOrderOverviewOpen(true)
  }

  const handleEditOrder = (order: Order) => {
    setSelectedOrder(order)
    setIsEditDialogOpen(true)
  }

  const handleDeleteOrder = (order: Order) => {
    setSelectedOrder(order)
    setIsDeleteDialogOpen(true)
  }

  const confirmDeleteOrder = () => {
    if (selectedOrder) {
      setOrders(orders.filter((order) => order.id !== selectedOrder.id))
      setIsDeleteDialogOpen(false)
      setSelectedOrder(null)
    }
  }

  const handleSaveOrder = (updatedOrder: Order) => {
    const totalAmount = updatedOrder.products.reduce((sum, product) => sum + product.price * product.quantity, 0)
    const finalOrder = { ...updatedOrder, totalAmount }
    setOrders(orders.map((order) => (order.id === finalOrder.id ? finalOrder : order)))
    setIsEditDialogOpen(false)
    setSelectedOrder(null)
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-brand">Bestellungen verwalten</h2>
        <div className="flex items-center space-x-4">
          <div className="w-40">
            <Select value={schoolFilter} onValueChange={setSchoolFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Schule filtern" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Alle Schulen</SelectItem>
                {Array.from(new Set(orders.map((order) => order.school))).map((school) => (
                  <SelectItem key={school} value={school}>
                    {school}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="w-64 relative">
            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
            <Input
              type="text"
              placeholder="Bestellungen durchsuchen..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8 pr-4 py-2 w-full placeholder:text-gray-400"
            />
          </div>
        </div>
      </div>
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full mb-8">
        <TabsList className="w-full">
          <TabsTrigger
            value="bestellliste"
            className="flex-1 text-brand data-[state=active]:bg-brand data-[state=active]:text-white hover:bg-brand/10"
          >
            Bestellliste
          </TabsTrigger>
          <TabsTrigger
            value="bestellubersicht"
            className="flex-1 text-brand data-[state=active]:bg-brand data-[state=active]:text-white hover:bg-brand/10"
          >
            Bestellübersicht
          </TabsTrigger>
        </TabsList>
        <TabsContent value="bestellliste" className="pt-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="cursor-pointer text-brand" onClick={() => requestSort("id")}>
                  Bestellnummer
                  {sortConfig?.key === "id" &&
                    (sortConfig.direction === "ascending" ? (
                      <ArrowUp className="inline ml-2 h-4 w-4" />
                    ) : (
                      <ArrowDown className="inline ml-2 h-4 w-4" />
                    ))}
                </TableHead>
                <TableHead className="cursor-pointer text-brand" onClick={() => requestSort("customerName")}>
                  Kunde
                  {sortConfig?.key === "customerName" &&
                    (sortConfig.direction === "ascending" ? (
                      <ArrowUp className="inline ml-2 h-4 w-4" />
                    ) : (
                      <ArrowDown className="inline ml-2 h-4 w-4" />
                    ))}
                </TableHead>
                <TableHead className="cursor-pointer text-brand" onClick={() => requestSort("school")}>
                  Schule
                  {sortConfig?.key === "school" &&
                    (sortConfig.direction === "ascending" ? (
                      <ArrowUp className="inline ml-2 h-4 w-4" />
                    ) : (
                      <ArrowDown className="inline ml-2 h-4 w-4" />
                    ))}
                </TableHead>
                <TableHead className="cursor-pointer text-brand" onClick={() => requestSort("orderDate")}>
                  Bestelldatum
                  {sortConfig?.key === "orderDate" &&
                    (sortConfig.direction === "ascending" ? (
                      <ArrowUp className="inline ml-2 h-4 w-4" />
                    ) : (
                      <ArrowDown className="inline ml-2 h-4 w-4" />
                    ))}
                </TableHead>
                <TableHead className="cursor-pointer text-brand" onClick={() => requestSort("totalAmount")}>
                  Gesamtbetrag
                  {sortConfig?.key === "totalAmount" &&
                    (sortConfig.direction === "ascending" ? (
                      <ArrowUp className="inline ml-2 h-4 w-4" />
                    ) : (
                      <ArrowDown className="inline ml-2 h-4 w-4" />
                    ))}
                </TableHead>
                <TableHead className="cursor-pointer text-brand" onClick={() => requestSort("status")}>
                  Status
                  {sortConfig?.key === "status" &&
                    (sortConfig.direction === "ascending" ? (
                      <ArrowUp className="inline ml-2 h-4 w-4" />
                    ) : (
                      <ArrowDown className="inline ml-2 h-4 w-4" />
                    ))}
                </TableHead>
                <TableHead className="text-brand">Aktionen</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredOrders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell>{order.id}</TableCell>
                  <TableCell>{order.customerName}</TableCell>
                  <TableCell>{order.school}</TableCell>
                  <TableCell>{order.orderDate}</TableCell>
                  <TableCell>€{order.totalAmount.toFixed(2)}</TableCell>
                  <TableCell>
                    <Select
                      value={order.status}
                      onValueChange={(value: Order["status"]) => handleStatusChange(order.id, value)}
                    >
                      <SelectTrigger className="w-[180px] border-brand text-brand">
                        <SelectValue placeholder="Status ändern" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Neu">Neu</SelectItem>
                        <SelectItem value="In Bearbeitung">In Bearbeitung</SelectItem>
                        <SelectItem value="Versandt">Versandt</SelectItem>
                        <SelectItem value="Abgeschlossen">Abgeschlossen</SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleViewDetails(order)}
                        className="text-brand hover:text-brand/80"
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEditOrder(order)}
                        className="text-brand hover:text-brand/80"
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteOrder(order)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TabsContent>
        <TabsContent value="bestellubersicht" className="pt-4">
          <OrderOverview orders={orders} searchQuery={searchQuery} schoolFilter={schoolFilter} />
        </TabsContent>
      </Tabs>

      <Dialog open={isOrderOverviewOpen} onOpenChange={setIsOrderOverviewOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-brand">Bestellungsübersicht</DialogTitle>
          </DialogHeader>
          {selectedOrder && (
            <div className="mt-4 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <Card>
                  <CardHeader className="py-2">
                    <CardTitle className="text-lg font-semibold text-brand">Bestelldetails</CardTitle>
                  </CardHeader>
                  <CardContent className="py-2">
                    <p>
                      <strong>Bestellnummer:</strong> {selectedOrder.id}
                    </p>
                    <p>
                      <strong>Datum:</strong> {selectedOrder.orderDate}
                    </p>
                    <p>
                      <strong>Status:</strong> {selectedOrder.status}
                    </p>
                    <p>
                      <strong>Gesamtbetrag:</strong> €{selectedOrder.totalAmount.toFixed(2)}
                    </p>
                    <p>
                      <strong>Schule:</strong> {selectedOrder.school}
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="py-2">
                    <CardTitle className="text-lg font-semibold text-brand">Kundendaten</CardTitle>
                  </CardHeader>
                  <CardContent className="py-2">
                    <p>
                      <strong>Schüler:</strong> {selectedOrder.customerName}
                    </p>
                    <p>
                      <strong>Elternteil:</strong> {selectedOrder.parentName}
                    </p>
                    <p>
                      <strong>Telefon:</strong> {selectedOrder.phoneNumber}
                    </p>
                    <p>
                      <strong>Geburtsdatum:</strong> {selectedOrder.birthDate}
                    </p>
                    <p>
                      <strong>Adresse:</strong> {selectedOrder.street}, {selectedOrder.postalCode} {selectedOrder.city}
                    </p>
                  </CardContent>
                </Card>
              </div>
              <Card>
                <CardHeader className="py-2">
                  <CardTitle className="text-lg font-semibold text-brand">Bestellte Produkte</CardTitle>
                </CardHeader>
                <CardContent className="py-2">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[50px]">Bild</TableHead>
                        <TableHead>Produkt</TableHead>
                        <TableHead>Kategorie</TableHead>
                        <TableHead>Größe</TableHead>
                        <TableHead>Menge</TableHead>
                        <TableHead>Preis</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {selectedOrder.products.map((product) => (
                        <TableRow key={product.id}>
                          <TableCell>
                            <Image
                              src={product.image || "/placeholder.svg"}
                              alt={product.name}
                              width={40}
                              height={40}
                              className="rounded-md"
                            />
                          </TableCell>
                          <TableCell>{product.name}</TableCell>
                          <TableCell>{product.category}</TableCell>
                          <TableCell>{product.size}</TableCell>
                          <TableCell>{product.quantity}</TableCell>
                          <TableCell>€{product.price.toFixed(2)}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-brand">Bestellung bearbeiten</DialogTitle>
          </DialogHeader>
          {selectedOrder && (
            <OrderForm order={selectedOrder} onSave={handleSaveOrder} onCancel={() => setIsEditDialogOpen(false)} />
          )}
        </DialogContent>
      </Dialog>

      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Bestellung löschen</AlertDialogTitle>
            <AlertDialogDescription>
              Sind Sie sicher, dass Sie diese Bestellung löschen möchten? Diese Aktion kann nicht rückgängig gemacht
              werden.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Abbrechen</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDeleteOrder} className="bg-red-500 hover:bg-red-600">
              Löschen
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

function OrderForm({
  order,
  onSave,
  onCancel,
}: { order: Order; onSave: (order: Order) => void; onCancel: () => void }) {
  const [formData, setFormData] = useState<Order>(order)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(formData)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="customerName">Schülername</Label>
          <Input id="customerName" name="customerName" value={formData.customerName} onChange={handleChange} required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="parentName">Name eines Elternteils</Label>
          <Input id="parentName" name="parentName" value={formData.parentName} onChange={handleChange} required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="phoneNumber">Telefonnummer</Label>
          <Input id="phoneNumber" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="birthDate">Geburtsdatum</Label>
          <Input
            id="birthDate"
            name="birthDate"
            type="date"
            value={formData.birthDate}
            onChange={handleChange}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="street">Straße</Label>
          <Input id="street" name="street" value={formData.street} onChange={handleChange} required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="city">Stadt</Label>
          <Input id="city" name="city" value={formData.city} onChange={handleChange} required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="postalCode">Postleitzahl</Label>
          <Input id="postalCode" name="postalCode" value={formData.postalCode} onChange={handleChange} required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="school">Schule</Label>
          <Input id="school" name="school" value={formData.school} onChange={handleChange} required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="orderDate">Bestelldatum</Label>
          <Input
            id="orderDate"
            name="orderDate"
            type="date"
            value={formData.orderDate}
            onChange={handleChange}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="status">Status</Label>
          <Select
            name="status"
            value={formData.status}
            onValueChange={(value) => handleChange({ target: { name: "status", value } } as any)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Status wählen" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Neu">Neu</SelectItem>
              <SelectItem value="In Bearbeitung">In Bearbeitung</SelectItem>
              <SelectItem value="Versandt">Versandt</SelectItem>
              <SelectItem value="Abgeschlossen">Abgeschlossen</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="flex justify-end space-x-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          Abbrechen
        </Button>
        <Button type="submit" className="bg-brand hover:bg-brand/90 text-white">
          Speichern
        </Button>
      </div>
    </form>
  )
}

function OrderOverview({
  orders,
  searchQuery,
  schoolFilter,
}: { orders: Order[]; searchQuery: string; schoolFilter: string }) {
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: "ascending" | "descending" } | null>(null)

  const productOverview = useMemo(() => {
    const overview: {
      [key: string]: {
        id: number
        name: string
        image: string
        school: string
        categories: string[]
        sizes: { [size: string]: number }
        totalQuantity: number
      }
    } = {}

    orders.forEach((order) => {
      if (schoolFilter !== "all" && order.school !== schoolFilter) {
        return
      }
      order.products.forEach((product) => {
        if (!overview[product.name]) {
          overview[product.name] = {
            id: product.id,
            name: product.name,
            image: product.image,
            school: order.school,
            categories: [product.category],
            sizes: {},
            totalQuantity: 0,
          }
        }

        if (!overview[product.name].sizes[product.size]) {
          overview[product.name].sizes[product.size] = 0
        }

        overview[product.name].sizes[product.size] += product.quantity
        overview[product.name].totalQuantity += product.quantity

        if (!overview[product.name].categories.includes(product.category)) {
          overview[product.name].categories.push(product.category)
        }
      })
    })

    return Object.values(overview)
  }, [orders, schoolFilter])

  const filteredProductOverview = useMemo(() => {
    return productOverview.filter((product) => {
      const searchFields = [
        product.name,
        product.school,
        ...product.categories,
        ...Object.entries(product.sizes).map(([size, quantity]) => `${size}: ${quantity}`),
      ]
      return searchFields.some((field) => field.toLowerCase().includes(searchQuery.toLowerCase()))
    })
  }, [productOverview, searchQuery])

  const sortedProductOverview = useMemo(() => {
    if (!sortConfig) {
      return filteredProductOverview
    }

    return [...filteredProductOverview].sort((a, b) => {
      if (sortConfig.key === "sizes") {
        // For sizes, sort by total quantity
        if (a.totalQuantity < b.totalQuantity) {
          return sortConfig.direction === "ascending" ? -1 : 1
        }
        if (a.totalQuantity > b.totalQuantity) {
          return sortConfig.direction === "ascending" ? 1 : -1
        }
        return 0
      } else if (sortConfig.key === "categories") {
        // For categories, sort by the first category
        const aCategory = a.categories[0] || ""
        const bCategory = b.categories[0] || ""
        if (aCategory < bCategory) {
          return sortConfig.direction === "ascending" ? -1 : 1
        }
        if (aCategory > bCategory) {
          return sortConfig.direction === "ascending" ? 1 : -1
        }
        return 0
      } else {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? -1 : 1
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? 1 : -1
        }
        return 0
      }
    })
  }, [filteredProductOverview, sortConfig])

  const requestSort = (key: string) => {
    let direction: "ascending" | "descending" = "ascending"
    if (sortConfig && sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending"
    }
    setSortConfig({ key, direction })
  }

  return (
    <div className="space-y-6">
      {/* Removed h3 tag here */}
      {sortedProductOverview.length === 0 ? (
        <p className="text-center text-gray-500">Keine Produkte gefunden.</p>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px] text-brand">Bild</TableHead>
              <TableHead className="cursor-pointer text-brand" onClick={() => requestSort("name")}>
                Produktname
                {sortConfig?.key === "name" &&
                  (sortConfig.direction === "ascending" ? (
                    <ArrowUp className="inline ml-2 h-4 w-4" />
                  ) : (
                    <ArrowDown className="inline ml-2 h-4 w-4" />
                  ))}
              </TableHead>
              <TableHead className="cursor-pointer text-brand" onClick={() => requestSort("school")}>
                Schule
                {sortConfig?.key === "school" &&
                  (sortConfig.direction === "ascending" ? (
                    <ArrowUp className="inline ml-2 h-4 w-4" />
                  ) : (
                    <ArrowDown className="inline ml-2 h-4 w-4" />
                  ))}
              </TableHead>
              <TableHead className="cursor-pointer text-brand" onClick={() => requestSort("categories")}>
                Kategorien
                {sortConfig?.key === "categories" &&
                  (sortConfig.direction === "ascending" ? (
                    <ArrowUp className="inline ml-2 h-4 w-4" />
                  ) : (
                    <ArrowDown className="inline ml-2 h-4 w-4" />
                  ))}
              </TableHead>
              <TableHead className="cursor-pointer text-brand" onClick={() => requestSort("sizes")}>
                Größen & Mengen
                {sortConfig?.key === "sizes" &&
                  (sortConfig.direction === "ascending" ? (
                    <ArrowUp className="inline ml-2 h-4 w-4" />
                  ) : (
                    <ArrowDown className="inline ml-2 h-4 w-4" />
                  ))}
              </TableHead>
              <TableHead className="cursor-pointer text-brand" onClick={() => requestSort("totalQuantity")}>
                Gesamtmenge
                {sortConfig?.key === "totalQuantity" &&
                  (sortConfig.direction === "ascending" ? (
                    <ArrowUp className="inline ml-2 h-4 w-4" />
                  ) : (
                    <ArrowDown className="inline ml-2 h-4 w-4" />
                  ))}
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedProductOverview.map((product) => (
              <TableRow key={product.id}>
                <TableCell>
                  <Image
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    width={80}
                    height={80}
                    className="rounded-md object-cover"
                  />
                </TableCell>
                <TableCell className="font-medium">{product.name}</TableCell>
                <TableCell>{product.school}</TableCell>
                <TableCell>{product.categories.join(", ")}</TableCell>
                <TableCell>
                  {Object.entries(product.sizes).map(([size, quantity]) => (
                    <div key={size}>
                      {size}: {quantity}
                    </div>
                  ))}
                </TableCell>
                <TableCell>{product.totalQuantity}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  )
}

