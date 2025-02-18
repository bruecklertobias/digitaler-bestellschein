"use client"

import type React from "react"

import { useState, createContext, useContext } from "react"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ShoppingCartIcon, Plus, Minus, Trash2 } from "lucide-react"
import Image from "next/image"

type CartItem = {
  id: number
  name: string
  price: number
  quantity: number
  size: string
  image: string
}

type CartContextType = {
  cartItems: CartItem[]
  addToCart: (item: CartItem) => void
  updateQuantity: (id: number, change: number) => void
  removeItem: (id: number) => void
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([])

  const addToCart = (item: CartItem) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((i) => i.id === item.id && i.size === item.size)
      if (existingItem) {
        return prevItems.map((i) =>
          i.id === item.id && i.size === item.size ? { ...i, quantity: i.quantity + item.quantity } : i,
        )
      }
      return [...prevItems, item]
    })
  }

  const updateQuantity = (id: number, change: number) => {
    setCartItems((prevItems) =>
      prevItems
        .map((item) => (item.id === id ? { ...item, quantity: Math.max(0, item.quantity + change) } : item))
        .filter((item) => item.quantity > 0),
    )
  }

  const removeItem = (id: number) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id))
  }

  return (
    <CartContext.Provider value={{ cartItems, addToCart, updateQuantity, removeItem }}>{children}</CartContext.Provider>
  )
}

export const useCart = () => {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}

export function ShoppingCart() {
  const [isOpen, setIsOpen] = useState(false)
  const { cartItems, updateQuantity, removeItem } = useCart()

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0)
  const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button
          variant="default"
          size="sm"
          className="bg-gradient-to-r from-brand to-brand/80 hover:from-brand/90 hover:to-brand/70 text-white transition-all duration-300 ease-in-out transform hover:scale-105 shadow-md hover:shadow-lg"
          onClick={() => setIsOpen(true)}
        >
          <ShoppingCartIcon className="h-5 w-5 md:h-4 md:w-4 md:mr-2" />
          <span className="hidden md:inline">Warenkorb</span>
          <div className="ml-2 rounded-full bg-white px-2 py-0.5 text-xs font-semibold text-brand">{totalItems}</div>
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-md md:max-w-lg p-0 bg-gradient-to-br from-[#e8f0f2] via-[#d1e3e7] to-[#bbd6dc]">
        <div className="h-full flex flex-col">
          <SheetHeader className="p-6">
            <SheetTitle className="text-2xl font-bold text-brand">Warenkorb</SheetTitle>
          </SheetHeader>
          <ScrollArea className="flex-grow py-4 px-6">
            {cartItems.map((item) => (
              <div
                key={`${item.id}-${item.size}`}
                className="bg-white rounded-lg shadow-sm mb-4 p-2 sm:p-4 hover:shadow-md transition-shadow duration-150"
              >
                <div className="flex items-center space-x-2 sm:space-x-4">
                  <div className="relative h-16 w-16 sm:h-20 sm:w-20 rounded-md overflow-hidden flex-shrink-0">
                    <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                  </div>
                  <div className="flex-1 min-w-0 pr-2 sm:pr-4">
                    <h3 className="text-xs sm:text-sm font-medium text-gray-900 truncate">{item.name}</h3>
                    <p className="text-xs text-gray-500">Größe: {item.size}</p>
                    <p className="text-xs sm:text-sm font-medium text-gray-900">€{item.price.toFixed(2)}</p>
                  </div>
                  <div className="flex items-center space-x-1 sm:space-x-2">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-6 w-6 sm:h-8 sm:w-8"
                      onClick={() => updateQuantity(item.id, -1)}
                    >
                      <Minus className="h-3 w-3 sm:h-4 sm:w-4" />
                    </Button>
                    <span className="text-xs sm:text-sm font-medium w-4 text-center">{item.quantity}</span>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-6 w-6 sm:h-8 sm:w-8"
                      onClick={() => updateQuantity(item.id, 1)}
                    >
                      <Plus className="h-3 w-3 sm:h-4 sm:w-4" />
                    </Button>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-red-500 hover:text-red-600 h-6 w-6 sm:h-8 sm:w-8 flex-shrink-0"
                    onClick={() => removeItem(item.id)}
                  >
                    <Trash2 className="h-3 w-3 sm:h-4 sm:w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </ScrollArea>
          <div className="mt-auto pt-4 border-t border-gray-200 bg-white/50 backdrop-blur-sm p-4 sm:p-6">
            <div className="flex justify-between text-sm sm:text-base font-medium text-gray-900 mb-4">
              <p>Zwischensumme</p>
              <p>€{totalPrice.toFixed(2)}</p>
            </div>
            <Button
              className="w-full bg-gradient-to-r from-brand to-brand/80 hover:from-brand/90 hover:to-brand/70 text-white transition-all duration-300 text-sm sm:text-base"
              onClick={() => (window.location.href = "/checkout")}
            >
              Vorbestellen
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}

