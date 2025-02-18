"use client"

import { useState, useMemo } from "react"
import { PlusCircle, Search, Pencil, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { UserDialog } from "./user-dialog"
import { DeleteConfirmDialog } from "./delete-confirm-dialog"

type User = {
  id: string
  name: string
  email: string
  phoneNumber: string
  school: string
  role: "admin" | "user"
}

const mockUsers: User[] = [
  {
    id: "1",
    name: "Max Mustermann",
    email: "max.mustermann@example.com",
    phoneNumber: "+43 123 456789",
    school: "HLW Auhof",
    role: "admin",
  },
  {
    id: "2",
    name: "Anna Schmidt",
    email: "anna.schmidt@example.com",
    phoneNumber: "+43 987 654321",
    school: "HLW Perg",
    role: "user",
  },
  {
    id: "3",
    name: "Lisa Huber",
    email: "lisa.huber@example.com",
    phoneNumber: "+43 676 1234567",
    school: "HBLW Wels",
    role: "user",
  },
]

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>(mockUsers)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [schoolFilter, setSchoolFilter] = useState("all")
  const [sortConfig, setSortConfig] = useState<{ key: keyof User; direction: "ascending" | "descending" } | null>(null)

  const requestSort = (key: keyof User) => {
    let direction: "ascending" | "descending" = "ascending"
    if (sortConfig && sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending"
    }
    setSortConfig({ key, direction })
  }

  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const searchFields = [user.name, user.email, user.phoneNumber, user.school, user.role]
      return (
        searchFields.some((field) => field.toLowerCase().includes(searchTerm.toLowerCase())) &&
        (schoolFilter === "all" || user.school === schoolFilter)
      )
    })
  }, [users, searchTerm, schoolFilter])

  const sortedUsers = useMemo(() => {
    if (sortConfig !== null) {
      return [...filteredUsers].sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? -1 : 1
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? 1 : -1
        }
        return 0
      })
    }
    return filteredUsers
  }, [filteredUsers, sortConfig])

  const handleAddUser = (newUser: Omit<User, "id">) => {
    const id = (Math.max(...users.map((u) => Number.parseInt(u.id))) + 1).toString()
    setUsers([...users, { ...newUser, id }])
    setIsAddDialogOpen(false)
  }

  const handleEditUser = (updatedUser: User) => {
    setUsers(users.map((u) => (u.id === updatedUser.id ? updatedUser : u)))
    setIsEditDialogOpen(false)
  }

  const handleDeleteUser = () => {
    if (currentUser) {
      setUsers(users.filter((u) => u.id !== currentUser.id))
      setIsDeleteDialogOpen(false)
      setCurrentUser(null)
    }
  }

  return (
    <div className="container mx-auto pt-0">
      <div className="flex justify-between items-center -mt-1 mb-6">
        <h1 className="text-3xl font-bold text-brand">Benutzer verwalten</h1>
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
              placeholder="Benutzer durchsuchen..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8 placeholder:text-gray-400"
            />
          </div>
          <Button onClick={() => setIsAddDialogOpen(true)} className="bg-brand hover:bg-brand/90 text-white">
            <PlusCircle className="mr-2 h-4 w-4" /> Neuer Benutzer
          </Button>
        </div>
      </div>

      <div className="mt-6">
        <Table>
          <TableHeader>
            <TableRow className="border-b-0">
              <TableHead className="text-brand cursor-pointer" onClick={() => requestSort("name")}>
                Name {sortConfig?.key === "name" && (sortConfig.direction === "ascending" ? "↑" : "↓")}
              </TableHead>
              <TableHead className="text-brand cursor-pointer" onClick={() => requestSort("email")}>
                E-Mail {sortConfig?.key === "email" && (sortConfig.direction === "ascending" ? "↑" : "↓")}
              </TableHead>
              <TableHead className="text-brand cursor-pointer" onClick={() => requestSort("phoneNumber")}>
                Telefon {sortConfig?.key === "phoneNumber" && (sortConfig.direction === "ascending" ? "↑" : "↓")}
              </TableHead>
              <TableHead className="text-brand cursor-pointer" onClick={() => requestSort("school")}>
                Schule {sortConfig?.key === "school" && (sortConfig.direction === "ascending" ? "↑" : "↓")}
              </TableHead>
              <TableHead className="text-brand cursor-pointer" onClick={() => requestSort("role")}>
                Rolle {sortConfig?.key === "role" && (sortConfig.direction === "ascending" ? "↑" : "↓")}
              </TableHead>
              <TableHead className="text-brand">Aktionen</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedUsers.map((user) => (
              <TableRow key={user.id} className="border-b-0">
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.phoneNumber}</TableCell>
                <TableCell>{user.school}</TableCell>
                <TableCell>{user.role === "admin" ? "Administrator" : "Benutzer"}</TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setCurrentUser(user)
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
                        setCurrentUser(user)
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

      <UserDialog
        isOpen={isAddDialogOpen}
        onClose={() => setIsAddDialogOpen(false)}
        onSave={handleAddUser}
        title="Neuen Benutzer hinzufügen"
      />

      <UserDialog
        isOpen={isEditDialogOpen}
        onClose={() => setIsEditDialogOpen(false)}
        onSave={handleEditUser}
        title="Benutzer bearbeiten"
        user={currentUser}
      />

      <DeleteConfirmDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={handleDeleteUser}
        title="Benutzer löschen"
        description="Sind Sie sicher, dass Sie diesen Benutzer löschen möchten? Diese Aktion kann nicht rückgängig gemacht werden."
      />
    </div>
  )
}

