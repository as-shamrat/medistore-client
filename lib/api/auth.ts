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
    // console.log({ cookie: cookieStore.toString() })
    const session = await fetch('https://medi-store-phi.vercel.app/api/auth/get-session', { headers: { Cookie: cookieStore.toString() } })
    const sessionJson = await session.json()
    // console.log({ sessionJson })
    return sessionJson
}
export async function updateProfile(data: Profile) {
    const cookieStore = await cookies();
    const res = await fetch('https://medi-store-phi.vercel.app/api/profile/me', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Cookie: cookieStore.toString() },
        body: JSON.stringify(data),
    })
    return await res.json();
}