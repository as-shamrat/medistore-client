'use client'

import { StatCard, StatusBadge } from "@/components/common/StatCardComponents"

type Order = {
    id: string
    customerName: string
    totalPrice: number
    status: 'PENDING' | 'DELIVERED' | 'CANCELLED'
    createdAt: string
}

type DashboardData = {
    stats: {
        totalOrders: number
        pending: number
        delivered: number
        cancelled: number
    }
    orders: Order[]
}

export default function SellerDashboardClient({
    data,
}: {
    data: DashboardData
}) {
    return (
        <div className="max-w-7xl mx-auto py-10 px-4">
            <h1 className="text-2xl font-semibold mb-6">Seller Dashboard</h1>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                <StatCard title="Total Orders" value={data.stats.totalOrders} />
                <StatCard title="Pending" value={data.stats.pending} />
                <StatCard title="Delivered" value={data.stats.delivered} />
                <StatCard title="Cancelled" value={data.stats.cancelled} />
            </div>

            {/* Orders Table */}
            <div className="bg-white rounded-lg shadow overflow-x-auto">
                <table className="w-full text-sm">
                    <thead className="bg-gray-100 text-left">
                        <tr>
                            <th className="p-3">Order ID</th>
                            <th className="p-3">Customer</th>
                            <th className="p-3">Total</th>
                            <th className="p-3">Status</th>
                            <th className="p-3">Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.orders.map(order => (
                            <tr key={order.id} className="border-t">
                                <td className="p-3 font-mono text-xs">{order.id}</td>
                                <td className="p-3">{order.customerName}</td>
                                <td className="p-3">৳{order.totalPrice}</td>
                                <td className="p-3">
                                    <StatusBadge status={order.status} />
                                </td>
                                <td className="p-3">
                                    {new Date(order.createdAt).toLocaleDateString()}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
