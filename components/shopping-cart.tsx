"use client"

import type React from "react"
import { createContext, useState, useContext, type ReactNode } from "react"
import { Button } from "@/components/ui/button"
import { ShoppingCartIcon } from "lucide-react"

interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
}

interface CartContextProps {
  cart: CartItem[]
  addToCart: (item: CartItem) => void
  removeFromCart: (itemId: string) => void
  updateQuantity: (itemId: string, quantity: number) => void
  clearCart: () => void
}

const CartContext = createContext<CartContextProps | undefined>(undefined)

interface CartProviderProps {
  children: ReactNode
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([])

  const addToCart = (item: CartItem) => {
    setCart((prevCart) => {
      const existingItemIndex = prevCart.findIndex((cartItem) => cartItem.id === item.id)

      if (existingItemIndex !== -1) {
        const newCart = [...prevCart]
        newCart[existingItemIndex].quantity += item.quantity
        return newCart
      } else {
        return [...prevCart, { ...item }]
      }
    })
  }

  const removeFromCart = (itemId: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== itemId))
  }

  const updateQuantity = (itemId: string, quantity: number) => {
    setCart((prevCart) => prevCart.map((item) => (item.id === itemId ? { ...item, quantity: quantity } : item)))
  }

  const clearCart = () => {
    setCart([])
  }

  const value: CartContextProps = {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export const useCart = () => {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}

export const ShoppingCart = () => {
  const { cart } = useCart()

  return (
    <Button
      variant="default"
      size="sm"
      className="bg-gradient-to-r from-brand to-brand/80 hover:from-brand/90 hover:to-brand/70 text-white transition-all duration-300 ease-in-out transform hover:scale-105 shadow-md hover:shadow-lg"
    >
      <ShoppingCartIcon className="h-5 w-5 md:h-4 md:w-4 md:mr-2" />
      <span className="hidden md:inline">Warenkorb</span>
      <div className="ml-2 rounded-full bg-white px-2 py-0.5 text-xs font-semibold text-brand">{cart.length}</div>
    </Button>
  )
}

