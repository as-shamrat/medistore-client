'use server';

import { cookies } from "next/headers";

// seller

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
export async function getSellerMedicines() {
    const cookieStore = await cookies()
    const res = await fetch(`http://localhost:5000/api/seller/medicines`, {
        headers: {
            Cookie: cookieStore.toString()
        }
    })
    console.log({ res })
    if (!res.ok) throw new Error("Failed to fetch medicines")

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

export async function updateSellerOrder(orderId: string, data: any) {
    const cookieStore = await cookies()
    const res = await fetch(`http://localhost:5000/api/seller/orders/` + orderId, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            Cookie: cookieStore.toString()
        },
        body: JSON.stringify(data)
    })
    console.log({ res })
    if (!res.ok) throw new Error("Failed to update orders")

    return await res.json()
}
export async function updateSellerMedicine(medicineId: string, data: any) {
    const cookieStore = await cookies()
    const res = await fetch(`http://localhost:5000/api/seller/medicines/` + medicineId, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            Cookie: cookieStore.toString()
        },
        body: JSON.stringify(data)
    })
    console.log({ res })
    if (!res.ok) throw new Error("Failed to update medicine")

    return await res.json()
}

// admin

export async function getAdminOrders() {
    const cookieStore = await cookies()
    const res = await fetch(`http://localhost:5000/api/admin/orders`, {
        headers: {
            Cookie: cookieStore.toString()
        }
    })
    console.log({ res })
    if (!res.ok) throw new Error("Failed to fetch orders")

    return await res.json()
}
export async function updateAdminOrder(orderId: string, data: any) {
    const cookieStore = await cookies()
    const res = await fetch(`http://localhost:5000/api/admin/orders/` + orderId, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            Cookie: cookieStore.toString()
        },
        body: JSON.stringify(data)
    })
    console.log({ res })
    if (!res.ok) throw new Error("Failed to update admin orders")

    return await res.json()
}

// categories
export async function getCategories() {
    const cookieStore = await cookies()
    const res = await fetch(`http://localhost:5000/api/categories`, {
        headers: {
            Cookie: cookieStore.toString()
        }
    })
    console.log({ res })
    if (!res.ok) throw new Error("Failed to fetch categories")

    return await res.json()
}

export async function addCategory(data: any) {
    const cookieStore = await cookies()
    const res = await fetch(`http://localhost:5000/api/categories`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Cookie: cookieStore.toString()
        },
        body: JSON.stringify(data)
    })
    console.log({ res })
    if (!res.ok) throw new Error("Failed to create category")

    return await res.json()
}