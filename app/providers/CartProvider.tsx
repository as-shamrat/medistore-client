"use client"

import { createContext, useEffect, useState } from "react"
import { CartContextType, CartItem } from "../types/cart"


export const CartContext = createContext<CartContextType | null>(null)

export function CartProvider({ children }: { children: React.ReactNode }) {
    const [items, setItems] = useState<CartItem[]>([])

    // 🔹 Load cart from localStorage
    useEffect(() => {
        const storedCart = localStorage.getItem("cart")
        if (storedCart) {
            setItems(JSON.parse(storedCart))
        }
    }, [])

    // 🔹 Persist cart to localStorage
    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(items))
    }, [items])

    const addItem = (item: CartItem) => {
        setItems(prev => {
            const existing = prev.find(i => i.medicineId === item.medicineId)

            if (existing) {
                return prev.map(i =>
                    i.medicineId === item.medicineId
                        ? { ...i, quantity: i.quantity + item.quantity }
                        : i
                )
            }

            return [...prev, item]
        })
    }

    const removeItem = (medicineId: string) => {
        setItems(prev => prev.filter(item => item.medicineId !== medicineId))
    }

    const updateQuantity = (medicineId: string, quantity: number) => {
        if (quantity <= 0) {
            removeItem(medicineId)
            return
        }

        setItems(prev =>
            prev.map(item =>
                item.medicineId === medicineId
                    ? { ...item, quantity }
                    : item
            )
        )
    }

    const clearCart = () => setItems([])

    const totalPrice = items.reduce(
        (total, item) => total + item.price * item.quantity,
        0
    )

    return (
        <CartContext.Provider
            value={{
                items,
                addItem,
                removeItem,
                updateQuantity,
                clearCart,
                totalPrice,
            }}
        >
            {children}
        </CartContext.Provider>
    )
}
