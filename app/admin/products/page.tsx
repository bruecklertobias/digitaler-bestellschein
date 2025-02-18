"use client"

import { useState, useMemo } from "react"
import { useRouter } from "next/navigation"
import { PlusCircle, Search, Pencil, Trash2 } from "lucide-react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ProductDialog } from "./product-dialog"
import { DeleteConfirmDialog } from "./delete-confirm-dialog"

type Product = {
  id: string
  name: string
  description: string
  price: number
  categories: string[]
  sizes: string[]
  school: string
  image: string
}

const mockProducts: Product[] = [
  {
    id: "1",
    name: "School T-Shirt",
    description: "Comfortable cotton t-shirt with school logo",
    price: 19.99,
    categories: ["Clothing", "Uniforms"],
    sizes: ["S", "M", "L", "XL"],
    school: "HLW Auhof",
    image: "/placeholder.svg",
  },
  {
    id: "2",
    name: "School Backpack",
    description: "Durable backpack with multiple compartments",
    price: 39.99,
    categories: ["Accessories"],
    sizes: ["One Size"],
    school: "HLW Perg",
    image: "/placeholder.svg",
  },
  {
    id: "3",
    name: "Math Textbook",
    description: "Comprehensive math textbook for 10th grade",
    price: 29.99,
    categories: ["Books", "Educational"],
    sizes: ["Standard"],
    school: "HBLW Wels",
    image: "/placeholder.svg",
  },
]

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>(mockProducts)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [currentProduct, setCurrentProduct] = useState<Product | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [schoolFilter, setSchoolFilter] = useState("all")
  const [sortConfig, setSortConfig] = useState<{ key: keyof Product; direction: "ascending" | "descending" } | null>(
    null,
  )

  const router = useRouter()

  const requestSort = (key: keyof Product) => {
    let direction: "ascending" | "descending" = "ascending"
    if (sortConfig && sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending"
    }
    setSortConfig({ key, direction })
  }

  const filteredProducts = useMemo(() => {
    const sortableProducts = products.filter((product) => {
      const searchFields = [
        product.name,
        product.description,
        product.price.toString(),
        ...product.categories,
        ...product.sizes,
        product.school,
      ]
      return (
        searchFields.some((field) => field.toLowerCase().includes(searchTerm.toLowerCase())) &&
        (schoolFilter === "all" || product.school === schoolFilter)
      )
    })

    if (sortConfig !== null) {
      sortableProducts.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? -1 : 1
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? 1 : -1
        }
        return 0
      })
    }
    return sortableProducts
  }, [products, searchTerm, schoolFilter, sortConfig])

  const handleAddProduct = (newProduct: Omit<Product, "id">) => {
    const id = (Math.max(...products.map((p) => Number.parseInt(p.id))) + 1).toString()
    setProducts([...products, { ...newProduct, id }])
    setIsAddDialogOpen(false)
  }

  const handleEditProduct = (updatedProduct: Product) => {
    setProducts(products.map((p) => (p.id === updatedProduct.id ? updatedProduct : p)))
    setIsEditDialogOpen(false)
  }

  const handleDeleteProduct = () => {
    if (currentProduct) {
      setProducts(products.filter((p) => p.id !== currentProduct.id))
      setIsDeleteDialogOpen(false)
      setCurrentProduct(null)
    }
  }

  return (
    <div className="container mx-auto pt-0">
      <div className="flex justify-between items-center -mt-1 mb-6">
        <h1 className="text-3xl font-bold text-brand">Produkte verwalten</h1>
        <div className="flex items-center space-x-2">
          <Select value={schoolFilter} onValueChange={setSchoolFilter}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Schule" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Alle Schulen</SelectItem>
              <SelectItem value="HLW Auhof">HLW Auhof</SelectItem>
              <SelectItem value="HLW Perg">HLW Perg</SelectItem>
              <SelectItem value="HBLW Wels">HBLW Wels</SelectItem>
            </SelectContent>
          </Select>
          <div className="relative w-[250px]">
            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
            <Input
              placeholder="Suche in allen Feldern..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8 placeholder:text-gray-400"
            />
          </div>
          <Button onClick={() => setIsAddDialogOpen(true)} className="bg-brand hover:bg-brand/90 text-white">
            <PlusCircle className="mr-2 h-4 w-4" /> Neues Produkt
          </Button>
        </div>
      </div>

      <div className="mt-6">
        <Table>
          <TableHeader>
            <TableRow className="border-b-0">
              <TableHead className="text-brand">Bild</TableHead>
              <TableHead className="text-brand cursor-pointer" onClick={() => requestSort("name")}>
                Produktname {sortConfig?.key === "name" && (sortConfig.direction === "ascending" ? "↑" : "↓")}
              </TableHead>
              <TableHead className="text-brand cursor-pointer" onClick={() => requestSort("description")}>
                Beschreibung {sortConfig?.key === "description" && (sortConfig.direction === "ascending" ? "↑" : "↓")}
              </TableHead>
              <TableHead className="text-brand cursor-pointer" onClick={() => requestSort("price")}>
                Preis {sortConfig?.key === "price" && (sortConfig.direction === "ascending" ? "↑" : "↓")}
              </TableHead>
              <TableHead className="text-brand cursor-pointer" onClick={() => requestSort("categories")}>
                Kategorien {sortConfig?.key === "categories" && (sortConfig.direction === "ascending" ? "↑" : "↓")}
              </TableHead>
              <TableHead className="text-brand cursor-pointer" onClick={() => requestSort("sizes")}>
                Größen {sortConfig?.key === "sizes" && (sortConfig.direction === "ascending" ? "↑" : "↓")}
              </TableHead>
              <TableHead className="text-brand cursor-pointer" onClick={() => requestSort("school")}>
                Schule {sortConfig?.key === "school" && (sortConfig.direction === "ascending" ? "↑" : "↓")}
              </TableHead>
              <TableHead className="text-brand">Aktionen</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredProducts.map((product) => (
              <TableRow key={product.id} className="border-b-0">
                <TableCell>
                  <Image
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    width={50}
                    height={50}
                    className="object-cover rounded"
                  />
                </TableCell>
                <TableCell>{product.name}</TableCell>
                <TableCell>{product.description}</TableCell>
                <TableCell>€{product.price.toFixed(2)}</TableCell>
                <TableCell>{product.categories.join(", ")}</TableCell>
                <TableCell>{product.sizes.join(", ")}</TableCell>
                <TableCell>{product.school}</TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setCurrentProduct(product)
                        setIsEditDialogOpen(true)
                      }}
                      className="text-brand hover:text-brand/80 hover:bg-brand/10"
                    >
                      <Pencil className="h-4 w-4" />
                      <span className="sr-only">Bearbeiten</span>
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setCurrentProduct(product)
                        setIsDeleteDialogOpen(true)
                      }}
                      className="text-red-500 hover:text-red-700 hover:bg-red-100"
                    >
                      <Trash2 className="h-4 w-4" />
                      <span className="sr-only">Löschen</span>
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <ProductDialog
        isOpen={isAddDialogOpen}
        onClose={() => setIsAddDialogOpen(false)}
        onSave={handleAddProduct}
        title="Neues Produkt hinzufügen"
      />

      <ProductDialog
        isOpen={isEditDialogOpen}
        onClose={() => setIsEditDialogOpen(false)}
        onSave={handleEditProduct}
        title="Produkt bearbeiten"
        product={currentProduct}
      />

      <DeleteConfirmDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={handleDeleteProduct}
        title="Produkt löschen"
        description="Sind Sie sicher, dass Sie dieses Produkt löschen möchten? Diese Aktion kann nicht rückgängig gemacht werden."
      />
    </div>
  )
}

