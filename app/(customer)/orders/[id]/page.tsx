// app/customer/orders/[id]/page.tsx

import { cookies } from 'next/headers'
import OrderDetails from './OrdersDetails'

type PageProps = {
    params: Promise<{ id: string }>
}

async function getOrder(id: string) {
    const token = await cookies()

    const res = await fetch(`http://localhost:5000/api/orders/${id}`, {
        headers: {
            Cookie: token.toString()
        },
        cache: 'no-store',
    })
    console.log({ res })
    if (!res.ok) {
        throw new Error('Order not found')
    }

    return await res.json()
}

export default async function OrderDetailsPage({
    params,
}: PageProps) {
    const { id } = await params
    const order = await getOrder(id)
    console.log({ order })
    if (!order) {
        return <p>loading...</p>
    }
    return <OrderDetails order={order.data} />
}




