'use server'
import { cookies } from "next/headers"
type Profile = {
    name: string
    email: string
    phone?: string
    address?: string
}
export async function getSession() {
    const cookieStore = await cookies();
    const session = await fetch('http://localhost:5000/api/auth/get-session', { headers: { Cookie: cookieStore.toString() } })
    return await session.json()
}
export async function updateProfile(data: Profile) {
    const cookieStore = await cookies();
    const res = await fetch('http://localhost:5000/api/profile/me', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Cookie: cookieStore.toString() },
        body: JSON.stringify(data),
    })
    return await res.json();
}