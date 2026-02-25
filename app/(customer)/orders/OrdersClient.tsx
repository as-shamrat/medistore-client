"use client"

import { useAuth } from "@/context/AuthContext"
import Link from "next/link"
import { useEffect, useState } from "react"

interface Order {
    id: string
    createdAt: string
    totalPrice: number
    address: string
    status: string
}

export default function OrdersClient() {
    const ctx = useAuth();
    console.log({ user: ctx.user })
    const [orders, setOrders] = useState<Order[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function fetchOrders() {
            try {

                const res = await fetch(
                    `${process.env.NEXT_PUBLIC_API_URL}/api/orders`,
                    {
                        method: "GET",
                        headers: {
                            Authorization: `Bearer ${ctx.user?.token}`,
                        },
                    }
                )
                if (!res.ok) throw new Error("Failed to fetch orders")
                const data = await res.json()
                setOrders(data.data || [])
            } catch (err) {
                console.error(err)
            } finally {
                setLoading(false)
            }
        }

        fetchOrders()
    }, [])

    if (loading) {
        return <p className="text-center py-20">Loading orders...</p>
    }

    if (orders.length === 0) {
        return (
            <div className="text-center py-20">
                <h2 className="text-xl font-semibold">No orders yet</h2>
                <p className="text-gray-500">Place your first order to see it here</p>
            </div>
        )
    }

    return (
        <div className="container mx-auto px-4 py-10 max-w-4xl">
            <h1 className="text-3xl font-bold mb-6">My Orders</h1>

            <div className="space-y-4">
                {orders.map(order => (
                    <Link href={`/orders/${order.id}`}
                        key={order.id}
                        className="border rounded-lg p-4 flex justify-between items-center"
                    >
                        <div>
                            <p className="font-semibold">Order #{order.id.slice(0, 8)}</p>
                            <p className="text-sm text-gray-500">
                                {new Date(order.createdAt).toLocaleDateString()}
                            </p>
                            <p className="text-sm">Address: {order.address}</p>
                        </div>

                        <div className="text-right">
                            <p className="font-semibold">৳ {order.totalPrice}</p>
                            <span className="text-sm text-blue-600">
                                {order.status}
                            </span>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    )
}
