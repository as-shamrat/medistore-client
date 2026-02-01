"use client"


import { useCart } from "@/app/hooks/useCart"
import Link from "next/link"

export default function CartClient() {
    const { items, totalPrice, updateQuantity, removeItem, clearCart } = useCart()

    if (items.length === 0) {
        return (
            <div className="container mx-auto px-4 py-20 text-center">
                <h2 className="text-2xl font-semibold">Your cart is empty</h2>
                <Link
                    href="/shop"
                    className="mt-6 inline-block text-blue-600 underline"
                >
                    Go to shop
                </Link>
            </div>
        )
    }

    return (
        <div className="container mx-auto px-4 py-10 max-w-4xl">
            <h1 className="text-3xl font-bold mb-6">Your Cart</h1>

            <div className="space-y-4">
                {items.map(item => (
                    <div
                        key={item.medicineId}
                        className="flex justify-between items-center border rounded-lg p-4"
                    >
                        <div>
                            <h3 className="font-semibold">{item.name}</h3>
                            <p className="text-gray-600">৳ {item.price}</p>
                        </div>

                        <div className="flex items-center gap-3">
                            <input
                                type="number"
                                min={1}
                                value={item.quantity}
                                onChange={e =>
                                    updateQuantity(
                                        item.medicineId,
                                        Number(e.target.value)
                                    )
                                }
                                className="w-16 border rounded px-2 py-1"
                            />

                            <button
                                onClick={() => removeItem(item.medicineId)}
                                className="text-red-500 hover:underline"
                            >
                                Remove
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-8 flex justify-between items-center">
                <button
                    onClick={clearCart}
                    className="text-sm text-red-600 underline"
                >
                    Clear cart
                </button>

                <div className="text-right">
                    <p className="text-lg font-semibold">
                        Total: ৳ {totalPrice}
                    </p>
                    <Link
                        href="/checkout"
                        className="inline-block mt-3 bg-blue-600 text-white px-6 py-2 rounded-lg"
                    >
                        Proceed to Checkout
                    </Link>
                </div>
            </div>
        </div>
    )
}
