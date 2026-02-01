"use client"

import { useCart } from "@/app/hooks/useCart"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export default function CheckoutClient() {
    const { items, totalPrice, clearCart } = useCart()
    const router = useRouter()

    const [address, setAddress] = useState("")
    const [shippingMethod, setShippingMethod] = useState("CASH_ON_DELIVERY")
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (items.length === 0) {
            router.push('/cart')
        }
    }, [items, router])

    async function handlePlaceOrder() {
        if (!address.trim()) {
            alert("Please enter delivery address")
            return
        }

        setLoading(true)

        try {
            const res = await fetch(
                `http://localhost:5000/api/orders`,
                {
                    method: "POST",
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        address,
                        shippingMethod,
                        items: items.map(item => ({
                            medicineId: item.medicineId,
                            quantity: item.quantity,
                        })),
                    }),
                }
            )

            if (!res.ok) {
                throw new Error("Failed to place order")
            }

            clearCart()
            router.push("/order-success")
        } catch (err) {
            console.error(err)
            alert("Something went wrong while placing order")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="container mx-auto px-4 py-10 max-w-5xl grid md:grid-cols-3 gap-8">
            {/* LEFT: Address */}
            <div className="md:col-span-2 space-y-6">
                <h1 className="text-3xl font-bold">Checkout</h1>

                <div className="border rounded-lg p-4">
                    <h2 className="font-semibold mb-2">Delivery Address</h2>
                    <textarea
                        value={address}
                        onChange={e => setAddress(e.target.value)}
                        rows={4}
                        className="w-full border rounded-md px-3 py-2"
                        placeholder="Enter full delivery address"
                    />
                </div>

                <div className="border rounded-lg p-4">
                    <h2 className="font-semibold mb-2">Shipping Method</h2>

                    <label className="flex items-center gap-2">
                        <input
                            type="radio"
                            checked
                            readOnly
                        />
                        Cash on Delivery
                    </label>
                </div>
            </div>

            {/* RIGHT: Order Summary */}
            <div className="border rounded-lg p-4 h-fit">
                <h2 className="font-semibold mb-4">Order Summary</h2>

                <div className="space-y-2">
                    {items.map(item => (
                        <div
                            key={item.medicineId}
                            className="flex justify-between text-sm"
                        >
                            <span>
                                {item.name} × {item.quantity}
                            </span>
                            <span>৳ {item.price * item.quantity}</span>
                        </div>
                    ))}
                </div>

                <hr className="my-4" />

                <div className="flex justify-between font-semibold">
                    <span>Total</span>
                    <span>৳ {totalPrice}</span>
                </div>

                <button
                    onClick={handlePlaceOrder}
                    disabled={loading}
                    className="w-full mt-6 bg-blue-600 text-white py-2 rounded-lg disabled:opacity-50"
                >
                    {loading ? "Placing Order..." : "Place Order"}
                </button>
            </div>
        </div>
    )
}
