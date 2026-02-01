export interface CartItem {
    medicineId: string
    name: string
    price: number
    quantity: number
    sellerId: string
    image?: string
}

export interface CartContextType {
    items: CartItem[]
    addItem: (item: CartItem) => void
    removeItem: (medicineId: string) => void
    updateQuantity: (medicineId: string, quantity: number) => void
    clearCart: () => void
    totalPrice: number
}
