"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PlusCircle, Pencil, Trash2, Search } from "lucide-react"
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

type Item = {
  id: number
  name: string
}

const initialCategories: Item[] = [
  { id: 1, name: "Oberteile" },
  { id: 2, name: "Berufskleidung" },
  { id: 3, name: "Accessoires" },
  { id: 4, name: "Hosen" },
  { id: 5, name: "Schuhe" },
]

const initialSizes: Item[] = [
  { id: 1, name: "XS" },
  { id: 2, name: "S" },
  { id: 3, name: "M" },
  { id: 4, name: "L" },
  { id: 5, name: "XL" },
  { id: 6, name: "XXL" },
  { id: 7, name: "Universal" },
]

export default function MasterDataContent() {
  const [categories, setCategories] = useState<Item[]>(initialCategories)
  const [sizes, setSizes] = useState<Item[]>(initialSizes)
  const [activeTab, setActiveTab] = useState("categories")
  const [newItemName, setNewItemName] = useState("")
  const [editingItem, setEditingItem] = useState<Item | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [itemToDelete, setItemToDelete] = useState<Item | null>(null)

  const handleAddItem = () => {
    if (newItemName.trim() === "") return
    const newItem: Item = {
      id: Math.max(...(activeTab === "categories" ? categories : sizes).map((item) => item.id)) + 1,
      name: newItemName.trim(),
    }
    if (activeTab === "categories") {
      setCategories([...categories, newItem])
    } else {
      setSizes([...sizes, newItem])
    }
    setNewItemName("")
    setIsDialogOpen(false)
  }

  const handleEditItem = (item: Item) => {
    setEditingItem(item)
    setNewItemName(item.name)
    setIsDialogOpen(true)
  }

  const handleUpdateItem = () => {
    if (!editingItem || newItemName.trim() === "") return
    const updatedItem = { ...editingItem, name: newItemName.trim() }
    if (activeTab === "categories") {
      setCategories(categories.map((item) => (item.id === editingItem.id ? updatedItem : item)))
    } else {
      setSizes(sizes.map((item) => (item.id === editingItem.id ? updatedItem : item)))
    }
    setEditingItem(null)
    setNewItemName("")
    setIsDialogOpen(false)
  }

  const handleDeleteConfirmation = (item: Item) => {
    setItemToDelete(item)
    setIsDeleteDialogOpen(true)
  }

  const handleDeleteItem = () => {
    if (!itemToDelete) return
    if (activeTab === "categories") {
      setCategories(categories.filter((item) => item.id !== itemToDelete.id))
    } else {
      setSizes(sizes.filter((item) => item.id !== itemToDelete.id))
    }
    setIsDeleteDialogOpen(false)
    setItemToDelete(null)
  }

  const filteredItems = (activeTab === "categories" ? categories : sizes).filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const renderTable = (items: Item[]) => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="text-brand">Name</TableHead>
          <TableHead className="text-right text-brand">Aktionen</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {items.map((item) => (
          <TableRow key={item.id}>
            <TableCell className="font-medium">{item.name}</TableCell>
            <TableCell className="text-right">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleEditItem(item)}
                className="text-brand hover:text-brand/80"
              >
                <Pencil className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleDeleteConfirmation(item)}
                className="text-red-500 hover:text-red-700"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-brand">Stammdaten verwalten</h2>
        <div className="flex items-center space-x-4">
          <div className="relative w-64">
            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
            <Input
              type="text"
              placeholder={`${activeTab === "categories" ? "Kategorien" : "Größen"} durchsuchen...`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8 pr-4 py-2 placeholder:text-gray-400"
            />
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button
                onClick={() => {
                  setEditingItem(null)
                  setNewItemName("")
                }}
                className="bg-brand hover:bg-brand/90 text-white"
              >
                <PlusCircle className="mr-2 h-4 w-4" />
                {activeTab === "categories" ? "Neue Kategorie" : "Neue Größe"}
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>
                  {editingItem
                    ? `${activeTab === "categories" ? "Kategorie" : "Größe"} bearbeiten`
                    : `Neue ${activeTab === "categories" ? "Kategorie" : "Größe"} hinzufügen`}
                </DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Name
                  </Label>
                  <Input
                    id="name"
                    value={newItemName}
                    onChange={(e) => setNewItemName(e.target.value)}
                    className="col-span-3"
                  />
                </div>
              </div>
              <Button
                onClick={editingItem ? handleUpdateItem : handleAddItem}
                className="bg-brand hover:bg-brand/90 text-white"
              >
                {editingItem ? "Aktualisieren" : "Hinzufügen"}
              </Button>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger
            value="categories"
            className="text-brand data-[state=active]:bg-brand data-[state=active]:text-white hover:bg-brand/10"
          >
            Kategorien
          </TabsTrigger>
          <TabsTrigger
            value="sizes"
            className="text-brand data-[state=active]:bg-brand data-[state=active]:text-white hover:bg-brand/10"
          >
            Größen
          </TabsTrigger>
        </TabsList>
        <TabsContent value="categories">{renderTable(filteredItems)}</TabsContent>
        <TabsContent value="sizes">{renderTable(filteredItems)}</TabsContent>
      </Tabs>

      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Sind Sie sicher?</AlertDialogTitle>
            <AlertDialogDescription>
              Diese Aktion kann nicht rückgängig gemacht werden. Dies wird{" "}
              {activeTab === "categories" ? "die Kategorie" : "die Größe"}"{itemToDelete?.name}" dauerhaft aus der
              Datenbank löschen.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Abbrechen</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteItem} className="bg-red-500 hover:bg-red-600 text-white">
              Löschen
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

