import ProfileClient from './ProfileClient'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export default async function ProfilePage() {
    const cookieStore = await cookies()

    if (!cookieStore) {
        redirect('/login')
    }

    const res = await fetch(`http://localhost:5000/api/auth/me`, {
        headers: {
            Cookie: cookieStore.toString()
        },
        cache: 'no-store',
    })

    if (!res.ok) {
        throw new Error('Failed to fetch profile')
    }

    const json = await res.json()

    return <ProfileClient profile={json.data} />
}
