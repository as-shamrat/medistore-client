import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import SellerDashboardClient from './SellerDashboardClient'
import { getSession } from '@/lib/api/auth'


export default async function SellerDashboardPage() {
    const cookieStore = await cookies()
    const { session, user } = await getSession()

    if (!session || user.role !== 'SELLER') {
        redirect('/login')
    }

    const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/seller/orders`,
        {
            headers: {
                Cookie: cookieStore.toString(),
            },
            cache: 'no-store',
        }
    )
    console.log(res)
    if (!res.ok) {
        throw new Error('Failed to fetch seller dashboard data')
    }

    const json = await res.json()

    return <SellerDashboardClient data={json.data} />
}
