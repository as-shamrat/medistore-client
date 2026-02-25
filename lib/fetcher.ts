'use server';

import { getToken } from "@/helper/localStorage";
import { cookies } from "next/headers";

// seller

export async function getSellerOrders() {
    const cookieStore = await cookies()
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/seller/orders`, {
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
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/seller/medicines`, {
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
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/seller/orders/` + id, {
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
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/seller/orders/` + orderId, {
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
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/seller/medicines/` + medicineId, {
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
    console.log('From admin orders: ', cookieStore.toString())
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/orders`, {
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
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/orders/` + orderId, {
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
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/categories`, {
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
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/categories`, {
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
export async function updateCategory(categoryId: string, data: any) {
    const cookieStore = await cookies()
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/categories/` + categoryId, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            Cookie: cookieStore.toString()
        },
        body: JSON.stringify(data)
    })
    console.log({ res })
    if (!res.ok) throw new Error("Failed to update category")

    return await res.json()
}
// users by admin
export async function getUsers() {
    const cookieStore = await cookies()
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/users`, {
        headers: { Cookie: cookieStore.toString() }
    });

    if (!res.ok) {
        throw new Error("Failed to fetch users");
    }

    const data = await res.json();
    return data.data;
}
export async function updateUserStatus(userId: string, data: { status: 'ACTIVE' | 'BANNED' }) {
    console.log(data)
    const cookieStore = await cookies()
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/users/` + userId, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', Cookie: cookieStore.toString() },
        body: JSON.stringify(data)
    });

    if (!res.ok) {
        throw new Error("Failed to fetch users");
    }


    return await res.json();
}
export async function addMedicine(data: {
    name: string,
    description: string,
    price: number,
    stock: number,
    manufacturer: string,
    categoryId: string
}) {
    console.log(data)
    const cookieStore = await cookies()
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/seller/medicines`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Cookie: cookieStore.toString() },
        body: JSON.stringify(data)
    });

    if (!res.ok) {
        throw new Error("Failed to add medicine");
    }


    return await res.json();
}