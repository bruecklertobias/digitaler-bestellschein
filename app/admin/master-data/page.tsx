"use client"

import { useState, useMemo } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PlusCircle, Pencil, Trash2, ArrowUp, ArrowDown, Search } from "lucide-react"

// Mock data for categories and sizes
const mockCategories = [
  { id: 1, name: "Oberteile" },
  { id: 2, name: "Berufskleidung" },
  { id: 3, name: "Accessoires" },
  { id: 4, name: "Hosen" },
  { id: 5, name: "Schuhe" },
]

const mockSizes = [
  { id: 1, name: "XS" },
  { id: 2, name: "S" },
  { id: 3, name: "M" },
  { id: 4, name: "L" },
  { id: 5, name: "XL" },
  { id: 6, name: "XXL" },
  { id: 7, name: "Universal" },
]

export default function MasterDataPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("categories")
  const [categories, setCategories] = useState(mockCategories)
  const [sizes, setSizes] = useState(mockSizes)
  const [sortConfig, setSortConfig] = useState({ key: "name", direction: "ascending" })
  const [searchQuery, setSearchQuery] = useState("")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [editingItem, setEditingItem] = useState(null)
  const [itemToDelete, setItemToDelete] = useState(null)

  const requestSort = () => {
    const direction = sortConfig.direction === "ascending" ? "descending" : "ascending"
    setSortConfig({ key: "name", direction })
  }

  const sortedItems = useMemo(() => {
    const items = activeTab === "categories" ? categories : sizes
    return [...items].sort((a, b) => {
      if (a.name < b.name) {
        return sortConfig.direction === "ascending" ? -1 : 1
      }
      if (a.name > b.name) {
        return sortConfig.direction === "ascending" ? 1 : -1
      }
      return 0
    })
  }, [activeTab, categories, sizes, sortConfig])

  const filteredItems = useMemo(() => {
    return sortedItems.filter((item) => item.name.toLowerCase().includes(searchQuery.toLowerCase()))
  }, [sortedItems, searchQuery])

  const handleAdd = () => {
    setEditingItem(null)
    setIsDialogOpen(true)
  }

  const handleEdit = (item) => {
    setEditingItem(item)
    setIsDialogOpen(true)
  }

  const handleDelete = (item) => {
    setItemToDelete(item)
    setIsDeleteDialogOpen(true)
  }

  const handleSave = (name) => {
    if (editingItem) {
      // Edit existing item
      const updatedItems =
        activeTab === "categories"
          ? categories.map((item) => (item.id === editingItem.id ? { ...item, name } : item))
          : sizes.map((item) => (item.id === editingItem.id ? { ...item, name } : item))
      activeTab === "categories" ? setCategories(updatedItems) : setSizes(updatedItems)
    } else {
      // Add new item
      const newItem = { id: Date.now(), name }
      activeTab === "categories" ? setCategories([...categories, newItem]) : setSizes([...sizes, newItem])
    }
    setIsDialogOpen(false)
  }

  const confirmDelete = () => {
    const updatedItems =
      activeTab === "categories"
        ? categories.filter((item) => item.id !== itemToDelete.id)
        : sizes.filter((item) => item.id !== itemToDelete.id)
    activeTab === "categories" ? setCategories(updatedItems) : setSizes(updatedItems)
    setIsDeleteDialogOpen(false)
  }

  return (
    <div className="container mx-auto py-10">
      <Card className="bg-white/90 backdrop-blur-sm shadow-lg">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-brand">Stammdaten verwalten</CardTitle>
          <CardDescription className="text-lg text-brand/80">
            Verwalten Sie Kategorien und Größen für Ihre Produkte
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="categories" className="text-brand">
                Kategorien
              </TabsTrigger>
              <TabsTrigger value="sizes" className="text-brand">
                Größen
              </TabsTrigger>
            </TabsList>
            <TabsContent value="categories">
              <DataTable
                items={filteredItems}
                onAdd={handleAdd}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onSort={requestSort}
                sortDirection={sortConfig.direction}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                title="Kategorien"
              />
            </TabsContent>
            <TabsContent value="sizes">
              <DataTable
                items={filteredItems}
                onAdd={handleAdd}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onSort={requestSort}
                sortDirection={sortConfig.direction}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                title="Größen"
              />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingItem ? "Bearbeiten" : "Hinzufügen"}</DialogTitle>
            <DialogDescription>
              {editingItem
                ? `Bearbeiten Sie den Namen für ${activeTab === "categories" ? "die Kategorie" : "die Größe"}.`
                : `Fügen Sie ${activeTab === "categories" ? "eine neue Kategorie" : "eine neue Größe"} hinzu.`}
            </DialogDescription>
          </DialogHeader>
          <ItemForm item={editingItem} onSave={handleSave} />
        </DialogContent>
      </Dialog>

      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Sind Sie sicher?</AlertDialogTitle>
            <AlertDialogDescription>
              Diese Aktion kann nicht rückgängig gemacht werden. Dies wird{" "}
              {activeTab === "categories" ? "die Kategorie" : "die Größe"} dauerhaft aus der Datenbank löschen.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Abbrechen</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete}>Löschen</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

function DataTable({ items, onAdd, onEdit, onDelete, onSort, sortDirection, searchQuery, setSearchQuery, title }) {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-brand">{title}</h2>
        <div className="flex items-center space-x-4">
          <div className="relative w-64">
            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500" />
            <Input
              type="text"
              placeholder={`${title} durchsuchen...`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8 pr-4 py-2"
            />
          </div>
          <Button onClick={onAdd} className="bg-brand hover:bg-brand/90 text-white">
            <PlusCircle className="mr-2 h-4 w-4" /> Neu hinzufügen
          </Button>
        </div>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="cursor-pointer text-brand" onClick={onSort}>
              Name{" "}
              {sortDirection === "ascending" ? (
                <ArrowUp className="inline ml-2 h-4 w-4" />
              ) : (
                <ArrowDown className="inline ml-2 h-4 w-4" />
              )}
            </TableHead>
            <TableHead className="text-right">Aktionen</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.name}</TableCell>
              <TableCell className="text-right">
                <Button variant="ghost" size="sm" onClick={() => onEdit(item)} className="text-brand hover:bg-brand/10">
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onDelete(item)}
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
  )
}

function ItemForm({ item, onSave }) {
  const [name, setName] = useState(item ? item.name : "")

  const handleSubmit = (e) => {
    e.preventDefault()
    onSave(name)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <Input id="name" value={name} onChange={(e) => setName(e.target.value)} required className="border-brand" />
      </div>
      <Button type="submit" className="w-full bg-brand hover:bg-brand/90">
        Speichern
      </Button>
    </form>
  )
}

