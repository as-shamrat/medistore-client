'use server';

import { cookies } from "next/headers";

export async function getSellerOrders() {
    const cookieStore = await cookies()
    const res = await fetch(`http://localhost:5000/api/seller/orders`, {
        headers: {
            Cookie: cookieStore.toString()
        }
    })
    console.log({ res })
    if (!res.ok) throw new Error("Failed to fetch orders")

    return await res.json()
}
export async function getSellerOrderById(id: string) {
    const cookieStore = await cookies()
    const res = await fetch(`http://localhost:5000/api/seller/orders/` + id, {
        headers: {
            Cookie: cookieStore.toString()
        }
    })
    console.log({ res })
    if (!res.ok) throw new Error("Failed to fetch orders")

    return await res.json()
}