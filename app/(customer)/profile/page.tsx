import ProfileClient from './ProfileClient'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export default async function ProfilePage() {
    const cookieStore = await cookies();

    const token = cookieStore.get("auth_token")?.value;

    if (!token) {
        redirect('/login')
    }

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/me`, {

        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
        },
        cache: "no-store", // 🔥 important for SSR auth

    })

    if (!res.ok) {
        throw new Error('Failed to fetch profile')
    }

    const json = await res.json()

    return <ProfileClient profile={json.data} />
}
